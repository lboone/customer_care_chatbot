import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-black rounded-[1px]"></div>
      </div>
      <span className="text-base font-semibold tracking-light text-white/90">
        Customer Care Chatbot
      </span>
    </Link>
  );
};
export default Logo;
