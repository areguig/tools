'use client';

import Link from 'next/link';
import { BiCodeAlt } from 'react-icons/bi';
import { BiLink } from 'react-icons/bi';
import { BiData } from 'react-icons/bi';
import { BiGitCompare } from 'react-icons/bi';
import { BiCode } from 'react-icons/bi';

const tools = [
  {
    name: 'Base64',
    description: 'Encode and decode Base64 strings',
    href: '/base64',
    icon: <BiCodeAlt className="h-6 w-6" />,
  },
  {
    name: 'UTM Builder',
    description: 'Build UTM campaign URLs',
    href: '/utm-builder',
    icon: <BiLink className="h-6 w-6" />,
  },
  {
    name: 'JSON Prettifier',
    description: 'Format and validate JSON',
    href: '/prettyjson',
    icon: <BiData className="h-6 w-6" />,
  },
  {
    name: 'Diff Tool',
    description: 'Compare text differences',
    href: '/difftool',
    icon: <BiGitCompare className="h-6 w-6" />,
  },
  {
    name: 'Wisdom',
    description: 'External tool for wisdom quotes',
    href: 'https://areguig.github.io/wisdom',
    icon: <BiCode className="h-6 w-6" />,
    external: true,
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Developer Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            target={tool.external ? '_blank' : undefined}
            rel={tool.external ? 'noopener noreferrer' : undefined}
            className="p-6 bg-card hover:bg-accent/50 rounded-lg border border-border transition-colors"
          >
            <div className="flex items-center gap-4">
              {tool.icon}
              <div>
                <h2 className="text-xl font-semibold">{tool.name}</h2>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
