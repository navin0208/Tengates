import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Overview.module.css';

const Overview = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0.5]);

  return (
    <section className={styles.overviewSection} ref={containerRef}>
      <motion.div className={styles.glowBg} style={{ opacity: glowOpacity }}></motion.div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <motion.span
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="subheading"
          >
            Who We Are
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-lg"
          >
            TEN GATES <br />
            <span className="text-gradient">INFRASTRUCTURE PVT LTD</span>
          </motion.h2>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={`glass-panel ${styles.mainCard}`}
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cardDeco}></div>
            <h3 className={styles.cardTitle}>What We Do</h3>
            <p className={styles.cardText}>
              We build factories, warehouses, cold storage facilities, and industrial campuses. From foundation work to final handover — concrete, steel, flooring, roads, and everything in between. We've delivered projects across Maharashtra, Madhya Pradesh, and Karnataka since 2023.
            </p>

            <div className={styles.metrics}>
              <motion.div
                className={styles.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className={styles.metricValue}>3<span className={styles.metricAccent}>+</span></div>
                <div className={styles.metricLabel}>Years in Business</div>
              </motion.div>
              <motion.div
                className={styles.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
              >
                <div className={styles.metricValue}>9<span className={styles.metricAccent}>+</span></div>
                <div className={styles.metricLabel}>Projects Delivered</div>
              </motion.div>
            </div>
          </motion.div>

          <div className={styles.sideColumn}>
            <motion.div
              className={`glass-panel ${styles.sideCard}`}
              initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.smallTitle}>At a Glance</h3>
                <ul className={styles.focusList}>
                  <li className={styles.focusItem}>
                    <div className={styles.iconBox}>
                      <span className={styles.numIcon}>01</span>
                    </div>
                    <div className={styles.focusTextContent}>
                      <h4>Heavy Manufacturing Plants</h4>
                      <p>Foundations and structures for extreme loads.</p>
                    </div>
                  </li>
                  <li className={styles.focusItem}>
                    <div className={styles.iconBox}>
                      <span className={styles.numIcon}>02</span>
                    </div>
                    <div className={styles.focusTextContent}>
                      <h4>Warehousing & Logistics</h4>
                      <p>High-capacity, wide-span industrial sheds.</p>
                    </div>
                  </li>
                  <li className={styles.focusItem}>
                    <div className={styles.iconBox}>
                      <span className={styles.numIcon}>03</span>
                    </div>
                    <div className={styles.focusTextContent}>
                      <h4>Turnkey EPC Execution</h4>
                      <p>End-to-end delivery from earthworks to handover.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
