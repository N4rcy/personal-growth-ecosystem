import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Users,
  Brain,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  RefreshCw,
  UserCheck,
  Star,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import useCaseStore from "../store/caseStore";
import { generateAIAnalysis, formatAnalysisResponse } from "../lib/aiAnalysis";

const Case = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCaseById, updateCase, deleteCase } = useCaseStore();

  const caseData = getCaseById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (caseData) {
      setEditedDescription(caseData.description);
      if (caseData.aiAnalysis) {
        setAiInsights(formatAnalysisResponse(caseData.aiAnalysis));
      }
    }
  }, [caseData]);

  if (!caseData) {
    return (
      <div className="container mx-auto p-4 text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Case not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The case you're looking for doesn't exist or has been deleted.
        </p>
        <Button onClick={() => navigate("/court")}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleSave = () => {
    if (editedDescription.trim()) {
      updateCase(id, { description: editedDescription.trim() });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      deleteCase(id);
      navigate("/court");
    }
  };

  const handleGetExpertAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await generateAIAnalysis(caseData);
      const formatted = formatAnalysisResponse(analysis);

      updateCase(id, {
        aiAnalysis: analysis,
        lastAnalyzed: new Date().toISOString(),
      });

      setAiInsights(formatted);
    } catch (error) {
      console.error("Error getting analysis:", error);
      alert("Failed to get expert analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
                {caseData.title}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={
                    caseData.status === "active" ? "default" : "secondary"
                  }
                >
                  {caseData.status}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                >
                  Severity: {caseData.severity}/10
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2"
            >
              {isEditing ? (
                <X className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
              <span>{isEditing ? "Cancel" : "Edit"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:border-red-300"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Case Details */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Case Details
                </h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  Created {formatDate(caseData.createdAt)}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="min-h-[150px]"
                    placeholder="Describe your case in detail..."
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {caseData.description}
                  </p>
                </div>
              )}
            </Card>

            {/* Expert Analysis Section */}
            <Card className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 border-primary-200 dark:border-primary-800">
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Get Expert Relationship Analysis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get personalized insights and advice from our relationship
                    experts
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    What you'll get:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2 mt-1.5 flex-shrink-0"></div>
                      <span>Root cause analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2 mt-1.5 flex-shrink-0"></div>
                      <span>Communication strategies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2 mt-1.5 flex-shrink-0"></div>
                      <span>Actionable next steps</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2 mt-1.5 flex-shrink-0"></div>
                      <span>Empathy building exercises</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-center">
                  <Button
                    onClick={handleGetExpertAnalysis}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Get Expert Analysis
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Uses DeepSeek AI for expert-level insights
                  </p>
                </div>
              </div>
            </Card>

            {/* AI Insights Section */}
            {aiInsights && (
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Sparkles className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Expert Insights
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Generated{" "}
                        {caseData.lastAnalyzed
                          ? formatDate(caseData.lastAnalyzed)
                          : "recently"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(JSON.stringify(aiInsights, null, 2))
                    }
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Root Cause */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("rootCause")}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Root Cause Analysis
                        </span>
                      </div>
                      {expandedSection === "rootCause" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedSection === "rootCause" && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">
                          {aiInsights.rootCause}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Communication Advice */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("communication")}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Communication Advice
                        </span>
                      </div>
                      {expandedSection === "communication" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedSection === "communication" && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">
                          {aiInsights.communicationAdvice}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Next Steps */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("nextSteps")}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Suggested Next Steps
                        </span>
                      </div>
                      {expandedSection === "nextSteps" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedSection === "nextSteps" && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">
                          {aiInsights.nextSteps}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Empathy */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("empathy")}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Empathy & Understanding
                        </span>
                      </div>
                      {expandedSection === "empathy" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedSection === "empathy" && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">
                          {aiInsights.empathy}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Case Info */}
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Case Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Created
                  </label>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(caseData.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Severity Level
                  </label>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary-600"
                        style={{ width: `${caseData.severity * 10}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {caseData.severity}/10
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseData.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate(`/verdict/${id}`)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Verdict
                </Button>

                <Button
                  onClick={handleGetExpertAnalysis}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="w-full justify-start"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Get Expert Analysis
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => copyToClipboard(caseData.description)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Case Details
                </Button>

                <Button
                  onClick={() => navigate("/case/new")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Case
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case;
