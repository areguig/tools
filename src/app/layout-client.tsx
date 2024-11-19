'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BiCodeAlt } from 'react-icons/bi';
import { BiLink } from 'react-icons/bi';
import { BiData } from 'react-icons/bi';
import { BiGitCompare } from 'react-icons/bi';
import { BiCode } from 'react-icons/bi';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
  external?: boolean;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: <BiHomeAlt2 className="h-5 w-5" /> },
  { name: 'Base64', href: '/base64', icon: <BiCodeAlt className="h-5 w-5" /> },
  { name: 'UTM Builder', href: '/utm-builder', icon: <BiLink className="h-5 w-5" /> },
  { name: 'JSON Prettifier', href: '/prettyjson', icon: <BiData className="h-5 w-5" /> },
  { name: 'Diff Tool', href: '/difftool', icon: <BiGitCompare className="h-5 w-5" /> },
  {
    name: 'Wisdom',
    href: 'https://areguig.github.io/wisdom',
    icon: <BiCode className="h-5 w-5" />,
    external: true,
  },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Collapse sidebar after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "border-r border-border bg-card transition-all duration-300 ease-in-out",
          isExpanded || isHovered ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "flex h-16 items-center border-b border-border px-4 transition-all duration-300",
          isExpanded || isHovered ? "justify-between" : "justify-center"
        )}>
          {(isExpanded || isHovered) && <h1 className="text-lg font-semibold">Dev Tools</h1>}
        </div>
        <nav className="space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50',
                  !isExpanded && !isHovered && "justify-center"
                )}
              >
                {item.icon}
                {(isExpanded || isHovered) && item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="h-16 border-b border-border px-4" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
