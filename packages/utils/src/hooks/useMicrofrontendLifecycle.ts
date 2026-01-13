import { useState, useEffect, useRef } from 'react';
import { MicrofrontendState, MicrofrontendInfo } from '../contracts/types';

interface UseMicrofrontendLifecycleOptions {
  /** Name of the microfrontend */
  name: string;
  /** Version of the microfrontend */
  version: string;
  /** Callback when mounted */
  onMount?: (mfeName: string) => void;
  /** Callback when unmounted */
  onUnmount?: (mfeName: string) => void;
  /** Callback when state changes */
  onStateChange?: (state: MicrofrontendState, mfeName: string) => void;
}

interface UseMicrofrontendLifecycleReturn {
  /** Current state of the microfrontend */
  state: MicrofrontendState;
  /** Function to update the state */
  setState: (newState: MicrofrontendState) => void;
  /** Info object containing name, version, and state */
  info: MicrofrontendInfo;
}

/**
 * Hook to manage microfrontend lifecycle and state transitions
 */
export function useMicrofrontendLifecycle(
  options: UseMicrofrontendLifecycleOptions
): UseMicrofrontendLifecycleReturn {
  const { name, version, onMount, onUnmount, onStateChange } = options;
  const [state, setStateInternal] = useState<MicrofrontendState>(MicrofrontendState.INITIALIZING);
  const isMountedRef = useRef(false);

  const setState = (newState: MicrofrontendState) => {
    setStateInternal(newState);
    if (onStateChange) {
      onStateChange(newState, name);
    }
  };

  useEffect(() => {
    // Mount lifecycle
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (onMount) {
        onMount(name);
      }
    }

    // Unmount lifecycle
    return () => {
      setState(MicrofrontendState.UNMOUNTING);
      if (onUnmount) {
        onUnmount(name);
      }
    };
  }, [name]);

  const info: MicrofrontendInfo = {
    name,
    version,
    state
  };

  return {
    state,
    setState,
    info
  };
}
