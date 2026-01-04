export const getDemoCases = () => {
  return [
    {
      id: "demo-1",
      title: "Communication Breakdown",
      description:
        "We had a misunderstanding about weekend plans. I thought we agreed to spend time together, but they made other arrangements without telling me. I felt ignored and unimportant. When I brought it up, they said I was being too sensitive and that they forgot to tell me.",
      userRole: "Partner",
      partnerRole: "Partner",
      userEmotions: ["Disappointed", "Hurt", "Confused", "Frustrated"],
      partnerEmotions: ["Defensive", "Busy", "Apologetic", "Annoyed"],
      isResolved: true,
      resolutionNotes:
        "We talked it out and agreed to communicate plans more clearly in the future. We also set up a shared calendar to avoid misunderstandings.",
      timestamp: "2024-01-10T10:30:00Z",
      analysis: {
        severity: "Medium",
        severityScore: "2.1",
        detectedActions: [
          {
            action: "ignored",
            severity: "Medium",
            confidence: 0.7,
            description: 'Detected "ignored" in description',
          },
          {
            action: "miscommunication",
            severity: "Low",
            confidence: 0.8,
            description: "Clear communication breakdown",
          },
        ],
        rootCauses: [
          "Communication breakdown",
          "Expectation mismatch",
          "Forgetting commitments",
        ],
        emotionalIntensity: "1.2",
        generatedAt: "2024-01-10T10:35:00Z",
        verdictSections: {
          summary: {
            title: "Case Summary",
            content:
              "This conflict involves Partner and Partner. The primary issue appears to be communication breakdown related to weekend plans. There was a misunderstanding about agreed-upon time together.",
          },
          repairWindow: {
            title: "Repair Window Assessment",
            content:
              "There is a moderate window for repair. The conflict is recent but emotions are manageable. Addressing the issue within the next few days is recommended to prevent resentment buildup.",
          },
          resolutionStrategy: {
            title: "Resolution Strategy",
            steps: [
              "Take 24 hours to cool down if emotions are still high.",
              "Schedule a calm, private conversation at a neutral time.",
              "Use 'I feel' statements instead of 'You always' accusations.",
              "Focus on understanding rather than being understood first.",
              "Agree on one small, actionable step forward.",
              "Consider setting up a shared calendar for better planning.",
            ],
          },
          communicationTips: {
            title: "Communication Tips",
            content:
              "Practice active listening. Use phrases like 'What I hear you saying is...' to ensure understanding. Avoid blame language and focus on how the situation made you feel rather than attacking the other person's character.",
          },
        },
      },
    },
    {
      id: "demo-2",
      title: "Text Message Misunderstanding",
      description:
        "They sent a short text that seemed angry. I replied asking what was wrong, and they said \"nothing.\" Now we're not talking for two days. I'm worried but also frustrated that they won't communicate.",
      userRole: "Friend",
      partnerRole: "Friend",
      userEmotions: ["Confused", "Anxious", "Frustrated", "Worried"],
      partnerEmotions: ["Angry", "Frustrated", "Annoyed", "Withdrawn"],
      isResolved: false,
      resolutionNotes: "",
      timestamp: "2024-01-15T14:20:00Z",
      analysis: {
        severity: "Low",
        severityScore: "1.4",
        detectedActions: [
          {
            action: "withdrawn",
            severity: "Low",
            confidence: 0.6,
            description: "Detected withdrawal from communication",
          },
        ],
        rootCauses: [
          "Digital communication challenges",
          "Emotional withdrawal",
          "Lack of direct communication",
        ],
        emotionalIntensity: "0.8",
        generatedAt: "2024-01-15T14:25:00Z",
        verdictSections: {
          summary: {
            title: "Case Summary",
            content:
              "This conflict involves Friend and Friend. The primary issue appears to be digital communication challenges stemming from a text message misunderstanding that has led to emotional withdrawal.",
          },
          repairWindow: {
            title: "Repair Window Assessment",
            content:
              "The repair window is open but narrowing. There is time to reflect and approach the situation calmly. Consider reaching out within 48 hours to prevent the silent treatment from becoming a pattern.",
          },
          resolutionStrategy: {
            title: "Resolution Strategy",
            steps: [
              "Give 24-48 hours of space for emotions to settle.",
              "Reach out with a non-confrontational message or call.",
              "Acknowledge the awkwardness without assigning blame.",
              "Suggest a low-pressure way to reconnect (coffee, walk).",
              "Discuss text communication preferences moving forward.",
              "Consider whether this is part of a larger pattern.",
            ],
          },
        },
      },
    },
    {
      id: "demo-3",
      title: "Financial Disagreement",
      description:
        "We disagree about how to split shared expenses. I think we should split 50/50, but they earn more and think they should pay more. This has been an ongoing tension for months.",
      userRole: "Roommate",
      partnerRole: "Roommate",
      userEmotions: ["Frustrated", "Resentful", "Stressed"],
      partnerEmotions: ["Defensive", "Frustrated", "Generous"],
      isResolved: false,
      resolutionNotes: "",
      timestamp: "2024-01-05T09:15:00Z",
      analysis: {
        severity: "Medium",
        severityScore: "2.3",
        detectedActions: [],
        rootCauses: [
          "Financial disagreements",
          "Different values about money",
          "Unclear agreements",
        ],
        emotionalIntensity: "1.5",
        generatedAt: "2024-01-05T09:20:00Z",
        verdictSections: {
          summary: {
            title: "Case Summary",
            content:
              "This conflict involves Roommate and Roommate. The primary issue appears to be financial disagreements about how to split shared expenses, with underlying differences in financial values and expectations.",
          },
        },
      },
    },
  ];
};

