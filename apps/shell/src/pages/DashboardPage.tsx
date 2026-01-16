import { Suspense, lazy, type ComponentType } from 'react';
import type { MicrofrontendProps } from '@mfe/utils';
import { Card } from '@mfe/ui';

type LazyComponent = ComponentType<any>;

const CoursesAppModule = lazy(() => import('courses/CoursesApp')) as LazyComponent;
const ProfileAppModule = lazy(() => import('profile/ProfileApp')) as LazyComponent;

interface DashboardPageProps {
  microfrontendProps: MicrofrontendProps;
}

export default function DashboardPage({ microfrontendProps }: DashboardPageProps) {
  return (
    <>
      <Card title="Courses Microfrontend" subtitle="Browse and explore available courses">
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading Courses...</div>}>
          <CoursesAppModule {...microfrontendProps} />
        </Suspense>
      </Card>

      <Card title="Profile Microfrontend" subtitle="View and manage your profile settings">
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading Profile...</div>}>
          <ProfileAppModule {...microfrontendProps} />
        </Suspense>
      </Card>
    </>
  );
}
