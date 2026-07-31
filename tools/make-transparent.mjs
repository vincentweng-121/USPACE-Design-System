#!/usr/bin/env node
/**
 * 把 PNG 外圍的實底背景挖成透明。
 *
 *   node tools/make-transparent.mjs <檔案...>
 *
 * Figma 匯出 frame 時會把 frame 的底色一起烤進 PNG，放到文件站的
 * 灰底容器上就會出現一塊白方塊。這支腳本從四邊往內泛洪，把與角落
 * 同色的連通區域設為透明。
 *
 * 用泛洪而不是「所有白色都變透明」，是因為圖片內部也可能有白色
 * （例如 do/dont 的 Modal 本體）。那些白色沒有連到邊緣，不會被挖掉。
 *
 * 尺寸與像素內容都不變，只改 alpha。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';

/**
 * 與背景色的每通道容許差。
 *
 * 必須壓得很低：tertiary 按鈕是 grey100 `#EEEEEE`，與純白只差 17，
 * 容差開到 20 會把整顆按鈕一起挖掉。PNG 是無損格式，Figma 匯出的
 * 背景就是精確的 255，所以個位數的容差已經足夠吸收邊緣雜訊。
 */
const TOLERANCE = 6;

// ── CRC32 ─────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

// ── 解碼成 RGBA ────────────────────────────────────────────────
function decode(path) {
  const buf = readFileSync(path);
  let pos = 8;
  let ihdr = null;
  const idat = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }

  if (ihdr.depth !== 8 || ihdr.interlace !== 0) {
    throw new Error(`只支援 8-bit 非交錯 PNG：${path}`);
  }
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[ihdr.colorType];
  if (!channels) throw new Error(`不支援的 colorType ${ihdr.colorType}：${path}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = ihdr.width * channels;
  const flat = Buffer.alloc(ihdr.height * stride);

  for (let y = 0; y < ihdr.height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = flat.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? flat.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);

    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = v & 0xff;
    }
  }

  // 統一轉成 RGBA
  const rgba = Buffer.alloc(ihdr.width * ihdr.height * 4);
  for (let p = 0; p < ihdr.width * ihdr.height; p++) {
    const s = p * channels;
    const d = p * 4;
    if (channels === 4) flat.copy(rgba, d, s, s + 4);
    else if (channels === 3) {
      rgba[d] = flat[s]; rgba[d + 1] = flat[s + 1]; rgba[d + 2] = flat[s + 2]; rgba[d + 3] = 255;
    } else if (channels === 2) {
      rgba[d] = rgba[d + 1] = rgba[d + 2] = flat[s]; rgba[d + 3] = flat[s + 1];
    } else {
      rgba[d] = rgba[d + 1] = rgba[d + 2] = flat[s]; rgba[d + 3] = 255;
    }
  }
  return { width: ihdr.width, height: ihdr.height, rgba };
}

// ── 編碼 RGBA ──────────────────────────────────────────────────
function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  const body = out.subarray(4, 8 + data.length);
  out.writeUInt32BE(crc32(body), 8 + data.length);
  return out;
}

function encode({ width, height, rgba }) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // colorType RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── 從四邊泛洪 ────────────────────────────────────────────────
function stripBackground(img) {
  const { width, height, rgba } = img;
  const bg = [rgba[0], rgba[1], rgba[2]]; // 左上角視為背景色
  const seen = new Uint8Array(width * height);
  const stack = [];

  const matches = (p) => {
    const d = p * 4;
    if (rgba[d + 3] === 0) return true;
    return (
      Math.abs(rgba[d] - bg[0]) <= TOLERANCE &&
      Math.abs(rgba[d + 1] - bg[1]) <= TOLERANCE &&
      Math.abs(rgba[d + 2] - bg[2]) <= TOLERANCE
    );
  };

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    seen[p] = 1;
    if (matches(p)) stack.push(p);
  };

  for (let x = 0; x < width; x++) { push(x, 0); push(x, height - 1); }
  for (let y = 0; y < height; y++) { push(0, y); push(width - 1, y); }

  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    rgba[p * 4 + 3] = 0;
    cleared++;
    const x = p % width;
    const y = (p / width) | 0;
    push(x - 1, y); push(x + 1, y); push(x, y - 1); push(x, y + 1);
  }

  return { bg, cleared, total: width * height };
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('用法：node tools/make-transparent.mjs <檔案...>');
  process.exit(1);
}

for (const path of files) {
  const img = decode(path);
  const { bg, cleared, total } = stripBackground(img);
  writeFileSync(path, encode(img));
  const pct = ((cleared / total) * 100).toFixed(1);
  console.log(
    `${path.split('/').pop().padEnd(28)} ${img.width}x${img.height}  ` +
      `背景 rgb(${bg.join(',')})  挖除 ${pct}%`,
  );
}
