export const analyzePatterns = (cases) => {
  if (cases.length === 0) {
    return {
      hasEnoughData: false,
      message: "Create at least 2 cases to see patterns",
    };
  }

  if (cases.length < 3) {
    return {
      hasEnoughData: false,
      message: `Create ${3 - cases.length} more case${
        cases.length === 1 ? "s" : ""
      } to see patterns`,
    };
  }

  // Helper function to count frequencies
  const countFrequency = (items) => {
    const freq = {};
    items.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((subItem) => {
          freq[subItem] = (freq[subItem] || 0) + 1;
        });
      } else if (item) {
        freq[item] = (freq[item] || 0) + 1;
      }
    });
    return freq;
  };

  // Extract data from cases
  const severities = cases.map((c) => c.analysis?.severity).filter(Boolean);
  const rootCauses = cases.map((c) => c.analysis?.rootCauses).filter(Boolean);
  const userEmotions = cases
    .map((c) => c.userEmotions)
    .filter((emotions) => emotions && emotions.length > 0);
  const partnerEmotions = cases
    .map((c) => c.partnerEmotions)
    .filter((emotions) => emotions && emotions.length > 0);

  // Extract detected actions if any
  const detectedActions = cases
    .map((c) => c.analysis?.detectedActions)
    .filter((actions) => actions && actions.length > 0);

  // Count frequencies
  const severityFreq = countFrequency(severities);
  const rootCauseFreq = countFrequency(rootCauses.flat());
  const userEmotionFreq = countFrequency(userEmotions.flat());
  const partnerEmotionFreq = countFrequency(partnerEmotions.flat());
  const actionFreq = countFrequency(detectedActions.flat());

  // Find most common items
  const findMostCommon = (freq) => {
    if (Object.keys(freq).length === 0) return null;

    return Object.entries(freq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([item, count]) => ({ item, count }));
  };

  // Calculate average severity score (High=3, Medium=2, Low=1)
  const severityScores = cases
    .map((c) => {
      switch (c.analysis?.severity) {
        case "High":
          return 3;
        case "Medium":
          return 2;
        case "Low":
          return 1;
        default:
          return null;
      }
    })
    .filter((score) => score !== null);

  const avgSeverityScore =
    severityScores.length > 0
      ? severityScores.reduce((a, b) => a + b, 0) / severityScores.length
      : 0;

  // Detect severity trend
  const sortedCases = [...cases].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  const recentCases = sortedCases.slice(-3);
  const recentSeverities = recentCases
    .map((c) => c.analysis?.severity)
    .filter(Boolean);

  let severityTrend = "stable";
  if (recentSeverities.length >= 2) {
    const first = recentSeverities[0];
    const last = recentSeverities[recentSeverities.length - 1];

    const severityValue = { Low: 1, Medium: 2, High: 3 };
    if (severityValue[last] > severityValue[first])
      severityTrend = "increasing";
    else if (severityValue[last] < severityValue[first])
      severityTrend = "decreasing";
  }

  // Calculate time between cases
  let avgTimeBetweenCases = null;
  let frequentTimes = null;

  if (sortedCases.length >= 2) {
    // Calculate average days between cases
    let totalDays = 0;
    const timeSlots = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    for (let i = 1; i < sortedCases.length; i++) {
      const prevDate = new Date(sortedCases[i - 1].timestamp);
      const currDate = new Date(sortedCases[i].timestamp);
      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
      totalDays += diffDays;

      // Categorize by time of day
      const hour = currDate.getHours();
      if (hour >= 5 && hour < 12) timeSlots.morning++;
      else if (hour >= 12 && hour < 17) timeSlots.afternoon++;
      else if (hour >= 17 && hour < 22) timeSlots.evening++;
      else timeSlots.night++;
    }

    avgTimeBetweenCases = (totalDays / (sortedCases.length - 1)).toFixed(1);

    // Find most frequent time
    const maxTimeSlot = Object.entries(timeSlots).reduce(
      (max, [slot, count]) => (count > max.count ? { slot, count } : max),
      { slot: "morning", count: 0 }
    );
    frequentTimes = maxTimeSlot.count > 0 ? maxTimeSlot.slot : null;
  }

  // Find common patterns in titles/descriptions
  const commonWords = {};
  cases.forEach((caseItem) => {
    const text = (caseItem.title + " " + caseItem.description).toLowerCase();
    const words = text.split(/\W+/).filter((word) => word.length > 3);

    words.forEach((word) => {
      commonWords[word] = (commonWords[word] || 0) + 1;
    });
  });

  // Filter out common stop words and get top patterns
  const stopWords = [
    "about",
    "with",
    "that",
    "this",
    "have",
    "were",
    "they",
    "their",
    "would",
  ];
  const topPatterns = Object.entries(commonWords)
    .filter(([word]) => !stopWords.includes(word))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  // Calculate conflict resolution rate
  const resolvedCases = cases.filter((c) => c.isResolved).length;
  const resolutionRate =
    cases.length > 0 ? ((resolvedCases / cases.length) * 100).toFixed(0) : 0;

  // Determine most common conflict type
  let mostCommonType = "Communication";
  if (
    rootCauseFreq["Digital communication challenges"] >
    (rootCauseFreq["Communication breakdown"] || 0)
  ) {
    mostCommonType = "Digital Communication";
  } else if (
    rootCauseFreq["Trust erosion or transparency concerns"] >
    (rootCauseFreq["Communication breakdown"] || 0)
  ) {
    mostCommonType = "Trust Issues";
  } else if (
    rootCauseFreq["Boundary crossing or respect issues"] >
    (rootCauseFreq["Communication breakdown"] || 0)
  ) {
    mostCommonType = "Boundaries";
  }

  const patternsData = {
    hasEnoughData: true,
    totalCases: cases.length,

    // Frequency analysis
    mostCommonSeverities: findMostCommon(severityFreq),
    mostCommonRootCauses: findMostCommon(rootCauseFreq),
    mostCommonEmotions: findMostCommon(userEmotionFreq),
    mostCommonPartnerEmotions: findMostCommon(partnerEmotionFreq),
    mostCommonActions: findMostCommon(actionFreq),

    // Trends
    severityTrend,
    avgSeverityScore: avgSeverityScore.toFixed(1),
    avgTimeBetweenCases,
    frequentTimes,
    topPatterns,

    // Stats
    resolutionRate,
    mostCommonType,

    // Insights
    insights: generateInsights({
      severityTrend,
      avgSeverityScore,
      mostCommonType,
      resolutionRate,
      frequentTimes,
      mostCommonActions: findMostCommon(actionFreq),
    }),
  };

  // Add interpretive insights
  patternsData.interpretiveInsights =
    generateInterpretiveInsights(patternsData);

  return patternsData;
};

