import { motion } from 'framer-motion';
import styles from './ProjectMap.module.css';
import IndiaMapSvg from './IndiaMapSvg';

const locations = [
  { id: 1, name: "Mumbai T2", city: "Mumbai", x: 26, y: 66 },
  { id: 2, name: "Foods & Inns", city: "Nashik", x: 29, y: 63 },
  { id: 3, name: "R&D Building", city: "Indore", x: 36, y: 53 },
  { id: 4, name: "Agrospace", city: "Dewas", x: 37, y: 52 },
  { id: 5, name: "Sahyadri Farmer", city: "Nanded", x: 38, y: 65 },
  { id: 6, name: "Krishnaveni", city: "Bijapur", x: 31, y: 73 },
  { id: 7, name: "De-Fresh Exports", city: "Nashik", x: 29, y: 63 },
];

const ProjectMap = () => {
  return (
    <section className={styles.mapSection}>
      <div className={styles.gridBg}></div>
      <div className={styles.glowBg}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subheading">Operational Reach</span>
          <h2 className="heading-md">Nationwide <span className="text-gradient">Infrastructure Hubs</span></h2>
        </div>

        <div className={styles.mapWrapper}>
          {/* Detailed India Map SVG */}
          <IndiaMapSvg />

          {/* Project Points */}
          <div className={styles.pointsOverlay}>
            {locations.map((loc) => (
              <motion.div 
                key={loc.id}
                className={styles.point}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: loc.id * 0.1 }}
              >
                <div className={styles.ping}></div>
                <div className={styles.dot}></div>
                
                <div className={styles.tooltip}>
                  <div className={styles.tooltipContent}>
                    <span className={styles.toolCity}>{loc.city}</span>
                    <span className={styles.toolName}>{loc.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.mapLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendDot}></div>
              <span>Operational Hubs</span>
            </div>
            <p className={styles.legendText}>
              Strategic deployments across industrial corridors, providing Turnkey infrastructure and Precision Concreting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectMap;
