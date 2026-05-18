import 'package:flutter/material.dart';

/// USpace Glass Effect Constants
///
/// 渲染策略（by platform）：
///   iOS 26+        → Liquid Glass
///                    ⚠️ Flutter 目前無原生 API，暫以 BackdropFilter 近似
///                    TODO: 替換為 UIVisualEffectView platform view
///   iOS < 26       → BackdropFilter + Gaussian blur
///   Android / Web  → BackdropFilter + Gaussian blur
class USpaceGlass {
  USpaceGlass._();

  /// Glass 半透明填色
  /// 來源：Figma rgba(255,255,255,0.2) → 0x33FFFFFF
  static const Color fillColor = Color(0x33FFFFFF);

  /// 高斯模糊半徑（sigmaX & sigmaY 相同）
  /// ⚠️ TODO: 使用者待確認正確數值，目前暫定 10.0
  static const double blurSigma = 10.0;
}
