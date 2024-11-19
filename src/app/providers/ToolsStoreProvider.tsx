'use client';

import { type PropsWithChildren } from 'react';
import { useToolsStore } from '../store/toolsStore';

export function ToolsStoreProvider({ children }: PropsWithChildren) {
  return children;
}

// Re-export the store hook for convenience
export { useToolsStore };
