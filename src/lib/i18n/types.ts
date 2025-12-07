export type Language = "en" | "sv";

export interface Translations {
  // Header
  header: {
    startAssessment: string;
    contact: string;
  };

  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButton: string;
    whatsRagButton: string;
    privacyNote: string;
  };

  // What's RAG Modal
  whatsRag: {
    buttonText: string;
    title: string;
    whatIsRagTitle: string;
    whatIsRagDesc: string;
    useCasesTitle: string;
    useCaseChatbotTitle: string;
    useCaseChatbotDesc: string;
    useCaseSearchTitle: string;
    useCaseSearchDesc: string;
    useCaseRecommendationTitle: string;
    useCaseRecommendationDesc: string;
    useCaseDocumentTitle: string;
    useCaseDocumentDesc: string;
    useCaseKnowledgeTitle: string;
    useCaseKnowledgeDesc: string;
    whyFitCheckTitle: string;
    whyFitCheckDesc: string;
    reason1: string;
    reason2: string;
    reason3: string;
  };

  // Form
  form: {
    title: string;
    subtitle: string;
    // Use case
    useCaseLabel: string;
    useCasePlaceholder: string;
    useCaseSupport: string;
    useCaseKnowledge: string;
    useCaseContracts: string;
    useCaseDeveloper: string;
    useCaseOther: string;
    // Data types
    dataTypesLabel: string;
    dataTypePdfs: string;
    dataTypeWiki: string;
    dataTypeEmails: string;
    dataTypeCode: string;
    dataTypeWebsite: string;
    dataTypeOther: string;
    // Data size
    dataSizeLabel: string;
    dataSizeSmall: string;
    dataSizeMedium: string;
    dataSizeLarge: string;
    // Sensitivity
    sensitivityLabel: string;
    sensitivityPublic: string;
    sensitivityInternal: string;
    sensitivitySensitive: string;
    // Users
    usersLabel: string;
    usersSmall: string;
    usersDepartment: string;
    usersCompany: string;
    // Latency
    latencyLabel: string;
    latencySlow: string;
    latencyMedium: string;
    latencyFast: string;
    // Budget
    budgetLabel: string;
    budgetUnder100: string;
    budget100to1000: string;
    budget1000to10000: string;
    budgetOver10000: string;
    // Goal
    goalLabel: string;
    goalPlaceholder: string;
    goalDescription: string;
    // Email
    emailLabel: string;
    emailPlaceholder: string;
    emailDescription: string;
    // Submit
    submitButton: string;
    analyzingButton: string;
  };

  // Results
  results: {
    recommended: string;
    compareTitle: string;
    compareSubtitle: string;
    whyTitle: string;
    whySubtitle: string;
    differenceTitle: string;
    differenceSubtitle: string;
    // Table headers
    option: string;
    bestFor: string;
    answerQuality: string;
    speed: string;
    costAtScale: string;
    dataControl: string;
    complexity: string;
    yourAnswers: string;
    whatThisImplies: string;
    // Bucket labels
    simpleLabel: string;
    midLabel: string;
    indepthLabel: string;
    // KPI data
    simpleBestFor: string;
    simpleQualityLabel: string;
    simpleControl: string;
    simpleComplexity: string;
    midBestFor: string;
    midQualityLabel: string;
    midControl: string;
    midComplexity: string;
    indepthBestFor: string;
    indepthQualityLabel: string;
    indepthControl: string;
    indepthComplexity: string;
    // KPI metrics
    simpleSpeed: string;
    simpleCost: string;
    midSpeed: string;
    midCost: string;
    indepthSpeed: string;
    indepthCost: string;
    // Approach descriptions
    simpleApproachTitle: string;
    simpleApproachDesc: string;
    midApproachTitle: string;
    midApproachDesc: string;
    indepthApproachTitle: string;
    indepthApproachDesc: string;
    // CTA sections
    simpleCTATitle: string;
    simpleCTADesc: string;
    simpleCTAButton: string;
    midCTATitle: string;
    midCTADesc: string;
    midCTANote: string;
    midCTADevNote: string;
    midCTAButton: string;
    indepthCTATitle: string;
    indepthCTADesc: string;
    indepthCTANote: string;
    indepthCTADevNote: string;
    indepthCTAButton: string;
  };

  // Newsletter
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    consentText: string;
    subscribeButton: string;
    subscribingButton: string;
    successTitle: string;
    successDescription: string;
    errorTitle: string;
    errorDescription: string;
    alreadySubscribed: string;
    alreadySubscribedDesc: string;
  };

  // Contact drawer
  contactDrawer: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    submit: string;
    submitting: string;
    cancel: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    missingFieldsTitle: string;
    missingFieldsDesc: string;
    emailFallbackTitle: string;
    emailFallbackDesc: string;
  };

  // Footer
  footer: {
    aboutTitle: string;
    aboutDescription: string;
    aboutNote: string;
    contactTitle: string;
    contactDescription: string;
    contactButton: string;
    contactEmail: string;
    linksLabel: string;
    emailLinkLabel: string;
    websiteLinkLabel: string;
    linkedinLinkLabel: string;
    privacyTitle: string;
    privacyText: string;
    copyright: string;
  };

  // Bucket logic translations
  bucketLogic: {
    // Summaries
    simpleSummary: string;
    midSummary: string;
    indepthSummary: string;
    // Data size explanations
    dataSizeSmallAnswer: string;
    dataSizeSmallImplication: string;
    dataSizeMediumAnswer: string;
    dataSizeMediumImplication: string;
    dataSizeLargeAnswer: string;
    dataSizeLargeImplication: string;
    // Budget explanations
    budgetUnder100Answer: string;
    budgetUnder100Implication: string;
    budget100to1000Answer: string;
    budget100to1000Implication: string;
    budget1000to10000Answer: string;
    budget1000to10000Implication: string;
    budgetOver10000Answer: string;
    budgetOver10000Implication: string;
    // Sensitivity explanations
    sensitivityPublicAnswer: string;
    sensitivityPublicImplication: string;
    sensitivityInternalAnswer: string;
    sensitivityInternalImplication: string;
    sensitivitySensitiveAnswer: string;
    sensitivitySensitiveImplication: string;
    // User count explanations
    usersSmallAnswer: string;
    usersSmallImplication: string;
    usersDepartmentAnswer: string;
    usersDepartmentImplication: string;
    usersCompanyAnswer: string;
    usersCompanyImplication: string;
    // Bullets
    simpleDataBudget: string;
    simpleSaas: string;
    simplePublicData: string;
    midCustomRag: string;
    midPretrainedModels: string;
    midControlledProcessing: string;
    indepthSensitivity: string;
    indepthScale: string;
    indepthBudget: string;
  };
}
