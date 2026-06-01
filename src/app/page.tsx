import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedMenu } from "@/components/sections/FeaturedMenu";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ReservationCTA } from "@/components/sections/ReservationCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedMenu />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
    </>
  );
}
