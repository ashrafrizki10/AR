import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href, label) => {
    setActive(label)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => scrollTo('#home', 'Home')}
        >
          <span
            className="text-xl font-black tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AR
          </span>
          <span
            className={`text-xl font-black ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Portfolio
          </span>
        </motion.div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => scrollTo(href, label)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active === label
                    ? 'text-cyan-400'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
                {active === label && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-12 h-6 rounded-full transition-all duration-300 overflow-hidden"
            style={{ background: darkMode ? 'rgba(6,182,212,0.2)' : 'rgba(251,191,36,0.2)' }}
            aria-label="Toggle dark mode"
          >
            <motion.div
              className="absolute top-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
              animate={{ x: darkMode ? 24 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                background: darkMode ? '#06b6d4' : '#f59e0b',
                boxShadow: darkMode ? '0 0 8px #06b6d4' : '0 0 8px #f59e0b'
              }}
            >
              {darkMode ? '🌙' : '☀️'}
            </motion.div>
          </motion.button>

          {/* Hire me button */}
          <motion.a
            href="mailto:ashrafrizki10@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex btn-primary items-center gap-2 text-sm"
            style={{ padding: '8px 20px' }}
          >
            <span>✉</span>
            <span>Hire Me</span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 w-6 bg-cyan-400 rounded-full"
                animate={menuOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 8 : i === 2 ? -8 : 0,
                  opacity: i === 1 ? 0 : 1
                } : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-3 rounded-2xl overflow-hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href, label)}
                className={`block w-full text-left px-6 py-3.5 text-sm font-medium border-b border-white/5 transition-colors ${
                  active === label ? 'text-cyan-400 bg-cyan-400/5' : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href="mailto:ashrafrizki10@gmail.com"
              className="block w-full text-center px-6 py-4 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors"
            >
              ✉ Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
