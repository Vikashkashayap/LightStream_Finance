import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    alt: 'LightStream client',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    alt: 'LightStream client',
  },
  {
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    alt: 'LightStream client',
  },
]

export default function Hero({ children }) {
  return (
    <section id="home" className="hero-glow relative overflow-hidden pt-10 pb-8 md:pt-16 md:pb-10">
      <div className="container-page">
        <div className="mx-auto max-w-[850px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-[0.75rem] sm:text-[0.8rem] font-semibold tracking-[0.18em] text-[#c5a059] uppercase"
          >
            Premier Financing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl sm:text-6xl md:text-[4.25rem] lg:text-[4.85rem] font-normal leading-[1.08] tracking-tight mb-6"
          >
            <span className="block text-[#0b1a2e]">Elevate Your</span>
            <span className="block text-[#c5a059]">Financial Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mb-9 max-w-[580px] text-[0.95rem] sm:text-[1.05rem] leading-[1.68] text-[#64748b]"
          >
            Experience transparent, high-limit lending tailored for discerning individuals. Fast
            execution with zero hidden fees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mb-11 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/apply"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#c5a059] px-9 py-3 text-[0.95rem] font-medium text-white shadow-[0_4px_16px_rgba(197,160,89,0.32)] transition-all duration-300 hover:bg-[#b8934a] hover:shadow-[0_6px_22px_rgba(197,160,89,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Apply Now
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#e5decb] bg-[#fbf9f4]/80 px-9 py-3 text-[0.95rem] font-medium text-[#0b1a2e] backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#c5a059]/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex items-center justify-center gap-3.5 px-2"
          >
            <div className="flex -space-x-2">
              {AVATARS.map((avatar) => (
                <img
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={40}
                  height={40}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#fdfcf9] object-cover ring-1 ring-black/5"
                />
              ))}
            </div>
            <span className="text-[0.875rem] sm:text-[0.9rem] font-normal text-[#64748b]">
              Trusted by <strong className="font-semibold text-[#0b1a2e]">2,000+</strong> satisfied clients
            </span>
          </motion.div>

          {children}
        </div>
      </div>
    </section>
  )
}

