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
import { useTranslation } from "@/lib/i18n";
import type { FormData } from "@/lib/bucketLogic";

interface FitCheckFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function FitCheckForm({ onSubmit, isLoading }: FitCheckFormProps) {
  const { t } = useTranslation();
  const [useCase, setUseCase] = useState("");
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [dataSize, setDataSize] = useState("");
  const [dataSensitivity, setDataSensitivity] = useState("");
  const [userCount, setUserCount] = useState("");
  const [latency, setLatency] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");

  const DATA_TYPES = [
    { id: "pdfs", label: t.form.dataTypePdfs },
    { id: "wiki", label: t.form.dataTypeWiki },
    { id: "emails", label: t.form.dataTypeEmails },
    { id: "code", label: t.form.dataTypeCode },
    { id: "website", label: t.form.dataTypeWebsite },
    { id: "other", label: t.form.dataTypeOther },
  ];

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
            {t.form.title}
          </h2>
          <p className="text-muted-foreground">
            {t.form.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-elevated p-6 sm:p-8 space-y-10">
          {/* Use Case */}
          <div className="space-y-3">
            <Label htmlFor="useCase" className="form-label-display">{t.form.useCaseLabel}</Label>
            <Select value={useCase} onValueChange={setUseCase}>
              <SelectTrigger id="useCase" className="form-select-trigger">
                <SelectValue placeholder={t.form.useCasePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">{t.form.useCaseSupport}</SelectItem>
                <SelectItem value="knowledge">{t.form.useCaseKnowledge}</SelectItem>
                <SelectItem value="contracts">{t.form.useCaseContracts}</SelectItem>
                <SelectItem value="developer">{t.form.useCaseDeveloper}</SelectItem>
                <SelectItem value="other">{t.form.useCaseOther}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-px bg-border/50" />

          {/* Data Types */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.dataTypesLabel}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DATA_TYPES.map(type => (
                <label 
                  key={type.id}
                  className={`form-option-card ${dataTypes.includes(type.id) ? "form-option-selected" : ""}`}
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

          <div className="h-px bg-border/50" />

          {/* Data Size */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.dataSizeLabel}</Label>
            <RadioGroup value={dataSize} onValueChange={setDataSize} className="space-y-3">
              <label className={`form-option-card ${dataSize === "small" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="small" id="size-small" />
                <span className="text-sm">{t.form.dataSizeSmall}</span>
              </label>
              <label className={`form-option-card ${dataSize === "medium" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="medium" id="size-medium" />
                <span className="text-sm">{t.form.dataSizeMedium}</span>
              </label>
              <label className={`form-option-card ${dataSize === "large" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="large" id="size-large" />
                <span className="text-sm">{t.form.dataSizeLarge}</span>
              </label>
            </RadioGroup>
          </div>

          <div className="h-px bg-border/50" />

          {/* Data Sensitivity */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.sensitivityLabel}</Label>
            <RadioGroup value={dataSensitivity} onValueChange={setDataSensitivity} className="space-y-3">
              <label className={`form-option-card ${dataSensitivity === "public" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="public" id="sens-public" />
                <span className="text-sm">{t.form.sensitivityPublic}</span>
              </label>
              <label className={`form-option-card ${dataSensitivity === "internal" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="internal" id="sens-internal" />
                <span className="text-sm">{t.form.sensitivityInternal}</span>
              </label>
              <label className={`form-option-card ${dataSensitivity === "sensitive" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="sensitive" id="sens-sensitive" />
                <span className="text-sm">{t.form.sensitivitySensitive}</span>
              </label>
            </RadioGroup>
          </div>

          <div className="h-px bg-border/50" />

          {/* User Count */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.usersLabel}</Label>
            <RadioGroup value={userCount} onValueChange={setUserCount} className="space-y-3">
              <label className={`form-option-card ${userCount === "small" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="small" id="users-small" />
                <span className="text-sm">{t.form.usersSmall}</span>
              </label>
              <label className={`form-option-card ${userCount === "department" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="department" id="users-dept" />
                <span className="text-sm">{t.form.usersDepartment}</span>
              </label>
              <label className={`form-option-card ${userCount === "company" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="company" id="users-company" />
                <span className="text-sm">{t.form.usersCompany}</span>
              </label>
            </RadioGroup>
          </div>

          <div className="h-px bg-border/50" />

          {/* Latency */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.latencyLabel}</Label>
            <RadioGroup value={latency} onValueChange={setLatency} className="space-y-3">
              <label className={`form-option-card ${latency === "slow" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="slow" id="lat-slow" />
                <span className="text-sm">{t.form.latencySlow}</span>
              </label>
              <label className={`form-option-card ${latency === "medium" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="medium" id="lat-medium" />
                <span className="text-sm">{t.form.latencyMedium}</span>
              </label>
              <label className={`form-option-card ${latency === "fast" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="fast" id="lat-fast" />
                <span className="text-sm">{t.form.latencyFast}</span>
              </label>
            </RadioGroup>
          </div>

          <div className="h-px bg-border/50" />

          {/* Budget */}
          <div className="space-y-4">
            <Label className="form-label-display">{t.form.budgetLabel}</Label>
            <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
              <label className={`form-option-card ${budget === "under100" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="under100" id="budget-1" />
                <span className="text-sm">{t.form.budgetUnder100}</span>
              </label>
              <label className={`form-option-card ${budget === "100to1000" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="100to1000" id="budget-2" />
                <span className="text-sm">{t.form.budget100to1000}</span>
              </label>
              <label className={`form-option-card ${budget === "1000to10000" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="1000to10000" id="budget-3" />
                <span className="text-sm">{t.form.budget1000to10000}</span>
              </label>
              <label className={`form-option-card ${budget === "over10000" ? "form-option-selected" : ""}`}>
                <RadioGroupItem value="over10000" id="budget-4" />
                <span className="text-sm">{t.form.budgetOver10000}</span>
              </label>
            </RadioGroup>
          </div>

          <div className="h-px bg-border/50" />

          {/* Goal */}
          <div className="space-y-3">
            <Label htmlFor="goal" className="form-label-display">
              {t.form.goalLabel}
            </Label>
            <Textarea 
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={t.form.goalPlaceholder}
              className="min-h-[100px] resize-none"
            />
            <p className="form-description">{t.form.goalDescription}</p>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label htmlFor="email" className="form-label-display">
              {t.form.emailLabel}
            </Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.form.emailPlaceholder}
            />
            <p className="form-description">{t.form.emailDescription}</p>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={!isValid || isLoading}
            className={`w-full text-lg py-6 rounded-xl transition-all duration-300 ${isValid && !isLoading ? "form-submit-glow" : ""}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t.form.analyzingButton}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {t.form.submitButton}
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
