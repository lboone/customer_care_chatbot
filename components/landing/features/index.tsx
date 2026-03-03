import {
  BookOpenIcon,
  LucideProps,
  MessageCircleHeartIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-light mb-6">
          Designed for trust.
        </h2>
        <p className="text-xl text-zinc-500 font-light max-w-xl leading-relaxed">
          Most AI support tools hallucinate. Ours is strictly grounded in your
          content, with a personality you control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature
          Icon={BookOpenIcon}
          title="Knowledge Graph"
          description="We crawl your site and docs to build a structured understanding of your product. No manual training required."
        />
        <Feature
          Icon={ShieldCheckIcon}
          title="Strict Guardrails"
          description="Define exactly what the AI can and cannot say. It will politely decline out-of-scope questions."
        />
        <Feature
          Icon={MessageCircleHeartIcon}
          title="Tone Matching"
          description="Whether you're professional, quirky, or concise, the AI mimics
          your brand voice perfectly."
        />
      </div>
    </section>
  );
};
export default Features;

const Feature = ({
  Icon,
  title,
  description,
}: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}) => {
  return (
    <div className="group p-8 rounded-3xl border border-white/5 bg-linear-to-b from-white/3 to-transparent hover:border-white/10 transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-zinc-300" />
      </div>
      <h3 className="text-lg font-medium text-white mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};
