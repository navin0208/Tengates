import { motion } from 'framer-motion';
import styles from './Questions.module.css';

const Questions = () => {
  return (
    <section className={styles.questionsSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageGrid}>
          {['left', 'center', 'right'].map((pos, i) => (
            <motion.div
              key={i}
              className={styles.imageCol}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src="/bridge.png"
                  alt="Infrastructure"
                  className={styles.img}
                  style={{ objectPosition: pos }}
                />
                <div className={styles.imageOverlay}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.contentRow}>
          <motion.div
            className={styles.titleBox}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.mainTitle}>
              STILL HAVE<br />
              <span className={styles.titleAccent}>QUESTIONS?</span>
            </h2>
            <p className={styles.titleSub}>We have answers.</p>
          </motion.div>
          
          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.description}>
              Have a project in mind? Want to understand our process or get a rough estimate? We're happy to talk.
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryBtn}>
                <span>Get a Quote</span>
                <span className={styles.btnArrow}>→</span>
              </button>
              <button className={styles.linkBtn}>
                <span className={styles.linkLine}></span>
                Why Ten Gates?
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
