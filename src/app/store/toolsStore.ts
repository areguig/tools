'use client';

import { createStore } from 'zustand';

interface ToolState {
  base64: {
    input: string;
    output: string;
    mode: 'encode' | 'decode';
  };
  json: {
    input: string;
    output: string;
  };
  diff: {
    text1: string;
    text2: string;
  };
  utm: {
    url: string;
    campaign: string;
    source: string;
    medium: string;
    term: string;
    content: string;
  };
}

interface ToolsStore {
  toolStates: ToolState;
  updateToolState: (tool: keyof ToolState, state: any) => void;
  clearAllStates: () => void;
}

const initialState: ToolState = {
  base64: {
    input: '',
    output: '',
    mode: 'encode'
  },
  json: {
    input: '',
    output: ''
  },
  diff: {
    text1: '',
    text2: ''
  },
  utm: {
    url: '',
    campaign: '',
    source: '',
    medium: '',
    term: '',
    content: ''
  }
};

export const createToolsStore = () => {
  return createStore<ToolsStore>()((set) => ({
    toolStates: initialState,
    updateToolState: (tool, state) =>
      set((store) => ({
        toolStates: {
          ...store.toolStates,
          [tool]: state
        }
      })),
    clearAllStates: () => set({ toolStates: initialState })
  }));
};

export type ToolsStoreType = ReturnType<typeof createToolsStore>;
