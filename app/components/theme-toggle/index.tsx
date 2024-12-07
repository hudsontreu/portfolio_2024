'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <button
        onClick={() => setTheme('light')}
        className={`${styles.button} ${theme === 'light' ? styles.active : ''}`}
        aria-label="Switch to light theme"
      >
        <Sun className={styles.icon} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`${styles.button} ${theme === 'dark' ? styles.active : ''}`}
        aria-label="Switch to dark theme"
      >
        <Moon className={styles.icon} />
      </button>
    </div>
  );
}
