import { useState } from 'react';
import type { MicrofrontendInfo, BaseMicrofrontendProps } from '@mfe/utils';
import { MicrofrontendState } from '@mfe/utils';

interface CoursesAppProps extends BaseMicrofrontendProps {
  state: MicrofrontendState;
  setState: (newState: MicrofrontendState) => void;
  info: MicrofrontendInfo;
}

export default function CoursesApp({ state, setState, info, userId, theme, locale }: CoursesAppProps) {
  const [lifecycleEvents, setLifecycleEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLifecycleEvents(prev => [...prev, `[${timestamp}] ${event}`]);
  };

  const handleSimulateLoading = () => {
    addEvent('Loading simulation started');
    setState(MicrofrontendState.LOADING);

    setTimeout(() => {
      setState(MicrofrontendState.READY);
      addEvent('Loading simulation completed');
    }, 2000);
  };

  const handleTriggerError = () => {
    addEvent('Error triggered');
    throw new Error('Test error thrown by Courses MFE');
  };

  const getStateColor = (currentState: MicrofrontendState): string => {
    switch (currentState) {
      case MicrofrontendState.INITIALIZING:
        return '#ff9800';
      case MicrofrontendState.LOADING:
        return '#2196f3';
      case MicrofrontendState.READY:
        return '#4caf50';
      case MicrofrontendState.ERROR:
        return '#f44336';
      case MicrofrontendState.UNMOUNTING:
        return '#9e9e9e';
      default:
        return '#757575';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Courses Microfrontend</h2>

      {/* State Badge */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: getStateColor(state),
          color: 'white',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'white',
            marginRight: '8px'
          }}></span>
          {state.toUpperCase()}
        </div>
      </div>

      {/* MFE Info */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Microfrontend Info</h3>
        <div style={{ fontSize: '14px' }}>
          <div><strong>Name:</strong> {info.name}</div>
          <div><strong>Version:</strong> {info.version}</div>
          <div><strong>State:</strong> {info.state}</div>
        </div>
      </div>

      {/* Props Display */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Props from Host</h3>
        <div style={{ fontSize: '14px' }}>
          <div><strong>User ID:</strong> {userId || 'Not provided'}</div>
          <div><strong>Theme:</strong> {theme || 'Not provided'}</div>
          <div><strong>Locale:</strong> {locale || 'Not provided'}</div>
        </div>
      </div>

      {/* Demo Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Demo Actions</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSimulateLoading}
            disabled={state === MicrofrontendState.LOADING}
            style={{
              padding: '10px 20px',
              backgroundColor: state === MicrofrontendState.LOADING ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state === MicrofrontendState.LOADING ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {state === MicrofrontendState.LOADING ? 'Loading...' : 'Simulate Loading'}
          </button>
          <button
            onClick={handleTriggerError}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Trigger Error
          </button>
        </div>
      </div>

      {/* Lifecycle Events Log */}
      <div style={{ padding: '15px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Lifecycle Events</h3>
        {lifecycleEvents.length === 0 ? (
          <div style={{ fontSize: '14px', color: '#666' }}>No events yet. Try the demo actions above.</div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
            {lifecycleEvents.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
