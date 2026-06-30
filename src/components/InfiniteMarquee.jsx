import { motion } from 'framer-motion';
import styles from './InfiniteMarquee.module.css';

const words = [
  'INDUSTRIAL CIVIL',
  'WAREHOUSING',
  'FOUNDATIONS',
  'HEAVY STRUCTURES',
  'INFRASTRUCTURE',
  'PRECISION CONCRETING',
  'FLOORING',
  'ENGINEERING',
];

const InfiniteMarquee = () => {
  return (
    <section className={styles.marqueeSection}>
      <div className={styles.fadeLeft}></div>
      <div className={styles.fadeRight}></div>
      
      {/* Row 1 — scrolls left */}
      <div className={styles.row}>
        <motion.div
          className={styles.track}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...words, ...words].map((word, i) => (
            <span key={i} className={styles.word}>
              <span className={styles.outlined}>{word}</span>
              <span className={styles.separator}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className={styles.row}>
        <motion.div
          className={styles.track}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...words, ...words].map((word, i) => (
            <span key={i} className={styles.word}>
              <span className={styles.filled}>{word}</span>
              <span className={styles.separator}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteMarquee;
