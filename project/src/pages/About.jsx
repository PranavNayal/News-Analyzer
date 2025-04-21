import { motion } from 'framer-motion';
import './About.css';

const About = () => {
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
      className="about-page page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="about-header" variants={itemVariants}>
        <h1>About Fake News Detector</h1>
        <p className="about-intro">
          Our mission is to combat misinformation by providing tools that help people 
          evaluate the credibility of news articles they encounter online.
        </p>
      </motion.div>
      
      <div className="about-sections">
        <motion.section className="about-section" variants={itemVariants} id="how-it-works">
          <h2>How It Works</h2>
          <div className="section-content">
            <p>
              The Fake News Detector uses advanced artificial intelligence and machine learning 
              techniques to analyze news articles for indicators of reliability and credibility.
            </p>
            
            <h3>Our Analysis Process:</h3>
            <ol className="process-list">
              <li>
                <strong>Content Analysis:</strong> We examine the article's text for sensationalist 
                language, emotional manipulation, and factual inconsistencies.
              </li>
              <li>
                <strong>Source Evaluation:</strong> Our system checks for citations, references to 
                credible sources, and verification of claims.
              </li>
              <li>
                <strong>Bias Detection:</strong> We identify potential political or ideological biases 
                that might influence the reporting.
              </li>
              <li>
                <strong>Credibility Scoring:</strong> Based on all factors, we generate a comprehensive 
                credibility score from 0-100.
              </li>
            </ol>
          </div>
        </motion.section>
        
        <motion.section className="about-section" variants={itemVariants} id="accuracy">
          <h2>Accuracy & Limitations</h2>
          <div className="section-content">
            <p>
              While our system uses sophisticated algorithms, it's important to understand its limitations:
            </p>
            
            <ul className="limitations-list">
              <li>
                No automated system can replace critical thinking and human judgment.
              </li>
              <li>
                Our analysis is a tool to assist you, not a definitive verdict on truth.
              </li>
              <li>
                The system may occasionally misclassify satire or opinion pieces.
              </li>
              <li>
                Context matters - some claims require specialized knowledge to evaluate.
              </li>
            </ul>
            
            <p className="disclaimer-note">
              <strong>Note:</strong> This tool is for educational purposes and should be used alongside 
              other fact-checking resources and your own research.
            </p>
          </div>
        </motion.section>
        
        <motion.section className="about-section" variants={itemVariants} id="tips">
          <h2>Tips for Spotting Fake News</h2>
          <div className="section-content">
            <div className="tips-grid">
              <div className="tip-card">
                <h3>Check the Source</h3>
                <p>
                  Investigate the website publishing the article. Is it a recognized news outlet? 
                  Does it have an about page and contact information?
                </p>
              </div>
              
              <div className="tip-card">
                <h3>Look for Multiple Sources</h3>
                <p>
                  If a story is significant, multiple credible outlets will report it. 
                  Be suspicious of stories appearing in only one place.
                </p>
              </div>
              
              <div className="tip-card">
                <h3>Evaluate Evidence</h3>
                <p>
                  Credible articles cite specific sources, provide data, and quote experts. 
                  Be skeptical of vague claims without evidence.
                </p>
              </div>
              
              <div className="tip-card">
                <h3>Check the Date</h3>
                <p>
                  Old news stories recirculated can be misleading without context. 
                  Always verify when an article was published.
                </p>
              </div>
              
              <div className="tip-card">
                <h3>Check Your Biases</h3>
                <p>
                  We're all more likely to believe news that confirms our existing beliefs. 
                  Apply extra scrutiny to stories you want to be true.
                </p>
              </div>
              
              <div className="tip-card">
                <h3>Read Beyond Headlines</h3>
                <p>
                  Clickbait headlines often misrepresent the actual content of the article. 
                  Always read the full story.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        
        <motion.section className="about-section" variants={itemVariants} id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="section-content">
            <div className="faq-list">
              <div className="faq-item">
                <h3>Is this service free to use?</h3>
                <p>
                  Yes, our Fake News Detector is completely free for educational and personal use.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>How accurate is the analysis?</h3>
                <p>
                  Our system achieves approximately 85% accuracy when tested against known reliable and 
                  unreliable sources. However, context and nuance can affect results.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Do you store the articles I analyze?</h3>
                <p>
                  Articles are stored locally in your browser's storage to provide history functionality. 
                  We do not store your data on our servers.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Can I analyze articles in languages other than English?</h3>
                <p>
                  Currently, our system is optimized for English-language content. Support for additional 
                  languages may be added in future updates.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>What should I do if I disagree with the analysis?</h3>
                <p>
                  You can provide feedback using the voting system and comments. This helps us improve the system.
                  Remember that the tool is meant to assist, not replace, your critical thinking.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;