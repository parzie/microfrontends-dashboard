import type { MicrofrontendComponent } from '@mfe/utils';

const CoursesApp: MicrofrontendComponent = (props) => {
  const { user, router, onNavigate, onError } = props;

  const handleCourseClick = (courseId: string) => {
    try {
      if (onNavigate) {
        onNavigate(`/courses/${courseId}`);
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  };

  return (
    <div className="courses-app">
      <h2>Courses Microfrontend</h2>
      {user && (
        <div className="user-info">
          <p>Welcome, {user.name}!</p>
        </div>
      )}
      <div className="courses-list">
        <h3>Available Courses</h3>
        <ul>
          <li>
            <button onClick={() => handleCourseClick('react')}>
              React Fundamentals
            </button>
          </li>
          <li>
            <button onClick={() => handleCourseClick('typescript')}>
              TypeScript Advanced
            </button>
          </li>
          <li>
            <button onClick={() => handleCourseClick('microfrontends')}>
              Microfrontends Architecture
            </button>
          </li>
        </ul>
      </div>
      {router?.location?.pathname && (
        <div className="current-route">
          <p>Current route: {router.location.pathname}</p>
        </div>
      )}
    </div>
  );
};

export default CoursesApp;
