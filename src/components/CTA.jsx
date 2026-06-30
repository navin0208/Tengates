import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactForm from './ContactForm';
import styles from './CTA.module.css';

const CTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section className={styles.ctaSection} ref={ref}>
      {/* Animated ambient background */}
      <div className={styles.ambientBg}>
        <motion.div className={styles.orbOne} style={{ y: bgY }}></motion.div>
        <motion.div className={styles.orbTwo}></motion.div>
      </div>

      <div className={styles.gridOverlay}></div>
      
      <div className={`container ${styles.container}`}>
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.content}
          style={{ scale: textScale }}
        >
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className={styles.labelLine}></span>
            Start Your Project
          </motion.span>
          
          <h2 className={styles.title}>
            Ready to Start<br/>
            <span className={styles.titleAccent}>Your Next Project?</span>
          </h2>
          
          <p className={styles.subtitle}>
            Tell us what you're building. We'll figure out the rest together.
          </p>
          
          <div className={styles.btnGroup}>
            <button className={styles.primaryBtn}>
              <span>Get in Touch</span>
              <div className={styles.btnShine}></div>
            </button>
          </div>
        </motion.div>

        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: '40px' }}
        >
          <ContactForm />
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className={styles.bottomLine}>
        <div className={styles.lineGlow}></div>
      </div>
    </section>
  );
};

export default CTA;
