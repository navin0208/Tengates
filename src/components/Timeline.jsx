import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Pickaxe, Building2, Zap, Settings, ShieldCheck, Layers } from 'lucide-react';
import styles from './Timeline.module.css';

const phases = [
  {
    title: "Site Survey & Planning",
    desc: "We don't guess. We run rigorous soil tests, level the site, and map the topography. If the dirt isn't right, the building isn't right.",
    Icon: Map,
    tag: "Preparation"
  },
  {
    title: "Deep Foundation Works",
    desc: "Mass excavation, deep piling, and heavy-duty RCC footings. We pour the kind of concrete that takes decades of industrial abuse without flinching.",
    Icon: Pickaxe,
    tag: "Groundwork"
  },
  {
    title: "Flooring",
    desc: "High-tolerance Trimix and epoxy flooring engineered specifically for forklift traffic, heavy machinery, and constant impact.",
    Icon: Layers,
    tag: "Flooring"
  },
  {
    title: "Structural Framework",
    desc: "Erecting massive steel trusses and RCC columns. This is where the facility actually takes shape. Fast, precise, and structurally bulletproof.",
    Icon: Building2,
    tag: "Superstructure"
  },
  {
    title: "MEP Integration",
    desc: "Heavy-duty electrical panels, plumbing grids, and HVAC integration. We run the veins and arteries of your facility so production never stops.",
    Icon: Zap,
    tag: "Systems"
  },
  {
    title: "Equipment Rigging",
    desc: "Craning in the big guns. We install and align massive boilers, evaporators, and production lines with millimeter precision.",
    Icon: Settings,
    tag: "Installation"
  },
  {
    title: "Commissioning & Handover",
    desc: "We run the stress tests, clear the punch list, and hand you the keys to a fully operational, battle-ready industrial facility.",
    Icon: ShieldCheck,
    tag: "Handover"
  }
];

const Card = ({ phase, index, progress, total }) => {
  // Start scaling down when THIS card hits the top.
  // Each card container is ~100vh.
  const start = index / total;
  const end = 1;
  const targetScale = 1 - ((total - index) * 0.05); // e.g. first card scales down the most
  
  const scale = useTransform(progress, [start, end], [1, targetScale]);
  const opacity = useTransform(progress, [start, end], [1, 0.4]);

  return (
    <div className={styles.cardContainer}>
      <motion.div 
        className={`glass-panel ${styles.card}`}
        style={{ 
          top: `calc(15vh + ${index * 25}px)`,
          scale,
          opacity
        }}
      >
        <div className={styles.cardLeft}>
          <div className={styles.number}>0{index + 1}</div>
          <div className={styles.iconWrapper}>
            <phase.Icon size={32} className={styles.icon} />
          </div>
          <div className={styles.line}></div>
        </div>
        
        <div className={styles.cardRight}>
          <div className={styles.tag}>{phase.tag}</div>
          <h3 className={styles.title}>{phase.title}</h3>
          <p className={styles.desc}>{phase.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className={styles.timelineSection} ref={containerRef}>
      <div className={`container ${styles.headerContainer}`}>
        <span className="subheading">Execution Methodology</span>
        <h2 className="heading-md">The Project Lifecycle</h2>
        <p className="page-subtitle">How we take a project from ground-breaking to handover.</p>
      </div>

      <div className={styles.cardsWrapper}>
        {phases.map((phase, i) => (
          <Card 
            key={i} 
            phase={phase} 
            index={i} 
            progress={scrollYProgress} 
            total={phases.length} 
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