const generateInsights = (data) => {
  const insights = [];

  // Severity insights
  if (data.avgSeverityScore > 2.3) {
    insights.push(
      "Your conflicts tend to be high-intensity. Consider focusing on de-escalation techniques before addressing issues."
    );
  } else if (data.avgSeverityScore < 1.5) {
    insights.push(
      "Your conflicts are generally low-intensity. This suggests good baseline communication skills."
    );
  }

  // Trend insights
  if (data.severityTrend === "increasing") {
    insights.push(
      "Conflict intensity has been increasing. This might indicate unresolved issues accumulating over time."
    );
  } else if (data.severityTrend === "decreasing") {
    insights.push(
      "Conflict intensity is decreasing - great progress in managing disagreements!"
    );
  }

  // Type insights
  if (data.mostCommonType === "Digital Communication") {
    insights.push(
      "Digital communication appears to be a frequent trigger. Consider having important conversations in person."
    );
  } else if (data.mostCommonType === "Trust Issues") {
    insights.push(
      "Trust seems to be a recurring theme. Building consistent trust behaviors might help."
    );
  }

  // Time insights
  if (data.frequentTimes === "night") {
    insights.push(
      "Conflicts often occur at night when energy is low. Consider scheduling important talks for morning."
    );
  } else if (data.frequentTimes === "morning") {
    insights.push(
      "Morning conflicts might be related to daily stress. A calming morning routine could help."
    );
  }

  // Resolution insights
  if (data.resolutionRate < 30) {
    insights.push(
      "Few conflicts are marked as resolved. Consider focusing on closure and follow-up conversations."
    );
  } else if (data.resolutionRate > 70) {
    insights.push(
      "High resolution rate shows strong repair skills. Keep up the good work!"
    );
  }

  // Action insights
  if (
    data.mostCommonActions &&
    data.mostCommonActions.some(
      (a) => a.item.includes("deleted") || a.item.includes("blocked")
    )
  ) {
    insights.push(
      "Digital disconnection appears in multiple cases. This pattern might indicate a need for alternative conflict resolution methods."
    );
  }

  return insights;
};

