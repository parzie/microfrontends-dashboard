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
    <div>
      <h1>Shell App</h1>

      <Suspense fallback={<div>Loading Courses...</div>}>
        <CoursesAppModule {...microfrontendProps} />
      </Suspense>

      <Suspense fallback={<div>Loading Profile...</div>}>
        <ProfileAppModule />
      </Suspense>
    </div>
  );
}
