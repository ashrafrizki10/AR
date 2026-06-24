import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  'XR/AR Developer',
  'Creative Technologist',
  '3D Web Developer',
  'React Developer',
  'UI/UX Enthusiast',
]

const SOCIALS = [
  { icon: '📷', label: 'Instagram', href: 'https://www.instagram.com/_ashraf_xr', color: '#e1306c' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/212721337413', color: '#25d366' },
  { icon: '🐱', label: 'GitHub', href: 'https://github.com/ashrafrizki10', color: '#ffffff' },
  { icon: '𝕏', label: 'X / Twitter', href: 'https://x.com/rizki_xr', color: '#1da1f2' },
  { icon: '🔗', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashraf-undefined-b68144419', color: '#0a66c2' },
]

const Hero = ({ darkMode }) => {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const canvasRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setRoleIdx((roleIdx + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIdx])

  // 3D Globe canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400
    let frame = 0
    let animId

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, 400, 400)
      const cx = 200, cy = 200, r = 140

      // Outer glow
      const grad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.4)
      grad.addColorStop(0, 'rgba(6,182,212,0.05)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2)
      ctx.fill()

      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 25) {
        const y = cy + r * Math.sin((lat * Math.PI) / 180)
        const rx = r * Math.cos((lat * Math.PI) / 180)
        ctx.beginPath()
        ctx.ellipse(cx, y, rx, rx * 0.35, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(6,182,212,0.15)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Longitude lines
      for (let lng = 0; lng < 180; lng += 30) {
        const angle = ((lng + frame * 0.3) * Math.PI) / 180
        ctx.beginPath()
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(angle)), r, (Math.PI / 2), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6,182,212,${Math.abs(Math.cos(angle)) * 0.25})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Globe outline
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6,182,212,0.35)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Orbiting dots
      for (let i = 0; i < 3; i++) {
        const angle = (frame * 0.02 + (i * Math.PI * 2) / 3)
        const ox = cx + r * 1.15 * Math.cos(angle)
        const oy = cy + r * 0.4 * Math.sin(angle)
        const colors = ['#06b6d4', '#3b82f6', '#a855f7']
        ctx.beginPath()
        ctx.arc(ox, oy, 5, 0, Math.PI * 2)
        ctx.fillStyle = colors[i]
        ctx.shadowColor = colors[i]
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Center glow
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      innerGrad.addColorStop(0, 'rgba(6,182,212,0.08)')
      innerGrad.addColorStop(0.5, 'rgba(59,130,246,0.04)')
      innerGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = innerGrad
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center grid-bg pt-20"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-400/20 text-sm text-cyan-400"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for work
            </motion.div>

            {/* Name */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Hello, I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-none"
              >
                <span className="gradient-text">Ashraf</span>
                <br />
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Rizki</span>
              </motion.h1>
            </div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-xl md:text-2xl font-mono"
            >
              <span className="text-cyan-400">{'>'}</span>
              <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{displayed}</span>
              <span className="typewriter-cursor" />
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {['AR', 'EN', 'IT', 'DE', 'ES', 'JP', 'KR', 'ZH'].map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 text-xs font-semibold rounded-full glass border border-white/10"
                  style={{ color: '#06b6d4' }}
                >
                  {lang}
                </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`text-base leading-relaxed max-w-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Crafting immersive <span className="text-cyan-400 font-semibold">XR/AR experiences</span> and
              stunning 3D web interactions. Passionate about pushing the boundaries of what's possible on the web.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 text-base font-semibold"
              >
                <span>🚀</span>
                <span>View Projects</span>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2 text-base"
              >
                <span>💬</span>
                <span>Let's Talk</span>
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Follow me:</span>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-base transition-all"
                    style={{ '--hover-color': color }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative float-animation">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(6,182,212,0.1)',
                  transform: 'scale(1.3)',
                  animationDuration: '3s',
                }}
              />
              {/* Canvas globe */}
              <canvas
                ref={canvasRef}
                className="w-full max-w-[380px] h-auto"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.3))',
                }}
              />

              {/* Floating info cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass border border-cyan-400/20 px-4 py-2 rounded-2xl text-sm"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <div className="text-cyan-400 font-bold text-lg">5+</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Languages</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass border border-purple-400/20 px-4 py-2 rounded-2xl text-sm"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <div className="text-purple-400 font-bold text-lg">10+</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs tracking-widest uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-9 rounded-full border border-cyan-400/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
