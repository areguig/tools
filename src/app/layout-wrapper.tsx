'use client';

import { ThemeProvider } from './ThemeProvider';
import { ToolsStoreProvider } from './providers/ToolsStoreProvider';
import ClientLayout from './layout-client';

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ToolsStoreProvider>
        <ClientLayout>{children}</ClientLayout>
      </ToolsStoreProvider>
    </ThemeProvider>
  );
}
