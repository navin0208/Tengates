import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import styles from './Hero.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
});

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0.25, 0.8], ['0%', '90%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await supabase
        .from('hero_slides')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setSlides(data);
      } else {
        setSlides([{ id: 'default', image_url: '/hero_bg.png' }]);
      }
    };
    fetchSlides();
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const handleNext = () => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    startTimer();
  };

  const handlePrev = () => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startTimer();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startTimer();
  };

  return (
    <div className={styles.heroWrapper} ref={containerRef}>
      <motion.div className={styles.heroContainer} style={{ opacity }}>

        {/* Background — image/video layer */}
        <motion.div className={styles.backgroundWrapper} style={{ scale: bgScale }}>
          <AnimatePresence initial={false}>
            {slides.length > 0 && (
              <motion.img
                key={slides[currentIndex].id}
                src={slides[currentIndex].image_url}
                alt="Construction Site"
                className={styles.bgImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </AnimatePresence>
          <div className={styles.overlay}></div>
          <div className={styles.noiseOverlay}></div>
          <div className={styles.scanLines}></div>
        </motion.div>

        {/* Ambient glow */}
        <div className={styles.ambientGlow}></div>

        {/* Content — centered, restrained */}
        <motion.div className={styles.content} style={{ y }}>
          <motion.div className={styles.labelPill} {...fadeUp(0.3)}>
            <span className={styles.labelDot}></span>
            Ten Gates Infrastructure Pvt. Ltd
          </motion.div>

          <motion.h1 className={styles.title} {...fadeUp(0.6)}>
            Building Industrial<br />
            <span className={styles.titleThin}>Infrastructure That Lasts</span>
          </motion.h1>

          <motion.p className={styles.subtitle} {...fadeUp(1.0)}>
            Precision-engineered construction, foundations,<br className={styles.brDesktop} />
            warehousing & infrastructure solutions.
          </motion.p>

          <motion.div className={styles.actions} {...fadeUp(1.3)}>
            <button className={styles.primaryBtn}>
              <span>Explore Projects</span>
              <span className={styles.btnArrow}>→</span>
              <div className={styles.btnShine}></div>
            </button>
            <button className={styles.ghostBtn}>Contact Us</button>
          </motion.div>
        </motion.div>

        {/* Manual Carousel Controls */}
        {slides.length > 1 && (
          <>
            <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={handlePrev}>
              &#10094;
            </button>
            <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={handleNext}>
              &#10095;
            </button>
            <div className={styles.dotsContainer}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom edge fade for seamless section transition */}
        <div className={styles.bottomFade}></div>
      </motion.div>
    </div>
  );
};

export default Hero;
