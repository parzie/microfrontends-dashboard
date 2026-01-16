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
    <div className="w-full">
      <div className="mb-8">
        <BackButton />
      </div>
      {section === 'edit' ? (
        <div className="max-w-2xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Edit Profile</h2>
            <p className="text-gray-400">Update your personal information</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
            <p className="text-gray-400">Profile editing form would be displayed here.</p>
          </div>
        </div>
      ) : section === 'settings' ? (
        <div className="max-w-2xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Settings</h2>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
            <p className="text-gray-400">User settings would be displayed here.</p>
          </div>
        </div>
      ) : (
        <ProfileAppModule {...microfrontendProps} />
      )}
    </div>
  );
}
