import type { MicrofrontendComponent } from '@mfe/utils';
import { Button } from '@mfe/ui';

const ProfileApp: MicrofrontendComponent = (props) => {
  const { user, router, onNavigate, onError } = props;

  const handleEditProfile = () => {
    try {
      if (onNavigate) {
        onNavigate('/profile/edit');
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  };

  const handleViewSettings = () => {
    try {
      if (onNavigate) {
        onNavigate('/profile/settings');
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  };

  return (
    <div className="w-full">
      {user ? (
        <>
          {/* Profile Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Your Profile</h2>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">ID: {user.id}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleEditProfile} variant="primary" size="md">
              Edit Profile
            </Button>
            <Button onClick={handleViewSettings} variant="primary" size="md">
              Settings
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-2">Authentication Required</h3>
          <p className="text-gray-400">Please log in to view your profile</p>
        </div>
      )}

      {/* Route Info */}
      {router?.location?.pathname !== '/' && (
        <div className="mt-8 p-4 rounded-lg bg-gray-900/50 border border-gray-800 text-center">
          <p className="text-xs text-gray-500 font-mono">
            Current route: <span className="text-purple-400">{router?.location?.pathname}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileApp;
