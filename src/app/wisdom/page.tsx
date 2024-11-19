'use client';

import { useState } from 'react';
import { BiBrain } from 'react-icons/bi';
import { useToolsStore } from '../store/toolsStore';
import { cn } from '@/lib/utils';

export default function WisdomTool() {
  const { toolStates, updateToolState } = useToolsStore();
  const [input, setInput] = useState(toolStates.wisdom?.input || '');
  const [output, setOutput] = useState(toolStates.wisdom?.output || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement AI wisdom generation
      const mockResponse = "This is a placeholder for AI-generated wisdom. The actual implementation will connect to an AI service.";
      setOutput(mockResponse);
      updateToolState('wisdom', { input, output: mockResponse });
    } catch (error) {
      console.error('Error generating wisdom:', error);
      setOutput('Failed to generate wisdom. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <BiBrain className="h-8 w-8" />
        <h1 className="text-4xl font-bold">Wisdom Generator</h1>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ask for Wisdom</h2>
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your question or topic for wisdom..."
            className="w-full p-4 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <BiBrain className="h-5 w-5" />
            {isLoading ? 'Generating...' : 'Generate Wisdom'}
          </button>
        </div>

        {output && (
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Wisdom</h2>
            <p className="text-muted-foreground italic whitespace-pre-wrap">
              {output}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
