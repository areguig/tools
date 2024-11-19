'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BiCopy } from 'react-icons/bi';

interface FormData {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export default function UTMBuilder() {
  const [formData, setFormData] = useState<FormData>({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(formData.url);
    
    url.searchParams.set('utm_source', formData.source);
    url.searchParams.set('utm_medium', formData.medium);
    url.searchParams.set('utm_campaign', formData.campaign);
    
    if (formData.term) url.searchParams.set('utm_term', formData.term);
    if (formData.content) url.searchParams.set('utm_content', formData.content);
    
    setGeneratedUrl(url.toString());
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">UTM Campaign URL Builder</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Website URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="url"
            required
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Campaign Source <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="source"
            required
            value={formData.source}
            onChange={handleInputChange}
            placeholder="google, newsletter, linkedin"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Campaign Medium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="medium"
            required
            value={formData.medium}
            onChange={handleInputChange}
            placeholder="cpc, email, social"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="campaign"
            required
            value={formData.campaign}
            onChange={handleInputChange}
            placeholder="summer_sale"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Campaign Term
          </label>
          <input
            type="text"
            name="term"
            value={formData.term}
            onChange={handleInputChange}
            placeholder="running+shoes"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Campaign Content
          </label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="logolink"
            className="w-full px-3 py-2 rounded-md border border-border bg-background"
          />
        </div>

        <Button type="submit" className="w-full">
          Generate URL
        </Button>
      </form>

      {generatedUrl && (
        <div className="mt-6 p-4 rounded-lg border border-border bg-card">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Generated URL</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="relative"
            >
              <BiCopy className="h-4 w-4" />
              {showCopied && (
                <span className="absolute -top-8 -left-8 bg-background text-foreground px-2 py-1 rounded text-xs">
                  Copied!
                </span>
              )}
            </Button>
          </div>
          <div className="bg-muted p-3 rounded-md overflow-x-auto">
            <code className="text-sm break-all">{generatedUrl}</code>
          </div>
        </div>
      )}
    </div>
  );
}
