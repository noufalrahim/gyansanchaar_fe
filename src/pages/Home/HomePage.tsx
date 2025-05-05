import { Cta, FeaturesSection, HeroSection, Testimonials } from "@/components/Home";

export default function HomePage() {
  return (
    <div className='w-full space-y-36 py-20 items-center flex justify-center flex-col'>
      <HeroSection />
      <FeaturesSection />
      <Cta />
      <Testimonials />
    </div>
  )
}
