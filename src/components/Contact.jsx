import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SOCIALS = [
  { icon: '📷', label: 'Instagram', href: 'https://www.instagram.com/_ashraf_xr', color: '#e1306c', username: '@xwz_ashraf' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/212721337413', color: '#25d366', username: '+212 721 337 413' },
  { icon: '🐱', label: 'GitHub', href: 'https://github.com/ashrafrizki10', color: '#6e5494', username: 'ashrafrizki10' },
  { icon: '𝕏', label: 'X / Twitter', href: 'https://x.com/rizki_xr', color: '#1da1f2', username: '@rizki_xr' },
  { icon: '🔗', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashraf-undefined-b68144419', color: '#0a66c2', username: 'Ashraf Rizki' },
]

const Contact = ({ darkMode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus(null), 4000)
  }

  const inputStyle = (name) => ({
    background: focused === name ? 'rgba(6,182,212,0.05)' : 'rgba(255,255,255,0.02)',
    border: focused === name ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(255,255,255,0.06)',
    color: darkMode ? '#e2e8f0' : '#0f172a',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
  })

  return (
    <section id="contact" className="relative py-24" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 60% 60% at 50% 80%, rgba(6,182,212,0.06) 0%, transparent 70%)'
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
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Let's Connect</p>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <div className="w-3 h-0.5 rounded-full bg-cyan-400" />
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
          </div>
          <p className={`mt-4 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ✉️ Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', placeholder: 'Your Name', type: 'text' },
                  { name: 'email', placeholder: 'Your Email', type: 'email' },
                ].map(({ name, placeholder, type }) => (
                  <div key={name}>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle(name)}
                    />
                  </div>
                ))}
              </div>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={inputStyle('subject')}
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder="Your Message..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                style={inputStyle('message')}
              />

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: status ? 1 : 1.02 }}
                whileTap={{ scale: status ? 1 : 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 text-base py-3.5"
                style={{ opacity: status === 'sent' ? 0.8 : 1 }}
              >
                <span>
                  {status === 'sending' ? '⏳ Sending...' :
                    status === 'sent' ? '✅ Message Sent!' :
                      '🚀 Send Message'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick contact info */}
            <div className="glass-card p-6 space-y-4">
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📬 Contact Info
              </h3>
              {[
                { icon: '📧', label: 'Email', value: 'ashrafrizki10@gmail.com', href: 'mailto:ashrafrizki10@gmail.com' },
                { icon: '📱', label: 'WhatsApp', value: '+212 721 337 413', href: 'https://wa.me/212721337413' },
                { icon: '📍', label: 'Location', value: 'Morocco 🇲🇦' },
                { icon: '🕐', label: 'Availability', value: 'Mon – Sat, 9am – 9pm GMT+1' },
              ].map(({ icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.15)' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:underline font-medium"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div className="glass-card p-6">
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🌐 Find Me Online
              </h3>
              <div className="space-y-3">
                {SOCIALS.map(({ icon, label, href, color, username }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = color + '12'
                      e.currentTarget.style.borderColor = color + '33'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: color + '18', border: `1px solid ${color}33` }}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{label}</p>
                      <p className="text-sm font-semibold truncate" style={{ color }}>{username}</p>
                    </div>
                    <span className="text-gray-600 text-xs">→</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Languages tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="glass-card p-4 text-center"
              style={{ border: '1px solid rgba(6,182,212,0.15)' }}
            >
              <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                I can communicate in
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['🇸🇦 Arabic', '🇬🇧 English', '🇮🇹 Italian', '🇩🇪 German', '🇪🇸 Spanish', '🇯🇵 Japanese', '🇰🇷 Korean', '🇨🇳 Chinese'].map(l => (
                  <span
                    key={l}
                    className="px-2.5 py-1 text-xs rounded-full"
                    style={{ background: 'rgba(6,182,212,0.08)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.15)' }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
