'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BiCopy } from 'react-icons/bi';
import { MdSwapHoriz } from 'react-icons/md';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError(null);
    try {
      if (mode === 'encode') {
        setOutput(btoa(value));
      } else {
        setOutput(atob(value));
      }
    } catch (err) {
      setError('Invalid input for ' + mode);
      setOutput('');
    }
  };

  const handleModeToggle = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleModeToggle}
          className="ml-auto"
        >
          <MdSwapHoriz className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter text to ${mode}...`}
            className="min-h-[200px]"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(input)}
            className="absolute top-2 right-2"
          >
            <BiCopy className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[200px]"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(output)}
            className="absolute top-2 right-2"
          >
            <BiCopy className="h-4 w-4" />
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}
