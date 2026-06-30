import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './NightOps.module.css';

const NightOps = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const textX2 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className={styles.nightOpsSection} ref={containerRef}>
      <motion.div className={styles.bgWrapper} style={{ scale }}>
        <img src="/Ops.png" alt="Night Operations" className={styles.bgImage} />
        <div className={styles.overlay}></div>
        <div className={styles.vignetteOverlay}></div>
      </motion.div>

      {/* Large moving background text */}
      <div className={styles.bgTextLayer}>
        <motion.div className={styles.bgText} style={{ x: textX }}>
          ROUND THE CLOCK
        </motion.div>
        <motion.div className={`${styles.bgText} ${styles.bgTextOutline}`} style={{ x: textX2 }}>
          NIGHT SHIFTS
        </motion.div>
      </div>

      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          style={{ opacity }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.badgeDot}></span>
            LIVE OPERATIONS
          </motion.span>

          <h2 className={styles.title}>We Work<br />Through the Night</h2>
          <p className={styles.text}>
            Deadlines don't wait for daylight. Our teams run night shifts with industrial floodlighting and shift crews to keep projects on track. When a concrete pour needs to happen at 2 AM, we're there.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NightOps;
