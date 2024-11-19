'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Base64State {
  input: string;
  output: string;
  mode: 'encode' | 'decode';
}

export interface JSONState {
  input: string;
  output: string;
}

export interface DiffState {
  text1: string;
  text2: string;
}

export interface UTMState {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  output: string;
}

export interface WisdomState {
  input: string;
  output: string;
}

export interface ToolStates {
  base64: Base64State;
  json: JSONState;
  diff: DiffState;
  utm: UTMState;
  wisdom: WisdomState;
}

export interface ToolsStore {
  toolStates: ToolStates;
  updateToolState: <T extends keyof ToolStates>(tool: T, state: Partial<ToolStates[T]>) => void;
}

const initialState: ToolStates = {
  base64: {
    input: '',
    output: '',
    mode: 'encode',
  },
  json: {
    input: '',
    output: '',
  },
  diff: {
    text1: '',
    text2: '',
  },
  utm: {
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
    output: '',
  },
  wisdom: {
    input: '',
    output: '',
  },
};

export const useToolsStore = create<ToolsStore>()(
  persist(
    (set) => ({
      toolStates: initialState,
      updateToolState: (tool, state) =>
        set((store) => ({
          toolStates: {
            ...store.toolStates,
            [tool]: {
              ...store.toolStates[tool],
              ...state,
            },
          },
        })),
    }),
    {
      name: 'tools-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
