import { motion } from 'framer-motion'

export default function CTA({ children }) {
  return (
    <section id="contact" className="cta-glow section-padding relative overflow-hidden bg-foreground text-white">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-heading-xl text-white">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[1.05rem] leading-[1.7] text-white/70">
            Connect with a specialized lending advisor to discuss your bespoke financing needs.
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
