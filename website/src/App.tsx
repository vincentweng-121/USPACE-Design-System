import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import OverviewPage from './pages/OverviewPage';
import ColorPage from './pages/foundations/ColorPage';
import TypographyPage from './pages/foundations/TypographyPage';
import GlassPage from './pages/foundations/GlassPage';
import ButtonPage from './pages/components/ButtonPage';
import TogglePage from './pages/components/TogglePage';
import HeaderPage from './pages/components/HeaderPage';
import ListPage from './pages/components/ListPage';
import ChangelogPage from './pages/resources/ChangelogPage';
import StatusPage from './pages/resources/StatusPage';
import TextFieldPage from './pages/components/TextFieldPage';
import ComingSoonPage from './pages/ComingSoonPage';
import './styles/global.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<OverviewPage />} />

          {/* Foundations */}
          <Route path="foundations/color" element={<ColorPage />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/glass" element={<GlassPage />} />
          <Route path="foundations/spacing" element={<ComingSoonPage title="Spacing" />} />
          <Route path="foundations/radius" element={<ComingSoonPage title="Radius" />} />
          <Route path="foundations/elevation" element={<ComingSoonPage title="Elevation" />} />
          <Route path="foundations/iconography" element={<ComingSoonPage title="Iconography" />} />

          {/* Components */}
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/toggle" element={<TogglePage />} />
          <Route path="components/floating-button" element={<ComingSoonPage title="Floating Button" />} />
          <Route path="components/header" element={<HeaderPage />} />
          <Route path="components/list" element={<ListPage />} />
          <Route path="components/bottom-bar" element={<ComingSoonPage title="Bottom Bar" />} />
          <Route path="components/tab-bar" element={<ComingSoonPage title="Tab Bar" />} />
          <Route path="components/text-field" element={<TextFieldPage />} />
          <Route path="components/divider" element={<ComingSoonPage title="Divider" />} />

          {/* Patterns */}
          <Route path="patterns" element={<ComingSoonPage title="Patterns" />} />

          {/* Resources */}
          <Route path="resources/changelog" element={<ChangelogPage />} />
          <Route path="resources/status" element={<StatusPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
