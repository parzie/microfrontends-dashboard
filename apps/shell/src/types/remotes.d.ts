import type { MicrofrontendComponent } from '@mfe/utils';
import type { ComponentType } from 'react';

/**
 * Type declarations for federated remote modules
 */

// Contract-compliant microfrontend (courses)
declare module 'courses/CoursesApp' {
  const CoursesApp: MicrofrontendComponent;
  export default CoursesApp;
}

// Legacy microfrontend (profile - does not implement contract yet)
declare module 'profile/ProfileApp' {
  const ProfileApp: ComponentType;
  export default ProfileApp;
}
