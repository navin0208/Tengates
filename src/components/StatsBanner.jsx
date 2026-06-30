import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './StatsBanner.module.css';

const stats = [
  { value: 3, suffix: '+', label: 'Years in Business' },
  { value: 9, suffix: '+', label: 'Projects Delivered' },
  { value: 4, suffix: '', label: 'States Covered' },
  { value: 100, suffix: '%', label: 'On-Time Delivery' },
];

const AnimatedCounter = ({ end, suffix, decimals = 0, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * end;
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      <span className={styles.suffix}>{suffix}</span>
    </span>
  );
};

const StatsBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.statsSection} ref={ref}>
      <div className={styles.bgGrid}></div>
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>
      
      <div className={`container ${styles.container}`}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={styles.stat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className={styles.value}>
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                isInView={isInView}
              />
            </div>
            <div className={styles.label}>{stat.label}</div>
            {i < stats.length - 1 && <div className={styles.divider}></div>}
          </motion.div>
        ))}
      </div>

      {/* Animated scan line */}
      <div className={styles.scanLine}></div>
    </section>
  );
};

export default StatsBanner;
