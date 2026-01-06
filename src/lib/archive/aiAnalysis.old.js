export const generateAIAnalysis = async (caseData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const {
    title,
    description,
    userEmotions = [],
    partnerEmotions = [],
  } = caseData;

  // Analyze text for key patterns
  const text = `${title} ${description}`.toLowerCase();

  // Detect relationship rupture actions
  const detectedActions = [];
  const actionPatterns = [
    { pattern: "blocked", severity: "High", weight: 0.9 },
    { pattern: "deleted", severity: "High", weight: 0.8 },
    { pattern: "ignored", severity: "Medium", weight: 0.7 },
    { pattern: "lied", severity: "High", weight: 0.85 },
    { pattern: "yelled", severity: "Medium", weight: 0.6 },
    { pattern: "cried", severity: "Low", weight: 0.4 },
    { pattern: "left", severity: "Medium", weight: 0.65 },
    { pattern: "threatened", severity: "High", weight: 0.9 },
    { pattern: "insulted", severity: "Medium", weight: 0.7 },
    { pattern: "accused", severity: "Medium", weight: 0.65 },
  ];

  actionPatterns.forEach(({ pattern, severity, weight }) => {
    if (text.includes(pattern)) {
      detectedActions.push({
        action: pattern,
        severity,
        confidence: weight,
        description: `Detected "${pattern}" in description`,
      });
    }
  });

  // Calculate base severity
  let severity = "Low";
  let severityScore = 0;

  if (detectedActions.length > 0) {
    const weightedScore = detectedActions.reduce((acc, action) => {
      const score =
        action.severity === "High" ? 3 : action.severity === "Medium" ? 2 : 1;
      return acc + score * action.confidence;
    }, 0);

    const averageScore = weightedScore / detectedActions.length;
    severityScore = Math.min(averageScore, 3); // Cap at 3

    if (severityScore >= 2.5) severity = "High";
    else if (severityScore >= 1.5) severity = "Medium";
    else severity = "Low";
  }

  // Adjust severity based on emotional intensity
  const highIntensityEmotions = [
    "Angry",
    "Betrayed",
    "Hurt",
    "Furious",
    "Devastated",
  ];
  const mediumIntensityEmotions = [
    "Frustrated",
    "Disappointed",
    "Confused",
    "Anxious",
    "Sad",
  ];

  const userHighEmotions = userEmotions.filter((e) =>
    highIntensityEmotions.includes(e)
  );
  const userMediumEmotions = userEmotions.filter((e) =>
    mediumIntensityEmotions.includes(e)
  );
  const partnerHighEmotions = partnerEmotions.filter((e) =>
    highIntensityEmotions.includes(e)
  );
  const partnerMediumEmotions = partnerEmotions.filter((e) =>
    mediumIntensityEmotions.includes(e)
  );

  let emotionalIntensity = 0;
  emotionalIntensity += userHighEmotions.length * 0.5;
  emotionalIntensity += userMediumEmotions.length * 0.3;
  emotionalIntensity += partnerHighEmotions.length * 0.4;
  emotionalIntensity += partnerMediumEmotions.length * 0.2;

  // Cap emotional intensity to prevent over-inflation
  emotionalIntensity = Math.min(emotionalIntensity, 2);

  // Combine with severity score
  const finalScore = severityScore + emotionalIntensity * 0.3;

  if (finalScore >= 2.5) severity = "High";
  else if (finalScore >= 1.5) severity = "Medium";
  else severity = "Low";

  // Determine root causes
  const rootCauses = [];

  if (
    text.includes("text") ||
    text.includes("message") ||
    text.includes("social media")
  ) {
    rootCauses.push("Digital communication challenges");
  }

  if (
    text.includes("trust") ||
    text.includes("lie") ||
    text.includes("honest")
  ) {
    rootCauses.push("Trust erosion or transparency concerns");
  }

  if (
    text.includes("time") ||
    text.includes("busy") ||
    text.includes("attention")
  ) {
    rootCauses.push("Time investment or attention distribution issues");
  }

  if (
    text.includes("friend") ||
    text.includes("family") ||
    text.includes("privacy")
  ) {
    rootCauses.push("Boundary crossing or respect issues");
  }

  if (
    text.includes("talk") ||
    text.includes("communicate") ||
    text.includes("listen")
  ) {
    rootCauses.push("Communication breakdown");
  }

  // Default root cause if none detected
  if (rootCauses.length === 0) {
    rootCauses.push("Communication or expectation mismatch");
  }

  // Generate verdict sections
  const verdictSections = {
    summary: {
      title: "Case Summary",
      content: `This conflict involves ${caseData.userRole} and ${
        caseData.partnerRole
      }. The primary issue appears to be ${rootCauses[0].toLowerCase()}.`,
    },
    conflictTrajectory: {
      title: "Conflict Trajectory",
      content:
        "The conflict likely started with a triggering event, escalated through miscommunication or emotional reactions, and resulted in the current stalemate.",
    },
    repairWindow: {
      title: "Repair Window Assessment",
      content:
        severity === "High"
          ? "The repair window is narrow. Immediate, careful attention is required to prevent further damage."
          : severity === "Medium"
          ? "There is a moderate window for repair. Addressing the issue within the next few days is recommended."
          : "The repair window is open. There is time to reflect and approach the situation calmly.",
    },
    partnerPerspective: {
      title: "Partner's Likely Perspective",
      content:
        "Based on the emotions and actions described, your partner may be feeling defensive or hurt. They might perceive the situation differently than you do.",
    },
    whatToAvoid: {
      title: "What to Avoid",
      items: [
        "Avoid escalating with accusatory language.",
        "Avoid bringing up past, unrelated conflicts.",
        "Avoid making permanent decisions based on temporary emotions.",
      ],
    },
    sampleMessage: {
      title: "Sample Opening Message",
      content:
        "Hey, I've been thinking about our conversation and I want to understand your perspective better. Can we talk when you're free?",
    },
    reflectionPrompt: {
      title: "Reflection Prompt",
      content:
        "What part of this situation might I have contributed to, intentionally or unintentionally?",
    },
    resolutionStrategy: {
      title: "Resolution Strategy",
      steps: [
        "Take 24 hours to cool down if emotions are high.",
        "Schedule a calm, private conversation.",
        "Use 'I feel' statements instead of 'You always' accusations.",
        "Focus on understanding rather than being understood first.",
        "Agree on one small, actionable step forward.",
      ],
    },
    keyInsights: {
      title: "Key Insights",
      items:
        severity === "High"
          ? [
              "This conflict has high emotional stakes.",
              "Immediate de-escalation should be the priority.",
              "Consider involving a neutral third party if communication breaks down.",
            ]
          : severity === "Medium"
          ? [
              "This is a moderate conflict that can be resolved with direct communication.",
              "Both parties need to feel heard and validated.",
              "Focus on the specific issue rather than generalizing.",
            ]
          : [
              "This is a low-intensity conflict that can be a growth opportunity.",
              "Use this as a chance to practice healthy communication.",
              "A simple, honest conversation may resolve this quickly.",
            ],
    },
  };

  return {
    severity,
    severityScore: finalScore.toFixed(2),
    detectedActions,
    rootCauses,
    emotionalIntensity: emotionalIntensity.toFixed(2),
    verdictSections,
    generatedAt: new Date().toISOString(),
  };
};
