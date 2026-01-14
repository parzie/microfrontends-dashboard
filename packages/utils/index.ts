import type { ReactNode } from 'react';

export interface MicrofrontendProps {
  /**
   * Router context for the microfrontend
   */
  router?: {
    basename?: string;
    location?: { pathname: string };
    navigate?: (path: string) => void;
  };

  /**
   * User context shared across microfrontends
   */
  user?: {
    id: string;
    name: string;
    email: string;
  };

  /**
   * Global application state or configuration
   */
  config?: Record<string, any>;

  /**
   * Callback for navigation events within the microfrontend
   */
  onNavigate?: (path: string) => void;

  /**
   * Callback for error handling
   */
  onError?: (error: Error) => void;
}

export interface MicrofrontendComponent {
  (props: MicrofrontendProps): ReactNode;
}

export interface MicrofrontendModule {
  default: MicrofrontendComponent;
  /**
   * Optional lifecycle hooks
   */
  mount?: (container: HTMLElement, props: MicrofrontendProps) => void;
  unmount?: (container: HTMLElement) => void;
}