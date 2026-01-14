import { lazy, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MicrofrontendProps } from '@mfe/utils';
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
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded transition-colors text-sm"
      >
        ← Back
      </button>
      {courseId && courseId !== 'courses' ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">📚 {courseId.charAt(0).toUpperCase() + courseId.slice(1)} Course</h3>
          <p className="text-blue-700">Course details and content would be displayed here.</p>
        </div>
      ) : (
        <CoursesAppModule {...microfrontendProps} />
      )}
    </div>
  );
}
