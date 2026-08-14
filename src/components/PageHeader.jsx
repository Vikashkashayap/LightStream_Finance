import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${align === 'center' ? 'mx-auto max-w-[720px] text-center' : ''}`}
    >
      <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">{eyebrow}</p>
      <h1 className="font-display text-heading-xl mb-4 text-foreground">{title}</h1>
      {description && (
        <p className="text-[1.05rem] leading-[1.7] text-muted-foreground">{description}</p>
      )}
    </motion.div>
  )
}
