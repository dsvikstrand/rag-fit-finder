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
import type { Bucket, FormData } from "@/lib/bucketLogic";
import { getBucketLabel } from "@/lib/bucketLogic";

interface ResultsSectionProps {
  bucket: Bucket;
  summary: string;
  explanations: { answer: string; implication: string }[];
  bullets: string[];
  formData: FormData;
}

const KPI_DATA = {
  simple: {
    bestFor: "Quick setup, small data, limited budget",
    quality: 2,
    qualityLabel: "Basic",
    speed: "2–5 sec",
    cost: "€10–100/mo",
    control: "Hosted SaaS",
    complexity: "Very low",
  },
  mid: {
    bestFor: "Better answers, custom retrieval, API flexibility",
    quality: 4,
    qualityLabel: "Strong",
    speed: "1–3 sec",
    cost: "€100–1000/mo",
    control: "Your stack on cloud APIs",
    complexity: "Medium (needs engineer)",
  },
  indepth: {
    bestFor: "Full control, sensitive data, max quality",
    quality: 5,
    qualityLabel: "Advanced reasoning",
    speed: "Configurable",
    cost: "€500–5000+/mo",
    control: "Private or on-prem",
    complexity: "High (needs specialist)",
  },
};

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
  const buckets: Bucket[] = ["simple", "mid", "indepth"];

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
            Recommended: {getBucketLabel(bucket)}
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {summary}
          </p>
        </div>

        {/* KPI Comparison Table */}
        <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-display font-semibold">Compare your options</h3>
            <p className="text-sm text-muted-foreground mt-1">Non-technical overview of each approach</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Option</TableHead>
                  <TableHead>Best for</TableHead>
                  <TableHead>Answer quality</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Cost at your scale</TableHead>
                  <TableHead>Data & control</TableHead>
                  <TableHead>Complexity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buckets.map((b) => {
                  const data = KPI_DATA[b];
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
                              Recommended
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
            <h3 className="text-xl font-display font-semibold">Why this recommendation?</h3>
            <p className="text-sm text-muted-foreground mt-1">How your answers shaped the result</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Your answers</TableHead>
                <TableHead>What this implies</TableHead>
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

        {/* Next Steps CTA */}
        <div className="card-elevated p-6 sm:p-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <NextStepsCTA bucket={bucket} />
        </div>
      </div>
    </section>
  );
}

function NextStepsCTA({ bucket }: { bucket: Bucket }) {
  if (bucket === "simple") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-display font-semibold">You're a great fit for SaaS</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          A no-code or low-code SaaS chatbot connected to your docs is your best starting point. 
          I recommend picking 1–2 well-supported tools and configuring them properly before 
          thinking about custom models.
        </p>
        <Button asChild className="mt-4">
          <a href="#contact">
            Get help picking a SaaS tool
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
          <h3 className="text-xl font-display font-semibold">Ready for a custom RAG backend</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          You're a strong candidate for a custom RAG backend using pre-trained models. 
          This usually means: a high-quality embedding model, a vector database, and an 
          LLM API wired together for your use case.
        </p>
        <p className="text-foreground font-medium mt-4">
          This is where I typically work with clients: designing the architecture, wiring the stack together, 
          and evaluating it on your real questions.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          For your devs: Technically, this often means a strong cloud model via API plus a vector database.
        </p>
        <Button asChild className="mt-4">
          <a href="#contact">
            Turn this into a concrete architecture
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
        <h3 className="text-xl font-display font-semibold">Consider a private, custom-trained model</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Because of your data sensitivity, scale, or budget, a more private or custom-trained model 
        is worth considering. This might mean hosting an open model on private GPUs and fine-tuning 
        it on your tickets, contracts, or knowledge base.
      </p>
      <p className="text-foreground font-medium mt-4">
        This is my specialty: custom RAG systems and model adaptation on dedicated GPUs.
      </p>
      <p className="text-xs text-muted-foreground mt-2 italic">
        For your devs: Technically, this often means hosting a strong open model on private GPUs with a tuned RAG stack.
      </p>
      <Button asChild className="mt-4">
        <a href="#contact">
          Discuss a custom RAG build
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
