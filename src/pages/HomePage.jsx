import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Values from '../components/Values.jsx'
import Solutions from '../components/Solutions.jsx'
import Process from '../components/Process.jsx'
import CTA from '../components/CTA.jsx'
import ContactForm from '../components/ContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function HomePage() {
  usePageMeta(
    'LightStream Finance | Premier Lending',
    'Premium financing solutions with transparent lending, fast approvals, and flexible terms.',
  )

  return (
    <>
      <Hero>
        <Stats />
      </Hero>
      <Values />
      <Solutions />
      <Process />
      <CTA>
        <ContactForm />
      </CTA>
    </>
  )
}
