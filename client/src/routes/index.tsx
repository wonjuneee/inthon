import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/userLogin';
import HomePage from '../pages/HomePage';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage step={1} />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}
