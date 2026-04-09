import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Differentials from "@/components/Differentials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Categories />
      <HowItWorks />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Differentials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
