import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/userLogin';
import HomePage from '../pages/HomePage';
import ArtPage from '../pages/ArtPage';
import PerformancePage from '../pages/PerformancePage';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="art" element={<ArtPage />} />
      <Route path="performance" element={<PerformancePage />} />
    </Routes>
  );
}
