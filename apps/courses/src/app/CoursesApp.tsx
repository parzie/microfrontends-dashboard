import type { MicrofrontendComponent } from '@mfe/utils';
import { Button } from '@mfe/ui';

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
    <div className="w-full">
      {/* Hero Section */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Master Modern <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Web Development</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl">
          Learn industry-standard technologies and build production-ready applications from the ground up.
        </p>
      </div>

      {/* User Greeting */}
      {user && (
        <div className="mb-12 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          <p><span className="font-semibold text-white">Welcome back,</span> <span className="font-bold text-emerald-400">{user.name}</span></p>
        </div>
      )}

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            id: 'react',
            title: 'React Fundamentals',
            description: 'Build interactive UIs with the most popular JavaScript library',
            highlight: 'Component Architecture'
          },
          {
            id: 'typescript',
            title: 'TypeScript Advanced',
            description: 'Master type safety and write more robust JavaScript',
            highlight: 'Advanced Type Systems'
          },
          {
            id: 'microfrontends',
            title: 'Microfrontends Architecture',
            description: 'Scale applications with modular frontend architecture',
            highlight: 'Module Federation'
          }
        ].map((course) => (
          <div
            key={course.id}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="h-12 w-12 mb-4 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
                {course.description}
              </p>
              <div className="inline-block text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
                {course.highlight}
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => handleCourseClick(course.id)}
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  Start Learning
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl -z-10" />
          </div>
        ))}
      </div>

      {/* Route Info */}
      {router?.location?.pathname !== '/' && (
        <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800 text-center">
          <p className="text-xs text-gray-500 font-mono">
            Current route: <span className="text-emerald-400">{router?.location?.pathname}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesApp;

