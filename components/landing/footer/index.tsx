import Link from "next/link";
import Logo from "../logo";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-black/40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />

        <div className="flex gap-8 text-sm text-zinc-600 font-light">
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            Twitter
          </Link>
        </div>
        <div className="text-xs text-zinc-700">
          © {new Date().getFullYear()} All rights
        </div>
      </div>
    </footer>
  );
};
export default Footer;
