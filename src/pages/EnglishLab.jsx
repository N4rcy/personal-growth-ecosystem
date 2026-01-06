import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download, FileText, Video, Search, TrendingUp, HelpCircle } from 'lucide-react';

export default function EnglishLab() {
  const modules = [
    {
      title: "Homework Reference Hub",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Week-by-week breakdowns, common mistakes, and improved examples",
      items: [
        "Week 1-4: Foundational Concepts",
        "Week 5-8: Advanced Analysis",
        "Common Pitfalls & Solutions",
        "Best Practice Examples"
      ]
    },
    {
      title: "Explain It Like This",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Complex concepts explained simply with real-world examples",
      items: [
        "Missing Values Handling",
        "Negative Values & Interpretation",
        "Chunks vs. Words Learning",
        "Mediation Analysis Thinking"
      ]
    },
    {
      title: "Download Center",
      icon: <Download className="h-6 w-6" />,
      description: "Ready-to-use templates, guides, and resources",
      items: [
        "PDF Study Guides",
        "Excel Templates",
        "Before/After Examples",
        "Checklist & Worksheets"
      ]
    }
  ];

  const quickResources = [
    { title: "Research Methods Guide", icon: <FileText />, count: "12 PDFs" },
    { title: "Video Explanations", icon: <Video />, count: "8 Videos" },
    { title: "Practice Exercises", icon: <TrendingUp />, count: "24 Exercises" },
    { title: "Q&A Database", icon: <Search />, count: "50+ Answers" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
          <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          English Learning Lab
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Structured resources for academic English, research methodology, and professional communication
        </p>
      </div>

      {/* Main Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {modules.map((module, index) => (
          <Card key={index} className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-blue-600 dark:text-blue-400">
                    {module.icon}
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
              <CardDescription className="text-base">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {module.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline">
                Explore {module.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Resources */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Quick Access Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickResources.map((resource, index) => (
            <Card key={index} className="text-center hover:border-blue-300 transition-colors">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <div className="text-gray-700 dark:text-gray-300">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{resource.count}</p>
                <Button variant="ghost" size="sm" className="mt-4">
                  View All
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-blue-200 dark:border-gray-700">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Improve Your Skills?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Access structured learning paths, practice exercises, and expert guidance.
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Learning Path
              </Button>
              <Button size="lg" variant="outline">
                Browse Resources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
