import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── DropdownMenu Status ───────────────────────────────────────
enum USpaceDropdownMenuStatus {
  defaultStatus,
  complete,
  selecting,
  incomplete,
  error,
}

// ── USpaceDropdownMenu ────────────────────────────────────────
/// USPACE Design System DropdownMenu component.
///
/// 來源：Figma node 2141:11030
///
/// 支援 5 種狀態：Default / Complete / Selecting / Incomplete / Error
///
/// Layout:
/// - 觸發器 height: 48px, borderRadius: 1000 (StadiumBorder)
/// - padding: horizontal 20px
/// - 下拉面板 borderRadius: 20px, padding: 16px 20px, gap: 8px
/// - Trailing: 16px ChevronDown icon
///
/// Token mapping:
/// - background: inputBgDefault
/// - label text: inputText (bodyS / 12px)
/// - input text: inputText (bodyM / 14px)
/// - placeholder: inputTextPlaceholder (bodyM / 14px)
/// - hint (normal): textSecondary (sfCaptionS / 14px)
/// - hint (error): inputTextError (sfCaptionS / 14px)
/// - chevron icon: contentSecondary
class USpaceDropdownMenu<T> extends StatefulWidget {
  const USpaceDropdownMenu({
    super.key,
    this.label,
    this.placeholder = 'Placeholder',
    this.hint,
    this.showHint = false,
    required this.items,
    required this.itemLabelBuilder,
    this.selectedItem,
    this.onChanged,
    this.status = USpaceDropdownMenuStatus.defaultStatus,
  });

  /// 上方標籤文字
  final String? label;

  /// 未選取時的提示文字
  final String placeholder;

  /// 下方說明或錯誤文字
  final String? hint;

  /// 是否顯示 hint
  final bool showHint;

  /// 下拉選項列表
  final List<T> items;

  /// 將選項轉為顯示文字
  final String Function(T item) itemLabelBuilder;

  /// 目前選取的項目
  final T? selectedItem;

  /// 選取變更回呼
  final ValueChanged<T>? onChanged;

  /// 當前狀態
  final USpaceDropdownMenuStatus status;

  @override
  State<USpaceDropdownMenu<T>> createState() => _USpaceDropdownMenuState<T>();
}

class _USpaceDropdownMenuState<T> extends State<USpaceDropdownMenu<T>> {
  bool _isOpen = false;
  final _overlayController = OverlayPortalController();
  final _triggerKey = GlobalKey();

  void _toggle() {
    if (widget.status == USpaceDropdownMenuStatus.incomplete ||
        widget.status == USpaceDropdownMenuStatus.error) return;

    setState(() {
      _isOpen = !_isOpen;
      if (_isOpen) {
        _overlayController.show();
      } else {
        _overlayController.hide();
      }
    });
  }

  void _select(T item) {
    widget.onChanged?.call(item);
    setState(() {
      _isOpen = false;
      _overlayController.hide();
    });
  }

  bool get _isError =>
      widget.status == USpaceDropdownMenuStatus.error ||
      widget.status == USpaceDropdownMenuStatus.incomplete;

  bool get _hasSelection => widget.selectedItem != null;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // ── Label ──
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(left: 8, right: 8, bottom: 4),
            child: Text(
              widget.label!,
              style: typo.bodyS.copyWith(color: colors.inputText),
            ),
          ),

        // ── Trigger ──
        OverlayPortal(
          controller: _overlayController,
          overlayChildBuilder: (context) => _buildDropdownPanel(colors, typo),
          child: GestureDetector(
            key: _triggerKey,
            onTap: _toggle,
            child: Container(
              height: 48,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              decoration: BoxDecoration(
                color: colors.inputBgDefault,
                borderRadius: BorderRadius.circular(USpaceRadius.full),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      _hasSelection
                          ? widget.itemLabelBuilder(widget.selectedItem as T)
                          : widget.placeholder,
                      style: typo.bodyM.copyWith(
                        color: _hasSelection
                            ? colors.inputText
                            : colors.inputTextPlaceholder,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Icon(
                    Icons.keyboard_arrow_down,
                    size: 16,
                    color: colors.contentSecondary,
                  ),
                ],
              ),
            ),
          ),
        ),

        // ── Hint ──
        if (widget.showHint && widget.hint != null || _isError)
          Padding(
            padding: const EdgeInsets.only(left: 8, right: 8, top: 4),
            child: Text(
              _isError ? (widget.hint ?? 'Hint') : widget.hint!,
              style: typo.sfCaptionS.copyWith(
                color: _isError
                    ? colors.inputTextError
                    : colors.textSecondary,
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildDropdownPanel(USpaceColorsExtension colors, dynamic typo) {
    final renderBox =
        _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox == null) return const SizedBox.shrink();

    final offset = renderBox.localToGlobal(Offset.zero);
    final triggerSize = renderBox.size;

    return Positioned(
      left: offset.dx,
      top: offset.dy + triggerSize.height + 4,
      width: triggerSize.width,
      child: Material(
        color: colors.inputBgDefault,
        borderRadius: BorderRadius.circular(USpaceRadius.medium),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxHeight: 200),
          child: Scrollbar(
            thumbVisibility: true,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 16,
              ),
              shrinkWrap: true,
              itemCount: widget.items.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, index) {
                final item = widget.items[index];
                return GestureDetector(
                  onTap: () => _select(item),
                  child: SizedBox(
                    height: 20,
                    child: Text(
                      widget.itemLabelBuilder(item),
                      style: typo.bodyM.copyWith(color: colors.inputText),
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
