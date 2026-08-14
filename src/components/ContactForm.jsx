import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { sendLead } from '../lib/emailjs.js'

const INQUIRY_TYPES = [
  'Auto Loan',
  'Auto Refinance',
  'Business Loan',
  'Debt Consolidation',
  'Home Equity Loan',
  'Home Improvement',
  'Medical Loan',
  'Mortgage',
  'Personal Loan',
  'RV / Boat Loan',
  'Small Business Loan',
  'Student Loan Refinance',
  'Travel Loan',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', inquiryType: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.inquiryType) next.inquiryType = 'Please select an inquiry type.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus('error')
      setMessage('Please correct the highlighted fields and try again.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      await sendLead({
        name: form.name,
        email: form.email,
        phone: '—',
        subject: form.inquiryType,
        message: `Homepage inquiry — Loan type: ${form.inquiryType}`,
        source: 'Homepage Inquiry',
        reply_to: form.email,
      })
      setStatus('success')
      setMessage('Thank you! Your message has been sent successfully.')
      setForm({ name: '', email: '', inquiryType: '' })
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const fieldClass = (hasError) =>
    `w-full rounded-lg border bg-white/5 px-4 py-4 font-sans text-white transition duration-300 placeholder:text-white/40 focus:bg-white/10 focus:outline-none ${
      hasError
        ? 'border-red-400/60 focus:border-red-400'
        : 'border-white/10 focus:border-accent'
    }`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto max-w-[600px] rounded-[20px] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-[10px] md:p-12"
    >
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-[0.85rem] font-medium text-white/60">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={form.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-[0.85rem] font-medium text-white/60">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="inquiryType" className="mb-2 block text-[0.85rem] font-medium text-white/60">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            value={form.inquiryType}
            onChange={onChange}
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={errors.inquiryType ? 'inquiry-error' : undefined}
            className={`${fieldClass(errors.inquiryType)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFFFFF' d='M6 8L1 3h10z'/%3E%3C/svg%3E")] bg-size-[12px] bg-position-[right_1rem_center] bg-no-repeat pr-10 ${
              form.inquiryType ? 'text-white' : 'text-white/50'
            }`}
          >
            <option value="" disabled>
              Select your loan type...
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type} className="bg-white text-foreground">
                {type}
              </option>
            ))}
          </select>
          {errors.inquiryType && (
            <p id="inquiry-error" className="mt-2 text-sm text-red-300">
              {errors.inquiryType}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary mt-4 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3 text-[0.95rem] font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Submit Request <span className="text-[1.2rem]">→</span>
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={status + message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role={status === 'error' ? 'alert' : 'status'}
              className={`mt-4 flex items-center justify-center gap-2 text-center text-[0.9rem] ${
                status === 'success' ? 'text-emerald-300' : 'text-white/70'
              }`}
            >
              {status === 'success' && <CheckCircle2 size={16} aria-hidden="true" />}
              {status === 'error' && <AlertCircle size={16} aria-hidden="true" />}
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}
