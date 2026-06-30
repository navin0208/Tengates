import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './PageHero.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const PageHero = ({ label, title, subtitle, image }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className={styles.pageHero} ref={ref}>
      <motion.div className={styles.bgWrapper} style={{ scale: bgScale }}>
        <img src={image} alt={title} className={styles.bgImage} />
        <div className={styles.overlay}></div>
      </motion.div>

      <motion.div className={styles.content} style={{ opacity }}>
        <motion.span className={styles.label} {...fadeUp(0.2)}>{label}</motion.span>
        <motion.h1 className={styles.title} {...fadeUp(0.4)}>{title}</motion.h1>
        <motion.p className={styles.subtitle} {...fadeUp(0.6)}>{subtitle}</motion.p>
      </motion.div>

      <div className={styles.bottomFade}></div>
    </section>
  );
};

export default PageHero;
