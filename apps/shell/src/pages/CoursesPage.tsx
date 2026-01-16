import { lazy, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MicrofrontendProps } from '@mfe/utils';
import { BackButton } from '@mfe/ui';
import { mockRouter, mockUser, handleError } from '../config/microfrontend';

type LazyComponent = ComponentType<any>;

const CoursesAppModule = lazy(() => import('courses/CoursesApp')) as LazyComponent;

export default function CoursesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split('/').pop();
  
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
      {courseId && courseId !== 'courses' ? (
        <div className="max-w-2xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">{courseId.charAt(0).toUpperCase() + courseId.slice(1)} Course</h2>
            <p className="text-gray-400">Deep dive into the fundamentals and advanced concepts</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
            <p className="text-gray-400">Course details and content would be displayed here.</p>
          </div>
        </div>
      ) : (
        <CoursesAppModule {...microfrontendProps} />
      )}
    </div>
  );
}