export const getDemoStudySessions = () => {
  return [
    {
      date: "2024-01-15",
      subject: "Mathematics",
      duration: 120,
      focus: 8,
      score: 85,
      notes: "Calculus review",
    },
    {
      date: "2024-01-14",
      subject: "Physics",
      duration: 90,
      focus: 6,
      score: 70,
      notes: "Mechanics problems",
    },
    {
      date: "2024-01-13",
      subject: "Chemistry",
      duration: 75,
      focus: 9,
      score: 92,
      notes: "Organic chemistry reactions",
    },
    {
      date: "2024-01-12",
      subject: "Biology",
      duration: 105,
      focus: 7,
      score: 78,
      notes: "Cell biology chapter",
    },
    {
      date: "2024-01-11",
      subject: "Mathematics",
      duration: 95,
      focus: 8,
      score: 88,
      notes: "Algebra practice",
    },
    {
      date: "2024-01-10",
      subject: "History",
      duration: 60,
      focus: 5,
      score: 65,
      notes: "World War II review",
    },
    {
      date: "2024-01-09",
      subject: "Literature",
      duration: 85,
      focus: 7,
      score: 80,
      notes: "Poetry analysis",
    },
  ];
};

export const getDemoWritingSamples = () => {
  return [
    {
      id: "writing-1",
      text: `Technology has transformed the way we live, work, and communicate. While some argue that technology has made our lives more stressful, I believe it has overall improved our quality of life. The key is learning to use technology wisely.

Firstly, technology has greatly increased efficiency. Tasks that once took hours can now be completed in minutes. Communication across long distances is instant and free. Medical advances have extended life expectancy and improved treatment outcomes.

However, it is true that constant connectivity can lead to stress. The expectation to always be available and the pressure of social media comparison are valid concerns. Yet these are issues of usage, not technology itself.

In conclusion, technology is a tool that reflects how we choose to use it. With mindful habits and digital literacy, we can enjoy the benefits while minimizing the drawbacks.`,
      bandScore: 7.5,
      feedback:
        "Good structure and vocabulary, could use more specific examples.",
    },
  ];
};
