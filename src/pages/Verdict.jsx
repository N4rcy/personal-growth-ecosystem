import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  ArrowLeft,
  Copy,
  Download,
  Edit,
  RefreshCw,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Users,
  Calendar,
  Home,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
} from "lucide-react";
import useCaseStore from "../store/caseStore";
import { generateAIAnalysis } from "../lib/aiAnalysis";

const Verdict = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCaseById, updateCase } = useCaseStore();

  const caseData = getCaseById(id);
  const [expandedSections, setExpandedSections] = useState({});
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!caseData) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Case not found</h2>
        <p className="text-muted-foreground mb-6">
          The case you're looking for doesn't exist.
        </p>
        <Link to="/court">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const copyVerdict = async () => {
    const verdictText = Object.entries(caseData.analysis?.verdictSections || {})
      .map(([key, section]) => `## ${section.title}\n\n${section.content}`)
      .join("\n\n");

    await navigator.clipboard.writeText(verdictText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportVerdict = () => {
    const data = {
      case: caseData,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `verdict-${caseData.id}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const regenerateAnalysis = async () => {
    setIsRegenerating(true);
    try {
      const updatedAnalysis = await generateAIAnalysis(caseData);

      updateCase(id, {
        ...caseData,
        analysis: updatedAnalysis,
      });

      alert("Analysis regenerated with latest AI insights!");
    } catch (error) {
      console.error("Regeneration failed:", error);
      alert("Failed to regenerate analysis. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const markAsResolved = () => {
    const newStatus = !caseData.isResolved;
    updateCase(id, {
      ...caseData,
      isResolved: newStatus,
    });
    alert(`Case marked as ${newStatus ? "resolved" : "pending"}`);
  };

  const verdictSections = caseData.analysis?.verdictSections || {};

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/court")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Case Verdict
              </h1>
              <p className="text-muted-foreground">
                AI-powered analysis and recommendations
              </p>
            </div>
          </div>
        </div>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Mode Selection
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{caseData.title}</CardTitle>
                  <CardDescription>
                    Created {new Date(caseData.timestamp).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      caseData.analysis?.severity === "High"
                        ? "destructive"
                        : caseData.analysis?.severity === "Medium"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {caseData.analysis?.severity || "Pending"}
                  </Badge>
                  {caseData.isResolved ? (
                    <Badge className="bg-green-500/10 text-green-700 border-green-200 gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Resolved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                  {caseData.analysis?.isRealAI && (
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-200 gap-1">
                      <Brain className="h-3 w-3" />
                      Real AI
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Case Description
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {caseData.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      My Perspective
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Role
                        </span>
                        <span className="font-medium">{caseData.userRole}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Emotions
                        </span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {caseData.userEmotions.map((emotion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Their Perspective
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Role
                        </span>
                        <span className="font-medium">
                          {caseData.partnerRole}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Emotions
                        </span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {caseData.partnerEmotions.map((emotion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {caseData.resolutionNotes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Resolution Notes
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {caseData.resolutionNotes}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {caseData.analysis && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Expert Analysis & Verdict
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyVerdict}
                      className="gap-2"
                    >
                      <Copy className="h-3 w-3" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={exportVerdict}
                      className="gap-2"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Generated{" "}
                  {new Date(caseData.analysis.generatedAt).toLocaleDateString()}
                  {caseData.analysis.aiModel &&
                    ` • Using ${caseData.analysis.aiModel}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold">
                        {caseData.analysis.severity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Severity
                      </div>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold">
                        {caseData.analysis.severityScore}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score (1-3)
                      </div>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold">
                        {caseData.analysis.emotionalIntensity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Emotional Intensity
                      </div>
                    </div>
                  </div>

                  {caseData.analysis.rootCauses &&
                    caseData.analysis.rootCauses.length > 0 && (
                      <div className="p-4 bg-blue-500/5 rounded-lg">
                        <h4 className="font-medium mb-3">
                          Root Causes Identified:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {caseData.analysis.rootCauses.map((cause, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-500/10 text-blue-700 border-blue-200"
                            >
                              {cause}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  <Separator />

                  <div className="space-y-4">
                    {Object.entries(verdictSections).map(
                      ([sectionId, section]) => (
                        <div
                          key={sectionId}
                          className="border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleSection(sectionId)}
                            className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold">
                                  {section.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Click to{" "}
                                  {expandedSections[sectionId]
                                    ? "collapse"
                                    : "expand"}
                                </p>
                              </div>
                            </div>
                            {expandedSections[sectionId] ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>

                          {expandedSections[sectionId] && (
                            <div className="p-4 border-t">
                              <div className="prose prose-sm max-w-none">
                                {typeof section.content === "string" ? (
                                  <p className="whitespace-pre-line">
                                    {section.content}
                                  </p>
                                ) : Array.isArray(section.content) ? (
                                  <ul className="space-y-2">
                                    {section.content.map((item, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{JSON.stringify(section.content)}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={regenerateAnalysis}
                disabled={isRegenerating}
                variant="outline"
                className="w-full gap-2"
              >
                {isRegenerating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Analysis
                  </>
                )}
              </Button>

              <Button
                onClick={markAsResolved}
                variant={caseData.isResolved ? "default" : "outline"}
                className="w-full gap-2"
              >
                {caseData.isResolved ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Mark as Pending
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Mark as Resolved
                  </>
                )}
              </Button>

              <Link to={`/court/case?edit=${id}`}>
                <Button variant="outline" className="w-full gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Case
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-500/5 rounded-lg">
                  <h4 className="font-medium mb-1">Severity Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    {caseData.analysis?.severity === "High"
                      ? "This conflict needs immediate attention and careful handling."
                      : caseData.analysis?.severity === "Medium"
                      ? "Address this issue soon to prevent escalation."
                      : "This appears to be a manageable issue."}
                  </p>
                </div>

                {caseData.analysis?.detectedActions &&
                  caseData.analysis.detectedActions.length > 0 && (
                    <div className="p-3 bg-red-500/5 rounded-lg">
                      <h4 className="font-medium mb-1">Detected Actions</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {caseData.analysis.detectedActions.map(
                          (action, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              <span>{action.description}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                <div className="p-3 bg-green-500/5 rounded-lg">
                  <h4 className="font-medium mb-1">Next Steps</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span>Review the AI recommendations above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span>Consider the other person's perspective</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span>Take action within the suggested timeframe</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Case Created</span>
                  <span className="text-sm font-medium">
                    {new Date(caseData.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {caseData.analysis && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expert Analysis Generated</span>
                    <span className="text-sm font-medium">
                      {new Date(
                        caseData.analysis.generatedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {caseData.isResolved && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marked as Resolved</span>
                    <span className="text-sm font-medium">
                      {caseData.resolutionNotes
                        ? "Date available"
                        : "No date recorded"}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="text-center">
                  <Link to="/court/insights">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View All Insights
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verdict;
