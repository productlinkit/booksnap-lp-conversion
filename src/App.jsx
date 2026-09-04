import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Comparison from './components/Comparison'
import Pricing from './components/Pricing'
import AskAI from './components/AskAI'
import Testimonial from './components/Testimonial'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { useReveal, useParallax } from './lib/hooks'

/**
 * LP 2 — Free → Premium conversion, for warm traffic only.
 *
 * The order is deliberate: the reader's own usage limit (Hero), what that
 * limit is costing them (Comparison), the price of removing it (Pricing), the
 * one feature that changes the product rather than the allowance (Ask AI),
 * proof (Testimonial), and one last push on momentum (FinalCTA).
 */
export default function App() {
  const ref = useReveal()
  // One scroll loop drives every `data-parallax` layer on the page.
  useParallax()

  return (
    <div ref={ref} className="w-full max-w-full overflow-x-clip antialiased">
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <Pricing />
        <AskAI />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
