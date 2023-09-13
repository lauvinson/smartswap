import React from 'react'
import Logo from '@/assets/logo/color.svg'
import { SITE_NAME } from '@/utils/config'
import { motion } from 'framer-motion'
import { Image } from '@nextui-org/react'

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
        <Image draggable="false" width={50} height={50} src={Logo.src} alt={SITE_NAME} />
      </motion.div>
    </div>
  )
}
