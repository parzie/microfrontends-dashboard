import type { MicrofrontendComponent } from '@mfe/utils';

/**
 * Type declarations for federated remote modules
 */

// Contract-compliant microfrontend (courses)
declare module 'courses/CoursesApp' {
  const CoursesApp: MicrofrontendComponent;
  export default CoursesApp;
}

// Contract-compliant microfrontend (profile)
declare module 'profile/ProfileApp' {
  const ProfileApp: MicrofrontendComponent;
  export default ProfileApp;
}
