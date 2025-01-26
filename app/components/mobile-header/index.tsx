'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Time } from '../time';
import { ThemeToggle } from '../theme-toggle';
import styles from './styles.module.css';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isWorkPath = pathname === '/work' || pathname.startsWith('/work/');

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.nameContainer}>
          <div className={`${styles.nameBox} flash-on-hover`}>
            <span className={styles.name}>HUDSON</span>
            <span className={styles.name}>TREU</span>
          </div>
        </Link>
        <div className={styles.controls}>
          <Time />
          <ThemeToggle />
          <button 
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={handleMenuClick}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon} />
          </button>
        </div>
      </div>
    </header>
  );
}
