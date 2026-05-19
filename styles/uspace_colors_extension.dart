import 'package:flutter/material.dart';
import 'uspace_palette.dart';

/// USPACE Semantic Color Tokens
class USpaceColorsExtension extends ThemeExtension<USpaceColorsExtension> {
  const USpaceColorsExtension({
    // ─── Content ──────────────────────────────────
    required this.contentAccent,
    required this.contentPrimary,
    required this.contentSecondary,
    required this.contentTertiary,
    required this.contentDisabled,
    required this.contentDisabledWithoutBg,
    required this.contentError,
    required this.contentInverse,
    required this.contentUC,
    required this.contentUW,
    // ─── Text ─────────────────────────────────────
    required this.textAccent,
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textDisabled,
    required this.textDisabledMuted,
    required this.textError,
    required this.textInverse,
    required this.textWarning,
    // ─── Background ───────────────────────────────
    required this.pagePrimary,
    required this.pageSecondary,
    required this.pageMask,
    required this.pagePopup,
    required this.sectionPrimary,
    required this.sectionSecondary,
    required this.sectionAccent,
    required this.sectionError,
    // ─── Border ───────────────────────────────────
    required this.borderDivider,
    // ─── Action ───────────────────────────────────
    required this.actionPrimaryBg,
    required this.actionPrimaryContentAccent,
    required this.actionPrimaryContentCharging,
    required this.actionPrimaryContent,
    required this.actionSecondaryBg,
    required this.actionSecondaryContent,
    required this.actionTertiaryBg,
    required this.actionTertiaryContent,
    required this.actionDisabledBg,
    required this.actionDisabledContent,
    required this.actionOutlineBg,
    required this.actionOutlineContent,
    required this.actionFabBg,
    required this.actionFabContent,
    required this.actionFabSelected,
    required this.actionFabOpacityBg,
    required this.actionGraphicBg,
    required this.actionGraphicContent,
    // ─── Input ────────────────────────────────────
    required this.inputBgDefault,
    required this.inputBorderActive,
    required this.inputBorderError,
    required this.inputText,
    required this.inputTextError,
    required this.inputTextPlaceholder,
    required this.inputTextDisabled,
    // ─── Chip ─────────────────────────────────────
    required this.chipBgPrimary,
    required this.chipBgSecondary,
    required this.chipBgAccent,
    // ─── Project ──────────────────────────────────
    required this.projectCharging,
    required this.projectGoldenCard,
    required this.projectBlackCard,
    required this.projectPlatinumCard,
    required this.projectGreenCard,
    required this.projectUspaceBlack,
    required this.projectUspaceWhite,
  });

  // ─── Content ──────────────────────────────────
  final Color contentAccent;
  final Color contentPrimary;
  final Color contentSecondary;
  final Color contentTertiary;
  final Color contentDisabled;
  final Color contentDisabledWithoutBg;
  final Color contentError;
  final Color contentInverse;
  final Color contentUC;
  final Color contentUW;

  // ─── Text ─────────────────────────────────────
  final Color textAccent;
  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color textDisabled;
  final Color textDisabledMuted;
  final Color textError;
  final Color textInverse;
  final Color textWarning;

  // ─── Background ───────────────────────────────
  final Color pagePrimary;
  final Color pageSecondary;
  final Color pageMask;
  final Color pagePopup;
  final Color sectionPrimary;
  final Color sectionSecondary;
  final Color sectionAccent;
  final Color sectionError;

  // ─── Border ───────────────────────────────────
  final Color borderDivider;

  // ─── Action ───────────────────────────────────
  final Color actionPrimaryBg;
  final Color actionPrimaryContentAccent;
  final Color actionPrimaryContentCharging;
  final Color actionPrimaryContent;
  final Color actionSecondaryBg;
  final Color actionSecondaryContent;
  final Color actionTertiaryBg;
  final Color actionTertiaryContent;
  final Color actionDisabledBg;
  final Color actionDisabledContent;
  final Color actionOutlineBg;
  final Color actionOutlineContent;
  final Color actionFabBg;
  final Color actionFabContent;
  final Color actionFabSelected;
  final Color actionFabOpacityBg;
  final Color actionGraphicBg;
  final Color actionGraphicContent;

  // ─── Input ────────────────────────────────────
  final Color inputBgDefault;
  final Color inputBorderActive;
  final Color inputBorderError;
  final Color inputText;
  final Color inputTextError;
  final Color inputTextPlaceholder;
  final Color inputTextDisabled;

