import React from 'react'
import { motion } from 'framer-motion'
import { AppLogo } from '@/components/layout/AppLogo'

export function LoadingPage() {
  return (
    <div className="flex justify-center items-center align-middle h-screen w-full">
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{
          y: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}>
        <AppLogo draggable={false} width={50} height={50} />
      </motion.div>
    </div>
  )
}
