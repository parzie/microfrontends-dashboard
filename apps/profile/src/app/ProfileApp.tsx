import type { MicrofrontendComponent } from '@mfe/utils';

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
    <div className="space-y-4">
      {user ? (
        <>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-900">
            <h3 className="text-lg font-semibold mb-2">👤 User Profile</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">ID:</span> {user.id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEditProfile}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              ✏️ Edit Profile
            </button>
            <button
              onClick={handleViewSettings}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              ⚙️ Settings
            </button>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-900">
          <p className="font-semibold">⚠️ User not authenticated</p>
          <p className="text-sm">Please log in to view your profile</p>
        </div>
      )}

      {router?.location?.pathname && (
        <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 text-slate-700 text-sm">
          <p className="font-mono">Current route: <span className="font-bold">{router.location.pathname}</span></p>
        </div>
      )}
    </div>
  );
};

export default ProfileApp;
