import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  BarChart3,
  Calendar,
  Target,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const StudyTools = () => {
  const navigate = useNavigate();
  const [studyTime, setStudyTime] = useState(120); // minutes

  const researchTools = [
    {
      title: "Literature Review",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Organize and analyze research papers",
    },
    {
      title: "Data Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Statistical tools and visualization",
    },
    {
      title: "Note Taking",
      icon: <FileText className="h-5 w-5" />,
      description: "Smart note organization system",
    },
    {
      title: "Study Planner",
      icon: <Calendar className="h-5 w-5" />,
      description: "Schedule and track study sessions",
    },
  ];

  const studySessions = [
    {
      date: "Today",
      subject: "Mindfulness Research",
      duration: "45 min",
      progress: 80,
    },
    {
      date: "Yesterday",
      subject: "NSSI Studies",
      duration: "60 min",
      progress: 100,
    },
    {
      date: "Jan 15",
      subject: "Psychology Theories",
      duration: "90 min",
      progress: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 border-gray-300 dark:border-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Research Hub
            </h1>
          </div>
          <Badge
            variant="outline"
            className="border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20"
          >
            Academic Tools
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Study Time
              </h3>
              <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {studyTime}
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  {" "}
                  min
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This week
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-700"
              onClick={() => setStudyTime(studyTime + 30)}
            >
              + Add Study Session
            </Button>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Research Progress
              </h3>
              <Target className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                65%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-accent-500 h-2.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              2 of 3 research goals completed
            </p>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Consistency
              </h3>
              <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                8 days
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current streak
              </p>
            </div>
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded ${
                    i < 5 ? "bg-accent-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                ></div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Research Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {researchTools.map((tool, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-3">
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tool.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-700"
                >
                  Open Tool
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Recent Study Sessions
            </h2>
            <div className="space-y-4">
              {studySessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.date}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300 dark:border-gray-700"
                      >
                        {session.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.subject}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {session.progress}%
                    </div>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          session.progress === 100
                            ? "bg-accent-500"
                            : "bg-primary-500"
                        }`}
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Research Goals
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-accent-200 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Complete Literature Review
                  </h3>
                  <Badge className="bg-accent-500">Active</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Review 20 papers on mindfulness interventions
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: Jan 30, 2024
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Data Collection
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                  >
                    Upcoming
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Collect survey responses from 100 participants
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Start: Feb 1, 2024
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Paper Draft
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                  >
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Initial draft of research paper
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Completed: Jan 10, 2024
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyTools;
