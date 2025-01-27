'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Time } from '../time';
import { ThemeToggle } from '../theme-toggle';
import styles from './styles.module.css';

export function MobileHeader() {
  const pathname = usePathname();
  const isWorkPath = pathname === '/work' || pathname.startsWith('/work/');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.nameContainer}>
          <div className={`${styles.nameBox} flash-on-hover`}>
            <span className={styles.name}>HUDSON TREU</span>
          </div>
        </Link>
        <div className={styles.controls}>
          <nav className={styles.nav}>
            <Link 
              href="/about" 
              className={`${styles.navLink} ${pathname === '/about' ? styles.activeLink : ''}`}
            >
              About
            </Link>
            <Link 
              href="/work" 
              className={`${styles.navLink} ${isWorkPath ? styles.activeLink : ''}`}
            >
              Work
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
