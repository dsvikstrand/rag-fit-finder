import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FitCheckForm } from "@/components/FitCheckForm";
import { ResultsSection } from "@/components/ResultsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n";
import { 
  determineBucket, 
  generateExplanations, 
  generateBullets, 
  generateSummary,
  type FormData,
  type Bucket 
} from "@/lib/bucketLogic";

const Index = () => {
  const { t, language } = useTranslation();
  const [results, setResults] = useState<{
    bucket: Bucket;
    summary: string;
    explanations: { answer: string; implication: string }[];
    bullets: string[];
    formData: FormData;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsAnalyzing(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const bucket = determineBucket(formData);
    const explanations = generateExplanations(formData, t);
    const bullets = generateBullets(bucket, formData, t);
    const summary = generateSummary(bucket, t);

    setResults({
      bucket,
      summary,
      explanations,
      bullets,
      formData,
    });

    setIsAnalyzing(false);

    // Scroll to results after state update
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (results) {
      const bucket = determineBucket(results.formData);
      const explanations = generateExplanations(results.formData, t);
      const bullets = generateBullets(bucket, results.formData, t);
      const summary = generateSummary(bucket, t);
      setResults(prev => prev ? {
        ...prev,
        bucket,
        summary,
        explanations,
        bullets,
      } : prev);
    }
  }, [language, t]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-display text-xl font-semibold gradient-text">
            RAG Fit Check
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <button 
                onClick={scrollToForm}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.header.startAssessment}
              </button>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.header.contact}
              </a>
              <a 
                href="#subscribe" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.header.subscribe}
              </a>
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <HeroSection onStartClick={scrollToForm} />
        
        <div ref={formRef}>
          <FitCheckForm onSubmit={handleFormSubmit} isLoading={isAnalyzing} />
        </div>

        {results && (
          <div ref={resultsRef}>
            <ResultsSection 
              bucket={results.bucket}
              summary={results.summary}
              explanations={results.explanations}
              bullets={results.bullets}
              formData={results.formData}
            />
          </div>
        )}

        <NewsletterSection 
          bucket={results?.bucket ?? "simple"} 
          initialEmail={results?.formData.email ?? ""} 
          anchorId="subscribe"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
