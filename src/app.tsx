import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppProvider } from './context/AppContext';
import AppRoutes from './router';

// Tạo QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        // Không retry với lỗi auth
        if (error instanceof Error && error.message === 'Bad credentials') {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App; 