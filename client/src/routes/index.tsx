import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { LoginPage } from '../pages/userLogin';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}
