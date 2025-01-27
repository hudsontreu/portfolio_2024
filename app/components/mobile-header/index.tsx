'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Time } from '../time';
import { ThemeToggle } from '../theme-toggle';
import styles from './styles.module.css';
import { client } from '../../../sanity/lib/client';
import { LIST_QUERIES } from '../../lib/queries';
import { Work } from '../../lib/types';

export function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isWorkPath = pathname === '/work' || pathname.startsWith('/work/');
  const [showWorkList, setShowWorkList] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [previousPath, setPreviousPath] = useState(pathname);

  const handleScroll = useCallback(() => {
    if (showWorkList) {
      setShowWorkList(false);
    }
  }, [showWorkList]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await client.fetch(LIST_QUERIES.ALL);
        setWorks(data);
      } catch (error) {
        console.error('Error fetching works:', error);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle pathname changes
  useEffect(() => {
    // If coming from a non-work page to the work page, show the list
    if (!previousPath.startsWith('/work') && pathname === '/work') {
      setShowWorkList(true);
    }
    // If navigating away from work pages, hide the list
    else if (!pathname.startsWith('/work')) {
      setShowWorkList(false);
    }
    
    setPreviousPath(pathname);
  }, [pathname, previousPath]);

  const handleWorkClick = (e: React.MouseEvent) => {
    if (isWorkPath) {
      e.preventDefault();
      setShowWorkList(!showWorkList);
    }
  };

  return (
    <>
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
              <div className={styles.workLinkContainer}>
                <Link 
                  href="/work"
                  className={`${styles.navLink} ${isWorkPath ? styles.activeLink : ''}`}
                  onClick={handleWorkClick}
                >
                  Work
                </Link>
              </div>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {showWorkList && (
        <div className={styles.workList}>
          {works.map((work) => (
            <Link
              key={work._id}
              href={`/work/${work.slug}`}
              className={styles.workItem}
              onClick={() => setShowWorkList(false)}
            >
              <span className={styles.workTitle}>{work.title}</span>
              <span className={styles.workDate}>{work.date}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
