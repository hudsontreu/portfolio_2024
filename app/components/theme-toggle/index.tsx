'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={styles.button}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          <Sun className={styles.icon} />
        ) : (
          <Moon className={styles.icon} />
        )}
      </button>
    </div>
  );
}
