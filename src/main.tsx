// src/main.tsx

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';

const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          1000 * 60 * 5,

        retry: 2,

        refetchOnWindowFocus:
          false,
      },
    },
  });

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } =
      await import(
        './mocks/browser'
      );

    return worker.start({
      onUnhandledRequest:
        'bypass',
    });
  }
}



// zmiana na prawdziwe api komentarz w linii 48 i 68

//enableMocking().then(() => {
  createRoot(
    document.getElementById(
      'root'
    )!
  ).render(
    <StrictMode>
      <QueryClientProvider
        client={queryClient}
      >
        <App />

        <ReactQueryDevtools
          initialIsOpen={
            false
          }
        />
      </QueryClientProvider>
    </StrictMode>
  );
//});