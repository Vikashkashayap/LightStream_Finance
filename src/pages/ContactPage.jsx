import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta.js'
import { sendLead } from '../lib/emailjs.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

export default function ContactPage() {
  usePageMeta(
    'Contact Us | LightStream Finance',
    'Get in touch with LightStream Finance. Our team is ready to help with lending questions and applications.',
  )

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status !== 'idle') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!PHONE_RE.test(form.phone.trim())) next.phone = 'Please enter a valid phone number.'
    if (!form.subject.trim()) next.subject = 'Please enter a subject.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus('error')
      setFeedback('Please correct the highlighted fields and try again.')
      return
    }

    setStatus('loading')
    setFeedback('')
    try {
      await sendLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message || '—',
        source: 'Contact Page',
        reply_to: form.email,
      })
      setStatus('success')
      setFeedback('Thank you! Your message has been sent successfully.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setFeedback('Something went wrong. Please try again.')
    }
  }

  const fieldClass = (hasError) =>
    `w-full rounded-lg border bg-white/5 px-4 py-3 font-sans text-white transition duration-300 placeholder:text-white/40 focus:bg-white/10 focus:outline-none ${
      hasError ? 'border-red-400/60' : 'border-white/10 focus:border-accent'
    }`

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-[0.8rem] font-semibold tracking-[0.05em] text-accent uppercase">
              Get in Touch
            </p>
            <h1 className="font-display text-heading-xl mb-6 text-foreground">We're Here to Help</h1>
            <p className="text-[1.05rem] leading-[1.7] text-muted-foreground">
              Have questions about our lending process or need assistance with an existing application?
              Our team is ready to assist you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-[20px] bg-foreground p-8 text-white shadow-[0_10px_40px_rgba(11,26,46,0.15)] md:p-12"
          >
            <form onSubmit={onSubmit} noValidate>
              <h2 className="mb-6 text-[1.35rem] font-semibold">Send us a Message</h2>

              <div className="mb-6">
                <label htmlFor="contact-name" className="mb-2 block text-[0.85rem] font-medium text-white/60">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass(errors.name)}
                />
                {errors.name && <p className="mt-2 text-sm text-red-300">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-email" className="mb-2 block text-[0.85rem] font-medium text-white/60">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass(errors.email)}
                />
                {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-phone" className="mb-2 block text-[0.85rem] font-medium text-white/60">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.phone)}
                  className={fieldClass(errors.phone)}
                />
                {errors.phone && <p className="mt-2 text-sm text-red-300">{errors.phone}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-subject" className="mb-2 block text-[0.85rem] font-medium text-white/60">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.subject)}
                  className={fieldClass(errors.subject)}
                />
                {errors.subject && <p className="mt-2 text-sm text-red-300">{errors.subject}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-message" className="mb-2 block text-[0.85rem] font-medium text-white/60">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={onChange}
                  className={`${fieldClass(false)} resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3 text-[0.95rem] font-semibold transition-all duration-300 disabled:opacity-80"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <span className="text-[1.2rem]">→</span>
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.p
                    key={status + feedback}
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
                    {feedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
