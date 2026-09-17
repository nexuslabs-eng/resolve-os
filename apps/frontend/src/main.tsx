import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useThemeStore } from "@/stores/use-theme-store";
import { enableMocking } from '@/mocks/enable-mocking';
import '@/styles/index.css';
import { AppLoading } from '@/components/loading/AppLoading';

useThemeStore.getState().initializeTheme();

const container = document.getElementById("root");

if (!container)
  throw new Error("ResolveOS root element was not found.")

const root = createRoot(container);

root.render(
  <StrictMode>
    <AppLoading />
  </StrictMode>
)

const startApplication = async () => {
  try {
    await enableMocking();

    const { default: AppRuntime } = await import("@/app/AppRuntime");

    root.render(
      <StrictMode>
        <AppRuntime />
      </StrictMode>
    );
  } catch (error) {
    console.error(`ResolveOS startup failed: ${error}`);

    root.render(
      <StrictMode>
        <AppLoading
          failed
          onRetry={() => window.location.reload()}
        />
      </StrictMode>
    );
  }
};

void startApplication();