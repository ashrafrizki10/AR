import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const LANGUAGES = [
  { lang: 'Arabic', flag: '🇸🇦', native: 'العربية', level: 'Native' },
  { lang: 'English', flag: '🇬🇧', native: 'English', level: 'Fluent' },
  { lang: 'Italian', flag: '🇮🇹', native: 'Italiano', level: 'Intermediate' },
  { lang: 'German', flag: '🇩🇪', native: 'Deutsch', level: 'Intermediate' },
  { lang: 'Spanish', flag: '🇪🇸', native: 'Español', level: 'Intermediate' },
  { lang: 'Japanese', flag: '🇯🇵', native: '日本語', level: 'Learning' },
  { lang: 'Korean', flag: '🇰🇷', native: '한국어', level: 'Learning' },
  { lang: 'Chinese', flag: '🇨🇳', native: '中文', level: 'Learning' },
]

const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '8', label: 'Languages' },
  { value: '3+', label: 'Years Exp.' },
  { value: '100%', label: 'Dedication' },
]

const ProfileCard = ({ darkMode }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientY - cy) / (rect.height / 2)) * -12
    const y = ((e.clientX - cx) / (rect.width / 2)) * 12
    setRotation({ x, y })
  }

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 })

  return (
    <div className="perspective-card flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-72 rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.04) 50%, rgba(168,85,247,0.08) 100%)',
          border: '1px solid rgba(6,182,212,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 25px 60px rgba(6,182,212,0.12), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated border gradient */}
        <div
          className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.3), transparent, rgba(168,85,247,0.3))',
            animation: 'gradientShift 4s ease infinite',
          }}
        />

        {/* Profile photo */}
        <div className="relative p-6 pb-2 flex justify-center">
          <div className="relative" style={{ isolation: 'isolate' }}>

            {/* Outer animated pulse border */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ inset: -8, border: '1px solid rgba(6,182,212,0.3)', borderRadius: '24px' }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Second pulse border */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ inset: -16, border: '1px solid rgba(168,85,247,0.15)', borderRadius: '28px' }}
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />

            {/* Gradient border wrapper */}
            <div
              style={{
                padding: 3,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7, #06b6d4)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="relative overflow-hidden"
                style={{
                  width: '220px',
                  borderRadius: '17px',
                  background: 'linear-gradient(135deg, #0d1424, #0a0f1a)',
                }}
              >
                {/* Ambient inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 60%)',
                  }}
                />

                {/* Actual photo - displayed exactly as is, keeping aspect ratio */}
                {!imgError && (
                  <motion.img
                    src="/profile.jpg"
                    alt="Ashraf Rizki"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imgLoaded ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-auto object-contain block"
                  />
                )}

                {/* Fallback: initials avatar (shown while loading or on error) */}
                {(imgError || !imgLoaded) && (
                  <div className="w-full h-56 flex flex-col items-center justify-center">
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'conic-gradient(from 0deg, rgba(6,182,212,0.15), rgba(168,85,247,0.15), rgba(59,130,246,0.15), rgba(6,182,212,0.15))',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <span
                      className="relative z-10 font-black select-none"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '2.8rem',
                        background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 12px rgba(6,182,212,0.7))',
                      }}
                    >
                      AR
                    </span>
                    <span
                      className="relative z-10 text-xs tracking-widest mt-1"
                      style={{ color: 'rgba(6,182,212,0.6)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      XR/AR
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Orbiting accent dots */}
            {[
              { color: '#06b6d4', angle: 0, dur: 5 },
              { color: '#a855f7', angle: 120, dur: 6 },
              { color: '#3b82f6', angle: 240, dur: 7 },
            ].map(({ color, angle, dur }) => (
              <motion.div
                key={angle}
                className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
                style={{
                  background: color,
                  boxShadow: `0 0 8px ${color}, 0 0 16px ${color}55`,
                  top: '50%',
                  left: '50%',
                  marginTop: -5,
                  marginLeft: -5,
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 120,
                    Math.cos(((angle + 180) * Math.PI) / 180) * 120,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 120,
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 140,
                    Math.sin(((angle + 180) * Math.PI) / 180) * 140,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 140,
                  ],
                }}
                transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {/* Online status dot */}
            <div
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 z-20"
              style={{ background: '#22c55e', borderColor: '#030712', boxShadow: '0 0 10px #22c55e' }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-6 pt-4 text-center relative z-10">
          <h3
            className="text-xl font-black mb-1 gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}
          >
            Ashraf Rizki
          </h3>
          <p className="text-cyan-400 text-sm font-semibold mb-3">XR/AR Developer</p>
          <p className={`text-xs mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            📍 Morocco
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: '10+', l: 'Projects' },
              { v: '8', l: 'Languages' },
              { v: '3+', l: 'Years' },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="py-2 px-1 rounded-xl text-center"
                style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)' }}
              >
                <div className="text-cyan-400 font-bold text-sm">{v}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `linear-gradient(${rotation.y * 3 + 45}deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  )
}

const About = ({ darkMode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="relative py-24" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <div className="w-3 h-0.5 rounded-full bg-cyan-400" />
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ProfileCard darkMode={darkMode} />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Passionate Developer &{' '}
                <span className="gradient-text">Creative Technologist</span>
              </h3>
              <div className={`space-y-3 text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>
                  I'm <span className="text-cyan-400 font-semibold">Ashraf Rizki</span>, an XR/AR Developer
                  and creative technologist based in Morocco, passionate about building immersive digital
                  experiences that blur the line between the physical and digital worlds.
                </p>
                <p>
                  With expertise in <span className="text-cyan-400">React, Three.js, WebXR</span>, and
                  modern web technologies, I craft interactive 3D web experiences, augmented reality
                  applications, and pixel-perfect user interfaces.
                </p>
                <p>
                  I speak <span className="text-purple-400 font-semibold">8 languages</span> — a
                  multilingual perspective that fuels my global approach to design and development.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="gradient-text text-2xl font-black">{value}</div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                🌐 Languages I Speak
              </h4>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(({ lang, flag, level }) => (
                  <motion.span
                    key={lang}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border text-xs font-medium"
                    style={{
                      borderColor: 'rgba(6,182,212,0.2)',
                      color: level === 'Native' ? '#06b6d4' : level === 'Fluent' ? '#3b82f6' : darkMode ? '#9ca3af' : '#6b7280',
                    }}
                  >
                    {flag} {lang}
                    <span
                      className="px-1.5 py-0.5 rounded-full text-xs"
                      style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.65rem' }}
                    >
                      {level}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="glass-card p-5 space-y-3">
              {[
                { icon: '📧', label: 'Email', value: 'ashrafrizki10@gmail.com', href: 'mailto:ashrafrizki10@gmail.com' },
                { icon: '📍', label: 'Location', value: 'Morocco 🇲🇦' },
                { icon: '🎓', label: 'Focus', value: 'XR/AR & 3D Web Development' },
                { icon: '💼', label: 'Status', value: 'Open to opportunities ✅' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="text-base">{icon}</span>
                  <span className={`w-20 shrink-0 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}:</span>
                  {href ? (
                    <a href={href} className="text-cyan-400 hover:underline truncate">{value}</a>
                  ) : (
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
