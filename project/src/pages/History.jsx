import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '../context/ArticlesContext';
import { truncateText } from '../utils/validation';
import './History.css';

const History = () => {
  const { articles } = useArticles();
  const [filter, setFilter] = useState('all');

  // Filter articles based on credibility level
  const getFilteredArticles = () => {
    if (filter === 'all') return articles;
    
    return articles.filter(article => 
      article.analysis.credibilityLevel === filter
    );
  };

  const filteredArticles = getFilteredArticles();

  // Format date 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get credibility class for styling
  const getCredibilityClass = (level) => {
    switch (level) {
      case 'low': return 'credibility-low';
      case 'medium': return 'credibility-medium';
      case 'high': return 'credibility-high';
      default: return '';
    }
  };

  return (
    <div className="history-page page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Analysis History</h1>
        <p className="history-intro">
          View your past article analyses and their credibility scores. Click on any article to see detailed results.
        </p>
        
        <div className="filter-controls">
          <span className="filter-label">Filter by credibility:</span>
          <div className="filter-buttons">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${filter === 'high' ? 'active' : ''}`}
              onClick={() => setFilter('high')}
            >
              High
            </button>
            <button 
              className={`filter-button ${filter === 'medium' ? 'active' : ''}`}
              onClick={() => setFilter('medium')}
            >
              Medium
            </button>
            <button 
              className={`filter-button ${filter === 'low' ? 'active' : ''}`}
              onClick={() => setFilter('low')}
            >
              Low
            </button>
          </div>
        </div>
        
        {articles.length === 0 ? (
          <div className="no-history">
            <p>You haven't analyzed any articles yet.</p>
            <Link to="/analyze" className="analyze-link">
              Analyze your first article
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            {filteredArticles.length === 0 ? (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>No articles found with the selected filter.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="history-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredArticles.map((article) => (
                  <motion.div 
                    key={article.id}
                    className={`history-card ${getCredibilityClass(article.analysis.credibilityLevel)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
                  >
                    <Link to={`/results/${article.id}`} className="card-link">
                      <div className="card-header">
                        <span className="article-date">{formatDate(article.date)}</span>
                        <span className={`credibility-badge ${article.analysis.credibilityLevel}`}>
                          {article.analysis.credibilityScore}/100
                        </span>
                      </div>
                      
                      <p className="article-preview">
                        {truncateText(article.text, 150)}
                      </p>
                      
                      <div className="card-footer">
                        <div className="interaction-stats">
                          <span className="stat">
                            <span className="stat-icon">👍</span> {article.votes.upvotes}
                          </span>
                          <span className="stat">
                            <span className="stat-icon">👎</span> {article.votes.downvotes}
                          </span>
                          <span className="stat">
                            <span className="stat-icon">💬</span> {article.comments.length}
                          </span>
                        </div>
                        <span className="view-details">View Details →</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default History;