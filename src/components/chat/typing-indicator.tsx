"use client";

import { motion } from 'framer-motion';

export function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: -5,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <motion.span
        variants={dotVariants}
        initial="initial"
        animate="animate"
        className="h-2 w-2 rounded-full bg-muted-foreground"
        style={{ transitionDelay: '0s' }}
      />
      <motion.span
        variants={dotVariants}
        initial="initial"
        animate="animate"
        className="h-2 w-2 rounded-full bg-muted-foreground"
        style={{ transitionDelay: '0.1s' }}
      />
      <motion.span
        variants={dotVariants}
        initial="initial"
        animate="animate"
        className="h-2 w-2 rounded-full bg-muted-foreground"
        style={{ transitionDelay: '0.2s' }}
      />
    </div>
  );
}
