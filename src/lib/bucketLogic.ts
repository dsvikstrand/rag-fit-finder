import type { Translations } from "@/lib/i18n";

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

export function generateExplanations(formData: FormData, t: Translations): { answer: string; implication: string }[] {
  const explanations: { answer: string; implication: string }[] = [];

  const dataSizeMap: Record<string, { answer: string; implication: string }> = {
    small: { answer: t.bucketLogic.dataSizeSmallAnswer, implication: t.bucketLogic.dataSizeSmallImplication },
    medium: { answer: t.bucketLogic.dataSizeMediumAnswer, implication: t.bucketLogic.dataSizeMediumImplication },
    large: { answer: t.bucketLogic.dataSizeLargeAnswer, implication: t.bucketLogic.dataSizeLargeImplication },
  };

  const budgetMap: Record<string, { answer: string; implication: string }> = {
    under100: { answer: t.bucketLogic.budgetUnder100Answer, implication: t.bucketLogic.budgetUnder100Implication },
    "100to1000": { answer: t.bucketLogic.budget100to1000Answer, implication: t.bucketLogic.budget100to1000Implication },
    "1000to10000": { answer: t.bucketLogic.budget1000to10000Answer, implication: t.bucketLogic.budget1000to10000Implication },
    over10000: { answer: t.bucketLogic.budgetOver10000Answer, implication: t.bucketLogic.budgetOver10000Implication },
  };

  const sensitivityMap: Record<string, { answer: string; implication: string }> = {
    public: { answer: t.bucketLogic.sensitivityPublicAnswer, implication: t.bucketLogic.sensitivityPublicImplication },
    internal: { answer: t.bucketLogic.sensitivityInternalAnswer, implication: t.bucketLogic.sensitivityInternalImplication },
    sensitive: { answer: t.bucketLogic.sensitivitySensitiveAnswer, implication: t.bucketLogic.sensitivitySensitiveImplication },
  };

  const userMap: Record<string, { answer: string; implication: string }> = {
    small: { answer: t.bucketLogic.usersSmallAnswer, implication: t.bucketLogic.usersSmallImplication },
    department: { answer: t.bucketLogic.usersDepartmentAnswer, implication: t.bucketLogic.usersDepartmentImplication },
    company: { answer: t.bucketLogic.usersCompanyAnswer, implication: t.bucketLogic.usersCompanyImplication },
  };

  const dataSize = dataSizeMap[formData.dataSize];
  if (dataSize) explanations.push(dataSize);

  const budget = budgetMap[formData.budget];
  if (budget) explanations.push(budget);

  const sensitivity = sensitivityMap[formData.dataSensitivity];
  if (sensitivity) explanations.push(sensitivity);

  const users = userMap[formData.userCount];
  if (users) explanations.push(users);

  return explanations;
}

export function generateBullets(bucket: Bucket, formData: FormData, t: Translations): string[] {
  const bullets: string[] = [];
  
  if (bucket === "simple") {
    bullets.push(t.bucketLogic.simpleDataBudget);
    bullets.push(t.bucketLogic.simpleSaas);
    if (formData.dataSensitivity === "public") {
      bullets.push(t.bucketLogic.simplePublicData);
    }
  } else if (bucket === "mid") {
    bullets.push(t.bucketLogic.midCustomRag);
    bullets.push(t.bucketLogic.midPretrainedModels);
    if (formData.dataSensitivity === "internal") {
      bullets.push(t.bucketLogic.midControlledProcessing);
    }
  } else {
    if (formData.dataSensitivity === "sensitive") {
      bullets.push(t.bucketLogic.indepthSensitivity);
    }
    if (formData.dataSize === "large") {
      bullets.push(t.bucketLogic.indepthScale);
    }
    if (formData.budget === "over10000" || formData.budget === "1000to10000") {
      bullets.push(t.bucketLogic.indepthBudget);
    }
  }

  return bullets;
}

export function generateSummary(bucket: Bucket, t: Translations): string {
  switch (bucket) {
    case "simple":
      return t.bucketLogic.simpleSummary;
    case "mid":
      return t.bucketLogic.midSummary;
    case "indepth":
      return t.bucketLogic.indepthSummary;
  }
}

export function getBucketLabel(bucket: Bucket): string {
  switch (bucket) {
    case "simple": return "Simple (SaaS Chatbot)";
    case "mid": return "Mid (API-based RAG)";
    case "indepth": return "In-depth (Custom / Private RAG)";
  }
}
