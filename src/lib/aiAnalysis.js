// Temporary stub file - imports redirected to aiService
// This is to fix compilation errors while we update the components

import { getRelationshipAdvice } from './aiService';

/**
 * Temporary compatibility wrapper for old components
 * @param {string|object} input - User input or case data
 * @returns {Promise<string>} AI analysis
 */
export async function generateAIAnalysis(input) {
  try {
    let textInput = input;
    
    // Handle different input formats
    if (typeof input === 'object') {
      if (input.description) {
        textInput = input.description;
      } else if (input.problem) {
        textInput = input.problem;
      } else if (input.title) {
        textInput = input.title + (input.details ? '\n' + input.details : '');
      } else {
        textInput = JSON.stringify(input);
      }
    }
    
    console.log('generateAIAnalysis called with:', { input, textInput });
    return await getRelationshipAdvice(textInput);
  } catch (error) {
    console.error('Error in generateAIAnalysis:', error);
    return 'Unable to generate analysis at this time.';
  }
}

/**
 * Compatibility function for old code
 */
export function getMockAnalysis(caseData) {
  console.warn('getMockAnalysis is deprecated, using fallback');
  return `Analysis for: ${caseData.title || 'Untitled case'}\n\nThis feature has been updated. Please refresh the page for better AI analysis.`;
}
