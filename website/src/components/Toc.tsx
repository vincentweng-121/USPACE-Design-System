import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Heading {
  id: string;
  text: string;
}

/**
 * 右側錨點目錄（參考 Porsche Design System 的 On this page）。
 *
 * 不需要頁面配合：直接掃描 main 內帶 id 的 h2，
 * 並以 IntersectionObserver 標示目前閱讀位置。
 */
export default function Toc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  // 換頁或內容變動（例如切換 Design / Develop 頁籤）時重掃
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    const scan = () => {
      const found = Array.from(main.querySelectorAll<HTMLHeadingElement>('h2[id]'))
        .filter((h) => h.offsetParent !== null)
        .map((h) => ({ id: h.id, text: h.textContent ?? '' }));
      setHeadings((prev) =>
        prev.length === found.length && prev.every((p, i) => p.id === found[i].id)
          ? prev
          : found
      );
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(main, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return <div className="toc" aria-hidden />;

  return (
    <nav className="toc" aria-label="On this page">
      <div className="toc-title">On this page</div>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              data-active={h.id === activeId || undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${h.id}`);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
