import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Sustainability.module.css';

const Sustainability = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className={styles.sustainabilitySection} ref={containerRef}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.headerRow}>
          <span className={styles.monoLabel}>Responsible Building</span>
          <div className={styles.headerLine}></div>
          <span className={styles.monoLabel}>Our Commitment</span>
        </div>

        <motion.h2 
          className={styles.massiveTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          BUILD RIGHT.<br />
          <span className={styles.outlineText}>WASTE LESS.</span>
        </motion.h2>

        <div className={styles.contentGrid}>
          
          <div className={styles.imageColumn}>
            <div className={styles.imageMask}>
              <motion.div 
                className={styles.parallaxImage}
                style={{ 
                  y: imgY,
                  backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200')` 
                }}
              />
            </div>
          </div>

          <div className={styles.dataColumn}>
            <div className={styles.dataGrid}>
              <motion.div 
                className={styles.dataBlock}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={styles.dataNum}>Steel</div>
                <div className={styles.dataLabel}>Scrap steel and rebar offcuts are sorted and sent for recycling on every project</div>
              </motion.div>

              <motion.div 
                className={styles.dataBlock}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.dataNum}>Water</div>
                <div className={styles.dataLabel}>Curing water is reused where possible, reducing freshwater consumption on site</div>
              </motion.div>

              <motion.div 
                className={styles.dataBlock}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className={styles.dataNum}>Site</div>
                <div className={styles.dataLabel}>Clean site practices — waste segregation, dust control, and proper debris disposal</div>
              </motion.div>
            </div>

            <motion.p 
              className={styles.technicalText}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              We're not claiming to save the planet. But we do run clean sites, recycle what we can, and avoid unnecessary waste. It's how we think good construction should work.
            </motion.p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Sustainability;
