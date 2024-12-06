'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-1 hover:bg-muted rounded-md transition-colors ${theme === 'light' ? 'bg-muted' : ''}`}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light mode</span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1 hover:bg-muted rounded-md transition-colors ${theme === 'dark' ? 'bg-muted' : ''}`}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  );
}
