// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { jest } from '@jest/globals';
// import { toast } from 'react-toastify';
// import { login } from '@/services/notes.service';
// import { triggerAuthChange } from '@/hooks/use-auth';
// import LoginPage from '@/pages/login-page';
// import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
// import '@testing-library/jest-dom';
// import { AuthResponse } from '@/services/notes.service';

// // ✅ Mock dependencies
// jest.mock('@/services/notes.service', () => ({
//   login: jest.fn() as jest.MockedFunction<(username: string, password: string) => Promise<AuthResponse>>,
// }));

// jest.mock('@/hooks/use-auth', () => ({
//   triggerAuthChange: jest.fn(),
// }));

// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//   },
// }));

// // ✅ Define the root route
// const rootRoute = createRootRoute();

// // ✅ Define the /list route as a child of the root route
// const listRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/list',
//   component: () => <div>List Page</div>,
// });

// // ✅ Explicitly define the type for context (can be an empty object or specific context if you have it)
// interface AppContext {
//   someValue?: string;
// }

// // ✅ Create the router instance with routes
// const router = createRouter({
//   routeTree: rootRoute.addChildren([listRoute]),
//   context: {} as AppContext, // Define context with a type, or just use an empty object if no context is needed
// });

// const LoginPageWrapper = () => (
//   <div>
//     <LoginPage />
//     <RouterProvider router={router}>
//       <LoginPageWrapper />
//     </RouterProvider>
//   </div>
// describe('LoginPage', () => {
//   test('renders login form with username and password inputs', () => {
//     render(
//       <RouterProvider router={router}>
//         <LoginPage />
//       </RouterProvider>
//     );

//     expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
//   });

//   test('displays error message on failed login', async () => {
//     (login as jest.MockedFunction<typeof login>).mockRejectedValue(
//       new Error('Invalid username or password')
//     );

//     render(
//       <RouterProvider router={router}>
//         <LoginPage />
//       </RouterProvider>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'wrongUser' } });
//     fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongPass' } });
//     fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

//     await waitFor(() => {
//       expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
//     });
//   });

//   test('redirects on successful login', async () => {
//     // ✅ Mock the login response
//     (login as jest.MockedFunction<typeof login>).mockResolvedValue({
//       user_id: 1,
//       access_token: 'fake_access_token',
//       full_name: 'Test User',
//       refresh_token: 'fake_refresh_token',
//     });

//     render(
//       <RouterProvider router={router}>
//         <LoginPage />
//       </RouterProvider>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testUser' } });
//     fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testPass' } });
//     fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

//     await waitFor(() => {
//       expect(toast.success).toHaveBeenCalledWith('Login successful!');
//       expect(triggerAuthChange).toHaveBeenCalled();
//       // Check that the user was navigated to the "/list" route
//       expect(window.location.pathname).toBe('/list');
//     });
//   });

//   test('disables button when logging in', async () => {
//     // ✅ Mock login with delay
//     (login as jest.MockedFunction<typeof login>).mockImplementation(
//       () =>
//         new Promise((resolve) =>
//           setTimeout(() => resolve({
//             user_id: 1,
//             access_token: 'fake_access_token',
//             full_name: 'Test User',
//             refresh_token: 'fake_refresh_token',
//           }), 1000)
//         )
//     );

//     render(
//       <RouterProvider router={router}>
//         <LoginPage />
//       </RouterProvider>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testUser' } });
//     fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testPass' } });
//     fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

//     expect(screen.getByRole('button', { name: /Signing in/i })).toBeDisabled();
//   });
// });
