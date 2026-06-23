import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    icon: '🎨',
    color: '#06b6d4',
    skills: [
      { name: 'React.js', level: 92, icon: '⚛️' },
      { name: 'JavaScript', level: 90, icon: '🟨' },
      { name: 'TypeScript', level: 78, icon: '🔷' },
      { name: 'HTML/CSS', level: 95, icon: '🌐' },
      { name: 'Tailwind CSS', level: 88, icon: '💨' },
    ],
  },
  {
    category: '3D & XR',
    icon: '🥽',
    color: '#a855f7',
    skills: [
      { name: 'Three.js', level: 85, icon: '🎮' },
      { name: 'WebXR', level: 80, icon: '🥽' },
      { name: 'React Three Fiber', level: 82, icon: '⚛️' },
      { name: 'Blender', level: 70, icon: '🔸' },
      { name: 'AR.js', level: 75, icon: '📱' },
    ],
  },
  {
    category: 'Backend & Tools',
    icon: '⚙️',
    color: '#3b82f6',
    skills: [
      { name: 'Node.js', level: 72, icon: '🟢' },
      { name: 'Git/GitHub', level: 88, icon: '🐱' },
      { name: 'Vite', level: 90, icon: '⚡' },
      { name: 'Figma', level: 75, icon: '🖌️' },
      { name: 'MongoDB', level: 65, icon: '🍃' },
    ],
  },
]

const TECH_STACK = [
  'React', 'Three.js', 'WebXR', 'Vite', 'TypeScript', 'Node.js',
  'Tailwind', 'Framer Motion', 'GSAP', 'Blender', 'AR.js', 'WebGL',
  'REST API', 'Git', 'Figma', 'MongoDB'
]

const SkillBar = ({ name, level, icon, color, delay, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-medium">{name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.8 }}
          className="text-xs font-mono"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-fill"
          initial={{ width: '0%' }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        />
      </div>
    </motion.div>
  )
}

const Skills = ({ darkMode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="skills" className="relative py-24" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(168,85,247,0.04) 0%, transparent 70%)'
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
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">What I Know</p>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #a855f7)' }} />
            <div className="w-3 h-0.5 rounded-full bg-purple-400" />
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }} />
          </div>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {SKILL_CATEGORIES.map(({ category, icon, color }, i) => (
            <button
              key={category}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === i ? 'text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === i ? {
                background: `linear-gradient(135deg, ${color}33, ${color}22)`,
                border: `1px solid ${color}66`,
                boxShadow: `0 0 20px ${color}22`,
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {icon} {category}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Skills list */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 space-y-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{SKILL_CATEGORIES[activeTab].icon}</span>
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {SKILL_CATEGORIES[activeTab].category}
                </h3>
                <p className="text-xs text-gray-500">Proficiency levels</p>
              </div>
            </div>

            {SKILL_CATEGORIES[activeTab].skills.map(({ name, level, icon }, i) => (
              <SkillBar
                key={name}
                name={name}
                level={level}
                icon={icon}
                color={SKILL_CATEGORIES[activeTab].color}
                delay={i * 0.1}
                inView={inView}
              />
            ))}
          </motion.div>

          {/* Tech stack cloud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-card p-8"
          >
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🛠️ Full Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium cursor-default transition-all"
                  style={{
                    background: 'rgba(6,182,212,0.06)',
                    border: '1px solid rgba(6,182,212,0.15)',
                    color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#3b82f6' : '#a855f7',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* 3D Skill orb */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-36 h-36">
                {/* Center */}
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    animation: 'float 4s ease-in-out infinite',
                  }}
                >
                  🥽
                </div>
                {/* Orbiting skills */}
                {['⚛️', '🎮', '🌐', '⚡'].map((emoji, i) => {
                  const radius = 60
                  const angleStart = (i * Math.PI * 2) / 4
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 rounded-full glass flex items-center justify-center text-sm"
                      style={{
                        border: '1px solid rgba(6,182,212,0.2)',
                        top: '50%',
                        left: '50%',
                        marginTop: -16,
                        marginLeft: -16,
                      }}
                      animate={{
                        x: [
                          Math.cos(angleStart) * radius,
                          Math.cos(angleStart + Math.PI) * radius,
                          Math.cos(angleStart + Math.PI * 2) * radius,
                        ],
                        y: [
                          Math.sin(angleStart) * radius,
                          Math.sin(angleStart + Math.PI) * radius,
                          Math.sin(angleStart + Math.PI * 2) * radius,
                        ],
                      }}
                      transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {emoji}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
