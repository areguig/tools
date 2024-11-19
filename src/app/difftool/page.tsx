'use client';

import { useState } from 'react';
import { BiGitCompare } from 'react-icons/bi';
import { useToolsStore } from '../store/toolsStore';
import { cn } from '@/lib/utils';

export default function DiffTool() {
  const { toolStates, updateToolState } = useToolsStore();
  const [text1, setText1] = useState(toolStates.diff?.text1 || '');
  const [text2, setText2] = useState(toolStates.diff?.text2 || '');
  const [diff, setDiff] = useState<string[][]>([]);

  const computeDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: string[][] = [];
    let i = 0, j = 0;

    while (i < lines1.length || j < lines2.length) {
      const line1 = i < lines1.length ? lines1[i] : '';
      const line2 = j < lines2.length ? lines2[j] : '';

      if (line1 === line2) {
        result.push(['equal', line1]);
        i++;
        j++;
      } else if (i < lines1.length && (!lines2[j] || lines1[i] !== lines2[j])) {
        result.push(['removed', line1]);
        i++;
      } else if (j < lines2.length && (!lines1[i] || lines1[i] !== lines2[j])) {
        result.push(['added', line2]);
        j++;
      }
    }

    setDiff(result);
    updateToolState('diff', { text1, text2 });
  };

  const renderDiff = () => {
    return diff.map((line, index) => {
      const [type, content] = line;
      const bgColor = type === 'removed' ? 'bg-destructive/10' : type === 'added' ? 'bg-emerald-500/10' : '';
      const textColor = type === 'removed' ? 'text-destructive' : type === 'added' ? 'text-emerald-500' : 'text-foreground';
      const prefix = type === 'removed' ? '- ' : type === 'added' ? '+ ' : '  ';

      return (
        <div key={index} className={cn("font-mono text-sm px-4 py-1", bgColor, textColor)}>
          {prefix}{content}
        </div>
      );
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <BiGitCompare className="h-8 w-8" />
        <h1 className="text-4xl font-bold">Diff Tool</h1>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Original Text</h2>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text..."
              rows={10}
              className="w-full p-4 rounded-lg border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Modified Text</h2>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text..."
              rows={10}
              className="w-full p-4 rounded-lg border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={computeDiff}
            disabled={!text1.trim() || !text2.trim()}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <BiGitCompare className="h-5 w-5" />
            Compare Texts
          </button>
        </div>

        {diff.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Differences</h2>
            <div className="rounded-lg border overflow-hidden bg-muted">
              {renderDiff()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
