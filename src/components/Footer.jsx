import { motion } from 'framer-motion'

const SOCIALS = [
  { icon: '🐱', label: 'GitHub', href: 'https://github.com/ashrafrizki10' },
  { icon: '🔗', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashraf-undefined-b68144419' },
  { icon: '📷', label: 'Instagram', href: 'https://www.instagram.com/_ashraf_xr' },
  { icon: '𝕏', label: 'X', href: 'https://x.com/rizki_xr' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/212721337413' },
]

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={`relative border-t transition-all duration-300 py-12 px-6 ${
      darkMode ? 'border-white/5 bg-[#030712]' : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('#home')}>
            <span
              className="text-lg font-black tracking-wider"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AR
            </span>
            <span className={`text-lg font-black ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Portfolio
            </span>
          </div>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            XR/AR Developer & Creative Technologist
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' },
          ].map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all text-base ${
                darkMode
                  ? 'border-white/5 bg-white/5 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                  : 'border-gray-200 bg-gray-100 text-gray-600 hover:border-cyan-500 hover:text-cyan-500'
              }`}
              title={label}
            >
              <span>{icon}</span>
            </motion.a>
          ))}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
          &copy; {currentYear} Ashraf Rizki. All rights reserved.
        </p>
        <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
          Designed & Built with 💻 & ⚡
        </p>
      </div>
    </footer>
  )
}

export default Footer
