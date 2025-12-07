import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Search, Lightbulb, ShoppingCart, FileText, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface WhatsRAGModalProps {
  children?: React.ReactNode;
}

export function WhatsRAGModal({ children }: WhatsRAGModalProps) {
  const { t } = useTranslation();

  const useCases = [
    {
      icon: MessageSquare,
      title: t.whatsRag.useCaseChatbotTitle,
      description: t.whatsRag.useCaseChatbotDesc,
    },
    {
      icon: Search,
      title: t.whatsRag.useCaseSearchTitle,
      description: t.whatsRag.useCaseSearchDesc,
    },
    {
      icon: ShoppingCart,
      title: t.whatsRag.useCaseRecommendationTitle,
      description: t.whatsRag.useCaseRecommendationDesc,
    },
    {
      icon: FileText,
      title: t.whatsRag.useCaseDocumentTitle,
      description: t.whatsRag.useCaseDocumentDesc,
    },
    {
      icon: Lightbulb,
      title: t.whatsRag.useCaseKnowledgeTitle,
      description: t.whatsRag.useCaseKnowledgeDesc,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
            <HelpCircle className="mr-2 h-5 w-5" />
            {t.whatsRag.buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{t.whatsRag.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* What is RAG */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{t.whatsRag.whatIsRagTitle}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t.whatsRag.whatIsRagDesc}
            </p>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.whatsRag.useCasesTitle}</h3>
            <div className="grid gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0">
                    <useCase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{useCase.title}</h4>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Fit Check */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">{t.whatsRag.whyFitCheckTitle}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t.whatsRag.whyFitCheckDesc}
            </p>
            <div className="space-y-2">
              {[t.whatsRag.reason1, t.whatsRag.reason2, t.whatsRag.reason3].map((reason, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
