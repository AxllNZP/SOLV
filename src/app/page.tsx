import Contact from "@/components/landing/Contact";
import Founder from "@/components/landing/Founder";
import Hero from "@/components/landing/Hero";
import Methodology from "@/components/landing/Methodology";
import Products from "@/components/landing/Products";
import Solutions from "@/components/landing/Solutions";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <Hero />
      <Solutions />
      <Products />
      <Methodology />
      <Founder />
      <Contact />
    </main>
  );
}
