import { StrictMode } from 'react';
import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { PWAUpdatePrompt } from "@/components/pwa/PWAUpdatePrompt";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";

import { queryClient } from "@/lib/query-client";
import { router } from "@/routes/router";
import { useThemeStore } from "@/stores/use-theme-store";

import { enableMocking } from '@/mocks/enable-mocking';

import '@/index.css';

useThemeStore.getState().initializeTheme();

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        <PWAUpdatePrompt />
        <PWAInstallPrompt />
      </QueryClientProvider>
    </StrictMode>,
  );
});
