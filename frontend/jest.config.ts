import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',  // Use 'jsdom' for React
  verbose: true,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Ensure alias resolution
    '\\.css$': 'identity-obj-proxy',  // Add this line to handle CSS imports
  },
};

export default config;

// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   preset: 'ts-jest',  // Use ts-jest preset to handle TypeScript files
//   testEnvironment: 'jsdom',  // Use 'jsdom' for React (or other browser-like environments)
//   verbose: true,  // Display detailed test results
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],  // Transform TypeScript files using ts-jest
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],  // Ensure this points to your jest.setup.ts file
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',  // Handle module aliasing (adjust if needed)
//     '\\.css$': 'identity-obj-proxy',  // Mock CSS imports with identity-obj-proxy
//     '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/CSSStub.ts',  // Mock CSS files using a custom stub file
//   },
// };

// export default config;

