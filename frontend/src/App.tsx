import { Navigate, Route, Routes } from 'react-router';
import AccountEntryPage from './features/account/AccountEntryPage';
import WelcomePage from './features/account/WelcomePage';
import HealthCheckPage from './features/system/HealthCheckPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-up" element={<AccountEntryPage title="Sign up" />} />
      <Route path="/log-in" element={<AccountEntryPage title="Log in" />} />
      <Route path="/health-check" element={<HealthCheckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
