import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { TasksPage } from '@/pages/TasksPage'
import { ProgressPage } from '@/pages/ProgressPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { PlayfulLayout } from '@/components/layout/PlayfulLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={['öğrenci', 'koç', 'admin']}>
        <PlayfulLayout><HomePage /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/tasks",
    element: (
      <ProtectedRoute allowedRoles={['öğrenci']}>
        <PlayfulLayout><TasksPage /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/progress",
    element: (
      <ProtectedRoute allowedRoles={['öğrenci']}>
        <PlayfulLayout><ProgressPage /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)