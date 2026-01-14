// Mock user data - in a real app, this would come from auth context
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

export const mockRouter = {
  basename: '/',
  location: { pathname: '/' },
  navigate: (path: string) => {
    console.log('Navigate to:', path);
    // In a real app, this would integrate with the router
  }
};

export const handleError = (error: Error) => {
  console.error('Microfrontend error:', error);
  // Handle errors in shell
};
