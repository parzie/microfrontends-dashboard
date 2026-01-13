import { FC } from 'react';

/**
 * Lifecycle states for microfrontend components
 */
export enum MicrofrontendState {
  INITIALIZING = 'initializing',
  LOADING = 'loading',
  READY = 'ready',
  ERROR = 'error',
  UNMOUNTING = 'unmounting'
}

/**
 * Information about a microfrontend instance
 */
export interface MicrofrontendInfo {
  /** Unique name of the microfrontend */
  name: string;
  /** Version of the microfrontend */
  version: string;
  /** Current lifecycle state */
  state: MicrofrontendState;
}

/**
 * Base props that all microfrontend components should accept
 */
export interface BaseMicrofrontendProps {
  /** User ID from the host application */
  userId?: string;
  /** Theme preference (light or dark) */
  theme?: 'light' | 'dark';
  /** Locale/language code */
  locale?: string;

  /** Callback when microfrontend mounts */
  onMount?: (mfeName: string) => void;
  /** Callback when microfrontend unmounts */
  onUnmount?: (mfeName: string) => void;
  /** Callback when an error occurs */
  onError?: (error: Error, mfeName: string) => void;
  /** Callback when state changes */
  onStateChange?: (state: MicrofrontendState, mfeName: string) => void;

  /** Additional configuration object */
  config?: Record<string, unknown>;
}

/**
 * Type alias for a contract-compliant microfrontend component
 */
export type MicrofrontendComponent = FC<BaseMicrofrontendProps>;
