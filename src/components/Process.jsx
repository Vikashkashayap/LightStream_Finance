import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Apply Online',
    description:
      'Complete our secure application in under 5 minutes. Check your rate without impacting your credit.',
  },
  {
    n: '02',
    title: 'Get Approved',
    description:
      'Receive your approval decision rapidly via our advanced underwriting technology.',
  },
  {
    n: '03',
    title: 'Receive Funds',
    description:
      'Sign electronically and have funds deposited directly into your account the same day.',
  },
  {
    n: '04',
    title: 'Achieve Goals',
    description:
      'Manage your account online and experience unparalleled financial flexibility.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-padding bg-muted">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">
            The Process
          </p>
          <h2 className="font-display text-heading-xl text-foreground">How It Works</h2>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-[8%] left-[8%] hidden h-px bg-linear-to-r from-transparent via-accent/35 to-transparent lg:block"
          />

          {STEPS.map((step, i) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative border-l border-accent/25 pl-6 text-left md:border-l-0 md:px-4 md:text-center"
            >
              <p className="font-display mb-4 text-[4rem] leading-[0.8] font-normal text-foreground/8">
                {step.n}
              </p>
              <h3 className="mb-2 text-[1.35rem] leading-[1.3] font-semibold">{step.title}</h3>
              <p className="text-[0.9rem] text-muted-foreground">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
