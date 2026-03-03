import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/nav";
import SocialProof from "@/components/landing/social";
const Page = () => {
  return (
    <main className="w-full flex flex-col relative z-10">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
    </main>
  );
};
export default Page;
