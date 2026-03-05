import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn, validateUrl } from "@/lib/utils";
import {
  AlertCircleIcon,
  FileTextIcon,
  GlobeIcon,
  Loader2Icon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";

interface AddKnowledgeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTab: string;
  setDefaultTab: (tab: string) => void;
  onImport: (data: any) => Promise<void>;
  isLoading: boolean;
  existingSources: KnowledgeSource[];
}

const AddKnowledgeModal = ({
  isOpen,
  setIsOpen,
  defaultTab,
  setDefaultTab,
  onImport,
  isLoading,
  existingSources,
}: AddKnowledgeModalProps) => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [docsTitle, setDocsTitle] = useState("");
  const [docsContent, setDocsContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImportWrapper = async () => {
    setError(null);

    const data: any = { type: defaultTab };
    if (defaultTab === "website") {
      if (!websiteUrl) return setError("Please enter a website URL");
      if (!validateUrl(websiteUrl))
        return setError("Please enter a valid URL (e.g. https://example.com).");

      const normalizedInput = websiteUrl.replace(/\/$/, "");

      const exists = existingSources.some((source) => {
        if (source.type !== "website" || !source.source_url) return false;
        const normalizedSource = source.source_url.replace(/\/$/, "");
        return normalizedSource === normalizedInput;
      });
      if (exists)
        return setError("This website is already in your knowledge base.");

      data.url = websiteUrl;
    } else if (defaultTab === "text") {
      if (!docsTitle.trim()) return setError("Please enter a title");
      if (!docsContent.trim()) return setError("Please provide content");

      data.title = docsTitle;
      data.content = docsContent;
    } else if (defaultTab === "upload") {
      if (!uploadedFile) return setError("Please select a file to upload");

      data.file = uploadedFile;
    }

    await onImport(data);

    setWebsiteUrl("");
    setDocsTitle("");
    setDocsContent("");
    setUploadedFile(null);
    setError(null);
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setError(null);
      }}
    >
      <DialogContent className="sm:max-w-150 bg-[#0E0E12] border-white/20 text-zinc-100 p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Add New Source</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Choose a content type to train yhour assistant.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="website"
          value={defaultTab}
          onValueChange={(value) => {
            setDefaultTab(value);
            setError(null);
          }}
          className="w-full"
        >
          <div className="px-6 border-white/5">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabTrigger value="website" title="Website" />
              <TabTrigger value="upload" title="File Upload" />
              <TabTrigger value="text" title="Q&A / Text" />
            </TabsList>
          </div>

          <div className="p-6 min-h-50 space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-500/10 border-red-500/20 text-red-400 py-2"
              >
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription className="ml-2 text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <TabsContent
              value="website"
              className="mt-0 space-y-4 animate-in fade-in duration-300"
            >
              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex gap-3">
                <GlobeIcon className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium">Crawl Website</p>
                  <p className="text-xs text-indigo-300/80 mt-1 leading-relaxed">
                    Enter a website URL to crawl significantly or add a specific
                    page link to provide focused context.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Website URL *</Label>
                <Input
                  placeholder="https://example.com"
                  className="bg-white/5 border-white/10 mt-1"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value="upload"
              className="mt-0 space-y-4 animate-in fade-in duration-300"
            >
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm flex gap-3">
                <UploadIcon className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium">Upload File</p>
                  <p className="text-xs text-emerald-300/80 mt-1 leading-relaxed">
                    Upload a CSV file to provide structured data for your
                    assistant.
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="csv-file-input"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Validate file size (10MB max)
                    if (file.size > 10 * 1024 * 1024) {
                      setError("File size must be less than 10MB");
                      return;
                    }
                    // Valide file type
                    if (
                      !file.name.endsWith(".csv") &&
                      file.type !== "text/csv"
                    ) {
                      setError("Only CSV files are allowed");
                      return;
                    }
                    setUploadedFile(file);
                    setError(null);
                  }
                }}
              />
              <div
                className="border-2 border-dashed border-white/10 rounded-xl h-60 flex flex-col items-center justify-center gap-1"
                onClick={() => {
                  document.getElementById("csv-file-input")?.click();
                }}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                  <UploadIcon className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-white">
                  {uploadedFile
                    ? uploadedFile.name
                    : "Click or drag and drop to upload a CSV file"}
                </p>
                <p className="text-xs text-zinc-500 mt-1">CSV (max 10MB)</p>
              </div>
            </TabsContent>
            <TabsContent
              value="text"
              className="mt-0 space-y-4 animate-in fade-in duration-300"
            >
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm flex gap-3">
                <FileTextIcon className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium">Raw Text</p>
                  <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
                    Paste existing FAQs, policies, or internal notes directly.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Title *</Label>
                <Input
                  placeholder="e.g. Refund Policy"
                  className="bg-white/5 border-white/10"
                  value={docsTitle}
                  onChange={(e) => {
                    setDocsTitle(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
              <div className="space-y-3">
                <Label>Content *</Label>
                <Textarea
                  placeholder="Paste text here..."
                  className="bg-white/5 border-white/10 h-32 resize-none"
                  value={docsContent}
                  onChange={(e) => {
                    setDocsContent(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
            </TabsContent>
          </div>

          <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
                setError(null);
              }}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>

            <Button
              className={cn(
                "bg-white min-w-27.5 text-black hover:bg-zinc-200",
                isLoading ? "opacity-50 cursor-not-allowed" : "",
              )}
              onClick={handleImportWrapper}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                "Import Source"
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default AddKnowledgeModal;

const TabTrigger = ({ value, title }: { value: string; title: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none ring-0 outline-none border-t-0 border-x-0"
    >
      {title}
    </TabsTrigger>
  );
};
