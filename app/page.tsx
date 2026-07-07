import HomeHero from './_components/HomeHero';
import { ServicesGrid, FacilitationSchool } from './_components/HomeSections';
import { MetricsBand, Callout } from '@/components/design';
import LogoCarousel from './_components/LogoCarousel';

const HOME_METRICS = [
  { value: 84, unit: '', label: 'Institutions served' },
  { value: 286, unit: ' PB', label: 'Research data delivered' },
  { value: 174, unit: '', label: 'Projects supported' },
  { value: 39, unit: '', label: 'Fields of science served' },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <LogoCarousel />
      <MetricsBand
        kicker='By the numbers'
        heading='A fabric the whole country is computing on.'
        metrics={HOME_METRICS}
        note='Across the past 12 months'
        cta={{ label: 'View the projects we support', href: 'https://fabaid.io/osdf-users/' }}
      />
      <ServicesGrid />
      <FacilitationSchool />
      <Callout />
    </>
  );
}
