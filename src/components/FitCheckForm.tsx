import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import type { FormData } from "@/lib/bucketLogic";

interface FitCheckFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const DATA_TYPES = [
  { id: "pdfs", label: "PDFs / documents" },
  { id: "wiki", label: "Knowledge base / wiki" },
  { id: "emails", label: "Emails / tickets" },
  { id: "code", label: "Code" },
  { id: "website", label: "Website content" },
  { id: "other", label: "Other" },
];

export function FitCheckForm({ onSubmit, isLoading }: FitCheckFormProps) {
  const [useCase, setUseCase] = useState("");
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [dataSize, setDataSize] = useState("");
  const [dataSensitivity, setDataSensitivity] = useState("");
  const [userCount, setUserCount] = useState("");
  const [latency, setLatency] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");

  const toggleDataType = (id: string) => {
    setDataTypes(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      useCase,
      dataTypes,
      dataSize,
      dataSensitivity,
      userCount,
      latency,
      budget,
      goal,
      email,
    });
  };

  const isValid = useCase && dataTypes.length > 0 && dataSize && dataSensitivity && userCount && latency && budget;

  return (
    <section id="form-section" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-4">
            Tell me about your setup
          </h2>
          <p className="text-muted-foreground">
            This takes about 2 minutes. All fields help me give you better recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-elevated p-6 sm:p-8 space-y-8">
          {/* Use Case */}
          <div className="space-y-2">
            <Label htmlFor="useCase" className="form-label">Use case</Label>
            <Select value={useCase} onValueChange={setUseCase}>
              <SelectTrigger id="useCase">
                <SelectValue placeholder="What will the assistant do?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">Customer support chatbot</SelectItem>
                <SelectItem value="knowledge">Internal knowledge base</SelectItem>
                <SelectItem value="contracts">Search across contracts and documents</SelectItem>
                <SelectItem value="developer">Developer / code assistant</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Types */}
          <div className="space-y-3">
            <Label className="form-label">Data types (select all that apply)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DATA_TYPES.map(type => (
                <label 
                  key={type.id}
                  className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Checkbox 
                    checked={dataTypes.includes(type.id)}
                    onCheckedChange={() => toggleDataType(type.id)}
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Data Size */}
          <div className="space-y-3">
            <Label className="form-label">Approximate data size</Label>
            <RadioGroup value={dataSize} onValueChange={setDataSize} className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="small" id="size-small" />
                <span className="text-sm">&lt; 100 documents/pages</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="medium" id="size-medium" />
                <span className="text-sm">100 – 10,000 documents/pages</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="large" id="size-large" />
                <span className="text-sm">&gt; 10,000 documents/pages</span>
              </label>
            </RadioGroup>
          </div>

          {/* Data Sensitivity */}
          <div className="space-y-3">
            <Label className="form-label">Data sensitivity</Label>
            <RadioGroup value={dataSensitivity} onValueChange={setDataSensitivity} className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="public" id="sens-public" />
                <span className="text-sm">Mostly public or low-risk</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="internal" id="sens-internal" />
                <span className="text-sm">Internal but not highly sensitive</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="sensitive" id="sens-sensitive" />
                <span className="text-sm">Sensitive / regulated (HR, legal, medical, finance, etc.)</span>
              </label>
            </RadioGroup>
          </div>

          {/* User Count */}
          <div className="space-y-3">
            <Label className="form-label">Number of expected users</Label>
            <RadioGroup value={userCount} onValueChange={setUserCount} className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="small" id="users-small" />
                <span className="text-sm">1–10 (small team)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="department" id="users-dept" />
                <span className="text-sm">10–100 (one department)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="company" id="users-company" />
                <span className="text-sm">100+ (whole company or customers)</span>
              </label>
            </RadioGroup>
          </div>

          {/* Latency */}
          <div className="space-y-3">
            <Label className="form-label">Latency tolerance</Label>
            <RadioGroup value={latency} onValueChange={setLatency} className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="slow" id="lat-slow" />
                <span className="text-sm">It's fine if it takes a few seconds</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="medium" id="lat-medium" />
                <span className="text-sm">Should feel reasonably fast (1–3 seconds)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="fast" id="lat-fast" />
                <span className="text-sm">Needs to be snappy (&lt; 1 second)</span>
              </label>
            </RadioGroup>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label className="form-label">Monthly budget for AI tooling</Label>
            <RadioGroup value={budget} onValueChange={setBudget} className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="under100" id="budget-1" />
                <span className="text-sm">&lt; €100</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="100to1000" id="budget-2" />
                <span className="text-sm">€100 – €1,000</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="1000to10000" id="budget-3" />
                <span className="text-sm">€1,000 – €10,000</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="over10000" id="budget-4" />
                <span className="text-sm">&gt; €10,000</span>
              </label>
            </RadioGroup>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <Label htmlFor="goal" className="form-label">
              What are you hoping this AI assistant will do for you?
            </Label>
            <Textarea 
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Help our support team answer customer questions faster..."
              className="min-h-[100px] resize-none"
            />
            <p className="form-description">Optional, but helps me understand your needs better.</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="form-label">
              Email (optional)
            </Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <p className="form-description">Only if you want a summary and occasional RAG tips.</p>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={!isValid || isLoading}
            className="w-full text-lg py-6 rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze my options
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
