import React from 'react';
import styles from './progress.module.css';

export default function ProgressBar({ className }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="h-[2px] w-full overflow-hidden bg-zinc-100/10">
        <div
          className={`h-full w-full bg-sky-600 ${styles.progress} ${styles.leftRight}`}
        ></div>
      </div>
    </div>
  );
}
