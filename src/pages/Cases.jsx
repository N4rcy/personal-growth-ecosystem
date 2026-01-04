import { Link } from "react-router-dom";
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
  Trash2,
  FileText,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Home,
  Filter,
  Search,
  Edit,
  Eye,
  Calendar,
  Users,
  RefreshCw,
} from "lucide-react";
import useCaseStore from "../store/caseStore";
import { useState } from "react";

const Cases = () => {
  const { cases, deleteCase, clearCases, importCases } = useCaseStore();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const filteredCases = cases.filter((caseItem) => {
    // Apply search filter
    const matchesSearch =
      search === "" ||
      caseItem.title.toLowerCase().includes(search.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(search.toLowerCase());

    // Apply status filter
    const matchesFilter =
      filter === "all" ||
      (filter === "resolved" && caseItem.isResolved) ||
      (filter === "pending" && !caseItem.isResolved) ||
      (filter === "high" && caseItem.analysis?.severity === "High") ||
      (filter === "medium" && caseItem.analysis?.severity === "Medium") ||
      (filter === "low" && caseItem.analysis?.severity === "Low");

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: cases.length,
    resolved: cases.filter((c) => c.isResolved).length,
    pending: cases.filter((c) => !c.isResolved).length,
    high: cases.filter((c) => c.analysis?.severity === "High").length,
    medium: cases.filter((c) => c.analysis?.severity === "Medium").length,
    low: cases.filter((c) => c.analysis?.severity === "Low").length,
  };

  const exportData = () => {
    const dataStr = JSON.stringify(cases, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `relationship-court-cases-${
      new Date().toISOString().split("T")[0]
    }.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedCases = JSON.parse(event.target.result);
          if (
            window.confirm(
              `Import ${importedCases.length} cases? This will replace your current data.`
            )
          ) {
            importCases(importedCases);
            alert("Data imported successfully!");
          }
        } catch (error) {
          alert("Error importing data. Please check the file format.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearAll = () => {
    if (confirmClear) {
      clearCases();
      setConfirmClear(false);
      alert("All cases cleared.");
    } else {
      setConfirmClear(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Cases</h1>
          <p className="text-muted-foreground">
            View, manage, and analyze all your relationship cases
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
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold mt-2">{stats.resolved}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stats.total > 0
                ? Math.round((stats.resolved / stats.total) * 100)
                : 0}
              % resolved
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-2">{stats.pending}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Severity</p>
                <p className="text-3xl font-bold mt-2">{stats.high}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Case Management</CardTitle>
              <CardDescription>
                {filteredCases.length} of {cases.length} cases shown
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportData} className="gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Button variant="outline" onClick={importData} className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button
                variant={confirmClear ? "destructive" : "outline"}
                onClick={handleClearAll}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {confirmClear ? "Confirm Clear All" : "Clear All"}
              </Button>
              {confirmClear && (
                <Button variant="ghost" onClick={() => setConfirmClear(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All ({cases.length})
                </Button>
                <Button
                  variant={filter === "resolved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("resolved")}
                  className="gap-2"
                >
                  <CheckCircle className="h-3 w-3" />
                  Resolved ({stats.resolved})
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                  className="gap-2"
                >
                  <Clock className="h-3 w-3" />
                  Pending ({stats.pending})
                </Button>
                <Button
                  variant={filter === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("high")}
                  className="gap-2"
                >
                  <AlertTriangle className="h-3 w-3" />
                  High ({stats.high})
                </Button>
              </div>
            </div>

            <Separator />

            {filteredCases.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Cases Found</h3>
                <p className="text-muted-foreground mb-6">
                  {cases.length === 0
                    ? "You haven't created any cases yet."
                    : "No cases match your current filters."}
                </p>
                {cases.length === 0 && (
                  <Link to="/court/case">
                    <Button className="gap-2">
                      <FileText className="h-4 w-4" />
                      Create First Case
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <h4 className="font-semibold text-lg">
                            {caseItem.title}
                          </h4>
                          <Badge
                            variant={
                              caseItem.analysis?.severity === "High"
                                ? "destructive"
                                : caseItem.analysis?.severity === "Medium"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {caseItem.analysis?.severity || "Pending"}
                          </Badge>
                          {caseItem.isResolved ? (
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
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {caseItem.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(caseItem.timestamp)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {caseItem.userRole} ↔ {caseItem.partnerRole}
                          </div>
                          {caseItem.analysis?.isRealAI && (
                            <Badge
                              variant="outline"
                              className="bg-blue-500/10 text-blue-700 border-blue-200 text-xs"
                            >
                              Real AI
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/court/verdict/${caseItem.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/court/case?edit=${caseItem.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (
                              window.confirm("Delete this case permanently?")
                            ) {
                              deleteCase(caseItem.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {caseItem.analysis?.rootCauses &&
                      caseItem.analysis.rootCauses.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="text-sm font-medium mb-2">
                            Root Causes:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {caseItem.analysis.rootCauses
                              .slice(0, 3)
                              .map((cause, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {cause}
                                </Badge>
                              ))}
                            {caseItem.analysis.rootCauses.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{caseItem.analysis.rootCauses.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 rounded-lg">
                <h4 className="font-medium mb-2">Export Your Data</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Download all your cases as a JSON file for backup or analysis.
                </p>
                <Button onClick={exportData} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export All Cases
                </Button>
              </div>

              <div className="p-4 bg-green-500/5 rounded-lg">
                <h4 className="font-medium mb-2">Import Data</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Restore from backup or import cases from another device.
                </p>
                <Button
                  onClick={importData}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import Cases
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                <h4 className="font-medium mb-2">Privacy First</h4>
                <p className="text-sm">
                  All your data is stored locally in your browser. No
                  information is sent to any server unless you explicitly export
                  it.
                </p>
              </div>

              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <h4 className="font-medium mb-2">Educational Purpose</h4>
                <p className="text-sm">
                  This tool is for self-reflection and learning. It is not a
                  substitute for professional relationship counseling.
                </p>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  You currently have {cases.length} case
                  {cases.length !== 1 ? "s" : ""} stored locally.
                </p>
                <p className="mt-1">
                  Last updated:{" "}
                  {cases.length > 0 ? formatDate(cases[0].timestamp) : "Never"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cases;
