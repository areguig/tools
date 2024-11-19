'use client';

import { useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';

interface StoreProviderProps<T> {
  store: StoreApi<T>;
  children: React.ReactNode;
}

export function StoreProvider<T>({ store, children }: StoreProviderProps<T>) {
  const storeRef = useRef<StoreApi<T>>();
  if (!storeRef.current) {
    storeRef.current = store;
  }
  return children;
}
