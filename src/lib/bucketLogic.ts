export type Bucket = "simple" | "mid" | "indepth";

export interface FormData {
  useCase: string;
  dataTypes: string[];
  dataSize: string;
  dataSensitivity: string;
  userCount: string;
  latency: string;
  budget: string;
  goal: string;
  email: string;
}

export interface BucketResult {
  bucket: Bucket;
  summary: string;
  explanations: { answer: string; implication: string }[];
  bullets: string[];
}

function getDataSizeScore(size: string): number {
  switch (size) {
    case "small": return 1;
    case "medium": return 2;
    case "large": return 3;
    default: return 1;
  }
}

function getBudgetScore(budget: string): number {
  switch (budget) {
    case "under100": return 1;
    case "100to1000": return 2;
    case "1000to10000": return 3;
    case "over10000": return 4;
    default: return 1;
  }
}

function getSensitivityScore(sensitivity: string): number {
  switch (sensitivity) {
    case "public": return 1;
    case "internal": return 2;
    case "sensitive": return 3;
    default: return 1;
  }
}

function getUserCountScore(users: string): number {
  switch (users) {
    case "small": return 1;
    case "department": return 2;
    case "company": return 3;
    default: return 1;
  }
}

export function determineBucket(formData: FormData): Bucket {
  const dataSizeScore = getDataSizeScore(formData.dataSize);
  const budgetScore = getBudgetScore(formData.budget);
  const sensitivityScore = getSensitivityScore(formData.dataSensitivity);
  const userCountScore = getUserCountScore(formData.userCount);

  // In-depth rules (highest priority)
  if (sensitivityScore === 3 && budgetScore >= 2) return "indepth";
  if (dataSizeScore === 3 && budgetScore >= 3) return "indepth";
  if (userCountScore === 3 && budgetScore >= 3) return "indepth";

  // Simple rules
  if (budgetScore === 1 && dataSizeScore === 1 && sensitivityScore <= 2) return "simple";
  if (budgetScore === 1 && sensitivityScore === 1 && dataSizeScore === 2) return "simple";

  // Mid (default)
  return "mid";
}

// These functions now return English text - translations happen in the components
export function generateExplanations(formData: FormData): { answer: string; implication: string }[] {
  const explanations: { answer: string; implication: string }[] = [];

  // Data size
  const dataSizeLabels: Record<string, string> = {
    small: "< 100 documents/pages",
    medium: "100 – 10,000 documents/pages",
    large: "> 10,000 documents/pages"
  };
  const dataSizeImplications: Record<string, string> = {
    small: "A smaller data set is easier to manage with out-of-the-box SaaS tools.",
    medium: "With this amount of data, a dedicated RAG setup gives you more control over retrieval quality.",
    large: "At this scale, you'll benefit from a custom indexing and retrieval pipeline."
  };
  explanations.push({
    answer: `Data size: ${dataSizeLabels[formData.dataSize] || formData.dataSize}`,
    implication: dataSizeImplications[formData.dataSize] || ""
  });

  // Budget
  const budgetLabels: Record<string, string> = {
    under100: "< €100/month",
    "100to1000": "€100 – €1,000/month",
    "1000to10000": "€1,000 – €10,000/month",
    over10000: "> €10,000/month"
  };
  const budgetImplications: Record<string, string> = {
    under100: "This budget works well for SaaS tools with usage-based pricing.",
    "100to1000": "There's room for API costs and small hosting, but not dedicated GPUs.",
    "1000to10000": "You can afford a proper cloud RAG setup with good model APIs.",
    over10000: "This opens up options for dedicated infrastructure and fine-tuning."
  };
  explanations.push({
    answer: `Budget: ${budgetLabels[formData.budget] || formData.budget}`,
    implication: budgetImplications[formData.budget] || ""
  });

  // Sensitivity
  const sensitivityLabels: Record<string, string> = {
    public: "Mostly public or low-risk",
    internal: "Internal but not highly sensitive",
    sensitive: "Sensitive / regulated"
  };
  const sensitivityImplications: Record<string, string> = {
    public: "Standard cloud-based solutions work fine for your data.",
    internal: "You may want some control over where data is processed.",
    sensitive: "We should prefer setups where data stays in your control or in specific regions."
  };
  explanations.push({
    answer: `Data sensitivity: ${sensitivityLabels[formData.dataSensitivity] || formData.dataSensitivity}`,
    implication: sensitivityImplications[formData.dataSensitivity] || ""
  });

  // User count
  const userLabels: Record<string, string> = {
    small: "1–10 users (small team)",
    department: "10–100 users (department)",
    company: "100+ users (whole company)"
  };
  const userImplications: Record<string, string> = {
    small: "A lightweight setup should handle this easily.",
    department: "You'll want reliable performance but don't need massive scale yet.",
    company: "At this scale, architecture decisions matter for cost and latency."
  };
  explanations.push({
    answer: `Expected users: ${userLabels[formData.userCount] || formData.userCount}`,
    implication: userImplications[formData.userCount] || ""
  });

  return explanations;
}

export function generateBullets(bucket: Bucket, formData: FormData): string[] {
  const bullets: string[] = [];
  
  if (bucket === "simple") {
    bullets.push("Your data volume and budget point toward starting simple.");
    bullets.push("A well-configured SaaS chatbot can deliver value quickly without technical overhead.");
    if (formData.dataSensitivity === "public") {
      bullets.push("Since your data isn't highly sensitive, cloud-based tools are a good fit.");
    }
  } else if (bucket === "mid") {
    bullets.push("You have enough data and budget to benefit from a custom RAG architecture.");
    bullets.push("Pre-trained models via API keep costs reasonable while improving answer quality.");
    if (formData.dataSensitivity === "internal") {
      bullets.push("You can still use cloud APIs while keeping your data processing controlled.");
    }
  } else {
    if (formData.dataSensitivity === "sensitive") {
      bullets.push("Your data sensitivity requires keeping everything in your own infrastructure.");
    }
    if (formData.dataSize === "large") {
      bullets.push("At your data scale, custom indexing and retrieval pipelines make a real difference.");
    }
    if (formData.budget === "over10000" || formData.budget === "1000to10000") {
      bullets.push("Your budget allows for dedicated infrastructure and potentially fine-tuned models.");
    }
  }

  return bullets;
}

export function generateSummary(bucket: Bucket): string {
  switch (bucket) {
    case "simple":
      return "Based on your answers, a SaaS chatbot is likely your best starting point. It's fast to set up, requires no technical maintenance, and fits your current scale and budget well.";
    case "mid":
      return "Your setup suggests you'd benefit from a custom RAG backend using pre-trained models. This gives you more control over answer quality and data handling without the overhead of running your own models.";
    case "indepth":
      return "Given your data sensitivity, scale, or budget, a fully custom or private RAG system makes sense. This means hosting models in your own infrastructure with fine-tuned retrieval for your specific domain.";
  }
}

export function getBucketLabel(bucket: Bucket): string {
  switch (bucket) {
    case "simple": return "Simple (SaaS Chatbot)";
    case "mid": return "Mid (API-based RAG)";
    case "indepth": return "In-depth (Custom / Private RAG)";
  }
}
