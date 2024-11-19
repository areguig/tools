'use client';

import { type ReactNode } from 'react';
import { Provider } from 'jotai';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider>{children}</Provider>;
}
