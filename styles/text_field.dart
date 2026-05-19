import 'package:flutter/material.dart';
import 'uspace_palette.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'button.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── TextField Status ──────────────────────────────────────────
enum USpaceTextFieldStatus {
  defaultStatus,
  active,
  typing,
  complete,
  disabled,
  error,
  errorActive,
  incomplete,
  nonEditable,
}

// ── USpaceTextField ───────────────────────────────────────────
/// USPACE Design System TextField component.
///
/// 來源：Figma node 40:3307
///
/// 支援 9 種狀態：Default / Active / Typing / Complete /
///   Disabled / Error / Error-Active / Incomplete / Non-editable
///
/// Layout:
/// - height: 48px
/// - borderRadius: StadiumBorder (1000)
/// - paddingLeft: 20px
/// - Active / Typing / Error-Active border: 2px
///
/// 嵌入 [USpaceButton] (Small / Primary) 作為可選的 trailing action。
class USpaceTextField extends StatefulWidget {
  const USpaceTextField({
    super.key,
    this.label,
    this.placeholder,
    this.hint,
    this.status = USpaceTextFieldStatus.defaultStatus,
    this.showButton = false,
    this.buttonLabel = 'Action',
    this.onButtonPressed,
    this.controller,
    this.onChanged,
    this.onSubmitted,
    this.enabled = true,
  });

  /// 上方標籤文字（bodyS, inputText token）
  final String? label;

  /// 空白時顯示的提示文字（bodyM, inputTextPlaceholder token）
  final String? placeholder;

  /// 下方說明或錯誤文字（sfBodyS）
  ///   正常：textSecondary token
  ///   Error：inputTextError token
  final String? hint;

  /// 當前狀態
  final USpaceTextFieldStatus status;

  /// 是否顯示 trailing action button
  final bool showButton;

  /// Button 文字
  final String buttonLabel;

  /// Button 點擊事件
  final VoidCallback? onButtonPressed;

  /// 文字控制器
  final TextEditingController? controller;

  /// 文字變更回呼
  final ValueChanged<String>? onChanged;

  /// 提交回呼
  final ValueChanged<String>? onSubmitted;

  /// 是否可互動（false 時強制 disabled / nonEditable 外觀）
  final bool enabled;

  @override
  State<USpaceTextField> createState() => _USpaceTextFieldState();
}

class _USpaceTextFieldState extends State<USpaceTextField> {
  late final TextEditingController _controller;
  bool _ownController = false;

  @override
  void initState() {
    super.initState();
    if (widget.controller != null) {
      _controller = widget.controller!;
    } else {
      _controller = TextEditingController();
      _ownController = true;
    }
  }

  @override
  void dispose() {
    if (_ownController) _controller.dispose();
    super.dispose();
  }

  bool get _isDisabled =>
      widget.status == USpaceTextFieldStatus.disabled || !widget.enabled;

  bool get _isNonEditable =>
      widget.status == USpaceTextFieldStatus.nonEditable;

  bool get _isError =>
      widget.status == USpaceTextFieldStatus.error ||
      widget.status == USpaceTextFieldStatus.errorActive;

  bool get _hasBorder =>
      widget.status == USpaceTextFieldStatus.active ||
      widget.status == USpaceTextFieldStatus.typing ||
      widget.status == USpaceTextFieldStatus.errorActive;

  Color _borderColor(USpaceColorsExtension colors) {
    if (widget.status == USpaceTextFieldStatus.errorActive) {
      return colors.inputBorderError;
    }
    return colors.inputBorderActive;
  }

  Color _textColor(USpaceColorsExtension colors) {
    if (_isDisabled) return colors.inputTextDisabled;
    if (_isNonEditable) return colors.inputTextDisabled;
    return colors.inputText;
  }

  Color _hintColor(USpaceColorsExtension colors) {
    if (_isError) return colors.inputTextError;
    return colors.textSecondary;
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // ── Label ──
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: typo.bodyS.copyWith(color: colors.inputText),
          ),
          const SizedBox(height: 4),
        ],

        // ── Input Container ──
        Container(
          height: 48,
          decoration: BoxDecoration(
            color: colors.inputBgDefault,
            borderRadius: BorderRadius.circular(USpaceRadius.full),
            border: _hasBorder
                ? Border.all(
                    color: _borderColor(colors),
                    width: 2,
                  )
                : null,
          ),
          child: Row(
            children: [
              const SizedBox(width: 20),

              // ── Input ──
              Expanded(
                child: TextField(
                  controller: _controller,
                  enabled: !_isDisabled && !_isNonEditable,
                  onChanged: widget.onChanged,
                  onSubmitted: widget.onSubmitted,
                  style: typo.bodyM.copyWith(color: _textColor(colors)),
                  cursorColor: colors.contentAccent,
                  cursorWidth: 2,
                  cursorHeight: 24,
                  decoration: InputDecoration(
                    hintText: widget.placeholder,
                    hintStyle: typo.bodyM.copyWith(
                      color: colors.inputTextPlaceholder,
                    ),
                    border: InputBorder.none,
                    isDense: true,
                    contentPadding: EdgeInsets.zero,
                  ),
                ),
              ),

              // ── Function Area ──
              if (_isError) ...[
                Icon(
                  Icons.error_outline,
                  size: 20,
                  color: colors.contentError,
                ),
                const SizedBox(width: 8),
              ],

              if (widget.status == USpaceTextFieldStatus.complete ||
                  widget.status == USpaceTextFieldStatus.typing) ...[
                GestureDetector(
                  onTap: _isDisabled ? null : () => _controller.clear(),
                  child: Icon(
                    Icons.cancel,
                    size: 20,
                    color: colors.contentSecondary,
                  ),
                ),
                const SizedBox(width: 8),
              ],

              if (widget.showButton) ...[
                USpaceButton(
                  label: widget.buttonLabel,
                  level: USpaceButtonLevel.primary,
                  size: USpaceButtonSize.small,
                  onPressed: _isDisabled ? null : widget.onButtonPressed,
                ),
                const SizedBox(width: 4),
              ] else ...[
                const SizedBox(width: 20),
              ],
            ],
          ),
        ),

        // ── Hint ──
        if (widget.hint != null) ...[
          const SizedBox(height: 4),
          Text(
            widget.hint!,
            style: typo.sfBodyS.copyWith(color: _hintColor(colors)),
          ),
        ],
      ],
    );
  }
}
