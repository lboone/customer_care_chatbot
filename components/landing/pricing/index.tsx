import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 max-w-6xl mx-auto text-center">
      <h2 className="tex-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
        Fair, usage-based pricing.
      </h2>
      <p className="text-zinc-500 font-light mb-16">
        Start free, upgrade as you grow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Price
          title="Starter"
          price={0}
          unit="mo"
          features={[
            "100 conversations/mo",
            "1 Knowledge Source",
            "Community Support",
          ]}
          buttonLabel="Start Free"
        />
        <Price
          title="Popular"
          price={49}
          unit="mo"
          features={[
            "Unlimited conversations/mo",
            "Unlimited Knowledge Source",
            "Community Support",
            "Custom Branding",
          ]}
          buttonLabel="Get Started"
          isPro={true}
        />
      </div>
    </section>
  );
};
export default Pricing;

const Price = ({
  title,
  price,
  unit,
  features,
  buttonLabel,
  isPro = false,
}: {
  title: string;
  price: number;
  unit: string;
  features: string[];
  buttonLabel: string;
  isPro?: boolean;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-3xl border flex flex-col items-start text-left hover:bg-zinc-900/40 transition-colors",
        isPro
          ? "bg-white/3 border-white/10 relative overflow-hidden"
          : "bg-zinc-900/20 border-white/5",
      )}
    >
      <div
        className={
          isPro
            ? "absolute top-0 right-0 px-4 py-1 bg-white/10 rounded-bl-xl text-[10px] uppercase"
            : "text-sm font-medium text-zinc-400 mb-2"
        }
      >
        {title}
      </div>
      {isPro && (
        <div className="text-sm font-medium text-indigo-400 mb-2">Pro</div>
      )}
      <div className="text-4xl font-medium text-white tracking-tight mb-6">
        ${price}{" "}
        <span className="text-lg text-zinc-600 font-light">/{unit}</span>
      </div>
      <ul className="space-y-3 mb-8 text-sm text-zinc-300 font-light w-full">
        {features.map((feature, index) => (
          <li className="flex items-center gap-3" key={index}>
            <CheckIcon
              className={cn(
                "w-4 h-4",
                isPro ? "text-indigo-400" : "text-green-400",
              )}
            />

            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium mt-auto cursor-pointer",
          isPro ? "bg-white text-black hover:text-white" : "text-white",
        )}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
