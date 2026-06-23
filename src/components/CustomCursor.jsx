import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`
    }

    const animate = () => {
      trailX += (mouseX - trailX) * 0.12
      trailY += (mouseY - trailY) * 0.12
      trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => cursor.style.transform += ' scale(1.5)'
    const onLeave = () => cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          background: 'white',
          transition: 'transform 0.05s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997]"
        style={{
          border: '1px solid rgba(6,182,212,0.6)',
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default CustomCursor
