import React from 'react';
import { motion } from 'framer-motion';

export default function PercentedLoading({ percent }: { percent: number }) {
  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const DotVariants = {
    initial: {
      y: '0%',
    },
    animate: {
      y: '100%',
    },
  };

  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <motion.div
        className="flex gap-4"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="block h-4 w-4 rounded-full bg-sky-500"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-sky-500"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-sky-500"
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
      <div className="text-sm">모델을 불러오는 중 {percent}%...</div>
    </div>
  );
}
