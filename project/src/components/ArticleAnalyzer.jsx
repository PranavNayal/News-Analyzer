import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { analyzeArticle } from '../utils/api';
import { validateArticleText } from '../utils/validation';
import { useArticles } from '../context/ArticlesContext';
import './ArticleAnalyzer.css';

const ArticleAnalyzer = () => {
  const [articleText, setArticleText] = useState('');
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  const { addArticle } = useArticles();

  const handleTextChange = (e) => {
    const text = e.target.value;
    setArticleText(text);
    setCharCount(text.length);
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateArticleText(articleText);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeArticle(articleText);
      const articleId = addArticle({
        text: articleText,
        analysis: result
      });
      
      navigate(`/results/${articleId}`);
    } catch (err) {
      setError('We couldn\'t complete the analysis at this time. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setArticleText(text);
      setCharCount(text.length);
      if (error) setError(null);
    } catch (err) {
      setError('Unable to access clipboard. Please paste the text manually.');
    }
  };

  const clearText = () => {
    setArticleText('');
    setCharCount(0);
    if (error) setError(null);
  };

  return (
    <motion.div 
      className="article-analyzer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Analyze News Article</h2>
      <p className="analyzer-intro">
        Help combat misinformation by analyzing news articles for credibility. 
        Simply paste your article below, and our AI will evaluate its reliability.
      </p>

      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="input-group">
          <div className="textarea-container">
            <textarea
              placeholder="Share the article you'd like to verify..."
              value={articleText}
              onChange={handleTextChange}
              disabled={isAnalyzing}
              rows={10}
              aria-label="News article text"
            ></textarea>
            
            <div className="textarea-actions">
              <button 
                type="button" 
                className="action-button"
                onClick={pasteFromClipboard}
                disabled={isAnalyzing}
              >
                Paste Article
              </button>
              
              <button 
                type="button" 
                className="action-button"
                onClick={clearText}
                disabled={isAnalyzing || !articleText}
              >
                Start Fresh
              </button>
              
              <div className="char-count">
                <span className={charCount > 8000 ? 'count-warning' : ''}>
                  {charCount}
                </span>
                <span>/10000</span>
              </div>
            </div>
          </div>
          
          {error && <p className="error-message">{error}</p>}
        </div>

        <motion.button
          type="submit"
          className="analyze-button"
          disabled={isAnalyzing || !articleText}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              <span>Analyzing Content...</span>
            </>
          ) : (
            <>Verify Article</>
          )}
        </motion.button>
      </form>

      <div className="analyzer-tips">
        <h3>Tips for Best Results:</h3>
        <ul>
          <li>Include the complete article for more accurate analysis</li>
          <li>Keep the original formatting and structure intact</li>
          <li>Make sure to include any relevant context or background information</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ArticleAnalyzer;