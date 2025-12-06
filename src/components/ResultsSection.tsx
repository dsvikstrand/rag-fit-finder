import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Star, ArrowRight, Zap, Server, Lock, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { Bucket, FormData } from "@/lib/bucketLogic";

interface ResultsSectionProps {
  bucket: Bucket;
  summary: string;
  explanations: { answer: string; implication: string }[];
  bullets: string[];
  formData: FormData;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= count ? "fill-highlight-border text-highlight-border" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function ResultsSection({ bucket, summary, explanations, bullets, formData }: ResultsSectionProps) {
  const { t } = useTranslation();
  const buckets: Bucket[] = ["simple", "mid", "indepth"];

  const getBucketLabel = (b: Bucket) => {
    switch (b) {
      case "simple": return t.results.simpleLabel;
      case "mid": return t.results.midLabel;
      case "indepth": return t.results.indepthLabel;
    }
  };

  const getKpiData = (b: Bucket) => {
    switch (b) {
      case "simple":
        return {
          bestFor: t.results.simpleBestFor,
          quality: 2,
          qualityLabel: t.results.simpleQualityLabel,
          speed: "2–5 sec",
          cost: "€10–100/mo",
          control: t.results.simpleControl,
          complexity: t.results.simpleComplexity,
        };
      case "mid":
        return {
          bestFor: t.results.midBestFor,
          quality: 4,
          qualityLabel: t.results.midQualityLabel,
          speed: "1–3 sec",
          cost: "€100–1000/mo",
          control: t.results.midControl,
          complexity: t.results.midComplexity,
        };
      case "indepth":
        return {
          bestFor: t.results.indepthBestFor,
          quality: 5,
          qualityLabel: t.results.indepthQualityLabel,
          speed: "Configurable",
          cost: "€500–5000+/mo",
          control: t.results.indepthControl,
          complexity: t.results.indepthComplexity,
        };
    }
  };

  return (
    <section id="results-section" className="section-padding animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Recommended Badge & Summary */}
        <div className="text-center space-y-6 animate-slide-up">
          <Badge 
            variant="outline" 
            className="text-lg px-6 py-2 border-2 border-primary bg-primary/5 text-primary"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {t.results.recommended}: {getBucketLabel(bucket)}
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {summary}
          </p>
        </div>

        {/* KPI Comparison Table */}
        <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-display font-semibold">{t.results.compareTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.results.compareSubtitle}</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">{t.results.option}</TableHead>
                  <TableHead>{t.results.bestFor}</TableHead>
                  <TableHead>{t.results.answerQuality}</TableHead>
                  <TableHead>{t.results.speed}</TableHead>
                  <TableHead>{t.results.costAtScale}</TableHead>
                  <TableHead>{t.results.dataControl}</TableHead>
                  <TableHead>{t.results.complexity}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buckets.map((b) => {
                  const data = getKpiData(b);
                  const isRecommended = b === bucket;
                  return (
                    <TableRow 
                      key={b} 
                      className={isRecommended ? "highlight-row bg-highlight" : ""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-1">
                          <span>{getBucketLabel(b).split("(")[0].trim()}</span>
                          {isRecommended && (
                            <Badge variant="secondary" className="w-fit text-xs bg-primary/10 text-primary">
                              {t.results.recommended}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{data.bestFor}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <StarRating count={data.quality} />
                          <span className="text-xs text-muted-foreground">{data.qualityLabel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{data.speed}</TableCell>
                      <TableCell className="text-sm">{data.cost}</TableCell>
                      <TableCell className="text-sm">{data.control}</TableCell>
                      <TableCell className="text-sm">{data.complexity}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Explanation Table */}
        <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-display font-semibold">{t.results.whyTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.results.whySubtitle}</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">{t.results.yourAnswers}</TableHead>
                <TableHead>{t.results.whatThisImplies}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {explanations.map((exp, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-sm">{exp.answer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{exp.implication}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-6 border-t border-border bg-muted/30">
            <ul className="space-y-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What's the difference section */}
        <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-display font-semibold">{t.results.differenceTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.results.differenceSubtitle}</p>
          </div>
          
          <div className="divide-y divide-border">
            <div className="p-6">
              <h4 className="font-display font-semibold text-foreground mb-2">{t.results.simpleApproachTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.results.simpleApproachDesc}</p>
            </div>
            <div className="p-6">
              <h4 className="font-display font-semibold text-foreground mb-2">{t.results.midApproachTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.results.midApproachDesc}</p>
            </div>
            <div className="p-6">
              <h4 className="font-display font-semibold text-foreground mb-2">{t.results.indepthApproachTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.results.indepthApproachDesc}</p>
            </div>
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="card-elevated p-6 sm:p-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <NextStepsCTA bucket={bucket} />
        </div>
      </div>
    </section>
  );
}

function NextStepsCTA({ bucket }: { bucket: Bucket }) {
  const { t } = useTranslation();

  if (bucket === "simple") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-display font-semibold">{t.results.simpleCTATitle}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {t.results.simpleCTADesc}
        </p>
        <Button asChild className="mt-4">
          <a href="#contact">
            {t.results.simpleCTAButton}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  if (bucket === "mid") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-display font-semibold">{t.results.midCTATitle}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {t.results.midCTADesc}
        </p>
        <p className="text-foreground font-medium mt-4">
          {t.results.midCTANote}
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          {t.results.midCTADevNote}
        </p>
        <Button asChild className="mt-4">
          <a href="#contact">
            {t.results.midCTAButton}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Lock className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-xl font-display font-semibold">{t.results.indepthCTATitle}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {t.results.indepthCTADesc}
      </p>
      <p className="text-foreground font-medium mt-4">
        {t.results.indepthCTANote}
      </p>
      <p className="text-xs text-muted-foreground mt-2 italic">
        {t.results.indepthCTADevNote}
      </p>
      <Button asChild className="mt-4">
        <a href="#contact">
          {t.results.indepthCTAButton}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
