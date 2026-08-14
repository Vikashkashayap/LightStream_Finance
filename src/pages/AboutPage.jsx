import { motion } from 'framer-motion'
import usePageMeta from '../hooks/usePageMeta.js'

const VALUES = [
  { title: 'Integrity', description: 'No hidden fees, ever.' },
  { title: 'Speed', description: 'Fast approval & funding.' },
  { title: 'Security', description: 'Bank-level encryption.' },
]

export default function AboutPage() {
  usePageMeta(
    'About Us | LightStream Finance',
    'Learn how LightStream Finance is redefining access to capital with transparent, swift, and dignified lending.',
  )

  return (
    <>
      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">
                Our Story
              </p>
              <h1 className="font-display text-heading-xl mb-6 text-foreground">
                Redefining Access to Capital
              </h1>
              <p className="mb-5 text-[1.05rem] leading-[1.7] text-muted-foreground">
                At LightStream Finance, we believe that access to capital should be transparent, swift,
                and dignified. We've spent years refining our lending technology to provide a premium
                experience for every client.
              </p>
              <p className="text-[1.05rem] leading-[1.7] text-muted-foreground">
                Founded in San Francisco, we serve a nationwide clientele with a focus on high-limit
                personal loans and home equity solutions. Our team of experts is dedicated to helping
                you achieve your financial goals with ease.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern office space"
                className="h-[360px] w-full rounded-[20px] object-cover md:h-[420px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <h2 className="font-display mb-2 text-[1.8rem] text-accent">{item.title}</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
