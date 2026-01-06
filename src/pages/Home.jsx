import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scale,
  MessageSquare,
  Brain,
  Users,
  BarChart3,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  ChevronRight,
  Target,
  Zap,
  BookOpen,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    casesResolved: 0,
    insightScore: 0,
    patternsFound: 0,
    avgResponseTime: "2 min",
  });

  const modes = [
    {
      id: "relationship",
      title: "Relationship Advice",
      icon: <MessageSquare className="h-8 w-8" />,
      color: "from-blue-500 to-blue-700",
      description: "Get thoughtful, AI-powered relationship advice",
      features: ["Empathetic Analysis", "Practical Suggestions", "Private & Secure"],
      buttonText: "Get Advice",
      path: "/app/advice",
    },
    {
      id: "english",
      title: "English Lab",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-green-500 to-green-700",
      description: "Practice English conversation skills",
      features: ["Conversation Practice", "Vocabulary Builder", "IELTS Preparation"],
      buttonText: "Practice English",
      path: "/app/english-lab",
    },
    {
      id: "court",
      title: "Relationship Court",
      icon: <Scale className="h-8 w-8" />,
      color: "from-purple-500 to-purple-700",
      description: "Analyze relationship conflicts and patterns",
      features: ["Case Analysis", "Progress Tracking", "Mediation Tools"],
      buttonText: "Enter Court",
      path: "/app/court",
    },
  ];

  const testimonials = [
    {
      text: "The AI gave me really thoughtful advice that helped me understand my partner better.",
      author: "Alex",
      role: "User, 2 months",
    },
    {
      text: "Perfect for practicing difficult conversations in English before having them for real.",
      author: "Priya",
      role: "Student, India",
    },
    {
      text: "Helped us resolve a recurring argument by showing us the pattern we were stuck in.",
      author: "Sam & Taylor",
      role: "Couple, 1 year together",
    },
  ];

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "100% Private - Your conversations stay private",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      text: "AI-Powered - Thoughtful, compassionate advice",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      text: "Instant Responses - Get advice in seconds",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "Free Forever - No costs, no subscriptions",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        casesResolved: 127,
        insightScore: 8.9,
        patternsFound: 42,
        avgResponseTime: "1.5 min",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="relative overflow-hidden pt-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center py-12 md:py-20">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              <Target className="h-3.5 w-3.5 mr-1.5" />
              AI-Powered Relationship Guidance
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Clarity in Your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Relationships
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Get thoughtful, compassionate advice for your relationship challenges. 
              Share your situation and receive AI-powered guidance that feels human.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={() => navigate("/app/advice")}
                className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Free Advice
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => navigate("/app/english-lab")}
                variant="outline"
                className="px-8 py-3 text-lg border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:dark:border-blue-500"
              >
                Try English Lab
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <Card className="p-6 text-center backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.casesResolved}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                People Helped
              </div>
            </Card>

            <Card className="p-6 text-center backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.insightScore}/10
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Satisfaction Score
              </div>
            </Card>

            <Card className="p-6 text-center backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.patternsFound}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Insights Generated
              </div>
            </Card>

            <Card className="p-6 text-center backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.avgResponseTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Response Time
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Choose Your Tool
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Select from our specialized tools designed to help with different aspects 
          of personal growth and relationships.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative p-8">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${mode.color} text-white mb-6`}
                >
                  {mode.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {mode.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {mode.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {mode.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate(mode.path)}
                  className="w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {mode.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Relationship Insights
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                  {feature.icon}
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Users Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  "{testimonial.text}"
                </p>

                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join others who have found clarity and better understanding through our platform.
            No sign up required - start getting advice immediately.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/app/advice")}
              className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Free Advice Now
            </Button>

            <Button
              onClick={() => navigate("/app")}
              variant="outline"
              className="px-8 py-3 text-lg border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:dark:border-blue-500"
            >
              <Users className="mr-2 h-5 w-5" />
              Explore All Features
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            100% Free • No Credit Card • No Account Required
          </p>
        </Card>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Relationship
                <span className="text-blue-600 dark:text-blue-400">
                  Insights
                </span>
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              © 2024 All rights reserved • Built with care
            </p>
          </div>

          <div className="flex gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/settings")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/advice")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Get Advice
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/english-lab")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              English Lab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
