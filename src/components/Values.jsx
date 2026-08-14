import { motion } from 'framer-motion'
import { Lock, Zap, BadgeCheck } from 'lucide-react'

const VALUES = [
  {
    title: 'Enterprise-Grade Security',
    description:
      'Bank-level encryption and rigorous protocols ensure your data is always protected.',
    Icon: Lock,
    featured: false,
  },
  {
    title: 'Rapid Deployment',
    description:
      'Streamlined underwriting allows for same-day disbursements upon final approval.',
    Icon: Zap,
    featured: false,
  },
  {
    title: 'Premium Terms',
    description:
      'Competitive rates tailored to your profile, with no hidden fees or prepayment penalties.',
    Icon: BadgeCheck,
    featured: true,
  },
]

export default function Values() {
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">
            Our Values
          </p>
          <h2 className="font-display text-heading-xl mb-4 text-foreground">
            Redefining Modern Lending
          </h2>
          <p className="mx-auto max-w-[500px] text-[1.05rem] leading-[1.7] text-muted-foreground">
            Built on trust, speed, and transparency. We are redefining the way you access capital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`rounded-2xl border bg-card p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_12px_30px_rgba(11,26,46,0.06)] ${
                item.featured ? 'border-accent/40' : 'border-border'
              }`}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                  item.featured ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                }`}
              >
                <item.Icon size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-[1.35rem] leading-[1.3] font-semibold">{item.title}</h3>
              <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
