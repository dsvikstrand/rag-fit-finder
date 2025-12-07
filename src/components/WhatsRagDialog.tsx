import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/lib/i18n";
import { BookOpen, CheckCircle2, FileText, MessageCircle, Search, Sparkles } from "lucide-react";

export function WhatsRagDialog() {
  const { t } = useTranslation();

  const useCases = [
    {
      icon: MessageCircle,
      title: t.whatsRag.useCaseChatbotTitle,
      desc: t.whatsRag.useCaseChatbotDesc,
    },
    {
      icon: Search,
      title: t.whatsRag.useCaseSearchTitle,
      desc: t.whatsRag.useCaseSearchDesc,
    },
    {
      icon: Sparkles,
      title: t.whatsRag.useCaseRecommendationTitle,
      desc: t.whatsRag.useCaseRecommendationDesc,
    },
    {
      icon: FileText,
      title: t.whatsRag.useCaseDocumentTitle,
      desc: t.whatsRag.useCaseDocumentDesc,
    },
    {
      icon: BookOpen,
      title: t.whatsRag.useCaseKnowledgeTitle,
      desc: t.whatsRag.useCaseKnowledgeDesc,
    },
  ];

  const reasons = [t.whatsRag.reason1, t.whatsRag.reason2, t.whatsRag.reason3];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 bg-background text-primary border border-primary/30 hover:bg-primary hover:text-white"
        >
          {t.hero.whatsRagButton}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-[92vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-display">{t.whatsRag.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            <span className="block font-semibold text-foreground mb-1">{t.whatsRag.whatIsRagTitle}</span>
            {t.whatsRag.whatIsRagDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-display text-lg text-foreground">{t.whatsRag.useCasesTitle}</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {useCases.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card-elevated p-4 text-left flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-lg text-foreground">{t.whatsRag.whyFitCheckTitle}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.whatsRag.whyFitCheckDesc}</p>
            <ul className="space-y-2">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
