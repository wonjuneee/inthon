import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ArtPage from '../pages/ArtPage';
import PerformancePage from '../pages/PerformancePage';
import ButterflyPage from '../pages/ButterflyPage';
import EggPage from '../pages/EggPage';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="art" element={<ArtPage />} />
      <Route path="performance" element={<PerformancePage />} />
      <Route path="butterfly" element={<ButterflyPage />} />
      <Route path="egg" element={<EggPage />} />
    </Routes>
  );
}
