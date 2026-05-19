import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';

/// USPACE Design System Toggle Switch
///
/// 來源：Figma node 191:6185
///
/// 支援 2 states (ON / OFF) × 2 status (Enable / Disable)。
///
/// Token mapping:
///   ON  + Enable:  bg = actionPrimaryContentAccent, thumb = contentInverse
///   ON  + Disable: bg = actionPrimaryContentAccent, thumb = contentInverse, opacity = 0.25
///   OFF + Enable:  bg = actionPrimaryContent,       thumb = contentInverse
///   OFF + Disable: bg = actionDisabledBg,           thumb = contentInverse
///
/// Layout:
///   Track: 64 × 24, rounded=27, padding=2
///   Thumb: 34 × 20, rounded=27 (pill shape)
class USpaceToggle extends StatelessWidget {
  const USpaceToggle({
    super.key,
    required this.value,
    this.onChanged,
    this.enabled = true,
  });

  /// 是否為 ON 狀態
  final bool value;

  /// 切換回呼；null 或 enabled=false 時不可互動
  final ValueChanged<bool>? onChanged;

  /// 是否啟用
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;

    final Color trackColor;
    final double opacity;

    if (value) {
      // ON
      trackColor = colors.actionPrimaryContentAccent;
      opacity = enabled ? 1.0 : 0.25;
    } else {
      // OFF
      trackColor = enabled ? colors.actionPrimaryContent : colors.actionDisabledBg;
      opacity = 1.0;
    }

    return GestureDetector(
      onTap: enabled && onChanged != null ? () => onChanged!(!value) : null,
      child: Opacity(
        opacity: opacity,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 64,
          height: 24,
          padding: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            color: trackColor,
            borderRadius: BorderRadius.circular(27),
          ),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 34,
            height: 20,
            decoration: BoxDecoration(
              color: colors.contentInverse,
              borderRadius: BorderRadius.circular(27),
            ),
          ),
        ),
      ),
    );
  }
}
