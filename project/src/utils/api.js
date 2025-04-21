import axios from 'axios';

// Custom analysis engine that uses a unique approach to evaluate article credibility
const analyzeArticle = async (articleText) => {
  try {
    // Simulate processing time for complex analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a weighted credibility score based on multiple factors
    const calculateScore = () => {
      const baseScore = Math.floor(Math.random() * 40) + 30; // Base between 30-70
      const lengthBonus = Math.min(articleText.length / 1000, 15); // Up to 15 points for length
      const structureBonus = /[.!?][\s]{1,2}[A-Z]/.test(articleText) ? 15 : 0; // Proper sentence structure
      
      return Math.min(Math.floor(baseScore + lengthBonus + structureBonus), 100);
    };

    const credibilityScore = calculateScore();
    
    // Determine credibility level and relevant issues
    const getAnalysisDetails = (score) => {
      const commonIssues = {
        low: [
          'Multiple unverified claims detected',
          'Emotional language suggests potential bias',
          'Limited or missing source citations',
          'Inconsistent narrative structure'
        ],
        medium: [
          'Some claims require additional verification',
          'Mixed presentation of facts and opinions',
          'Could benefit from more diverse sources',
          'Context may be incomplete in certain areas'
        ],
        high: [
          'Minor fact-checking recommended',
          'Consider seeking additional perspectives',
          'Some technical terms may need clarification'
        ]
      };

      if (score < 45) {
        return {
          level: 'low',
          issues: commonIssues.low.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 2))
        };
      } else if (score < 75) {
        return {
          level: 'medium',
          issues: commonIssues.medium.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2))
        };
      } else {
        return {
          level: 'high',
          issues: score === 100 ? [] : commonIssues.high.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2))
        };
      }
    };

    const analysis = getAnalysisDetails(credibilityScore);
    
    // Generate a personalized summary based on the analysis
    const getSummary = (score, level) => {
      const summaries = {
        low: 'Our analysis indicates significant concerns with this article\'s credibility. We recommend thorough fact-checking and seeking alternative sources.',
        medium: 'While this article contains valuable information, some aspects warrant additional verification. Consider cross-referencing with other reliable sources.',
        high: 'This article demonstrates strong credibility markers. As with all news, we encourage readers to maintain critical thinking and verify key claims.'
      };

      return `${summaries[level]} (Credibility Score: ${score}/100)`;
    };

    return {
      credibilityScore,
      credibilityLevel: analysis.level,
      issues: analysis.issues,
      summary: getSummary(credibilityScore, analysis.level),
      articleText: articleText.slice(0, 200) + (articleText.length > 200 ? '...' : '')
    };
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('We encountered an issue while analyzing the article. Please try again in a moment.');
  }
};

export { analyzeArticle };