import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ColorsPage from './pages/ColorsPage';
import TypographyPage from './pages/TypographyPage';
import ComponentsPage from './pages/ComponentsPage';
import ChangelogPage from './pages/ChangelogPage';
import StatusPage from './pages/StatusPage';
import './styles/global.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="colors" element={<ColorsPage />} />
          <Route path="typography" element={<TypographyPage />} />
          <Route path="components" element={<ComponentsPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
