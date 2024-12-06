'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { Time } from './time';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-background border-r">
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Time />
            <ThemeToggle />
          </div>
          <Link href="/" className="block">
            <div className="border border-[#F76B93] h-[240px] pt-[80px] pb-[40px] px-4">
              <span className="text-4xl font-archive font-bold block">HUDSON</span>
              <span className="text-4xl font-archive font-bold block">TREU</span>
            </div>
          </Link>
        </div>
      </div>
      <nav className="space-y-1 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'flex items-center px-4 py-2 text-sm rounded-md transition-colors',
              pathname === item.path
                ? 'bg-muted font-medium text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
