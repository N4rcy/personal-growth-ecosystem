import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MessageSquare, Users, Brain, PlusCircle, Clock, AlertCircle } from "lucide-react";
import useCaseStore from "../store/caseStore";

const CourtDashboard = () => {
  const navigate = useNavigate();
  const { cases } = useCaseStore();

  const activeCases = cases.filter(c => !c.resolved);
  const recentCases = cases.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Relationship Guidance</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Get personalized advice for your relationship challenges
          </p>
          <Button
            onClick={() => navigate("/advice")}
            className="px-8 py-6 text-lg"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Share Your Story
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center">
              <MessageSquare className="h-10 w-10 text-blue-500 mb-3" />
              <h3 className="text-2xl font-bold mb-2">{cases.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Stories Shared</p>
            </div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-orange-500 mb-3" />
              <h3 className="text-2xl font-bold mb-2">{activeCases.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Issues</p>
            </div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center">
              <Brain className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-2xl font-bold mb-2">{cases.filter(c => c.aiAnalysis).length}</h3>
              <p className="text-gray-600 dark:text-gray-400">With Advice</p>
            </div>
          </Card>
        </div>

        {/* Recent Cases */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Stories</h2>
            {cases.length > 3 && (
              <Button variant="outline" onClick={() => navigate("/cases")}>
                View All
              </Button>
            )}
          </div>
          
          {recentCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCases.map((caseItem) => (
                <Card key={caseItem.id} className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold line-clamp-2">{caseItem.title}</h3>
                    <Badge variant={caseItem.status === 'resolved' ? 'secondary' : 'default'}>
                      {caseItem.status || 'active'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {caseItem.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(caseItem.createdAt).toLocaleDateString()}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/case/${caseItem.id}`)}
                      variant="outline"
                    >
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Share your first relationship challenge to get personalized advice
              </p>
              <Button onClick={() => navigate("/advice")}>
                Share Your Story
              </Button>
            </Card>
          )}
        </div>

        {/* How It Works */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Share Your Story</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Describe your relationship challenge in your own words
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Get Personalized Advice</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive AI-powered insights tailored to your situation
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Apply & Grow</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use the advice to improve communication and connection
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default CourtDashboard;
