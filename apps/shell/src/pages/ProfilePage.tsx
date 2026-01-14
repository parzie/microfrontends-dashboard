import { lazy, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MicrofrontendProps } from '@mfe/utils';
import { BackButton } from '@mfe/ui';
import { mockRouter, mockUser, handleError } from '../config/microfrontend';

type LazyComponent = ComponentType<any>;

const ProfileAppModule = lazy(() => import('profile/ProfileApp')) as LazyComponent;

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const section = location.pathname.split('/').pop();
  
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <BackButton />
      </div>
      {section === 'edit' ? (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">✏️ Edit Profile</h3>
          <p className="text-purple-700">Profile editing form would be displayed here.</p>
        </div>
      ) : section === 'settings' ? (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">⚙️ Settings</h3>
          <p className="text-purple-700">User settings would be displayed here.</p>
        </div>
      ) : (
        <ProfileAppModule {...microfrontendProps} />
      )}
    </div>
  );
}
