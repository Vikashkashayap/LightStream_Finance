import { motion } from 'framer-motion'

const STATS = [
  { value: '$500M+', label: 'Funded Volume' },
  { value: '24h', label: 'Avg. Approval' },
  { value: '4.9', label: 'Trust Score' },
  { value: '0', label: 'Hidden Fees' },
]

export default function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-8 shadow-[0_10px_40px_rgba(11,26,46,0.06)] md:grid-cols-4 md:gap-4"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-4 text-center md:border-r md:border-border md:last:border-r-0 ${
            i < 2 ? 'border-b border-border pb-6 md:border-b-0 md:pb-0' : ''
          }`}
        >
          <p className="mb-1 text-[1.8rem] font-semibold text-foreground">{stat.value}</p>
          <p className="text-[0.8rem] font-medium tracking-[0.05em] text-muted-foreground uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  )
}
