import { motion } from 'framer-motion';
import CredibilityMeter from './CredibilityMeter';
import VotingSystem from './VotingSystem';
import CommentsSection from './CommentsSection';
import { truncateText } from '../utils/validation';
import './ArticleResult.css';

const ArticleResult = ({ article }) => {
  if (!article) {
    return <div className="article-not-found">Article not found</div>;
  }

  const { text, analysis, date } = article;
  const { credibilityScore, credibilityLevel, issues, summary } = analysis;

  // Format date string
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getCredibilityColorClass = () => {
    if (credibilityScore < 40) return 'credibility-low';
    if (credibilityScore < 70) return 'credibility-medium';
    return 'credibility-high';
  };

  const colorClass = getCredibilityColorClass();
  
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="article-result"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="result-header" variants={itemVariants}>
        <h2>Analysis Results</h2>
        <p className="analysis-date">Analyzed on {formattedDate}</p>
      </motion.div>

      <motion.div className="credibility-section" variants={itemVariants}>
        <CredibilityMeter score={credibilityScore} />
        
        <div className="credibility-summary">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      </motion.div>

      {issues && issues.length > 0 && (
        <motion.div 
          className={`issues-section ${colorClass}`}
          variants={itemVariants}
        >
          <h3>Potential Issues Detected</h3>
          <ul className="issues-list">
            {issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div className="article-preview" variants={itemVariants}>
        <h3>Article Preview</h3>
        <div className="preview-content">
          <p>{truncateText(text, 300)}</p>
          {text.length > 300 && (
            <p className="preview-note">
              <em>(Article text truncated for display purposes)</em>
            </p>
          )}
        </div>
      </motion.div>

      <motion.div className="interaction-section" variants={itemVariants}>
        <h3>Do you agree with this analysis?</h3>
        <VotingSystem articleId={article.id} votes={article.votes} />
        
        <CommentsSection articleId={article.id} comments={article.comments} />
      </motion.div>
    </motion.div>
  );
};

export default ArticleResult;