import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { WorkPage } from '../pages/Work/WorkPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/work" element={<WorkPage />} />
    </Routes>
  );
}
