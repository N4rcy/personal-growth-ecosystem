import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { ChevronRight, MessageSquare, Users, Heart, Brain, AlertCircle, CheckCircle } from "lucide-react";

const NewCase = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emotions, setEmotions] = useState("");
  const [yourRole, setYourRole] = useState("");
  const [theirRole, setTheirRole] = useState("");

  const sampleTemplates = [
    {
      title: "Communication Issues",
      description: "We can't talk about important things without arguing.",
      focus: "Improving dialogue skills",
    },
    {
      title: "Trust Concerns",
      description: "I'm feeling insecure about our relationship after recent events.",
      focus: "Rebuilding trust and security",
    },
    {
      title: "Emotional Distance",
      description: "We've grown apart and don't feel connected anymore.",
      focus: "Reconnecting emotionally",
    },
  ];

  const roleOptions = ["boyfriend", "girlfriend", "husband", "wife", "partner", "friend", "family"];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert("Please fill in the title and description");
      return;
    }

    const newCase = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      tags: emotions ? [...emotions.split(",").map(e => e.trim()), yourRole, theirRole].filter(Boolean) : [yourRole, theirRole].filter(Boolean),
      status: "active",
      createdAt: new Date().toISOString(),
      emotions: emotions,
      yourRole,
      theirRole,
    };

    // Save to store
    import("../store/caseStore").then((module) => {
      module.default.getState().addCase(newCase);
      navigate(`/case/${newCase.id}`, { state: { caseData: newCase } });
    }).catch(err => {
      console.error("Error saving case:", err);
      navigate(`/case/${newCase.id}`, { state: { caseData: newCase } });
    });
  };

  const handleUseTemplate = (template) => {
    setTitle(template.title);
    setDescription(template.description);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/court')}>
            ← Back to Court
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant={step >= 1 ? "default" : "outline"}>1</Badge>
            <ChevronRight className="h-4 w-4" />
            <Badge variant={step >= 2 ? "default" : "outline"}>2</Badge>
            <ChevronRight className="h-4 w-4" />
            <Badge variant={step >= 3 ? "default" : "outline"}>3</Badge>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Share Your Story</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Describe your relationship challenge to get personalized advice
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Quick Start Templates
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose a template or write your own
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleTemplates.map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleUseTemplate(template)}
                      className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <h3 className="font-semibold mb-2">{template.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {template.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {template.focus}
                      </Badge>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full"
                  >
                    Write My Own Story
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Describe Your Situation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What's the main issue?
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief title for your situation"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tell us more details
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what's happening, how you feel, what you've tried..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How are you feeling? (optional)
                    </label>
                    <input
                      type="text"
                      value={emotions}
                      onChange={(e) => setEmotions(e.target.value)}
                      placeholder="e.g., frustrated, sad, confused, hopeful..."
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Helps us understand your emotional state
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your role
                      </label>
                      <select
                        value={yourRole}
                        onChange={(e) => setYourRole(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select your role</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Their role
                      </label>
                      <select
                        value={theirRole}
                        onChange={(e) => setTheirRole(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select their role</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Review Your Story</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Main Issue</h3>
                    <p className="text-gray-700 dark:text-gray-300">{title}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Details</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>

                  {emotions && (
                    <div>
                      <h3 className="font-medium mb-2">Your Feelings</h3>
                      <div className="flex flex-wrap gap-2">
                        {emotions.split(',').map((emotion, index) => (
                          <Badge key={index} variant="outline">
                            {emotion.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Your Role</h3>
                      <Badge>{yourRole || "Not specified"}</Badge>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Their Role</h3>
                      <Badge>{theirRole || "Not specified"}</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  ← Edit Details
                </Button>
                <Button type="submit">
                  Share Your Story & Get Advice
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCase;
