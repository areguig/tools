'use client';

import { useState } from 'react';
import { BiData } from 'react-icons/bi';
import { useToolsStore } from '../store/toolsStore';
import { cn } from '@/lib/utils';

function formatJSON(input: string): { formatted: string; error: string | null } {
  try {
    const parsed = JSON.parse(input);
    return { formatted: JSON.stringify(parsed, null, 2), error: null };
  } catch (e) {
    return { formatted: '', error: (e as Error).message };
  }
}

export default function JSONPrettifier() {
  const { toolStates, updateToolState } = useToolsStore();
  const [input, setInput] = useState(toolStates.json?.input || '');
  const [output, setOutput] = useState(toolStates.json?.output || '');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    const { formatted, error } = formatJSON(input);
    setOutput(formatted);
    setError(error);
    updateToolState('json', { input, output: formatted });
  };

  const renderLineNumbers = (text: string) => {
    return text.split('\n').map((_, i) => (
      <div key={i} className="select-none text-muted-foreground text-right pr-4 text-sm">
        {i + 1}
      </div>
    ));
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <BiData className="h-8 w-8" />
        <h1 className="text-4xl font-bold">JSON Prettifier</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Input JSON</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            rows={10}
            className="w-full p-4 rounded-lg border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleFormat}
            disabled={!input.trim()}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <BiData className="h-5 w-5" />
            Format JSON
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive">
            {error}
          </div>
        )}

        {output && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Formatted JSON</h2>
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted p-4 flex">
                <div className="flex-none">
                  {renderLineNumbers(output)}
                </div>
                <pre className="flex-1 font-mono text-sm overflow-x-auto text-foreground">
                  <code>{output}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
