import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const SERVICES = [
  {
    title: 'Personal Loan',
    description:
      'Unlock your potential with low-interest personal loans. Perfect for debt consolidation, major purchases, or unexpected expenses.',
    cta: 'Rates from 5.99% APR',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Home Improvement',
    description:
      "Invest in your home's value. No equity required for our specialized home improvement financing options.",
    cta: 'Up to $100,000',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Auto Loan',
    description:
      'Get behind the wheel of your dream car with competitive rates and flexible terms tailored to your budget.',
    cta: 'Low Fixed Rates',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Auto Refinance',
    description:
      'Lower your monthly payments and save thousands over the life of your loan with our competitive refinance rates.',
    cta: 'Save on Average 2%',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Debt Consolidation',
    description:
      'Simplify your finances by combining multiple debts into one manageable monthly payment with a lower interest rate.',
    cta: 'One Single Payment',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Business Loan',
    description:
      'Fuel your business growth with flexible capital. Perfect for expansion, inventory, or equipment upgrades.',
    cta: 'Fast Approval',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Home Equity Loan',
    description:
      'Leverage the equity in your home to fund major expenses like renovations, education, or medical bills.',
    cta: 'Competitive Rates',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Medical Loan',
    description:
      'Focus on recovery, not finances. We offer fast funding for medical expenses, surgeries, and dental procedures.',
    cta: 'Quick Disbursement',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mortgage',
    description:
      'Turn your dream of homeownership into reality with our tailored mortgage solutions designed for every buyer.',
    cta: 'Fixed & Adjustable Rates',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'RV / Boat Loan',
    description:
      'Explore the open road or open water with flexible financing for your recreational vehicles and boats.',
    cta: 'Affordable Terms',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Small Business Loan',
    description:
      'Empower your small business with working capital. We provide quick funding to help you seize new opportunities.',
    cta: 'No Collateral Required',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Student Loan Refinance',
    description:
      'Reduce your student loan interest rates and lower your monthly payments with our refinancing options.',
    cta: 'Lower Your Rate',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Travel Loan',
    description:
      'Make your dream vacation a reality. Our travel loans offer instant funding for trips, flights, and adventures.',
    cta: 'Instant Approval',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
  },
]

export default function ServicesPage() {
  usePageMeta(
    'Services | LightStream Finance',
    'Premier financial services including personal loans, home improvement, auto, business, and more.',
  )

  return (
    <section className="section-padding">
      <div className="container-page">
        <PageHeader
          eyebrow="Our Offerings"
          title="Premier Financial Services"
          description="Tailored lending solutions designed to help you achieve every milestone with confidence."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className={`group overflow-hidden rounded-[20px] border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] ${
                item.featured ? 'border-accent/40' : 'border-border'
              }`}
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-[1.35rem] leading-[1.3] font-semibold">{item.title}</h2>
                <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">{item.description}</p>
                <Link
                  to="/apply"
                  className="mt-4 flex items-center justify-between text-[0.9rem] font-medium text-accent"
                >
                  <span>{item.cta}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
