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
import { LandingPage } from '@/pages/LandingPage'
import { MarketplacePage } from '@/pages/MarketplacePage'
import { CoachProfileView } from '@/pages/CoachProfileView'
import { HomePage } from '@/pages/HomePage'
import { TasksPage } from '@/pages/TasksPage'
import { ProgressPage } from '@/pages/ProgressPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { CoachDashboard } from '@/pages/CoachDashboard'
import { CoachStudentDetail } from '@/pages/CoachStudentDetail'
import { AdminDashboard } from '@/pages/AdminDashboard'
import { ProfilePage } from '@/pages/ProfilePage'
import { QuizPage } from '@/pages/QuizPage'
import MessagesPage from '@/pages/MessagesPage'
import { PlayfulLayout } from '@/components/layout/PlayfulLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayfulLayout><LandingPage /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/marketplace",
    element: <PlayfulLayout><MarketplacePage /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/coach/:id",
    element: <PlayfulLayout><CoachProfileView /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/quiz",
    element: <PlayfulLayout><QuizPage /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
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
    path: "/dashboard",
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
    path: "/messages",
    element: (
      <ProtectedRoute allowedRoles={['öğrenci', 'koç']}>
        <PlayfulLayout><MessagesPage /></PlayfulLayout>
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
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={['öğrenci', 'koç', 'admin']}>
        <PlayfulLayout><ProfilePage /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/coach",
    element: (
      <ProtectedRoute allowedRoles={['koç', 'admin']}>
        <PlayfulLayout><CoachDashboard /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/coach/student/:id",
    element: (
      <ProtectedRoute allowedRoles={['koç', 'admin']}>
        <PlayfulLayout><CoachStudentDetail /></PlayfulLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <PlayfulLayout><AdminDashboard /></PlayfulLayout>
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