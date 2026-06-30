import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { showcaseProjects as projects } from '../data/projects';
import styles from './Showcase.module.css';

const Showcase = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const updateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth);
      }
      setViewportWidth(window.innerWidth);
    };

    updateRange();
    
    // Initial delay to ensure styles are applied
    const timer = setTimeout(updateRange, 100);

    const resizeObserver = new ResizeObserver(() => updateRange());
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);
    window.addEventListener('resize', updateRange);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The distance to scroll horizontally is total width minus what's already visible
  const xTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -(scrollRange - viewportWidth)]
  );

  const physics = { damping: 60, mass: 1, stiffness: 500 };
  const springX = useSpring(xTransform, physics);

  return (
    <section 
      ref={containerRef} 
      className={styles.showcaseSection}
      style={{ height: `${scrollRange}px` }}
    >
      <div className={styles.stickyContainer}>
        <div className={styles.header}>
          <span className="subheading">Selected Work</span>
          <h2 className="heading-md">Recent Projects</h2>
        </div>
        
        <div className={styles.scrollWrapper}>
          <motion.div 
            style={{ x: springX }} 
            ref={scrollRef} 
            className={styles.horizontalScroll}
          >
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageOverlay}></div>
                  <img src={project.img} alt={project.title} className={styles.projectImage} />
                  
                  <div className={`glass-panel ${styles.infoPanel}`}>
                    <div className={styles.category}>{project.category}</div>
                    <h3 className={styles.title}>{project.title}</h3>
                    <div className={styles.details}>
                      <div className={styles.detail}>
                        <span className={styles.label}>Scale</span>
                        <span className={styles.value}>{project.area}</span>
                      </div>
                      <div className={styles.detail}>
                        <span className={styles.label}>Status</span>
                        <span className={styles.value}>{project.status}</span>
                      </div>
                    </div>
                    <Link to={`/projects/${project.slug}`} className={styles.viewBtn}>View Project</Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className={styles.exploreRow}>
          <Link to="/projects" className={styles.exploreBtn}>
            Explore All Projects
            <span className={styles.exploreBtnArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;


