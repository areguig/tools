'use client';

import { type PropsWithChildren, createContext, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { createToolsStore, type ToolsStoreType } from '../store/toolsStore';

const ToolsStoreContext = createContext<StoreApi<ToolsStoreType> | null>(null);

export function ToolsStoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<StoreApi<ToolsStoreType>>();
  if (!storeRef.current) {
    storeRef.current = createToolsStore();
  }
  return (
    <ToolsStoreContext.Provider value={storeRef.current}>
      {children}
    </ToolsStoreContext.Provider>
  );
}

export function useToolsStore<T>(selector: (store: ToolsStoreType) => T): T {
  const store = useContext(ToolsStoreContext);
  if (!store) throw new Error('Missing ToolsStoreProvider');
  return useStore(store, selector);
}
