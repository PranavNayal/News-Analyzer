import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '../context/ArticlesContext';
import { validateComment } from '../utils/validation';
import './CommentsSection.css';

const CommentsSection = ({ articleId, comments = [] }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useArticles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate comment
    const validationError = validateComment(commentText);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addComment(articleId, commentText);
      setCommentText('');
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleChange = (e) => {
    setCommentText(e.target.value);
    if (error) setError(null);
  };
  
  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="comment-input-group">
          <textarea
            value={commentText}
            onChange={handleChange}
            placeholder="Add your comment..."
            disabled={isSubmitting}
            rows={3}
          ></textarea>
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting || !commentText.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="comment-submit"
        >
          {isSubmitting ? (
            <>
              <span className="comment-spinner"></span>
              <span>Posting...</span>
            </>
          ) : (
            'Post Comment'
          )}
        </motion.button>
      </form>
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Be the first to comment!</p>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="comment-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="comment-text">{comment.text}</p>
                <p className="comment-date">{formatDate(comment.date)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;