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
    <div className="space-y-4">
      {user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900">
          <p className="font-semibold">Welcome, <span className="font-bold">{user.name}</span>! 👋</p>
          <p className="text-sm text-blue-700">{user.email}</p>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Available Courses</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCourseClick('react')}
              className="w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              📚 React Fundamentals
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCourseClick('typescript')}
              className="w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              📘 TypeScript Advanced
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCourseClick('microfrontends')}
              className="w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              🏗️ Microfrontends Architecture
            </button>
          </li>
        </ul>
      </div>

      {router?.location?.pathname && (
        <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 text-slate-700 text-sm">
          <p className="font-mono">Current route: <span className="font-bold">{router.location.pathname}</span></p>
        </div>
      )}
    </div>
  );
};

export default CoursesApp;
