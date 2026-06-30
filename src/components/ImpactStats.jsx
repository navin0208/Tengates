import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ImpactStats.module.css';

const StatCounter = ({ endValue, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = endValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, endValue]);

  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statValue}>
        {count}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.bgWrapper}>
        <img src="/Stats_bg.png" alt="Industrial Scale" className={styles.bgImage} />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subheading">Our Impact</span>
          <h2 className="heading-md">Building at Scale</h2>
        </motion.div>

        <div className={styles.grid}>
          <StatCounter endValue={56} label="Projects Delivered" suffix="+" />
          <StatCounter endValue={100} label="On-Time Delivery" suffix="%" />
          <StatCounter endValue={4} label="States Covered" />
          <StatCounter endValue={1} label="Million Sq Ft Built" suffix="M+" />
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
