import { useEffect, useRef, useState } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ImageSlide({ slide, label, eager }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`frame ${loaded ? 'is-loaded' : ''}`}>
      <img
        src={slide.url}
        alt={label}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function VideoSlide({ slide, label }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const still = reduceMotion()

  // Putar hanya saat terlihat di layar, jeda saat keluar
  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [still])

  return (
    <div className={`frame ${loaded ? 'is-loaded' : ''}`}>
      <video
        ref={ref}
        src={slide.url}
        aria-label={label}
        muted
        loop
        playsInline
        preload="metadata"
        controls={still}
        onLoadedMetadata={() => setLoaded(true)}
      />
    </div>
  )
}

export default function Slide({ slide, index }) {
  const label = `Slide ${slide.order}`
  return (
    <section className="slide" id={`slide-${slide.order}`}>
      {slide.type === 'video' ? (
        <VideoSlide slide={slide} label={label} />
      ) : (
        <ImageSlide slide={slide} label={label} eager={index < 2} />
      )}
    </section>
  )
}
