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
import { PlayfulLayout } from '@/components/layout/PlayfulLayout'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayfulLayout><HomePage /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/tasks",
    element: <PlayfulLayout><TasksPage /></PlayfulLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/progress",
    element: <PlayfulLayout><ProgressPage /></PlayfulLayout>,
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