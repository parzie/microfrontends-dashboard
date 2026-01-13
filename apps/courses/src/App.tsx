import CoursesAppWrapper from './app/CoursesAppWrapper';
import type { BaseMicrofrontendProps } from '@mfe/utils';
import { MicrofrontendState } from '@mfe/utils';

/**
 * Standalone development app for testing the Courses microfrontend
 * This is only used when running the courses app in isolation (dev mode)
 */
function App() {
  const mockProps: BaseMicrofrontendProps = {
    userId: 'dev-user-123',
    theme: 'light',
    locale: 'en-US',
    onMount: (name: string) => console.log(`[Dev Mode] ${name} mounted`),
    onUnmount: (name: string) => console.log(`[Dev Mode] ${name} unmounted`),
    onError: (error: Error, name: string) => console.error(`[Dev Mode] ${name} error:`, error),
    onStateChange: (state: MicrofrontendState, name: string) => console.log(`[Dev Mode] ${name} state:`, state),
    config: {
      devMode: true
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#2196f3',
        color: 'white',
        marginBottom: '20px',
        borderRadius: '4px'
      }}>
        <h1 style={{ margin: 0 }}>Courses Microfrontend - Standalone Development</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
          Running in isolation. Check console for lifecycle events.
        </p>
      </div>
      <CoursesAppWrapper {...mockProps} />
    </div>
  );
}

export default App
