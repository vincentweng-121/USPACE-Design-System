// Figma Node: 1395:8937 / 964:9246 / 961:9111
// Synced: 2026-05-20

import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// 三種版面各自一個檔案，共用本檔的 library 私有成員。
part 'header_full_page.dart';
part 'header_floating.dart';
part 'header_modal.dart';
part 'header_sections.dart';

// ─── Constants ─────────────────────────────────────────────────
/// Figma variable `--modal-radius` = 24px
/// FloatingPage 頂部圓角，不在 USpaceRadius token 中
const double _modalRadius = 24.0;

/// LeftSection 標題的最大寬度（Figma 固定值）
const double _leftTitleMaxWidth = 310;

/// GrabBar 寬度（Figma 固定值）
const double _grabBarWidth = 40;

// ─── Enums ────────────────────────────────────────────────────

/// Header 的外觀類型，對應 Figma PageTitle component 的 type property
enum USpaceHeaderType {
  fullPage,   // 全版頁面頂部，圓角無
  floating,   // 底部 sheet，圓角 _modalRadius (24px)
  modal,      // 彈窗，圓角 USpaceRadius.medium (20px)
}

/// FloatingPage 的滾動狀態
enum USpaceHeaderStatus {
  defaultStatus, // 標題在 Content 區
  scrolling,     // 標題移入 ActionBar，縮小為 bodyM
}

/// Title 對齊方式
enum USpaceHeaderTitlePlace {
  left,
  center,
}

/// LeftSection 的功能樣式，對應 Figma LeftSection Function property
enum USpaceHeaderLeftFunction {
  fullPageIcon,   // ChevronLeft 24px（h=34 container）
  floatingIcon,   // ChevronLeft 24px（h=24 container）
  title,          // displayM (18px/26px Medium), maxWidth=310
  profileTitle,   // headingL + Semibold (26px/34px w600), maxWidth=310, pl=2
}

/// RightSection 的功能樣式，對應 Figma RightSection Function property
enum USpaceHeaderRightFunction {
  icon24,       // 24px icon (Close etc.), py=3, gap=12
  icon32,       // 32px icon (Message etc.), py=1
  textButton,   // Text button, labelL, textTertiary
}

// ─── USpacePageTitle ──────────────────────────────────────────

/// Header 元件，對應 Figma PageTitle component set（node 1395:8937）。
/// 支援三種 type：fullPage / floating / modal。
///
/// 使用方式：
///   // Full Page Default
///   USpacePageTitle(
///     type: USpaceHeaderType.fullPage,
///     leftFunction: USpaceHeaderLeftFunction.fullPageIcon,
///     title: '標題',
///     showTitle: true,
///   )
///
///   // Floating Center Title + Subtitle
///   USpacePageTitle(
///     type: USpaceHeaderType.floating,
///     titlePlace: USpaceHeaderTitlePlace.center,
///     leftFunction: USpaceHeaderLeftFunction.floatingIcon,
///     title: '標題',
///     subtitle: '副標題',
///     showTitle: true,
///     showSubtitle: true,
///   )
///
///   // Full Page Profile + Message (32px icon)
///   USpacePageTitle(
///     type: USpaceHeaderType.fullPage,
///     leftFunction: USpaceHeaderLeftFunction.profileTitle,
///     rightFunction: USpaceHeaderRightFunction.icon32,
///     title: '使用者名稱',
///     rightLargeIcon: Icon(Icons.chat_bubble_outline, size: 32),
///     showStatusBar: true,
///   )
class USpacePageTitle extends StatelessWidget {
  const USpacePageTitle({
    super.key,
    required this.type,
    this.status = USpaceHeaderStatus.defaultStatus,
    this.titlePlace = USpaceHeaderTitlePlace.left,
    this.leftFunction = USpaceHeaderLeftFunction.fullPageIcon,
    this.rightFunction = USpaceHeaderRightFunction.icon24,
    this.rightIcon,
    this.rightLargeIcon,
    this.rightTextLabel,
    this.showStatusBar = false,
    this.showLeft = true,
    this.showRight = true,
    this.showTitle = true,
    this.showSubtitle = false,
    this.showParagraph = false,
    this.showInfo = false,
    this.showGrabBar = true,
    this.showBreadcrumb = false,
    this.showParkingTitle = false,
    this.showRightInfo = false,
    this.title,
    this.subtitle,
    this.paragraph,
    this.info,
    this.parkingTitle,
    this.firstDrawer,
    this.secondDrawer,
    this.onLeftPressed,
    this.onRightPressed,
  });

  /// Header 類型（必填）
  final USpaceHeaderType type;

  /// FloatingPage 滾動狀態
  final USpaceHeaderStatus status;

  /// Title 對齊方式（FullPage 固定 left，Floating/Modal 可 center）
  final USpaceHeaderTitlePlace titlePlace;

  /// LeftSection 的功能樣式
  final USpaceHeaderLeftFunction leftFunction;

  /// RightSection 的功能樣式
  final USpaceHeaderRightFunction rightFunction;

  /// RightSection 24px 圖示（icon24 模式）
  final Widget? rightIcon;

  /// RightSection 32px 圖示（icon32 模式）
  final Widget? rightLargeIcon;

  /// RightSection 文字（textButton 模式）
  final String? rightTextLabel;

  // ── Visibility booleans ────────────────────────

  /// 顯示 iOS Status Bar placeholder（僅 fullPage 有效）
  final bool showStatusBar;

  /// 顯示 LeftSection
  final bool showLeft;

  /// 顯示 RightSection
  final bool showRight;

  /// 顯示 title 文字
  final bool showTitle;

  /// 顯示 subtitle
  final bool showSubtitle;

  /// 顯示 paragraph
  final bool showParagraph;

  /// 顯示 Accent Info（僅 floating Center Title）
  final bool showInfo;

  /// 顯示 GrabBar（僅 floating）
  final bool showGrabBar;

  /// 顯示 Breadcrumb（僅 fullPage）
  final bool showBreadcrumb;

  /// 顯示 ParkingTitle（僅 floating，displayM 在 title 上方）
  final bool showParkingTitle;

  /// 顯示 RightSection Info icon（僅 icon24 模式）
  final bool showRightInfo;

  // ── Content strings ────────────────────────────

  final String? title;
  final String? subtitle;
  final String? paragraph;

  /// Accent Info 文字（floating 專用）
  final String? info;

  /// ParkingTitle 文字（floating 專用，displayM）
  final String? parkingTitle;

  /// Breadcrumb 第一層（fullPage 專用）
  final String? firstDrawer;

  /// Breadcrumb 第二層（fullPage 專用）
  final String? secondDrawer;

  /// LeftSection icon 點擊回調
  final VoidCallback? onLeftPressed;

  /// RightSection 點擊回調
  final VoidCallback? onRightPressed;


  // ─────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    return switch (type) {
      USpaceHeaderType.fullPage => _FullPageHeader(this),
      USpaceHeaderType.floating => status == USpaceHeaderStatus.scrolling
          ? _FloatingScrollingHeader(this)
          : _FloatingHeader(this),
      USpaceHeaderType.modal => _ModalHeaderLayout(this),
    };
  }
}
