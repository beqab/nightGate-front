import Hero from "@/features/landing/Hero";
import FeaturedEvents from "@/features/landing/FeaturedEvents";
import TopVenues from "@/features/landing/TopVenues";
import HowItWorks from "@/features/landing/HowItWorks";
import PopularNow from "@/features/landing/PopularNow";
import CtaBanner from "@/features/landing/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="neon-divider mx-auto max-w-7xl px-8" />

      <FeaturedEvents />

      <div className="neon-divider mx-auto max-w-7xl px-8" />

      <HowItWorks />

      <div className="neon-divider mx-auto max-w-7xl px-8" />

      <PopularNow />

      <div className="neon-divider mx-auto max-w-7xl px-8" />

      <TopVenues />

      <CtaBanner />
    </>
  );
}
