import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { sendLead } from '../lib/emailjs.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

const LOAN_PURPOSES = [
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

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const ZIP_RE = /^\d{5}(-\d{4})?$/

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  purpose: '',
  amount: '',
  message: '',
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ApplyPage() {
  usePageMeta(
    'Loan Application | LightStream Finance',
    'Start your LightStream Finance application. Tell us about your lending needs and a specialist will follow up.',
  )

  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white px-4 py-3 font-sans text-foreground transition duration-300 placeholder:text-muted-foreground/70 focus:outline-none ${
      hasError ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-accent'
    }`

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
    if (!form.street.trim()) next.street = 'Please enter your street address.'
    if (!form.city.trim()) next.city = 'Please enter your city.'
    if (!form.state) next.state = 'Please select your state.'
    if (!form.zip.trim()) next.zip = 'Please enter your ZIP code.'
    else if (!ZIP_RE.test(form.zip.trim())) next.zip = 'Enter a valid ZIP code (12345 or 12345-6789).'
    if (!form.purpose) next.purpose = 'Please select a loan purpose.'
    if (!form.amount.trim()) next.amount = 'Please enter a requested amount.'
    else {
      const n = Number(String(form.amount).replace(/[$,]/g, ''))
      if (!Number.isFinite(n) || n < 1 || n > 100000) {
        next.amount = 'Enter an amount between $1 and $100,000.'
      }
    }
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
        subject: `Loan application — ${form.purpose}`,
        message: [
          `Requested amount: ${form.amount}`,
          `Loan purpose: ${form.purpose}`,
          `Address: ${form.street}, ${form.city}, ${form.state} ${form.zip}`,
          form.message ? `Notes: ${form.message}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        source: 'Loan Application',
        reply_to: form.email,
      })
      setStatus('success')
      setFeedback('Thank you! Your message has been sent successfully.')
      setForm(INITIAL)
    } catch {
      setStatus('error')
      setFeedback('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="section-padding">
      <div className="container-page">
        <PageHeader
          eyebrow="Secure Application"
          title="Start Your Journey"
          description="Please provide the information below. A specialist will follow up — we never ask for Social Security numbers, bank logins, or passwords on this form."
        />

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto max-w-[760px] rounded-[20px] border border-border bg-card p-6 shadow-[0_10px_40px_rgba(11,26,46,0.06)] md:p-10"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-semibold text-white">
              1
            </span>
            <h2 className="text-[1.2rem] font-semibold text-foreground">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            <div className="md:col-span-6">
              <Field id="name" label="Full Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(errors.name)}
                />
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field id="email" label="Email Address" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass(errors.email)}
                />
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field id="phone" label="Phone Number" error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.phone)}
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>

            <div className="md:col-span-6">
              <Field id="street" label="Street Address" error={errors.street}>
                <input
                  id="street"
                  name="street"
                  type="text"
                  required
                  autoComplete="street-address"
                  placeholder="123 Main Street, Apt 4B"
                  value={form.street}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.street)}
                  className={inputClass(errors.street)}
                />
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field id="city" label="City" error={errors.city}>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder="San Francisco"
                  value={form.city}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.city)}
                  className={inputClass(errors.city)}
                />
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field id="state" label="State" error={errors.state}>
                <select
                  id="state"
                  name="state"
                  required
                  autoComplete="address-level1"
                  value={form.state}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.state)}
                  className={`${inputClass(errors.state)} ${form.state ? '' : 'text-muted-foreground'}`}
                >
                  <option value="" disabled>
                    Select your state...
                  </option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s} className="text-foreground">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="md:col-span-2">
              <Field id="zip" label="ZIP Code" error={errors.zip}>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  required
                  autoComplete="postal-code"
                  placeholder="94105"
                  value={form.zip}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.zip)}
                  className={inputClass(errors.zip)}
                />
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field id="purpose" label="Loan Purpose" error={errors.purpose}>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={form.purpose}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.purpose)}
                  className={`${inputClass(errors.purpose)} ${form.purpose ? '' : 'text-muted-foreground'}`}
                >
                  <option value="" disabled>
                    Select purpose...
                  </option>
                  {LOAN_PURPOSES.map((p) => (
                    <option key={p} value={p} className="text-foreground">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field id="amount" label="Requested Amount ($)" error={errors.amount}>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder="$1,000"
                  value={form.amount}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.amount)}
                  className={inputClass(errors.amount)}
                />
              </Field>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us a bit about your financing needs..."
                value={form.message}
                onChange={onChange}
                className={`${inputClass(false)} resize-y`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary mt-8 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3 text-[0.95rem] font-semibold transition-all duration-300 disabled:opacity-80"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                Submit Application <span className="text-[1.2rem]">→</span>
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
                  status === 'success' ? 'text-emerald-700' : 'text-muted-foreground'
                }`}
              >
                {status === 'success' && <CheckCircle2 size={16} aria-hidden="true" />}
                {status === 'error' && <AlertCircle size={16} aria-hidden="true" />}
                {feedback}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
