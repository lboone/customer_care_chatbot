import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileTextIcon, GlobeIcon, LucideProps, UploadIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const QuickActions = ({
  onOpenModal,
}: {
  onOpenModal: (tab: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <QuickAction
        onOpenModal={onOpenModal}
        borderClassName="hover:border-indigo-500/30 "
        iconBorderClassName="bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20"
        iconClassName="text-indigo-400"
        tab="website"
        title="Add Website"
        description="Crawl your website or specific pages to automatically keep your knowledge base in sync."
        Icon={GlobeIcon}
      />
      <QuickAction
        onOpenModal={onOpenModal}
        borderClassName="hover:border-emerald-500/30 "
        iconBorderClassName="bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20"
        iconClassName="text-emerald-400"
        tab="upload"
        title="Upload File"
        description="Upload CSV files to instantly train your assistant with existing documents."
        Icon={UploadIcon}
      />
      <QuickAction
        onOpenModal={onOpenModal}
        borderClassName="hover:border-zinc-500/30 "
        iconBorderClassName="bg-zinc-500/10 border-zinc-500/20 group-hover:bg-zinc-500/20"
        iconClassName="text-zinc-400"
        tab="text"
        title="Manual Text"
        description="Manually copy-paste FAQs, internal notes, or policies directly into the editor for quick updates."
        Icon={FileTextIcon}
      />
    </div>
  );
};
export default QuickActions;

const QuickAction = ({
  onOpenModal,
  borderClassName,
  iconBorderClassName,
  iconClassName,
  tab,
  title,
  description,
  Icon,
}: {
  onOpenModal: (tab: string) => void;
  tab: string;
  borderClassName?: string;
  iconBorderClassName?: string;
  iconClassName?: string;
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/2 transition-all hover:text-white group whitespace-normal",
        borderClassName,
      )}
      onClick={() => onOpenModal(tab)}
    >
      <div
        className={cn(
          "p-3 rounded-full border transition-colors",
          iconBorderClassName,
        )}
      >
        <Icon className={cn("w-6 h-6", iconClassName)} />
      </div>
      <div className="space-y-1.5 text-center w-full">
        <span className="text-sm font-medium block whitespace-normal">
          {title}
        </span>
        <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
          {description}
        </p>
      </div>
    </Button>
  );
};
