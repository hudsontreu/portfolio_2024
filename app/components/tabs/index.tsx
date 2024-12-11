'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type Tab = {
  title: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  className?: string;
  onTabChange?: (tab: Tab) => void;
}

export function Tabs({ tabs, className = '', onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab)}
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
  );
}
