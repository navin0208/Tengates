import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ProjectMap.module.css';
import IndiaMapSvg from './IndiaMapSvg';

const locations = [
  { id: 1, name: "Agrospace", city: "Dewas", state: "Madhya Pradesh", slug: "agrospace-dewas", x: 32, y: 49 },

  { id: 2, name: "D&H Secheron", city: "Indore", state: "Madhya Pradesh", slug: "dnh-secheron-indore", x: 31, y: 50.5 },
  { id: 3, name: "Krishnaveni Farmers", city: "Bijapur", state: "Karnataka", slug: "krishnaveni-fpc-bijapur", x: 27, y: 68 },
  { id: 4, name: "Foods & Inns", city: "Nashik", state: "Maharashtra", slug: "foods-and-inns-nashik", x: 21, y: 57 },
  { id: 5, name: "Kratos Seaworld", city: "Nashik", state: "Maharashtra", slug: "kratoss-seaworld-nashik", x: 22, y: 59 },
  { id: 6, name: "Omkar Agro", city: "Nashik", state: "Maharashtra", slug: "omkar-agro", x: 22, y: 58.5 },
  { id: 7, name: "Zudio", city: "Nashik Road", state: "Maharashtra", slug: "zudio-nashik", x: 22, y: 58.5 },
  { id: 8, name: "Swapnil Agro", city: "Deola", state: "Maharashtra", slug: "swapnil-agro", x: 21.5, y: 57 },
  { id: 9, name: "Avabeach", city: "Wadi Varhe", state: "Maharashtra", slug: "avabeach", x: 20.5, y: 58.5 },
  { id: 10, name: "Sahyadri Farmer", city: "Nanded", state: "Maharashtra", slug: "sahyadri-fpc-nanded", x: 33, y: 60 },
  { id: 11, name: "Maruti Seva Auto", city: "Nandurbar", state: "Maharashtra", slug: "maruti-seva", x: 21, y: 53 },
  { id: 12, name: "Ghoti Maruti Seva", city: "Ghoti", state: "Maharashtra", slug: "ghoti-maruti-seva", x: 21, y: 59.5 },
  { id: 13, name: "HB Realty", city: "Dindori", state: "Maharashtra", slug: "hb-reality-nashik", x: 23, y: 57.5 },
  { id: 14, name: "Mumbai T2 Mcdonalds", city: "Mumbai", state: "Maharashtra", slug: "mcdonalds-mumbai-t2", x: 18.5, y: 60.5 },
];

const states = [...new Set(locations.map(l => l.state))];

const ProjectMap = () => {
  const [activeState, setActiveState] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const scrollRef = useRef(null);

  const displayProjects = activeState ? locations.filter(l => l.state === activeState) : locations;

  const handleStateSelect = (state) => {
    if (activeState === state) {
      setActiveState(null);
      setHoveredPin(null);
    } else {
      setActiveState(state);
      setHoveredPin(null);
    }
  };

  const handlePinClick = (loc) => {
    setActiveState(loc.state);
    setHoveredPin(loc.id);
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.gridBg}></div>
      <div className={styles.glowBg}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subheading">Operational Reach</span>
          <h2 className="heading-md">Nationwide <span className="text-gradient">Infrastructure Hubs</span></h2>
        </div>

        {/* State Filter Tabs */}
        <div className={styles.stateTabs}>
          <button
            className={`${styles.stateTab} ${!activeState ? styles.activeTab : ''}`}
            onClick={() => { setActiveState(null); setHoveredPin(null); }}
          >
            All States
          </button>
          {states.map(state => (
            <button
              key={state}
              className={`${styles.stateTab} ${activeState === state ? styles.activeTab : ''}`}
              onClick={() => handleStateSelect(state)}
            >
              {state}
              <span className={styles.tabCount}>
                {locations.filter(l => l.state === state).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.mapLayout}>
          {/* Map Panel */}
          <div className={styles.mapPanel}>
            <div className={styles.mapWrapper}>
              <IndiaMapSvg />
              <div className={styles.pointsOverlay}>
                {locations.map((loc) => {
                  const isHighlighted = hoveredPin === loc.id;
                  const isDimmed = activeState && loc.state !== activeState;

                  return (
                    <div
                      key={loc.id}
                      className={`${styles.point} ${isHighlighted ? styles.highlightedPoint : ''}`}
                      style={{
                        left: `${loc.x}%`,
                        top: `${loc.y}%`,
                        opacity: isDimmed ? 0.15 : 1,
                        pointerEvents: isDimmed ? 'none' : 'auto',
                        transition: 'opacity 0.5s ease, transform 0.3s ease',
                      }}
                      onClick={() => handlePinClick(loc)}
                      onMouseEnter={() => setHoveredPin(loc.id)}
                      onMouseLeave={() => setHoveredPin(null)}
                    >
                      <div className={styles.ping}></div>
                      <div className={styles.pin}></div>
                      <div className={styles.tooltip}>
                        <div className={styles.tooltipContent}>
                          <span className={styles.toolCity}>{loc.city}</span>
                          <span className={styles.toolName}>{loc.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend inside map panel */}
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendPin}></div>
                <span>Operational Hubs</span>
              </div>
              <p className={styles.legendText}>
                Click a state tab or any pin to explore projects in that region.
              </p>
            </div>
          </div>

          {/* Projects Panel (always visible) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState || 'all'}
              className={styles.projectsPanel}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.panelLabel}>{activeState ? 'Exploring' : 'Overview'}</span>
                  <h3 className={styles.panelTitle}>{activeState || 'All States'}</h3>
                </div>
                <span className={styles.panelCount}>
                  {displayProjects.length} {displayProjects.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>

              <div className={styles.projectsList} ref={scrollRef}>
                {displayProjects.map((proj, i) => (
                  <motion.div
                    key={proj.id}
                    className={`${styles.projectCard} ${hoveredPin === proj.id ? styles.projectCardActive : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredPin(proj.id)}
                    onMouseLeave={() => setHoveredPin(null)}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.cardInfo}>
                        <span className={styles.cardCity}>{proj.city}</span>
                        <h4 className={styles.cardName}>{proj.name}</h4>
                      </div>
                      <div className={styles.cardNum}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <Link to={`/projects/${proj.slug}`} className={styles.viewProjectBtn}>
                      View Project →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectMap;