  // ─── Chip ─────────────────────────────────────
  final Color chipBgPrimary;
  final Color chipBgSecondary;
  final Color chipBgAccent;

  // ─── Project ──────────────────────────────────
  final Color projectCharging;
  final Color projectGoldenCard;
  final Color projectBlackCard;
  final Color projectPlatinumCard;
  final Color projectGreenCard;
  final Color projectUspaceBlack;
  final Color projectUspaceWhite;

  // ─── Gradient tokens (static, not theme-switchable) ──
  static const actionCustomizedBorder = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [USpacePalette.grey600, USpacePalette.grey200],
  );

  // ─── Light Theme ────────────────────────────────
  static const light = USpaceColorsExtension(
    // Content
    contentAccent:            USpacePalette.neonLime600,
    contentPrimary:           USpacePalette.grey800,
    contentSecondary:         USpacePalette.grey600,
    contentTertiary:          USpacePalette.transparentGrey80015,
    contentDisabled:          USpacePalette.grey400,
    contentDisabledWithoutBg: USpacePalette.grey200,
    contentError:             USpacePalette.red400,
    contentInverse:           USpacePalette.white,
    contentUC:                USpacePalette.neonLime400,
    contentUW:                USpacePalette.neonLime200,
    // Text
    textAccent:        USpacePalette.neonLime800,
    textPrimary:       USpacePalette.grey800,
    textSecondary:     USpacePalette.grey600,
    textTertiary:      USpacePalette.grey400,
    textDisabled:      USpacePalette.grey400,
    textDisabledMuted: USpacePalette.grey200,
    textError:         USpacePalette.red500,
    textInverse:       USpacePalette.white,
    textWarning:       USpacePalette.red300,
    // Background
    pagePrimary:      USpacePalette.white,
    pageSecondary:    USpacePalette.grey50,
    pageMask:         USpacePalette.transparentBlack40,
    pagePopup:        USpacePalette.transparentWhite80,
    sectionPrimary:   USpacePalette.white,
    sectionSecondary: USpacePalette.grey50,
    sectionAccent:    USpacePalette.neonLime600,
    sectionError:     USpacePalette.red500,
    // Border
    borderDivider: USpacePalette.transparentGrey8003,
    // Action
    actionPrimaryBg:              USpacePalette.grey800,
    actionPrimaryContentAccent:   USpacePalette.neonLime600,
    actionPrimaryContentCharging: USpacePalette.neonLime400,
    actionPrimaryContent:         USpacePalette.grey200,
    actionSecondaryBg:            USpacePalette.grey300,
    actionSecondaryContent:       USpacePalette.grey800,
    actionTertiaryBg:             USpacePalette.grey100,
    actionTertiaryContent:        USpacePalette.grey800,
    actionDisabledBg:             USpacePalette.grey100,
    actionDisabledContent:        USpacePalette.grey200,
    actionOutlineBg:              USpacePalette.white,
    actionOutlineContent:         USpacePalette.grey600,
    actionFabBg:                  USpacePalette.transparentWhite70,
    actionFabContent:             USpacePalette.grey800,
    actionFabSelected:            USpacePalette.transparentGrey20020,
    actionFabOpacityBg:           USpacePalette.transparentWhite10,
    actionGraphicBg:              USpacePalette.grey200,
    actionGraphicContent:         USpacePalette.grey400,
    // Input
    inputBgDefault:       USpacePalette.white,
    inputBorderActive:    USpacePalette.neonLime600,
    inputBorderError:     USpacePalette.red500,
    inputText:            USpacePalette.grey800,
    inputTextError:       USpacePalette.red500,
    inputTextPlaceholder: USpacePalette.grey200,
    inputTextDisabled:    USpacePalette.grey200,
    // Chip
    chipBgPrimary:   USpacePalette.white,
    chipBgSecondary: USpacePalette.grey100,
    chipBgAccent:    USpacePalette.neonLime600,
    // Project
    projectCharging:     USpacePalette.neonLime400,
    projectGoldenCard:   USpacePalette.yellow400,
    projectBlackCard:    USpacePalette.grey800,
    projectPlatinumCard: USpacePalette.grey300,
    projectGreenCard:    USpacePalette.neonLime900,
    projectUspaceBlack:  USpacePalette.black,
    projectUspaceWhite:  USpacePalette.white,
  );

  // ─── Dark Theme ─────────────────────────────────
  static const dark = USpaceColorsExtension(
    // Content
    contentAccent:            USpacePalette.neonLime600,
    contentPrimary:           USpacePalette.white,
    contentSecondary:         USpacePalette.grey100,
    contentTertiary:          USpacePalette.grey800,
    contentDisabled:          USpacePalette.grey500,
    contentDisabledWithoutBg: USpacePalette.white,
    contentError:             USpacePalette.red400,
    contentInverse:           USpacePalette.grey800,
    contentUC:                USpacePalette.grey800,
    contentUW:                USpacePalette.grey800,
    // Text
    textAccent:        USpacePalette.neonLime600,
    textPrimary:       USpacePalette.white,
    textSecondary:     USpacePalette.grey200,
    textTertiary:      USpacePalette.grey500,
    textDisabled:      USpacePalette.grey500,
    textDisabledMuted: USpacePalette.grey500,
    textError:         USpacePalette.red500,
    textInverse:       USpacePalette.grey800,
    textWarning:       USpacePalette.white,
    // Background
    pagePrimary:      USpacePalette.black,
    pageSecondary:    USpacePalette.grey900,
    pageMask:         USpacePalette.transparentWhite5,
    pagePopup:        USpacePalette.transparentWhite10,
    sectionPrimary:   USpacePalette.black,
    sectionSecondary: USpacePalette.grey900,
    sectionAccent:    USpacePalette.neonLime600,
    sectionError:     USpacePalette.white,
    // Border
    borderDivider: USpacePalette.grey800,
    // Action
    actionPrimaryBg:              USpacePalette.grey700,
    actionPrimaryContentAccent:   USpacePalette.neonLime600,
    actionPrimaryContentCharging: USpacePalette.neonLime400,
    actionPrimaryContent:         USpacePalette.white,
    actionSecondaryBg:            USpacePalette.grey800,
    actionSecondaryContent:       USpacePalette.white,
    actionTertiaryBg:             USpacePalette.grey800,
    actionTertiaryContent:        USpacePalette.grey600,
    actionDisabledBg:             USpacePalette.white,
    actionDisabledContent:        USpacePalette.white,
    actionOutlineBg:              USpacePalette.grey800,
    actionOutlineContent:         USpacePalette.white,
    actionFabBg:                  USpacePalette.transparentWhite10,
    actionFabContent:             USpacePalette.grey500,
    actionFabSelected:            USpacePalette.white,
    actionFabOpacityBg:           USpacePalette.white,
    actionGraphicBg:              USpacePalette.white,
    actionGraphicContent:         USpacePalette.white,
    // Input
    inputBgDefault:       USpacePalette.white,
    inputBorderActive:    USpacePalette.white,
    inputBorderError:     USpacePalette.white,
    inputText:            USpacePalette.white,
    inputTextError:       USpacePalette.white,
    inputTextPlaceholder: USpacePalette.white,
    inputTextDisabled:    USpacePalette.white,
    // Chip
    chipBgPrimary:   USpacePalette.neonLime600,
    chipBgSecondary: USpacePalette.white,
    chipBgAccent:    USpacePalette.white,
    // Project
    projectCharging:     USpacePalette.white,
    projectGoldenCard:   USpacePalette.white,
    projectBlackCard:    USpacePalette.white,
    projectPlatinumCard: USpacePalette.white,
    projectGreenCard:    USpacePalette.white,
    projectUspaceBlack:  USpacePalette.white,
    projectUspaceWhite:  USpacePalette.white,
  );

  @override
  USpaceColorsExtension copyWith({
    // Content
    Color? contentAccent,
    Color? contentPrimary,
    Color? contentSecondary,
    Color? contentTertiary,
    Color? contentDisabled,
    Color? contentDisabledWithoutBg,
    Color? contentError,
    Color? contentInverse,
    Color? contentUC,
    Color? contentUW,
    // Text
    Color? textAccent,
    Color? textPrimary,
    Color? textSecondary,
    Color? textTertiary,
    Color? textDisabled,
    Color? textDisabledMuted,
    Color? textError,
    Color? textInverse,
    Color? textWarning,
    // Background
    Color? pagePrimary,
    Color? pageSecondary,
    Color? pageMask,
    Color? pagePopup,
    Color? sectionPrimary,
    Color? sectionSecondary,
    Color? sectionAccent,
    Color? sectionError,
    // Border
    Color? borderDivider,
    // Action
    Color? actionPrimaryBg,
    Color? actionPrimaryContentAccent,
    Color? actionPrimaryContentCharging,
    Color? actionPrimaryContent,
    Color? actionSecondaryBg,
    Color? actionSecondaryContent,
    Color? actionTertiaryBg,
    Color? actionTertiaryContent,
    Color? actionDisabledBg,
    Color? actionDisabledContent,
    Color? actionOutlineBg,
    Color? actionOutlineContent,
    Color? actionFabBg,
    Color? actionFabContent,
    Color? actionFabSelected,
    Color? actionFabOpacityBg,
    Color? actionGraphicBg,
    Color? actionGraphicContent,
    // Input
    Color? inputBgDefault,
    Color? inputBorderActive,
    Color? inputBorderError,
    Color? inputText,
    Color? inputTextError,
    Color? inputTextPlaceholder,
    Color? inputTextDisabled,
    // Chip
    Color? chipBgPrimary,
    Color? chipBgSecondary,
    Color? chipBgAccent,
    // Project
    Color? projectCharging,
    Color? projectGoldenCard,
    Color? projectBlackCard,
    Color? projectPlatinumCard,
    Color? projectGreenCard,
    Color? projectUspaceBlack,
    Color? projectUspaceWhite,
  }) {
    return USpaceColorsExtension(
      // Content
      contentAccent:            contentAccent            ?? this.contentAccent,
      contentPrimary:           contentPrimary           ?? this.contentPrimary,
      contentSecondary:         contentSecondary         ?? this.contentSecondary,
      contentTertiary:          contentTertiary          ?? this.contentTertiary,
      contentDisabled:          contentDisabled          ?? this.contentDisabled,
      contentDisabledWithoutBg: contentDisabledWithoutBg ?? this.contentDisabledWithoutBg,
      contentError:             contentError             ?? this.contentError,
      contentInverse:           contentInverse           ?? this.contentInverse,
      contentUC:                contentUC                ?? this.contentUC,
      contentUW:                contentUW                ?? this.contentUW,
      // Text
      textAccent:        textAccent        ?? this.textAccent,
      textPrimary:       textPrimary       ?? this.textPrimary,
      textSecondary:     textSecondary     ?? this.textSecondary,
      textTertiary:      textTertiary      ?? this.textTertiary,
      textDisabled:      textDisabled      ?? this.textDisabled,
      textDisabledMuted: textDisabledMuted ?? this.textDisabledMuted,
      textError:         textError         ?? this.textError,
      textInverse:       textInverse       ?? this.textInverse,
      textWarning:       textWarning       ?? this.textWarning,
      // Background
      pagePrimary:      pagePrimary      ?? this.pagePrimary,
      pageSecondary:    pageSecondary    ?? this.pageSecondary,
      pageMask:         pageMask         ?? this.pageMask,
      pagePopup:        pagePopup        ?? this.pagePopup,
      sectionPrimary:   sectionPrimary   ?? this.sectionPrimary,
      sectionSecondary: sectionSecondary ?? this.sectionSecondary,
      sectionAccent:    sectionAccent    ?? this.sectionAccent,
      sectionError:     sectionError     ?? this.sectionError,
      // Border
      borderDivider: borderDivider ?? this.borderDivider,
      // Action
      actionPrimaryBg:              actionPrimaryBg              ?? this.actionPrimaryBg,
      actionPrimaryContentAccent:   actionPrimaryContentAccent   ?? this.actionPrimaryContentAccent,
      actionPrimaryContentCharging: actionPrimaryContentCharging ?? this.actionPrimaryContentCharging,
      actionPrimaryContent:         actionPrimaryContent         ?? this.actionPrimaryContent,
      actionSecondaryBg:            actionSecondaryBg            ?? this.actionSecondaryBg,
      actionSecondaryContent:       actionSecondaryContent       ?? this.actionSecondaryContent,
      actionTertiaryBg:             actionTertiaryBg             ?? this.actionTertiaryBg,
      actionTertiaryContent:        actionTertiaryContent        ?? this.actionTertiaryContent,
      actionDisabledBg:             actionDisabledBg             ?? this.actionDisabledBg,
      actionDisabledContent:        actionDisabledContent        ?? this.actionDisabledContent,
      actionOutlineBg:              actionOutlineBg              ?? this.actionOutlineBg,
      actionOutlineContent:         actionOutlineContent         ?? this.actionOutlineContent,
      actionFabBg:                  actionFabBg                  ?? this.actionFabBg,
      actionFabContent:             actionFabContent             ?? this.actionFabContent,
      actionFabSelected:            actionFabSelected            ?? this.actionFabSelected,
      actionFabOpacityBg:           actionFabOpacityBg           ?? this.actionFabOpacityBg,
      actionGraphicBg:              actionGraphicBg              ?? this.actionGraphicBg,
      actionGraphicContent:         actionGraphicContent         ?? this.actionGraphicContent,
      // Input
      inputBgDefault:       inputBgDefault       ?? this.inputBgDefault,
      inputBorderActive:    inputBorderActive    ?? this.inputBorderActive,
      inputBorderError:     inputBorderError     ?? this.inputBorderError,
      inputText:            inputText            ?? this.inputText,
      inputTextError:       inputTextError       ?? this.inputTextError,
      inputTextPlaceholder: inputTextPlaceholder ?? this.inputTextPlaceholder,
      inputTextDisabled:    inputTextDisabled    ?? this.inputTextDisabled,
      // Chip
      chipBgPrimary:   chipBgPrimary   ?? this.chipBgPrimary,
      chipBgSecondary: chipBgSecondary ?? this.chipBgSecondary,
      chipBgAccent:    chipBgAccent    ?? this.chipBgAccent,
      // Project
      projectCharging:     projectCharging     ?? this.projectCharging,
      projectGoldenCard:   projectGoldenCard   ?? this.projectGoldenCard,
      projectBlackCard:    projectBlackCard    ?? this.projectBlackCard,
      projectPlatinumCard: projectPlatinumCard ?? this.projectPlatinumCard,
      projectGreenCard:    projectGreenCard    ?? this.projectGreenCard,
      projectUspaceBlack:  projectUspaceBlack  ?? this.projectUspaceBlack,
      projectUspaceWhite:  projectUspaceWhite  ?? this.projectUspaceWhite,
    );
  }

  @override
  USpaceColorsExtension lerp(USpaceColorsExtension? other, double t) {
    if (other is! USpaceColorsExtension) return this;
    return USpaceColorsExtension(
      // Content
      contentAccent:            Color.lerp(contentAccent,            other.contentAccent,            t)!,
      contentPrimary:           Color.lerp(contentPrimary,           other.contentPrimary,           t)!,
      contentSecondary:         Color.lerp(contentSecondary,         other.contentSecondary,         t)!,
      contentTertiary:          Color.lerp(contentTertiary,          other.contentTertiary,          t)!,
      contentDisabled:          Color.lerp(contentDisabled,          other.contentDisabled,          t)!,
      contentDisabledWithoutBg: Color.lerp(contentDisabledWithoutBg, other.contentDisabledWithoutBg, t)!,
      contentError:             Color.lerp(contentError,             other.contentError,             t)!,
      contentInverse:           Color.lerp(contentInverse,           other.contentInverse,           t)!,
      contentUC:                Color.lerp(contentUC,                other.contentUC,                t)!,
      contentUW:                Color.lerp(contentUW,                other.contentUW,                t)!,
      // Text
      textAccent:        Color.lerp(textAccent,        other.textAccent,        t)!,
      textPrimary:       Color.lerp(textPrimary,       other.textPrimary,       t)!,
      textSecondary:     Color.lerp(textSecondary,     other.textSecondary,     t)!,
      textTertiary:      Color.lerp(textTertiary,      other.textTertiary,      t)!,
      textDisabled:      Color.lerp(textDisabled,      other.textDisabled,      t)!,
      textDisabledMuted: Color.lerp(textDisabledMuted, other.textDisabledMuted, t)!,
      textError:         Color.lerp(textError,         other.textError,         t)!,
      textInverse:       Color.lerp(textInverse,       other.textInverse,       t)!,
      textWarning:       Color.lerp(textWarning,       other.textWarning,       t)!,
      // Background
      pagePrimary:      Color.lerp(pagePrimary,      other.pagePrimary,      t)!,
      pageSecondary:    Color.lerp(pageSecondary,    other.pageSecondary,    t)!,
      pageMask:         Color.lerp(pageMask,         other.pageMask,         t)!,
      pagePopup:        Color.lerp(pagePopup,        other.pagePopup,        t)!,
      sectionPrimary:   Color.lerp(sectionPrimary,   other.sectionPrimary,   t)!,
      sectionSecondary: Color.lerp(sectionSecondary, other.sectionSecondary, t)!,
      sectionAccent:    Color.lerp(sectionAccent,    other.sectionAccent,    t)!,
      sectionError:     Color.lerp(sectionError,     other.sectionError,     t)!,
      // Border
      borderDivider: Color.lerp(borderDivider, other.borderDivider, t)!,
      // Action
      actionPrimaryBg:              Color.lerp(actionPrimaryBg,              other.actionPrimaryBg,              t)!,
      actionPrimaryContentAccent:   Color.lerp(actionPrimaryContentAccent,   other.actionPrimaryContentAccent,   t)!,
      actionPrimaryContentCharging: Color.lerp(actionPrimaryContentCharging, other.actionPrimaryContentCharging, t)!,
      actionPrimaryContent:         Color.lerp(actionPrimaryContent,         other.actionPrimaryContent,         t)!,
      actionSecondaryBg:            Color.lerp(actionSecondaryBg,            other.actionSecondaryBg,            t)!,
      actionSecondaryContent:       Color.lerp(actionSecondaryContent,       other.actionSecondaryContent,       t)!,
      actionTertiaryBg:             Color.lerp(actionTertiaryBg,             other.actionTertiaryBg,             t)!,
      actionTertiaryContent:        Color.lerp(actionTertiaryContent,        other.actionTertiaryContent,        t)!,
      actionDisabledBg:             Color.lerp(actionDisabledBg,             other.actionDisabledBg,             t)!,
      actionDisabledContent:        Color.lerp(actionDisabledContent,        other.actionDisabledContent,        t)!,
      actionOutlineBg:              Color.lerp(actionOutlineBg,              other.actionOutlineBg,              t)!,
      actionOutlineContent:         Color.lerp(actionOutlineContent,         other.actionOutlineContent,         t)!,
      actionFabBg:                  Color.lerp(actionFabBg,                  other.actionFabBg,                  t)!,
      actionFabContent:             Color.lerp(actionFabContent,             other.actionFabContent,             t)!,
      actionFabSelected:            Color.lerp(actionFabSelected,            other.actionFabSelected,            t)!,
      actionFabOpacityBg:           Color.lerp(actionFabOpacityBg,           other.actionFabOpacityBg,           t)!,
      actionGraphicBg:              Color.lerp(actionGraphicBg,              other.actionGraphicBg,              t)!,
      actionGraphicContent:         Color.lerp(actionGraphicContent,         other.actionGraphicContent,         t)!,
      // Input
      inputBgDefault:       Color.lerp(inputBgDefault,       other.inputBgDefault,       t)!,
      inputBorderActive:    Color.lerp(inputBorderActive,    other.inputBorderActive,    t)!,
      inputBorderError:     Color.lerp(inputBorderError,     other.inputBorderError,     t)!,
      inputText:            Color.lerp(inputText,            other.inputText,            t)!,
      inputTextError:       Color.lerp(inputTextError,       other.inputTextError,       t)!,
      inputTextPlaceholder: Color.lerp(inputTextPlaceholder, other.inputTextPlaceholder, t)!,
      inputTextDisabled:    Color.lerp(inputTextDisabled,    other.inputTextDisabled,    t)!,
      // Chip
      chipBgPrimary:   Color.lerp(chipBgPrimary,   other.chipBgPrimary,   t)!,
      chipBgSecondary: Color.lerp(chipBgSecondary, other.chipBgSecondary, t)!,
      chipBgAccent:    Color.lerp(chipBgAccent,    other.chipBgAccent,    t)!,
      // Project
      projectCharging:     Color.lerp(projectCharging,     other.projectCharging,     t)!,
      projectGoldenCard:   Color.lerp(projectGoldenCard,   other.projectGoldenCard,   t)!,
      projectBlackCard:    Color.lerp(projectBlackCard,    other.projectBlackCard,    t)!,
      projectPlatinumCard: Color.lerp(projectPlatinumCard, other.projectPlatinumCard, t)!,
      projectGreenCard:    Color.lerp(projectGreenCard,    other.projectGreenCard,    t)!,
      projectUspaceBlack:  Color.lerp(projectUspaceBlack,  other.projectUspaceBlack,  t)!,
      projectUspaceWhite:  Color.lerp(projectUspaceWhite,  other.projectUspaceWhite,  t)!,
    );
  }
}

extension USpaceColorsContext on BuildContext {
  USpaceColorsExtension get uColors =>
      Theme.of(this).extension<USpaceColorsExtension>() ??
      USpaceColorsExtension.light;
}
