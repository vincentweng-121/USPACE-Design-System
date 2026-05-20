import 'package:flutter/material.dart';
import 'uspace_palette.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── TextArea Status ──────────────────────────────────────────
enum USpaceTextAreaStatus {
  defaultStatus,
  active,
  typing,
  complete,
  disabled,
  error,
  incomplete,
  nonEditable,
}

// ── USpaceTextArea ───────────────────────────────────────────
/// USPACE Design System TextArea component.
///
/// 來源：Figma node 634:8456
///
/// 支援 8 種狀態：Default / Active / Typing / Complete /
///   Disabled / Error / Incomplete / Non-editable
///
/// Layout:
/// - height: 144px
/// - borderRadius: 20px (Number/20)
/// - padding: horizontal 20px, vertical 16px
/// - Active / Typing border: 2px inputBorderActive
/// - Error border: 2px inputBorderActive (green, NOT red)
///
/// 與 TextField 的差異：
/// - 多行輸入，高度 144px（vs TextField 48px 單行）
/// - borderRadius 20px（vs TextField StadiumBorder 1000）
/// - Error 狀態邊框仍為 inputBorderActive（綠色），非紅色
/// - Complete / Disabled 文字為 labelL 16px/24px
class USpaceTextArea extends StatefulWidget {
  const USpaceTextArea({
    super.key,
    this.label,
    this.placeholder,
    this.hint,
    this.status = USpaceTextAreaStatus.defaultStatus,
    this.showLabel = true,
    this.showHint = true,
    this.controller,
    this.onChanged,
    this.enabled = true,
  });

  /// 上方標籤文字（labelS 12px/16px, inputText token）
  final String? label;

  /// 空白時顯示的提示文字（labelM 14px/20px, inputTextPlaceholder token）
  final String? placeholder;

  /// 下方說明或錯誤文字（labelS 12px/16px）
  ///   正常：textSecondary token
  ///   Error/Incomplete：inputTextError token
  ///   Disabled：textDisabled token
  final String? hint;

  /// 當前狀態
  final USpaceTextAreaStatus status;

  /// 是否顯示上方 label
  final bool showLabel;

  /// 是否顯示下方 hint
  final bool showHint;

  /// 文字控制器
  final TextEditingController? controller;

  /// 文字變更回呼
  final ValueChanged<String>? onChanged;

  /// 是否可互動
  final bool enabled;

  @override
  State<USpaceTextArea> createState() => _USpaceTextAreaState();
}

class _USpaceTextAreaState extends State<USpaceTextArea> {
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
      widget.status == USpaceTextAreaStatus.disabled || !widget.enabled;

  bool get _isNonEditable =>
      widget.status == USpaceTextAreaStatus.nonEditable;

  bool get _isError =>
      widget.status == USpaceTextAreaStatus.error;

  bool get _isIncomplete =>
      widget.status == USpaceTextAreaStatus.incomplete;

  bool get _hasBorder =>
      widget.status == USpaceTextAreaStatus.active ||
      widget.status == USpaceTextAreaStatus.typing ||
      widget.status == USpaceTextAreaStatus.error;

  bool get _showDeleteIcon =>
      widget.status == USpaceTextAreaStatus.error ||
      widget.status == USpaceTextAreaStatus.typing ||
      widget.status == USpaceTextAreaStatus.complete;

  Color _textColor(USpaceColorsExtension colors) {
    if (_isDisabled) return colors.inputTextDisabled;
    if (_isNonEditable) return colors.inputTextDisabled;
    return colors.inputText;
  }

  TextStyle _inputStyle(AppTypographyExtension typo) {
    // Complete / Disabled use labelL (16px/24px)
    if (widget.status == USpaceTextAreaStatus.complete ||
        widget.status == USpaceTextAreaStatus.disabled) {
      return typo.labelL;
    }
    // Others use labelM (14px/20px)
    return typo.labelM;
  }

  Color _hintTextColor(USpaceColorsExtension colors) {
    if (_isDisabled) return colors.textDisabled;
    if (_isError || _isIncomplete) return colors.inputTextError;
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
        if (widget.showLabel && widget.label != null) ...[
          Padding(
            padding: const EdgeInsets.only(left: USpaceSpacing.spacer8),
            child: Text(
              widget.label!,
              style: typo.labelS.copyWith(
                color: _isDisabled
                    ? colors.inputTextDisabled
                    : colors.inputText,
              ),
            ),
          ),
          const SizedBox(height: USpaceSpacing.spacer4),
        ],

        // ── Input Container ──
        Container(
          height: 144,
          decoration: BoxDecoration(
            color: colors.inputBgDefault,
            borderRadius: BorderRadius.circular(USpaceRadius.medium),
            border: _hasBorder
                ? Border.all(
                    color: colors.inputBorderActive,
                    width: 2,
                  )
                : null,
          ),
          padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.margin, vertical: USpaceSpacing.spacer16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ── Text Input ──
              Expanded(
                child: TextField(
                  controller: _controller,
                  enabled: !_isDisabled && !_isNonEditable,
                  onChanged: widget.onChanged,
                  maxLines: null,
                  expands: true,
                  textAlignVertical: TextAlignVertical.top,
                  style: _inputStyle(typo).copyWith(
                    color: _textColor(colors),
                  ),
                  cursorColor: colors.contentAccent,
                  cursorWidth: 2,
                  cursorHeight: 24,
                  decoration: InputDecoration(
                    hintText: widget.placeholder,
                    hintStyle: typo.labelM.copyWith(
                      color: colors.inputTextPlaceholder,
                    ),
                    border: InputBorder.none,
                    isDense: true,
                    contentPadding: EdgeInsets.zero,
                  ),
                ),
              ),

              // ── Delete icon ──
              if (_showDeleteIcon) ...[
                const SizedBox(width: USpaceSpacing.spacer8),
                GestureDetector(
                  onTap: _isDisabled ? null : () => _controller.clear(),
                  child: Icon(
                    Icons.cancel,
                    size: 20,
                    color: colors.contentSecondary,
                  ),
                ),
              ],
            ],
          ),
        ),

        // ── Hint ──
        if (widget.showHint && widget.hint != null) ...[
          const SizedBox(height: USpaceSpacing.spacer4),
          Row(
            children: [
              if (_isError || _isIncomplete) ...[
                Icon(
                  Icons.error_outline,
                  size: 12,
                  color: colors.inputTextError,
                ),
                const SizedBox(width: USpaceSpacing.spacer4),
              ],
              Flexible(
                child: Text(
                  widget.hint!,
                  style: typo.labelS.copyWith(
                    color: _hintTextColor(colors),
                  ),
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }
}
