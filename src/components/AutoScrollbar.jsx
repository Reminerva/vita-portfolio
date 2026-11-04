import { useEffect, useRef, useState } from 'react'

// Scrollbar kustom: tersembunyi, muncul saat kursor di tepi kanan,
// saat sedang scroll, atau saat thumb di-drag.
export default function AutoScrollbar() {
  const [thumb, setThumb] = useState({ h: 0, top: 0, visible: false })
  const [scrolling, setScrolling] = useState(false)
  const [dragging, setDragging] = useState(false)
  const drag = useRef(null)
  const timer = useRef(0)

  useEffect(() => {
    const root = document.documentElement
    let raf = 0

    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const docH = root.scrollHeight
        const viewH = window.innerHeight
        if (docH <= viewH + 1) {
          setThumb({ h: 0, top: 0, visible: false })
          return
        }
        const h = Math.max(48, (viewH * viewH) / docH)
        const maxTop = viewH - h
        const top = (window.scrollY / (docH - viewH)) * maxTop
        setThumb({ h, top, visible: true })
      })
    }

    const onScroll = () => {
      update()
      setScrolling(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setScrolling(false), 900)
    }

    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer.current)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  const onThumbDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startY: e.clientY, startScroll: window.scrollY }
    setDragging(true)
  }

  const onThumbMove = (e) => {
    if (!drag.current) return
    const docH = document.documentElement.scrollHeight
    const viewH = window.innerHeight
    const maxTop = viewH - thumb.h
    const delta = e.clientY - drag.current.startY
    window.scrollTo(0, drag.current.startScroll + (delta * (docH - viewH)) / maxTop)
  }

  const onThumbUp = () => {
    drag.current = null
    setDragging(false)
  }

  const onTrackDown = (e) => {
    // klik di track: lompat ke posisi tersebut
    const docH = document.documentElement.scrollHeight
    const viewH = window.innerHeight
    const ratio = (e.clientY - thumb.h / 2) / (viewH - thumb.h)
    window.scrollTo({ top: Math.min(1, Math.max(0, ratio)) * (docH - viewH) })
  }

  if (!thumb.visible) return null

  return (
    <div
      className={`sb-track ${scrolling || dragging ? 'is-active' : ''}`}
      onPointerDown={onTrackDown}
      aria-hidden="true"
    >
      <div
        className="sb-thumb"
        style={{ height: thumb.h, transform: `translateY(${thumb.top}px)` }}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
      />
    </div>
  )
}
