'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab)}
            className={styles.tab}
          >
            {activeTab.value === tab.value && (
              <motion.div
                layoutId="activeTab"
                className={styles.activeTab}
                transition={{ 
                  type: "spring", 
                  bounce: 0.3, 
                  duration: 0.6 
                }}
              />
            )}
            <span className={styles.tabTitle}>
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {activeTab.content}
      </div>
    </div>
  );
}
