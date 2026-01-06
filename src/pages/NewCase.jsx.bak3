import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Scale,
  Users,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Zap,
  Brain,
  ChevronRight,
  UserCheck,
  Star,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

const NewCase = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yourRole, setYourRole] = useState("partner");
  const [theirRole, setTheirRole] = useState("partner");
  const [emotions, setEmotions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    "partner",
    "boyfriend",
    "girlfriend",
    "husband",
    "wife",
    "friend",
    "family",
    "colleague",
    "roommate",
    "other",
  ];

  const emotionOptions = [
    "Frustrated",
    "Sad",
    "Angry",
    "Confused",
    "Hurt",
    "Disappointed",
    "Anxious",
    "Lonely",
    "Overwhelmed",
    "Betrayed",
    "Misunderstood",
    "Stressed",
    "Jealous",
    "Insecure",
    "Hopeful",
    "Calm",
    "Understanding",
    "Loving",
    "Patient",
    "Optimistic",
  ];

  const caseTemplates = [
    {
      id: 1,
      title: "Communication Issues",
      scenario: "We can't talk about important things without arguing",
      focus: "Improving dialogue skills",
    },
    {
      id: 2,
      title: "Trust Concerns",
      scenario: "Feeling uneasy about privacy or honesty",
      focus: "Rebuilding trust",
    },
    {
      id: 3,
      title: "Time & Attention",
      scenario: "Not spending enough quality time together",
      focus: "Better prioritization",
    },
    {
      id: 4,
      title: "Future Plans",
      scenario: "Disagreeing about major life decisions",
      focus: "Aligning goals",
    },
    {
      id: 5,
      title: "External Stress",
      scenario: "Work/family stress affecting relationship",
      focus: "Better boundaries",
    },
    {
      id: 6,
      title: "Emotional Distance",
      scenario: "Feeling disconnected or lonely",
      focus: "Reconnecting emotionally",
    },
  ];

  const toggleEmotion = (emotion) => {
    setEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleUseTemplate = (template) => {
    setTitle(template.title);
    setDescription(
      `We're struggling with: ${template.scenario}. I want to focus on: ${template.focus}.`
    );
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 1 && title.trim() && description.trim()) {
      setStep(2);
    } else if (step === 2) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newCase = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        tags: [...emotions, yourRole, theirRole].filter(Boolean),
        severity: emotions.length > 3 ? 7 : emotions.length > 1 ? 5 : 3,
        status: "active",
        createdAt: new Date().toISOString(),
        userInput: "",
        aiAnalysis: null,
        metadata: {
          yourRole,
          theirRole,
          emotions: [...emotions],
        },
      };

      console.log("Created case:", newCase);

      setIsSubmitting(false);
      navigate(`/case/${newCase.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/court")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Court</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                New Relationship Case
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Get expert guidance on your relationship challenges
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Common Scenarios
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Need inspiration? Here are common issues people work on:
                </p>

                <div className="space-y-3">
                  {caseTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer transition-colors"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {template.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {template.scenario}
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-2 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800"
                      >
                        {template.focus}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Zap className="h-4 w-4 mr-2 text-primary-500 dark:text-primary-400" />
                    <span>These won't auto-fill, just for reference</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      What's going on?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Keep it simple - just the basics
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Give it a short title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Communication issues about chores"
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Briefly describe what happened
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Just 1-2 sentences about the situation..."
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Keep it brief - you'll add details later
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {description.length}/200 chars
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      You are
                    </label>
                    <select
                      value={yourRole}
                      onChange={(e) => setYourRole(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      They are
                    </label>
                    <select
                      value={theirRole}
                      onChange={(e) => setTheirRole(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleNextStep}
                    disabled={!title.trim() || !description.trim()}
                    className="w-full bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white"
                  >
                    Continue to Emotions →
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                    Step 1 of 2: Basic info
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <UserCheck className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    How are you feeling?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Select emotions you're experiencing (optional but helpful)
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {emotionOptions.map((emotion) => (
                    <button
                      key={emotion}
                      type="button"
                      onClick={() => toggleEmotion(emotion)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        emotions.includes(emotion)
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  This helps our experts understand your emotional state better
                </div>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Case Preview:
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Title:
                    </span>{" "}
                    {title || "Not set"}
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Roles:
                    </span>{" "}
                    {yourRole} & {theirRole}
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Emotions:
                    </span>{" "}
                    {emotions.length > 0
                      ? emotions.join(", ")
                      : "None selected"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-gray-300 dark:border-gray-700"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Case...
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Get Expert Analysis
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Skip Expert Analysis for now
                </Button>
              </div>
            </Card>

            <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  What to Expect from Expert Analysis
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-primary-500 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Root Cause Analysis:</strong> Identify underlying
                    issues
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-primary-500 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Communication Strategies:</strong> Practical tips
                    for better dialogue
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-primary-500 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Actionable Steps:</strong> Clear next steps to
                    improve your relationship
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-primary-500 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Empathy Building:</strong> Understanding both
                    perspectives
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCase;
