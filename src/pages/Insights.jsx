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
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Home,
  Sparkles,
  Target,
  Users,
  MessageSquare,
  Lightbulb,
  Calendar,
  Brain,
  ExternalLink,
} from "lucide-react";
import useCaseStore from "../store/caseStore";
import { analyzePatterns } from "../utils/patternDetector";
import { Link } from "react-router-dom";

const Insights = () => {
  const { cases } = useCaseStore();
  const patterns = analyzePatterns(cases);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return "📉";
      case "worsening":
        return "📈";
      default:
        return "➡️";
    }
  };

  const getHealthColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthBg = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDateRange = () => {
    if (cases.length === 0) return "No cases";

    const dates = cases.map((c) => new Date(c.timestamp));
    const oldest = new Date(Math.min(...dates));
    const newest = new Date(Math.max(...dates));

    return `${oldest.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })} - ${newest.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Insights & Patterns
          </h1>
          <p className="text-muted-foreground">
            AI-powered analysis of your relationship patterns
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Mode Selection
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Score</p>
                <p
                  className={`text-3xl font-bold mt-2 ${getHealthColor(
                    patterns.healthScore
                  )}`}
                >
                  {patterns.healthScore}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${getHealthBg(
                    patterns.healthScore
                  )} transition-all duration-500`}
                  style={{ width: `${patterns.healthScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {patterns.healthScore >= 70
                  ? "Healthy"
                  : patterns.healthScore >= 40
                  ? "Needs Attention"
                  : "Critical - Focus on repair"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trend</p>
                <p className="text-3xl font-bold mt-2">
                  {getTrendIcon(patterns.severityTrend)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm capitalize">
                {patterns.severityTrend === "improving"
                  ? "Improving"
                  : patterns.severityTrend === "worsening"
                  ? "Worsening"
                  : "Stable"}
              </p>
              <p className="text-xs text-muted-foreground">
                {patterns.severityTrend === "improving"
                  ? "Conflicts becoming less severe"
                  : patterns.severityTrend === "worsening"
                  ? "Conflicts becoming more severe"
                  : "No significant change in severity"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Rate</p>
                <p className="text-3xl font-bold mt-2">
                  {patterns.timingPatterns.resolvedPercentage}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                {patterns.timingPatterns.totalCases} total cases
              </p>
              <p className="text-xs text-muted-foreground">
                {patterns.timingPatterns.totalCases > 0
                  ? `${Math.round(
                      patterns.timingPatterns.totalCases *
                        (patterns.timingPatterns.resolvedPercentage / 100)
                    )} resolved`
                  : "No cases yet"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Period</p>
                <p className="text-3xl font-bold mt-2">
                  {cases.length > 0
                    ? Math.ceil(
                        (new Date() -
                          new Date(
                            Math.min(...cases.map((c) => new Date(c.timestamp)))
                          )) /
                          (1000 * 60 * 60 * 24 * 30)
                      )
                    : 0}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Months tracked</p>
              <p className="text-xs text-muted-foreground">
                {formatDateRange()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Key Insights
              </CardTitle>
              <CardDescription>
                AI-generated insights based on your relationship patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patterns.insights.length > 0 ? (
                  patterns.insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium mb-2">
                            Insight #{index + 1}
                          </p>
                          <p className="text-muted-foreground">{insight}</p>
                          {index === 0 &&
                            patterns.commonPatterns.length > 0 && (
                              <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                  {patterns.commonPatterns.map(
                                    (pattern, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="bg-blue-500/10 text-blue-700 border-blue-200"
                                      >
                                        {pattern.cause} ({pattern.count}x)
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Insights Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Create more cases to generate personalized insights.
                    </p>
                    <Link to="/court/case">
                      <Button className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Create New Case
                      </Button>
                    </Link>
                  </div>
                )}

                {patterns.aiPowered && (
                  <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">AI-Powered Analysis</p>
                        <p className="text-sm text-muted-foreground">
                          These insights are generated using DeepSeek AI
                          analysis of your cases.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions based on your patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patterns.healthScore < 50 && (
                  <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">Focus on Repair</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your relationship health score is low. Consider these
                          immediate actions:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Address unresolved conflicts within the next week
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Schedule regular check-ins to prevent
                              misunderstandings
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Focus on one issue at a time rather than multiple
                              conflicts
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {patterns.commonPatterns.length > 0 && (
                  <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">
                          Pattern Detection
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          You have recurring patterns in your conflicts:
                        </p>
                        <div className="space-y-3">
                          {patterns.commonPatterns.map((pattern, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm">{pattern.cause}</span>
                              <Badge variant="outline">
                                {pattern.count} time
                                {pattern.count > 1 ? "s" : ""}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Consider addressing the root cause of these recurring
                          patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {patterns.severityTrend === "worsening" && (
                  <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">Trend Alert</h4>
                        <p className="text-sm text-muted-foreground">
                          Conflict severity is increasing over time. Consider:
                        </p>
                        <ul className="space-y-2 text-sm mt-2">
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Addressing issues earlier before they escalate
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Reviewing communication patterns that lead to
                              escalation
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                            <span>
                              Setting clearer boundaries and expectations
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {patterns.timingPatterns.resolvedPercentage < 50 &&
                  cases.length > 3 && (
                    <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">
                            Resolution Rate
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Less than half of your conflicts are marked as
                            resolved. Consider:
                          </p>
                          <ul className="space-y-2 text-sm mt-2">
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              <span>Following up on pending cases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              <span>Being more proactive about closure</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              <span>
                                Tracking resolution progress over time
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                <div className="text-center">
                  <Link to="/court/cases">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View All Cases
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Relationship Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Cases
                  </span>
                  <span className="font-medium">
                    {patterns.timingPatterns.totalCases}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg. Severity
                  </span>
                  <span className="font-medium">
                    {patterns.timingPatterns.avgSeverity}/3.0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Resolved Rate
                  </span>
                  <span className="font-medium">
                    {patterns.timingPatterns.resolvedPercentage}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <Badge
                    variant={
                      patterns.severityTrend === "improving"
                        ? "default"
                        : patterns.severityTrend === "worsening"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {patterns.severityTrend}
                  </Badge>
                </div>

                {patterns.timingPatterns.realAIUsage > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      AI Analyses
                    </span>
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                      {patterns.timingPatterns.realAIUsage} real AI
                    </Badge>
                  </div>
                )}

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Based on {patterns.timingPatterns.totalCases} case
                    {patterns.timingPatterns.totalCases !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDateRange()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">Active Listening</h4>
                  <p className="text-sm text-muted-foreground">
                    Repeat back what you hear to ensure understanding before
                    responding.
                  </p>
                </div>

                <div className="p-3 bg-blue-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">Use "I Feel" Statements</h4>
                  <p className="text-sm text-muted-foreground">
                    Instead of "You always..." try "I feel [emotion] when
                    [situation]."
                  </p>
                </div>

                <div className="p-3 bg-purple-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">Take Breaks</h4>
                  <p className="text-sm text-muted-foreground">
                    If emotions run high, take a 20-minute break before
                    continuing.
                  </p>
                </div>

                <div className="p-3 bg-orange-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">Focus on One Issue</h4>
                  <p className="text-sm text-muted-foreground">
                    Address one conflict at a time rather than bringing up past
                    issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Review unresolved cases
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Address pending conflicts first
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Track patterns monthly
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Check back next month for trends
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Use communication tips
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Apply one new technique this week
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <Link to="/court/case">
                    <Button size="sm" className="w-full gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Document New Case
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

export default Insights;
