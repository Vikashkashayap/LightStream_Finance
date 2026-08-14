import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SOLUTIONS = [
  {
    title: 'Personal Loans',
    description: 'Up to $100,000 for any personal milestone.',
    cta: 'Fixed Rates',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Home Improvement',
    description: 'Upgrade your space. No equity required.',
    cta: 'Fast Funding',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Debt Consolidation',
    description: 'Simplify payments and lower your interest.',
    cta: 'One Payment',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Solutions() {
  return (
    <section id="services" className="section-padding">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">
            Portfolio Solutions
          </p>
          <h2 className="font-display text-heading-xl text-foreground">
            Tailored for Your Ambitions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((item, i) => (
            <Link
              key={item.title}
              to="/services"
              className={`group overflow-hidden rounded-[20px] border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] ${
                item.featured ? 'border-accent' : 'border-border'
              }`}
            >
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} financing`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-[1.35rem] leading-[1.3] font-semibold">{item.title}</h3>
                  <p className="text-[0.9rem] text-muted-foreground">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between text-[0.9rem] font-medium text-accent">
                    <span>{item.cta}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