const generateInterpretiveInsights = (patterns) => {
  const insights = [];

  // Severity Trend
  if (patterns.severityTrend === "increasing") {
    insights.push({
      category: "Severity Trend",
      insight: "Conflicts are getting more intense",
      interpretation:
        "This often happens when issues go unresolved or when digital communication escalates quickly. Consider addressing concerns earlier and in person when possible.",
      action:
        "Try to have important conversations face-to-face, and address issues before they accumulate.",
    });
  } else if (patterns.severityTrend === "decreasing") {
    insights.push({
      category: "Severity Trend",
      insight: "Conflicts are becoming less intense",
      interpretation:
        "This suggests improving conflict management skills or fewer high-stakes disagreements. Celebrate this progress!",
      action:
        "Continue practicing calm communication and early issue resolution.",
    });
  }

  // Resolution Rate
  if (parseInt(patterns.resolutionRate) < 40) {
    insights.push({
      category: "Resolution Pattern",
      insight: "Low resolution rate",
      interpretation:
        "Few conflicts are marked as resolved. This might indicate a pattern of leaving issues unresolved or not having clear closure conversations.",
      action:
        "Make a habit of having explicit 'closure' conversations after conflicts, even if they're brief.",
    });
  } else if (parseInt(patterns.resolutionRate) > 70) {
    insights.push({
      category: "Resolution Pattern",
      insight: "High resolution rate",
      interpretation:
        "You're good at resolving conflicts! This suggests strong repair skills and follow-through.",
      action:
        "Document what resolution strategies work best for you to reinforce these positive patterns.",
    });
  }

  // Timing Patterns
  if (patterns.frequentTimes === "night") {
    insights.push({
      category: "Timing Pattern",
      insight: "Most conflicts happen at night",
      interpretation:
        "Late-night discussions often occur when both parties are tired, leading to less patience and more misunderstandings.",
      action:
        "Schedule important conversations for morning or early evening when energy levels are higher.",
    });
  } else if (patterns.frequentTimes === "morning") {
    insights.push({
      category: "Timing Pattern",
      insight: "Most conflicts happen in the morning",
      interpretation:
        "Morning conflicts might relate to daily stress, rushed conversations, or unresolved overnight issues.",
      action:
        "Create a calming morning routine and avoid serious discussions when rushing.",
    });
  }

  // Most Common Type
  if (patterns.mostCommonType === "Digital Communication") {
    insights.push({
      category: "Conflict Type",
      insight: "Digital communication is a frequent trigger",
      interpretation:
        "Text-based communication lacks tone and context, making misunderstandings common and escalation quick.",
      action:
        "Save important conversations for voice calls or in-person meetings. For texts, use clear language and emojis to convey tone.",
    });
  } else if (patterns.mostCommonType === "Trust Issues") {
    insights.push({
      category: "Conflict Type",
      insight: "Trust is a recurring theme",
      interpretation:
        "Trust-related conflicts often stem from consistency issues in behavior or communication.",
      action:
        "Focus on consistent, predictable behavior and transparent communication to rebuild trust.",
    });
  }

  // Frequency of conflicts
  if (
    patterns.avgTimeBetweenCases &&
    parseFloat(patterns.avgTimeBetweenCases) < 7
  ) {
    insights.push({
      category: "Frequency Pattern",
      insight: "Frequent conflicts (weekly or more)",
      interpretation:
        "Very frequent conflicts might indicate underlying unresolved issues or communication patterns.",
      action:
        "Consider addressing root causes rather than individual incidents. Relationship counseling might help.",
    });
  }

  return insights;
};

export const getRelationshipHealthScore = (cases) => {
  if (cases.length === 0) return null;

  let score = 75; // Base score

  const patterns = analyzePatterns(cases);
  if (!patterns.hasEnoughData) return 75;

  // Adjust based on severity
  score -= (parseFloat(patterns.avgSeverityScore) - 1) * 10;

  // Adjust based on resolution rate
  score += (parseInt(patterns.resolutionRate) - 50) * 0.2;

  // Adjust based on trend
  if (patterns.severityTrend === "decreasing") score += 10;
  if (patterns.severityTrend === "increasing") score -= 10;

  // Adjust based on time between cases
  if (patterns.avgTimeBetweenCases) {
    const avgDays = parseFloat(patterns.avgTimeBetweenCases);
    if (avgDays > 30) score += 5; // Less frequent conflicts
    if (avgDays < 7) score -= 10; // Very frequent conflicts
  }

  // Cap score between 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
};
