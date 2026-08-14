import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BrandLogo from './BrandLogo.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  const linkClass = ({ isActive }) =>
    `text-[0.95rem] font-medium transition-colors duration-300 ${
      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-[100] flex min-h-[72px] items-center border-b backdrop-blur-[12px] backdrop-saturate-150 ${
          scrolled
            ? 'border-border/80 bg-background/90'
            : 'border-border/50 bg-background/85'
        }`}
      >
        <div className="container-page flex w-full items-center justify-between gap-8">
          <Link to="/" className="shrink-0" aria-label="LightStream Finance home">
            <BrandLogo />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/apply"
              className="btn-primary inline-flex min-h-12 items-center justify-center rounded-full px-7 py-2 text-[0.95rem] font-semibold transition-all duration-300"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="relative z-[101] p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex h-5 w-[26px] flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-foreground transition duration-300 ${
                  open ? 'translate-y-[9px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition duration-300 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition duration-300 ${
                  open ? '-translate-y-[9px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6 overflow-y-auto bg-background px-6 py-24 md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={close}
                  className="font-display text-[1.8rem] text-foreground"
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                to="/apply"
                onClick={close}
                className="btn-primary mt-2 inline-flex min-h-12 items-center justify-center rounded-full px-10 py-3 text-[0.95rem] font-semibold"
              >
                Apply Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
