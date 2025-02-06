// jest.setup.js

// Mock the Quill module (you can customize the mock as needed)
jest.mock('quill', () => {
    return jest.fn().mockImplementation(() => ({
      root: {
        innerHTML: '',
      },
      on: jest.fn(),
      emit: jest.fn(),
    }));
  });
  
  // Mock CSS imports to avoid errors during tests
  import 'identity-obj-proxy'; // This will handle the CSS import
  
  // Add a declaration for .css files if you're using TypeScript
  declare module "*.css" {
    const content: { [className: string]: string };
  }
  



