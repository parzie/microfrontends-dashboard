import { useEffect } from 'react';
import type { BaseMicrofrontendProps } from '@mfe/utils';
import {
  MicrofrontendErrorBoundary,
  useMicrofrontendLifecycle,
  MicrofrontendState
} from '@mfe/utils';
import CoursesApp from './CoursesApp';

/**
 * Wrapper component that implements the microfrontend contract
 * Handles lifecycle management and error boundaries
 */
export default function CoursesAppWrapper(props: BaseMicrofrontendProps) {
  const { state, setState, info } = useMicrofrontendLifecycle({
    name: 'courses',
    version: '1.0.0',
    onMount: props.onMount,
    onUnmount: props.onUnmount,
    onStateChange: props.onStateChange
  });

  useEffect(() => {
    // Simulate initialization process: INITIALIZING → LOADING → READY
    const loadingTimer = setTimeout(() => {
      setState(MicrofrontendState.LOADING);

      // Then transition to READY after simulated load
      const readyTimer = setTimeout(() => {
        setState(MicrofrontendState.READY);
      }, 800);

      return () => clearTimeout(readyTimer);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <MicrofrontendErrorBoundary
      mfeName={info.name}
      onError={props.onError}
      fallback={
        <div style={{
          padding: '20px',
          border: '2px solid #f44336',
          borderRadius: '4px',
          backgroundColor: '#ffebee',
          color: '#c62828'
        }}>
          <h3>Courses Microfrontend Failed</h3>
          <p>An error occurred while loading the courses component.</p>
        </div>
      }
    >
      <CoursesApp
        state={state}
        setState={setState}
        info={info}
        {...props}
      />
    </MicrofrontendErrorBoundary>
  );
}
