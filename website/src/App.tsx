import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

// ── Top level ──
import OverviewPage from './pages/OverviewPage';
import DesigningPage from './pages/DesigningPage';
import DevelopingPage from './pages/DevelopingPage';
import FlutterSetupPage from './pages/FlutterSetupPage';
import TokenPipelinePage from './pages/TokenPipelinePage';
import PatternsPage from './pages/PatternsPage';
import ComingSoonPage from './pages/ComingSoonPage';

// ── Styles（原 Foundations）──
import ColorPage from './pages/foundations/ColorPage';
import TypographyPage from './pages/foundations/TypographyPage';
import GlassPage from './pages/foundations/GlassPage';
import SpacingPage from './pages/foundations/SpacingPage';

// ── Components ──
import ButtonPage from './pages/components/ButtonPage';
import ChipPage from './pages/components/ChipPage';
import DropdownMenuPage from './pages/components/DropdownMenuPage';
import HeaderPage from './pages/components/HeaderPage';
import ListPage from './pages/components/ListPage';
import ModalPage from './pages/components/ModalPage';
import TabPage from './pages/components/TabPage';
import TextAreaPage from './pages/components/TextAreaPage';
import TextFieldPage from './pages/components/TextFieldPage';
import TogglePage from './pages/components/TogglePage';

// ── Help & Support（原 Resources）──
import ChangelogPage from './pages/resources/ChangelogPage';
import StatusPage from './pages/resources/StatusPage';
import RoadmapPage from './pages/resources/RoadmapPage';

import './styles/global.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<OverviewPage />} />

          {/* Designing */}
          <Route path="designing" element={<DesigningPage />} />

          {/* Developing */}
          <Route path="developing" element={<DevelopingPage />} />
          <Route path="developing/flutter" element={<FlutterSetupPage />} />
          <Route path="developing/tokens" element={<TokenPipelinePage />} />

          {/* Components */}
          <Route path="components" element={<Navigate to="/components/button" replace />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/chip" element={<ChipPage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/header" element={<HeaderPage />} />
          <Route path="components/list" element={<ListPage />} />
          <Route path="components/modal" element={<ModalPage />} />
          <Route path="components/tab" element={<TabPage />} />
          <Route path="components/text-area" element={<TextAreaPage />} />
          <Route path="components/text-field" element={<TextFieldPage />} />
          <Route path="components/toggle" element={<TogglePage />} />
          <Route path="components/floating-button" element={<ComingSoonPage title="Floating Button" />} />
          <Route path="components/bottom-bar" element={<ComingSoonPage title="Bottom Bar" />} />
          <Route path="components/divider" element={<ComingSoonPage title="Divider" />} />

          {/* Styles */}
          <Route path="styles" element={<Navigate to="/styles/color" replace />} />
          <Route path="styles/color" element={<ColorPage />} />
          <Route path="styles/typography" element={<TypographyPage />} />
          <Route path="styles/spacing" element={<SpacingPage />} />
          <Route path="styles/glass" element={<GlassPage />} />
          <Route path="styles/elevation" element={<ComingSoonPage title="Elevation" />} />
          <Route path="styles/iconography" element={<ComingSoonPage title="Iconography" />} />

          {/* Patterns */}
          <Route path="patterns" element={<PatternsPage />} />

          {/* Help & Support */}
          <Route path="help" element={<Navigate to="/help/changelog" replace />} />
          <Route path="help/changelog" element={<ChangelogPage />} />
          <Route path="help/status" element={<StatusPage />} />
          <Route path="help/roadmap" element={<RoadmapPage />} />

          {/* ── 舊路徑轉址，避免既有連結失效 ── */}
          <Route path="foundations" element={<Navigate to="/styles/color" replace />} />
          <Route path="foundations/color" element={<Navigate to="/styles/color" replace />} />
          <Route path="foundations/typography" element={<Navigate to="/styles/typography" replace />} />
          <Route path="foundations/spacing" element={<Navigate to="/styles/spacing" replace />} />
          <Route path="foundations/radius" element={<Navigate to="/styles/spacing" replace />} />
          <Route path="foundations/glass" element={<Navigate to="/styles/glass" replace />} />
          <Route path="foundations/elevation" element={<Navigate to="/styles/elevation" replace />} />
          <Route path="foundations/iconography" element={<Navigate to="/styles/iconography" replace />} />
          <Route path="resources" element={<Navigate to="/help/changelog" replace />} />
          <Route path="resources/changelog" element={<Navigate to="/help/changelog" replace />} />
          <Route path="resources/status" element={<Navigate to="/help/status" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
