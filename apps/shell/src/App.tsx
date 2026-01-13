import { Suspense, lazy } from 'react';

const CoursesApp = lazy(() => import('courses/CoursesApp')); 
const ProfileApp = lazy(() => import('profile/ProfileApp'));

export default function App() {
  return (
    <div>
      <h1>Shell App</h1>

      <Suspense fallback={<div>Loading Courses...</div>}>
        <CoursesApp />
      </Suspense>

      <Suspense fallback={<div>Loading Profile...</div>}>
        <ProfileApp />
      </Suspense>
    </div>
  );
}
