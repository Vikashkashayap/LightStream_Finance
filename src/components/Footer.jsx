import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 text-center">
      <div className="container-page">
        <Link to="/" className="mb-6 inline-block" aria-label="LightStream Finance home">
          <BrandLogo className="h-10" />
        </Link>
        <nav aria-label="Footer" className="mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-[0.85rem] text-muted-foreground">
          Copyright © 2026 Light Stream Finance. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
