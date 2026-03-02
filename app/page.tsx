import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/nav";
const Page = () => {
  return (
    <main className="w-full flex flex-col relative z-10">
      <Navbar />
      <Hero />
    </main>
  );
};
export default Page;
