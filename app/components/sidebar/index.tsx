'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Time } from '../time';
import { ThemeToggle } from '../theme-toggle';
import { WorkContent } from './work-content';
import styles from './styles.module.css';

const navItems = [
  { href: '/about', text: 'About' },
  { href: '/work', text: 'Work' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isWorkPath = pathname === '/work' || pathname.startsWith('/work/');

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.controls}>
            <Time />
            <ThemeToggle />
          </div>
          <Link href="/" className={styles.nameContainer}>
            <div className={`${styles.nameBox} flash-on-hover`}>
              <span className={styles.name}>HUDSON</span>
              <span className={styles.name}>TREU</span>
            </div>
          </Link>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = item.href === '/work' 
              ? isWorkPath 
              : pathname === item.href;
              
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  isActive ? styles.activeLink : ''
                }`}
              >
                <span className="flash-on-hover">{item.text}</span>
              </Link>
            );
          })}
        </nav>
        {isWorkPath && <WorkContent />}
      </div>
    </aside>
  );
}
