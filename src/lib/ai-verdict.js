export async function generateContextAwareVerdict(caseData) {
  const { issue, perspective1, perspective2 = "" } = caseData;

  const prompt = `
Analyze the following relationship conflict deeply. Focus on the **emotions expressed**, **communication patterns**, and **unmet needs**.
  
CASE: "${issue}"
PERSPECTIVE 1: "${perspective1}"
PERSPECTIVE 2: "${perspective2}"

Output format:
1. Emotional Core: what are the main emotions?
2. Communication Breakdown: where and why is it failing?
3. Underlying Needs: what does each person need emotionally?
4. Immediate Steps: 3 actionable steps for today/tomorrow
5. Long-term Patterns: what recurring patterns need addressing?
6. Growth Opportunity: what positive change could come from this?
`;

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional relationship counselor, empathetic and precise.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const verdictText = response.choices[0].message.content;

  // Optional: quick keyword-based severity
  let severity = "medium";
  if (/breakdown|hopeless|critical|abandon/.test(verdictText.toLowerCase()))
    severity = "high";

  return {
    text: verdictText,
    severity,
    generatedAt: new Date().toISOString(),
  };
}
