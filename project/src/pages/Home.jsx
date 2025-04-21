import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
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
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="hero-section">
        <motion.div className="hero-content" variants={itemVariants}>
          <h1>Detect Fake News with AI</h1>
          <p className="hero-subtitle">
            Our advanced algorithm analyzes news articles to determine their credibility,
            helping you make informed decisions about what to trust.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/analyze" className="hero-button">
              Analyze an Article
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div className="hero-image" variants={itemVariants}>
          <div className="image-placeholder">
            <div className="credibility-meter-visual">
              <div className="meter-arc">
                <div className="meter-segment red"></div>
                <div className="meter-segment yellow"></div>
                <div className="meter-segment green"></div>
              </div>
              <div className="meter-needle"></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="features-section">
        <motion.h2 variants={itemVariants}>How It Works</motion.h2>
        
        <div className="features-grid">
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">📋</div>
            <h3>Paste Article</h3>
            <p>
              Copy and paste the full text of any news article 
              you want to verify.
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🔍</div>
            <h3>AI Analysis</h3>
            <p>
              Our advanced AI engine analyzes the content for 
              credibility markers and red flags.
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">📊</div>
            <h3>Get Results</h3>
            <p>
              View the credibility score along with detailed 
              insights about the article's reliability.
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🗣️</div>
            <h3>Add Feedback</h3>
            <p>
              Vote and comment on results to help improve 
              the system and engage with other users.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="cta-section">
        <motion.div className="cta-content" variants={itemVariants}>
          <h2>Ready to verify an article?</h2>
          <p>
            With misinformation spreading faster than ever, fact-checking 
            is crucial. Try our fake news detector today.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/analyze" className="cta-button">
              Start Analyzing
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;