import { Button } from "@/components/ui/button";
import { ArrowDown, Shield } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center section-padding text-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-6">
          <span className="gradient-text">RAG Fit Check</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4">
          Find the AI assistant your business actually needs in 2 minutes.
        </p>
        
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Answer a few questions about your data, budget and latency. 
          I'll show you whether you should start with a simple SaaS chatbot, 
          an API-based RAG system, or a fully custom private model.
        </p>

        <Button 
          size="lg" 
          onClick={onStartClick}
          className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          Start the fit check
          <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
        </Button>

        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>No document uploads. We only use your answers to show options.</span>
        </div>
      </div>
    </section>
  );
}
