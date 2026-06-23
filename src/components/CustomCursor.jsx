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
    let animationId = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`
    }

    const animate = () => {
      trailX += (mouseX - trailX) * 0.12
      trailY += (mouseY - trailY) * 0.12
      trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`
      animationId = requestAnimationFrame(animate)
    }

    const onMouseEnter = (e) => {
      const target = e.target.closest('a, button, [role="button"]')
      if (target) {
        cursor.style.transform += ' scale(1.5)'
        trail.style.borderColor = 'rgba(6,182,212,0.9)'
        trail.style.borderWidth = '2px'
      }
    }

    const onMouseLeave = (e) => {
      const target = e.target.closest('a, button, [role="button"]')
      if (target) {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '')
        trail.style.borderColor = 'rgba(6,182,212,0.6)'
        trail.style.borderWidth = '1px'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onMouseEnter)
    document.addEventListener('mouseout', onMouseLeave)

    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseEnter)
      document.removeEventListener('mouseout', onMouseLeave)
      if (animationId) cancelAnimationFrame(animationId)
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
          transition: 'border-color 0.2s ease, border-width 0.2s ease',
        }}
      />
    </>
  )
}

export default CustomCursor

