import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Mic,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

const EnglishLab = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "writing";
  const [essay, setEssay] = useState("");
  const [speakingTime, setSpeakingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const tabs = [
    {
      id: "writing",
      label: "Writing Practice",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "speaking",
      label: "Speaking Practice",
      icon: <Mic className="h-4 w-4" />,
    },
    {
      id: "answers",
      label: "Model Answers",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "tasks",
      label: "Practice Tasks",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ];

  const modelAnswers = [
    {
      topic: "Technology in Education",
      band: 9,
      preview:
        "The integration of technology in modern education has revolutionized...",
    },
    {
      topic: "Environmental Issues",
      band: 8.5,
      preview:
        "Climate change represents one of the most pressing challenges...",
    },
    {
      topic: "Urbanization",
      band: 8,
      preview: "The rapid growth of cities worldwide has led to numerous...",
    },
  ];

  const practiceTasks = [
    {
      type: "Writing",
      task: "Discuss advantages and disadvantages of remote work",
      time: "40 min",
    },
    {
      type: "Speaking",
      task: "Describe a skill you want to learn",
      time: "2 min",
    },
    {
      type: "Writing",
      task: "Should governments fund space exploration?",
      time: "40 min",
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
              English Lab
            </h1>
          </div>
          <Badge
            variant="outline"
            className="border-accent-300 dark:border-accent-700 bg-accent-50 dark:bg-accent-900/20"
          >
            IELTS Preparation
          </Badge>
        </div>

        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => navigate(`/english-lab?tab=${tab.id}`)}
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-800 border-t border-x border-gray-200 dark:border-gray-700 text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {activeTab === "writing" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Essay Writing
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Topic:
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  "Some people believe that technology has made our lives more
                  complex, while others argue it has made our lives easier.
                  Discuss both views and give your opinion."
                </p>
              </div>
              <Textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Write your essay here (minimum 250 words)..."
                className="min-h-[300px] mb-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {essay.length} characters •{" "}
                  {essay.split(/\s+/).filter((w) => w.length > 0).length} words
                </div>
                <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
                  Submit for AI Grading
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Scoring Criteria
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Task Response
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /9
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Coherence & Cohesion
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /9
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lexical Resource
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /9
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Grammatical Range
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /9
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "speaking" && (
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Speaking Practice
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Record your response and get AI feedback
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {speakingTime}s
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Time
                  </div>
                </div>
                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-accent-500 hover:bg-accent-600"
                  }`}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Topic:
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                "Describe a person who has had a significant influence on your
                life. You should say: - who this person is - how you know this
                person - what influence they have had on your life and explain
                why this person is important to you."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Tips for Success:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Speak for 1-2 minutes continuously
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Use a range of vocabulary and grammar
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    Organize your thoughts logically
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Common Phrases:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>"The person I'd like to talk about is..."</li>
                  <li>"What I admire most about them is..."</li>
                  <li>"They taught me the importance of..."</li>
                  <li>"To give you an example..."</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "answers" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Model Answers (Band 7+)
            </h2>
            {modelAnswers.map((answer, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {answer.topic}
                  </h3>
                  <Badge className="bg-accent-500 text-white">
                    Band {answer.band}
                  </Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {answer.preview}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-700"
                >
                  Read Full Answer
                </Button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Practice Tasks
            </h2>
            {practiceTasks.map((task, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-2 border-primary-300 dark:border-primary-700"
                    >
                      {task.type}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {task.task}
                    </h3>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {task.time}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
                  Start Task
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishLab;
