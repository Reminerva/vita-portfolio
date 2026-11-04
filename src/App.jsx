import { slides } from './slides.js'
import Slide from './components/Slide.jsx'
import AutoScrollbar from './components/AutoScrollbar.jsx'

export default function App() {
  if (slides.length === 0) {
    return (
      <main className="empty">
        <p>
          Belum ada slide. Taruh file di <code>src/slides/</code> dengan nama{' '}
          <code>slide-1.png</code>, <code>slide-2.mp4</code>, dan seterusnya.
        </p>
      </main>
    )
  }

  return (
    <>
      <main className="deck">
        {slides.map((slide, i) => (
          <Slide key={slide.id} slide={slide} index={i} />
        ))}
      </main>
      <AutoScrollbar />
    </>
  )
}
