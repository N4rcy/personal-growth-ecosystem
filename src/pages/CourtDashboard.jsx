import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  BarChart3,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Search,
  Calendar,
  Scale,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import useCaseStore from "../store/caseStore";

const CourtDashboard = () => {
  const navigate = useNavigate();
  const { cases } = useCaseStore();
  const [searchTerm, setSearchTerm] = useState("");

  const activeCases = cases.filter((c) => c.status === "active");
  const resolvedCases = cases.filter((c) => c.status === "resolved");

  const totalSeverity = cases.reduce((acc, c) => acc + c.severity, 0);
  const avgSeverity =
    cases.length > 0 ? (totalSeverity / cases.length).toFixed(1) : 0;

  const healthScore =
    cases.length > 0
      ? Math.max(0, 100 - avgSeverity * 10 - activeCases.length * 5)
      : 100;

  const getHealthStatus = (score) => {
    if (score >= 80)
      return {
        label: "Excellent",
        color: "text-accent-600",
        bg: "bg-accent-100 dark:bg-accent-900/30",
      };
    if (score >= 60)
      return {
        label: "Good",
        color: "text-primary-600",
        bg: "bg-primary-100 dark:bg-primary-900/30",
      };
    if (score >= 40)
      return {
        label: "Fair",
        color: "text-yellow-600",
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
      };
    if (score >= 20)
      return {
        label: "Poor",
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/30",
      };
    return {
      label: "Critical",
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    };
  };

  const healthStatus = getHealthStatus(healthScore);

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Scale className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Relationship Court
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            AI-powered conflict analysis for stronger relationships
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/case/new")}
            className="bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 px-6 py-3"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Start New Case
          </Button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/insights")}
              className="border-gray-300 dark:border-gray-700 hover:border-primary-500 hover:dark:border-primary-500"
            >
              <Eye className="mr-2 h-4 w-4" />
              Insights
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Case Overview
              </h3>
              <BarChart3 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  Active Cases
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {activeCases.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolved Cases
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {resolvedCases.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Avg. Severity
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {avgSeverity}/10
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Relationship Health
              </h3>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${healthStatus.bg} ${healthStatus.color}`}
              >
                {healthStatus.label}
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {Math.round(healthScore)}
                <span className="text-2xl text-gray-500 dark:text-gray-400">
                  /100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    healthScore >= 80
                      ? "bg-accent-500"
                      : healthScore >= 60
                      ? "bg-primary-500"
                      : healthScore >= 40
                      ? "bg-yellow-500"
                      : healthScore >= 20
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Based on {cases.length} cases and {activeCases.length} active
              issues
            </p>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Progress Trend
              </h3>
              <TrendingUp className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {cases.length > 1 ? "Improving" : "Starting"}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {cases.length > 1
                  ? "You're actively working on your relationship"
                  : "Start your first case to begin tracking progress"}
              </p>
            </div>
            <div className="flex justify-center">
              {cases.length === 0 && (
                <Button
                  onClick={() => navigate("/case/new")}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-700 hover:border-primary-500 hover:dark:border-primary-500"
                >
                  Start First Case
                </Button>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Your Cases
            </h2>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="text-sm border-gray-300 dark:border-gray-700 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              >
                {activeCases.length} Active
              </Badge>
              <Badge
                variant="outline"
                className="text-sm border-gray-300 dark:border-gray-700 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300"
              >
                {resolvedCases.length} Resolved
              </Badge>
            </div>
          </div>

          {filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                No cases yet. Start by creating your first case.
              </div>
              <Button
                onClick={() => navigate("/case/new")}
                className="bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Case
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCases.slice(0, 6).map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => navigate(`/case/${caseItem.id}`)}
                  className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {caseItem.title}
                        </h3>
                        <Badge
                          variant={
                            caseItem.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {caseItem.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {caseItem.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {caseItem.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Severity: {caseItem.severity}/10
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(caseItem.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCases.length > 6 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/cases")}
                    className="w-full text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    View All {cases.length} Cases
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CourtDashboard;
