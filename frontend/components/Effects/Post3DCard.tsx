'use client';

import { motion } from 'framer-motion';
import { Holographic3DCard } from '@/components/Effects/Holographic3DCard';
import { ReactNode } from 'react';

interface Post3DCardProps {
  children: ReactNode;
  index: number;
}

export function Post3DCard({ children, index }: Post3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, z: -100 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        rotateY: 5,
        rotateX: -5,
        z: 50,
      }}
    >
      <Holographic3DCard variant="green">{children}</Holographic3DCard>
    </motion.div>
  );
}
