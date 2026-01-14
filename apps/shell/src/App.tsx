import { Suspense, lazy, type ComponentType } from 'react';
import type { MicrofrontendProps } from '@mfe/utils';

type LazyComponent = ComponentType<any>;

const CoursesAppModule = lazy(() => import('courses/CoursesApp')) as LazyComponent;
const ProfileAppModule = lazy(() => import('profile/ProfileApp')) as LazyComponent;

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

const mockRouter = {
  basename: '/',
  location: { pathname: '/' },
  navigate: (path: string) => {
    console.log('Navigate to:', path);
    // In a real app, this would integrate with the router
  }
};

const handleNavigate = (path: string) => {
  console.log('Navigation requested:', path);
  // Handle navigation in shell
};

const handleError = (error: Error) => {
  console.error('Microfrontend error:', error);
  // Handle errors in shell
};

const microfrontendProps: MicrofrontendProps = {
  user: mockUser,
  router: mockRouter,
  onNavigate: handleNavigate,
  onError: handleError,
  config: {
    theme: 'light',
    apiUrl: 'https://api.example.com'
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Shell App</h1>

        <div className="space-y-8">
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Courses Microfrontend</h2>
            <Suspense fallback={<div className="text-center py-8 text-slate-300">Loading Courses...</div>}>
              <CoursesAppModule {...microfrontendProps} />
            </Suspense>
          </div>

          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">Profile Microfrontend</h2>
            <Suspense fallback={<div className="text-center py-8 text-slate-300">Loading Profile...</div>}>
              <ProfileAppModule {...microfrontendProps} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
