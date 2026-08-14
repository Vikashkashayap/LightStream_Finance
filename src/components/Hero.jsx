import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=48&h=48&q=80',
    alt: 'Satisfied LightStream client',
  },
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=48&h=48&q=80',
    alt: 'Satisfied LightStream client',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=48&h=48&q=80',
    alt: 'Satisfied LightStream client',
  },
]

export default function Hero({ children }) {
  return (
    <section id="home" className="hero-glow relative overflow-hidden pt-8 pb-8 md:pt-16 md:pb-8">
      <div className="container-page">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase"
          >
            Premier Financing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-hero mb-6 text-foreground"
          >
            Elevate Your
            <br />
            <span className="text-accent">Financial Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mb-10 max-w-[600px] text-[1.05rem] leading-[1.7] text-muted-foreground"
          >
            Experience transparent, high-limit lending tailored for discerning individuals. Fast
            execution with zero hidden fees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/apply"
              className="btn-primary inline-flex min-h-12 items-center justify-center rounded-full px-10 py-[0.9rem] text-[0.95rem] font-semibold transition-all duration-300"
            >
              Apply Now
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-transparent px-10 py-[0.9rem] text-[0.95rem] font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/5"
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-2"
          >
            <div className="flex">
              {AVATARS.map((avatar, i) => (
                <img
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={40}
                  height={40}
                  className={`h-10 w-10 rounded-full border-2 border-background object-cover ${i ? '-ml-2.5' : ''}`}
                />
              ))}
            </div>
            <span className="text-[0.9rem] font-medium text-muted-foreground">
              Trusted by <strong className="text-foreground">2,000+</strong> satisfied clients
            </span>
          </motion.div>

          {children}
        </div>
      </div>
    </section>
  )
}
