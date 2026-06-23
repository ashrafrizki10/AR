import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'XR AR Viewer',
    category: 'XR/AR',
    description: 'An immersive WebXR application that overlays 3D models onto real-world environments using the device camera, built with Three.js and AR.js.',
    tech: ['Three.js', 'WebXR', 'AR.js', 'JavaScript'],
    color: '#06b6d4',
    emoji: '🥽',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: true,
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    category: '3D Web',
    description: 'A stunning interactive 3D portfolio with Three.js rendering, physics-based animations, and real-time shader effects for an unforgettable user experience.',
    tech: ['React', 'Three.js', 'GSAP', 'Vite'],
    color: '#a855f7',
    emoji: '🌐',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Chat Interface',
    category: 'Frontend',
    description: 'A modern AI-powered chat application with streaming responses, code highlighting, markdown rendering, and a beautiful glassmorphism UI.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    color: '#3b82f6',
    emoji: '🤖',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: false,
  },
  {
    id: 4,
    title: 'Virtual Reality Tour',
    category: 'XR/AR',
    description: 'A 360° virtual reality tour platform for real estate showcasing, with hotspots, audio guides, and interactive 3D floor plans.',
    tech: ['A-Frame', 'WebXR', 'JavaScript', 'GSAP'],
    color: '#06b6d4',
    emoji: '🏠',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: false,
  },
  {
    id: 5,
    title: 'E-Commerce 3D Store',
    category: 'Frontend',
    description: 'A next-generation e-commerce platform with 3D product previews, AR try-on functionality, and a seamless checkout experience.',
    tech: ['React', 'Three.js', 'Node.js', 'MongoDB'],
    color: '#f59e0b',
    emoji: '🛍️',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: false,
  },
  {
    id: 6,
    title: 'Motion Design System',
    category: '3D Web',
    description: 'A comprehensive animation library and design system for web applications, featuring 50+ pre-built micro-animations and interaction patterns.',
    tech: ['Framer Motion', 'React', 'TypeScript', 'Storybook'],
    color: '#a855f7',
    emoji: '✨',
    demo: '#',
    code: 'https://github.com/ashrafrizki10',
    featured: false,
  },
]

const FILTERS = ['All', 'XR/AR', '3D Web', 'Frontend']

const ProjectCard = ({ project, darkMode, index }) => {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientY - cy) / (rect.height / 2)) * -8
    const y = ((e.clientX - cx) / (rect.width / 2)) * 8
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`glass-card p-6 relative overflow-hidden cursor-pointer ${project.featured ? 'ring-1' : ''}`}
      {...(project.featured ? { style: { '--tw-ring-color': project.color + '33' } } : {})}
    >
      {project.featured && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: project.color + '22', color: project.color }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        animate={{ opacity: hovered ? 0.3 : 0 }}
        style={{
          background: `radial-gradient(circle at center, ${project.color}15 0%, transparent 70%)`,
        }}
      />

      {/* Emoji / icon */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
        className="text-5xl mb-4 block"
        style={{
          filter: hovered ? `drop-shadow(0 0 12px ${project.color})` : 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        {project.emoji}
      </motion.div>

      {/* Category badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
        style={{ background: project.color + '15', color: project.color }}
      >
        {project.category}
      </div>

      <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {project.title}
      </h3>

      <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map(t => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: darkMode ? '#94a3b8' : '#64748b',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex-1 text-center py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)`,
            border: `1px solid ${project.color}33`,
            color: project.color,
          }}
        >
          🔗 Live Demo
        </motion.a>
        <motion.a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex-1 text-center py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: darkMode ? '#94a3b8' : '#64748b',
          }}
        >
          🐱 GitHub
        </motion.a>
      </div>
    </motion.div>
  )
}

const Projects = ({ darkMode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" className="relative py-24" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)'
            : 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6)' }} />
            <div className="w-3 h-0.5 rounded-full bg-blue-400" />
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }} />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center flex-wrap gap-3 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === f ? 'text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600'
              }`}
              style={filter === f ? {
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                boxShadow: '0 0 20px rgba(6,182,212,0.3)',
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                darkMode={darkMode}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/ashrafrizki10"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline inline-flex items-center gap-2"
          >
            <span>🐱</span> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
