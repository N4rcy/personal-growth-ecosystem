import { useState } from 'react';
import { getRelationshipAdvice } from '@/lib/aiService';

export default function SimpleAdvice() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse('');
    setError('');
    
    try {
      const advice = await getRelationshipAdvice(input);
      setResponse(advice);
    } catch (error) {
      console.error('Error getting advice:', error);
      setError(`Sorry, we couldn't get advice right now: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResponse('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Relationship Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your situation for thoughtful, compassionate advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What's on your mind?
              </h2>
              
              <form onSubmit={handleSubmit}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your relationship situation... How are you feeling? What challenges are you facing?"
                  className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-xl 
                    bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    resize-none"
                  disabled={loading}
                />
                
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl 
                      hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-200 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Thinking...
                      </>
                    ) : (
                      'Get Insights'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 
                      text-gray-700 dark:text-gray-300 font-medium rounded-xl 
                      hover:bg-gray-50 dark:hover:bg-gray-800 
                      disabled:opacity-50 transition-colors duration-200"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Response
              </h2>
              
              <div className="min-h-[200px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                {error ? (
                  <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    {error}
                  </div>
                ) : response ? (
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {response}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    {loading ? 'Thinking about your situation...' : 'Your advice will appear here'}
                  </div>
                )}
              </div>
              
              {response && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Plain text formatting ensures clarity and focus on the advice itself.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
