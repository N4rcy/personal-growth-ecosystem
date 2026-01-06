// Enhanced AI Verdict with psychological insights
export function generateEnhancedVerdict(caseData) {
  const { issue, perspective1, perspective2 = "", metadata = {} } = caseData;

  // Phase 1: Emotional Analysis
  const emotionalAnalysis = analyzeEmotionalPatterns(
    perspective1,
    perspective2
  );

  // Phase 2: Relational Dynamics
  const dynamics = analyzeRelationalDynamics(
    perspective1,
    perspective2,
    emotionalAnalysis
  );

  // Phase 3: Conflict Assessment
  const assessment = assessConflictSeverity(
    emotionalAnalysis,
    dynamics,
    metadata
  );

  // Phase 4: Generate Interventions
  const interventions = generateInterventions(
    emotionalAnalysis,
    dynamics,
    assessment
  );

  // Phase 5: Create Action Plan
  const actionPlan = createActionPlan(interventions, assessment.severity);

  // Generate unique ID for this analysis
  const analysisId = `analysis_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  return {
    id: analysisId,
    generatedAt: new Date().toISOString(),

    // Summary
    summary: `Conflict Analysis: ${emotionalAnalysis.primaryTheme}`,

    // Emotional Insights
    emotionalAnalysis: {
      primaryEmotions: emotionalAnalysis.primaryEmotions,
      underlyingNeeds: emotionalAnalysis.underlyingNeeds,
      cognitivePatterns: emotionalAnalysis.cognitivePatterns,
      attachmentClues: emotionalAnalysis.attachmentClues,
      traumaTriggers: emotionalAnalysis.traumaTriggers,
    },

    // Relational Insights
    relationalDynamics: {
      powerBalance: dynamics.powerBalance,
      communicationPattern: dynamics.communicationPattern,
      trustMetrics: dynamics.trustMetrics,
      conflictStyle: dynamics.conflictStyle,
      perceptionGap: dynamics.perceptionGap,
    },

    // Assessment
    conflictAssessment: {
      severityLevel: assessment.severity,
      complexity: assessment.complexity,
      urgency: assessment.urgency,
      riskFactors: assessment.riskFactors,
      protectiveFactors: assessment.protectiveFactors,
      trustScore: assessment.trustScore,
    },

    // Interventions
    interventions: {
      immediateActions: interventions.immediateActions,
      dialogueFramework: interventions.dialogueFramework,
      boundaryFramework: interventions.boundaryFramework,
      repairRituals: interventions.repairRituals,
    },

    // Action Plan
    actionPlan: {
      phase1: actionPlan.phase1,
      phase2: actionPlan.phase2,
      phase3: actionPlan.phase3,
      progressMetrics: actionPlan.progressMetrics,
    },

    // Quick Stats (for cards)
    severityLevel: assessment.severity,
    trustScore: assessment.trustScore,
    primaryTheme: emotionalAnalysis.primaryTheme,
    estimatedTime: assessment.estimatedTime,
  };
}

// Helper Functions
function analyzeEmotionalPatterns(perspective1, perspective2) {
  const text = (perspective1 + " " + perspective2).toLowerCase();

  // Detect emotions
  const emotions = {
    anger: ["angry", "mad", "furious", "rage", "resent"],
    fear: ["scared", "afraid", "worried", "anxious", "nervous", "insecur"],
    sadness: ["sad", "hurt", "disappoint", "depress", "heart"],
    shame: ["ashamed", "embarrass", "guilt", "stupid"],
    jealousy: ["jealous", "envious", "compar", "threaten"],
  };

  const detectedEmotions = [];
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      detectedEmotions.push(emotion);
    }
  }

  // Detect cognitive distortions
  const distortions = [];
  if (text.includes("always") || text.includes("never")) {
    distortions.push("allOrNothing");
  }
  if (
    text.includes("know what they think") ||
    text.includes("they must think")
  ) {
    distortions.push("mindReading");
  }
  if (
    text.includes("ruin") ||
    text.includes("disaster") ||
    text.includes("end of")
  ) {
    distortions.push("catastrophizing");
  }
  if (
    text.includes("should") ||
    text.includes("must") ||
    text.includes("ought")
  ) {
    distortions.push("shouldStatements");
  }

  // Detect attachment clues
  const attachmentClues = [];
  if (
    text.includes("abandon") ||
    text.includes("leave me") ||
    text.includes("don't leave")
  ) {
    attachmentClues.push("anxious");
  }
  if (
    text.includes("need space") ||
    text.includes("suffocat") ||
    text.includes("too close")
  ) {
    attachmentClues.push("avoidant");
  }

  // Detect trauma triggers
  const traumaTriggers = [];
  const traumaKeywords = [
    "betray",
    "cheat",
    "abuse",
    "neglect",
    "abandon",
    "reject",
  ];
  traumaKeywords.forEach((keyword) => {
    if (text.includes(keyword)) traumaTriggers.push(keyword);
  });

  // Determine primary theme
  let primaryTheme = "Communication Breakdown";
  if (detectedEmotions.includes("jealousy")) primaryTheme = "Trust & Security";
  if (traumaTriggers.length > 0) primaryTheme = "Historical Wounds";
  if (
    attachmentClues.includes("anxious") &&
    attachmentClues.includes("avoidant")
  ) {
    primaryTheme = "Attachment Dance";
  }

  return {
    primaryEmotions: detectedEmotions,
    underlyingNeeds: getUnderlyingNeeds(detectedEmotions),
    cognitivePatterns: distortions,
    attachmentClues: attachmentClues,
    traumaTriggers: traumaTriggers,
    primaryTheme: primaryTheme,
  };
}

function getUnderlyingNeeds(emotions) {
  const needsMap = {
    anger: ["respect", "boundaries", "fairness"],
    fear: ["safety", "reassurance", "predictability"],
    sadness: ["comfort", "understanding", "connection"],
    shame: ["acceptance", "forgiveness", "belonging"],
    jealousy: ["security", "exclusivity", "appreciation"],
  };

  return emotions.flatMap((emotion) => needsMap[emotion] || []);
}

function analyzeRelationalDynamics(
  perspective1,
  perspective2,
  emotionalAnalysis
) {
  const hasBothPerspectives = perspective2.trim().length > 0;

  // Analyze word patterns
  const perspective1Words = perspective1.toLowerCase().split(" ").length;
  const perspective2Words = perspective2.toLowerCase().split(" ").length;

  // Determine power balance based on perspective length and emotional intensity
  let powerBalance = "balanced";
  if (hasBothPerspectives) {
    const ratio = perspective1Words / (perspective2Words || 1);
    if (ratio > 2) powerBalance = "pursuer";
    else if (ratio < 0.5) powerBalance = "withdrawer";
  }

  // Analyze communication patterns
  let communicationPattern = "neutral";
  const hasAccusations =
    perspective1.includes("you always") || perspective1.includes("you never");
  const hasVulnerability =
    perspective1.includes("i feel") || perspective1.includes("i need");

  if (hasAccusations) communicationPattern = "critical";
  if (hasVulnerability) communicationPattern = "vulnerable";
  if (hasAccusations && hasVulnerability) communicationPattern = "mixed";

  // Calculate trust metrics
  const transparency = perspective2.length > 0 ? 0.7 : 0.3;
  const reliability = emotionalAnalysis.traumaTriggers.length > 0 ? 0.4 : 0.7;
  const safety = emotionalAnalysis.primaryEmotions.includes("fear") ? 0.5 : 0.8;
  const integrity = communicationPattern === "vulnerable" ? 0.9 : 0.6;

  const trustScore = Math.round(
    ((transparency + reliability + safety + integrity) / 4) * 100
  );

  // Detect conflict style
  let conflictStyle = "compromising";
  if (emotionalAnalysis.primaryEmotions.includes("anger"))
    conflictStyle = "competing";
  if (perspective2.length === 0) conflictStyle = "avoiding";
  if (emotionalAnalysis.cognitivePatterns.includes("catastrophizing"))
    conflictStyle = "accommodating";

  // Perception gap analysis
  const perceptionGap = hasBothPerspectives
    ? {
        gapExists: true,
        primaryDifference: detectPerspectiveDifference(
          perspective1,
          perspective2
        ),
        suggestedBridge: "Find common emotional ground before discussing facts",
      }
    : {
        gapExists: false,
        message:
          "Only one perspective available. Consider seeking the other side for balanced insight.",
      };

  return {
    powerBalance,
    communicationPattern,
    trustMetrics: { transparency, reliability, safety, integrity },
    trustScore,
    conflictStyle,
    perceptionGap,
    wordCountRatio: perspective1Words / (perspective2Words || 1),
  };
}

function detectPerspectiveDifference(p1, p2) {
  const p1Words = new Set(p1.toLowerCase().split(/\W+/));
  const p2Words = new Set(p2.toLowerCase().split(/\W+/));

  const uniqueToP1 = [...p1Words].filter((word) => !p2Words.has(word));
  const uniqueToP2 = [...p2Words].filter((word) => !p1Words.has(word));

  const emotionWords = [
    "feel",
    "think",
    "want",
    "need",
    "hurt",
    "angry",
    "sad",
    "happy",
  ];
  const emotionalDiff = uniqueToP1.filter((word) =>
    emotionWords.includes(word)
  ).length;

  return emotionalDiff > 2 ? "emotional focus" : "factual focus";
}

function assessConflictSeverity(emotionalAnalysis, dynamics, metadata) {
  let severity = "low";
  let complexity = "simple";
  let urgency = "low";

  // Calculate severity
  let score = 0;
  score += emotionalAnalysis.traumaTriggers.length * 2;
  score += emotionalAnalysis.primaryEmotions.includes("fear") ? 1 : 0;
  score += emotionalAnalysis.primaryEmotions.includes("anger") ? 1 : 0;
  score += dynamics.conflictStyle === "competing" ? 1 : 0;
  score += metadata.recurring === true ? 2 : 0;
  score += (metadata.intensity || 0) > 7 ? 1 : 0;

  if (score >= 6) severity = "critical";
  else if (score >= 4) severity = "high";
  else if (score >= 2) severity = "medium";

  // Determine complexity
  const hasBothPerspectives = dynamics.perceptionGap.gapExists;
  const hasMultipleEmotions = emotionalAnalysis.primaryEmotions.length > 2;
  const hasHistoricalFactors = emotionalAnalysis.traumaTriggers.length > 0;

  if (hasHistoricalFactors && hasMultipleEmotions) complexity = "complex";
  else if (hasBothPerspectives) complexity = "moderate";

  // Determine urgency
  if (severity === "critical") urgency = "immediate";
  else if (severity === "high") urgency = "high";
  else if (metadata.intensity > 8) urgency = "moderate";

  // Risk factors
  const riskFactors = [];
  if (emotionalAnalysis.traumaTriggers.length > 0)
    riskFactors.push("historical wounds");
  if (dynamics.trustScore < 40) riskFactors.push("low trust");
  if (metadata.recurring) riskFactors.push("pattern recurrence");
  if (
    emotionalAnalysis.primaryEmotions.includes("anger") &&
    emotionalAnalysis.primaryEmotions.includes("fear")
  ) {
    riskFactors.push("emotional flooding");
  }

  // Protective factors
  const protectiveFactors = [];
  if (dynamics.communicationPattern === "vulnerable")
    protectiveFactors.push("emotional vulnerability");
  if (dynamics.perceptionGap.gapExists)
    protectiveFactors.push("perspective awareness");
  if (metadata.duration === "long")
    protectiveFactors.push("relationship history");

  // Estimated time for resolution
  const estimatedTime = {
    critical: "3-6 months with professional support",
    high: "1-3 months with dedicated effort",
    medium: "2-4 weeks with structured work",
    low: "1-2 weeks with communication adjustments",
  }[severity];

  return {
    severity,
    complexity,
    urgency,
    riskFactors,
    protectiveFactors,
    trustScore: dynamics.trustScore,
    estimatedTime,
  };
}

function generateInterventions(emotionalAnalysis, dynamics, assessment) {
  const immediateActions = [
    "Take 24-hour emotional time-out before discussing",
    "Write down all feelings without filtering or sending",
    "Practice 4-7-8 breathing when feeling triggered",
    "Identify one self-soothing activity for each person",
  ];

  // Dialogue framework based on conflict style
  const dialogueFramework =
    {
      competing: {
        structure:
          'Use "I feel" statements only, no "you" statements for first round',
        timeLimit: "15 minutes each, 5-minute break, 10-minute synthesis",
        goal: "Understand, not convince",
      },
      avoiding: {
        structure: "Schedule conversation in advance with agreed topic",
        timeLimit: "10 minutes maximum, positive start and end",
        goal: "Small steps toward communication",
      },
      accommodating: {
        structure: "Equal speaking time enforced, use timer",
        timeLimit: "20 minutes total with breaks",
        goal: "Balance needs, not sacrifice",
      },
      compromising: {
        structure: "List all concerns, then brainstorm solutions",
        timeLimit: "30 minutes with 2 breaks",
        goal: "Creative problem-solving",
      },
    }[dynamics.conflictStyle] || dialogueFramework.compromising;

  // Boundary framework
  const boundaryFramework = {
    nonNegotiables: [
      "No name-calling or character attacks",
      "Respect time-out requests immediately",
      "No discussing during high emotional states",
    ],
    flexibilities: [
      "Timing of conversations",
      "Location for discussions",
      "Specific wording preferences",
    ],
    checkpoints: [
      "Weekly 15-minute relationship check-in",
      "Monthly review of boundaries effectiveness",
      "Quarterly appreciation exchange",
    ],
  };

  // Repair rituals
  const repairRituals = [
    "After conflict, share 3 things you appreciate about each other",
    'Create a "repair phrase" that signals willingness to reconnect',
    "Physical connection ritual (hug, hand-hold) after resolution",
  ];

  return {
    immediateActions,
    dialogueFramework,
    boundaryFramework,
    repairRituals,
  };
}

function createActionPlan(interventions, severity) {
  const phase1 = {
    title: "De-escalation & Emotional Regulation",
    timeline: "Next 48 hours",
    actions: interventions.immediateActions,
    successCriteria: "Both parties feel calmer and less defensive",
  };

  const phase2 = {
    title: "Structured Communication",
    timeline: "Week 1",
    actions: [
      "Schedule first structured conversation",
      'Prepare using "I feel... I need..." framework',
      "Practice reflective listening exercises",
      "Agree on one small behavioral change each",
    ],
    successCriteria: "One successful conversation without escalation",
  };

  const phase3 = {
    title: "Behavioral Integration & Trust Building",
    timeline: "Weeks 2-4",
    actions: [
      "Implement weekly relationship check-ins",
      "Track progress on agreed behavioral changes",
      "Practice repair rituals after misunderstandings",
      "Expand boundary framework as needed",
    ],
    successCriteria:
      "Consistent positive interactions, reduced conflict frequency",
  };

  const progressMetrics = [
    "Track: Daily emotional temperature (1-10 scale)",
    "Measure: Number of calm conversations per week",
    "Monitor: Trust score improvement over time",
    "Goal: Reduce conflict intensity by 50% in 30 days",
  ];

  return {
    phase1,
    phase2,
    phase3,
    progressMetrics,
  };
}

// Export helper functions for testing
export {
  analyzeEmotionalPatterns,
  analyzeRelationalDynamics,
  assessConflictSeverity,
  generateInterventions,
  createActionPlan,
};
