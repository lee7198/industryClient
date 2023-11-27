import React from 'react';
import { Transition, Variants, motion } from 'framer-motion';

export default function PercentedLoading({ percent }: { percent: number }) {
  const ContainerVariants: Variants = {
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

  const DotVariants: Variants = {
    initial: {
      y: '0%',
    },
    animate: {
      y: '100%',
    },
  };

  const DotTransition: Transition = {
    duration: 1,
    yoyo: Infinity,
    repeat: Infinity,
    repeatType: 'reverse',
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
