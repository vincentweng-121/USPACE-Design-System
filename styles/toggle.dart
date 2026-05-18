import 'package:flutter/material.dart';
import 'uspace_palette.dart';
import 'uspace_colors_extension.dart';

/// USpace Toggle Switch
///
/// On  色：USpacePalette.neonLime800（⚠️ 暫定，待使用者確認後更新）
/// Off 色：colors.actionPrimaryContent
class USpaceToggle extends StatelessWidget {
  const USpaceToggle({
    super.key,
    required this.value,
    this.onChanged,
  });

  final bool value;
  final ValueChanged<bool>? onChanged;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    return Switch(
      value: value,
      onChanged: onChanged,
      thumbColor: MaterialStateProperty.all(Colors.white),
      trackColor: MaterialStateProperty.resolveWith((states) {
        if (states.contains(MaterialState.selected)) {
          return USpacePalette.neonLime800; // ⚠️ 暫定
        }
        return colors.actionPrimaryContent;
      }),
      trackOutlineColor: MaterialStateProperty.all(Colors.transparent),
    );
  }
}
