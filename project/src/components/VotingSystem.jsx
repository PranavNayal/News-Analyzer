import { useState } from 'react';
import { motion } from 'framer-motion';
import { useArticles } from '../context/ArticlesContext';
import './VotingSystem.css';

const VotingSystem = ({ articleId, votes }) => {
  const { voteOnArticle } = useArticles();
  const [userVoted, setUserVoted] = useState(false);
  const [animation, setAnimation] = useState(null);

  const handleVote = (voteType) => {
    if (userVoted) return;
    
    voteOnArticle(articleId, voteType);
    setUserVoted(true);
    setAnimation(voteType);
    
    // Reset animation after it completes
    setTimeout(() => {
      setAnimation(null);
    }, 1000);
  };

  return (
    <div className="voting-system">
      <div className="voting-buttons">
        <button 
          className={`vote-button upvote ${userVoted ? 'disabled' : ''} ${animation === 'upvotes' ? 'animate' : ''}`}
          onClick={() => handleVote('upvotes')}
          disabled={userVoted}
          aria-label="Agree with analysis"
        >
          <motion.span 
            className="vote-icon"
            whileHover={!userVoted ? { scale: 1.2 } : {}}
            whileTap={!userVoted ? { scale: 0.8 } : {}}
          >
            👍
          </motion.span>
          <span className="vote-count">{votes.upvotes}</span>
        </button>
        
        <button 
          className={`vote-button downvote ${userVoted ? 'disabled' : ''} ${animation === 'downvotes' ? 'animate' : ''}`}
          onClick={() => handleVote('downvotes')}
          disabled={userVoted}
          aria-label="Disagree with analysis"
        >
          <motion.span 
            className="vote-icon"
            whileHover={!userVoted ? { scale: 1.2 } : {}}
            whileTap={!userVoted ? { scale: 0.8 } : {}}
          >
            👎
          </motion.span>
          <span className="vote-count">{votes.downvotes}</span>
        </button>
      </div>
      
      {userVoted && (
        <motion.p 
          className="vote-thanks"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Thanks for your feedback!
        </motion.p>
      )}
    </div>
  );
};

export default VotingSystem;