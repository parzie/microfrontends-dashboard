import { Suspense, lazy, type ComponentType } from 'react';
import type { MicrofrontendProps } from '@mfe/utils';

type LazyComponent = ComponentType<any>;

const CoursesAppModule = lazy(() => import('courses/CoursesApp')) as LazyComponent;
const ProfileAppModule = lazy(() => import('profile/ProfileApp')) as LazyComponent;

interface DashboardPageProps {
  microfrontendProps: MicrofrontendProps;
}

export default function DashboardPage({ microfrontendProps }: DashboardPageProps) {
  return (
    <>
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
    </>
  );
}
