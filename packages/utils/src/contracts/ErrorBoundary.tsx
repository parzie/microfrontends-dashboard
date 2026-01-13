import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Name of the microfrontend for logging/error reporting */
  mfeName: string;
  /** Fallback UI to render when an error occurs */
  fallback?: ReactNode;
  /** Callback when an error is caught */
  onError?: (error: Error, mfeName: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for microfrontends.
 * Catches runtime errors and displays a fallback UI.
 */
export class MicrofrontendErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(`[MFE Error Boundary - ${this.props.mfeName}]`, error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, this.props.mfeName);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '20px',
          border: '2px solid #f44336',
          borderRadius: '4px',
          backgroundColor: '#ffebee',
          color: '#c62828'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>
            {this.props.mfeName} Error
          </h3>
          <p style={{ margin: '0 0 10px 0' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#c62828',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
