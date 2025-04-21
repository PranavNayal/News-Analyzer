import { motion } from 'framer-motion';
import './CredibilityMeter.css';

const CredibilityMeter = ({ score }) => {
  // Define color and label based on score
  const getCredibilityInfo = (score) => {
    if (score < 40) {
      return {
        color: 'var(--error)',
        label: 'Low Credibility',
        icon: '🚫'
      };
    } else if (score < 70) {
      return {
        color: 'var(--warning)',
        label: 'Medium Credibility',
        icon: '⚠️'
      };
    } else {
      return {
        color: 'var(--success)',
        label: 'High Credibility',
        icon: '✓'
      };
    }
  };

  const { color, label, icon } = getCredibilityInfo(score);

  // Calculate angle for needle rotation (0 score = -90deg, 100 score = 90deg)
  const needleRotation = -90 + (score / 100) * 180;

  return (
    <div className="credibility-meter">
      <div className="meter-header">
        <h3>Credibility Score</h3>
        <div className="score-display">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="score-number"
            style={{ color }}
          >
            {score}
          </motion.span>
          <span className="score-total">/100</span>
        </div>
      </div>

      <div className="meter-gauge">
        <div className="gauge-background">
          <div className="gauge-section low"></div>
          <div className="gauge-section medium"></div>
          <div className="gauge-section high"></div>
        </div>
        
        <motion.div 
          className="gauge-needle"
          initial={{ rotate: -90 }}
          animate={{ rotate: needleRotation }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 15,
            delay: 0.2
          }}
        >
          <div className="needle-point"></div>
        </motion.div>
        
        <div className="gauge-center"></div>
      </div>

      <motion.div 
        className="credibility-label"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ color }}
      >
        <span className="label-icon">{icon}</span>
        <span className="label-text">{label}</span>
      </motion.div>
    </div>
  );
};

export default CredibilityMeter;