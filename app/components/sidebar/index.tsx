'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Time } from '../time';
import { ThemeToggle } from '../theme-toggle';
import styles from './styles.module.css';

const navItems = [
  { href: '/about', text: 'About' },
  { href: '/work', text: 'Work' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.controls}>
            <Time />
            <ThemeToggle />
          </div>
          <Link href="/" className={styles.nameContainer}>
            <div className={styles.nameBox}>
              <span className={styles.name}>HUDSON</span>
              <span className={styles.name}>TREU</span>
            </div>
          </Link>
        </div>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${
              pathname === item.href ? styles.activeLink : ''
            }`}
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
