import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Fake News Detector</h3>
            <p>An advanced tool using AI to analyze news articles and determine their credibility.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/analyze">Analyze Article</a></li>
              <li><a href="/history">History</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="/about#how-it-works">How It Works</a></li>
              <li><a href="/about#faq">FAQ</a></li>
              <li><a href="/about#tips">Tips for Spotting Fake News</a></li>
              <li><a href="/about#accuracy">Accuracy & Limitations</a></li>
            </ul>
          </div>
        </div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Fake News Detector. All rights reserved.</p>
          <p className="disclaimer">This is an educational project for demonstration purposes only.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;