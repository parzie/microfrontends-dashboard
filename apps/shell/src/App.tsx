import { Suspense, lazy } from 'react';
import type { BaseMicrofrontendProps } from '@mfe/utils';
import { MicrofrontendState } from '@mfe/utils';

const CoursesApp = lazy(() => import('courses/CoursesApp'));
const ProfileApp = lazy(() => import('profile/ProfileApp'));

export default function App() {
  // Base props to pass to contract-compliant microfrontends
  const baseProps: BaseMicrofrontendProps = {
    userId: 'shell-user-456',
    theme: 'light',
    locale: 'en-US',
    onMount: (name) => console.log(`[Shell] ${name} mounted`),
    onUnmount: (name) => console.log(`[Shell] ${name} unmounted`),
    onError: (error, name) => console.error(`[Shell] ${name} error:`, error),
    onStateChange: (state, name) => console.log(`[Shell] ${name} state:`, state)
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <header style={{
        padding: '20px',
        backgroundColor: '#1976d2',
        color: 'white',
        marginBottom: '30px',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0 }}>Shell App - Microfrontend Dashboard</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Demonstrating microfrontend contract pattern with module federation
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Contract-Compliant Microfrontend */}
        <div style={{
          border: '3px solid #4caf50',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            paddingBottom: '15px',
            borderBottom: '2px solid #e0e0e0'
          }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              marginRight: '10px'
            }}></span>
            <h3 style={{ margin: 0 }}>Courses (Contract-Compliant)</h3>
          </div>
          <Suspense fallback={
            <div style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <div style={{ fontSize: '14px', color: '#666' }}>Loading Courses...</div>
            </div>
          }>
            <CoursesApp {...baseProps} />
          </Suspense>
        </div>

        {/* Legacy Microfrontend */}
        <div style={{
          border: '3px solid #9e9e9e',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            paddingBottom: '15px',
            borderBottom: '2px solid #e0e0e0'
          }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#9e9e9e',
              marginRight: '10px'
            }}></span>
            <h3 style={{ margin: 0 }}>Profile (Legacy)</h3>
          </div>
          <Suspense fallback={
            <div style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <div style={{ fontSize: '14px', color: '#666' }}>Loading Profile...</div>
            </div>
          }>
            <ProfileApp />
          </Suspense>
        </div>
      </div>

      <footer style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Contract Features Demo</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
          <li>Courses MFE implements the standard contract with lifecycle hooks, error boundaries, and state management</li>
          <li>Profile MFE is a legacy component without contract implementation (for comparison)</li>
          <li>Open browser console to see lifecycle events logged by the shell</li>
          <li>Green border = Contract-compliant | Gray border = Legacy</li>
        </ul>
      </footer>
    </div>
  );
}
