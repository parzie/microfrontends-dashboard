import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import type { MicrofrontendProps } from '@mfe/utils';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import { mockRouter, mockUser, handleError } from './config/microfrontend';


// Page components for routing
export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const microfrontendProps: MicrofrontendProps = {
    user: mockUser,
    router: { ...mockRouter, location: { pathname: location.pathname } },
    config: {
      theme: 'light',
      apiUrl: 'https://api.example.com'
    },
    onNavigate: navigate,
    onError: handleError
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Shell App</h1>

        <div className="space-y-8">
          <Routes>
            <Route path="/" element={<DashboardPage microfrontendProps={microfrontendProps} />} />
            <Route path="/courses/*" element={<CoursesPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
