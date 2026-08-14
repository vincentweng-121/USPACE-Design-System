import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── DropdownMenu Status ───────────────────────────────────────
enum USpaceDropdownMenuStatus {
  /// 尚未選取，顯示 placeholder
  defaultStatus,

  /// 已選取，顯示選取值
  complete,

  /// 選單展開中，唯一有邊框的狀態
  selecting,

  /// 必填未填：維持 placeholder 並顯示紅字提示
  incomplete,

  /// 已選取但值不合法：顯示紅字提示
  error,

  /// 唯讀，不可展開
  nonEditable,
}

// ── USpaceDropdownMenu ────────────────────────────────────────
/// USPACE Design System DropdownMenu component.
///
/// 來源：Figma node 2141:11030
///
/// 支援 6 種狀態：Default / Complete / Selecting / Incomplete / Error / NonEditable
///
/// Layout（Figma node 2141:11029 的子節點座標）:
/// - 觸發器 height: 48px, borderRadius: 1000 (StadiumBorder)
/// - padding: horizontal 20px
/// - Label 與觸發器間距 4px，觸發器與 Hint 間距 4px，兩者左右內距 8px
/// - Trailing: 16px ChevronDown icon
/// - 下拉面板 borderRadius: 20px, padding: 16px 20px, gap: 8px
///   （面板不在該 Figma node 內，沿用既有實作，尚未比對）
///
/// Token mapping（逐一比對 Figma 2141:11030 的六個 status）:
/// - background: inputBgDefault（六種狀態相同）
/// - label text: inputText，字體 labelS (12/16)
/// - content text: 依 status——placeholder 系為 inputTextPlaceholder、
///   已選取為 inputText、nonEditable 為 inputTextDisabled，字體 labelM (14/20)
/// - border: 只有 selecting 有，為 inputBorderActive
/// - hint: 只有 incomplete 與 error 有，為 inputTextError，字體 sfCaptionS (14/16)
/// - chevron icon: contentTertiary（Figma SVG 為 #323237 @ 15%）
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
        widget.status == USpaceDropdownMenuStatus.error ||
        widget.status == USpaceDropdownMenuStatus.nonEditable) {
      return;
    }

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

  /// 顯示 placeholder 而非選取值的狀態。
  /// 由 status 決定而不是「有沒有值」——incomplete 的語意就是必填未填。
  bool get _showsPlaceholder =>
      widget.status == USpaceDropdownMenuStatus.defaultStatus ||
      widget.status == USpaceDropdownMenuStatus.incomplete;

  /// 內容文字色。六個狀態只分三種。
  Color _contentColor(USpaceColorsExtension colors) {
    if (widget.status == USpaceDropdownMenuStatus.nonEditable) {
      return colors.inputTextDisabled;
    }
    return _showsPlaceholder ? colors.inputTextPlaceholder : colors.inputText;
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
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(left: USpaceSpacing.spacer8, right: USpaceSpacing.spacer8, bottom: USpaceSpacing.spacer4),
            child: Text(
              widget.label!,
              style: typo.labelS.copyWith(color: colors.inputText),
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
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.margin),
              decoration: BoxDecoration(
                color: colors.inputBgDefault,
                borderRadius: BorderRadius.circular(USpaceRadius.full),
                // 只有展開中畫邊框，其餘狀態靠底色與頁面背景區隔
                border: widget.status == USpaceDropdownMenuStatus.selecting
                    ? Border.all(color: colors.inputBorderActive)
                    : null,
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      !_showsPlaceholder && _hasSelection
                          ? widget.itemLabelBuilder(widget.selectedItem as T)
                          : widget.placeholder,
                      style: typo.labelM.copyWith(color: _contentColor(colors)),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                  ),
                  const SizedBox(width: USpaceSpacing.spacer8),
                  Icon(
                    Icons.keyboard_arrow_down,
                    size: 16,
                    color: colors.contentTertiary,
                  ),
                ],
              ),
            ),
          ),
        ),

        // ── Hint ──
        if ((widget.showHint && widget.hint != null) || _isError)
          Padding(
            padding: const EdgeInsets.only(left: USpaceSpacing.spacer8, right: USpaceSpacing.spacer8, top: USpaceSpacing.spacer4),
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

  Widget _buildDropdownPanel(USpaceColorsExtension colors, AppTypographyExtension typo) {
    final renderBox =
        _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox == null) return const SizedBox.shrink();

    final offset = renderBox.localToGlobal(Offset.zero);
    final triggerSize = renderBox.size;

    return Positioned(
      left: offset.dx,
      top: offset.dy + triggerSize.height + USpaceSpacing.spacer4,
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
                horizontal: USpaceSpacing.margin,
                vertical: USpaceSpacing.spacer16,
              ),
              shrinkWrap: true,
              itemCount: widget.items.length,
              separatorBuilder: (_, __) => const SizedBox(height: USpaceSpacing.spacer8),
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
