import { motion, AnimatePresence } from 'framer-motion'

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #030712 0%, #0a0f1a 50%, #030712 100%)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Outer ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#06b6d4',
              borderRightColor: 'transparent',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full"
            style={{
              border: '2px solid transparent',
              borderBottomColor: '#3b82f6',
              borderLeftColor: 'transparent',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#a855f7',
              borderRightColor: 'transparent',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center */}
          <motion.div
            className="w-8 h-8 rounded-full"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Logo text */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-3xl font-black tracking-wider mb-2"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ASHRAF RIZKI
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            Loading Portfolio...
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #a855f7)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Loader
