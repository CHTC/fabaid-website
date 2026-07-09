import HomeHero from './_components/HomeHero';
import { ServicesGrid, FacilitationSchool } from './_components/HomeSections';
import { Callout } from '@/components/design';
import LogoCarousel from './_components/LogoCarousel';

export default function Home() {
  return (
    <>
      <HomeHero />
      <LogoCarousel />
      {/* Metrics band hidden for now.
      <MetricsBand
        kicker='By the numbers'
        heading='A fabric the whole country is computing on.'
        metrics={HOME_METRICS}
        note='Across the past 12 months'
        cta={{ label: 'View the projects we support', href: 'https://fabaid.io/osdf-users/' }}
      />
      */}
      <ServicesGrid />
      <FacilitationSchool />
      <Callout />
    </>
  );
}
