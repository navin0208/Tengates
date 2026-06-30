import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FramerSocialGrid.module.css';

const clients = [
  { name: "McDonald's", industry: "Intl Airport T2", img: "/logos/mcdonalds-png-logo-2774.png" },
  { name: "Foods And Inns Ltd", industry: "Agro-Processing" },
  { name: "Sahyadri Farmers", industry: "Facility Center", img: "/logos/Sahyadri.svg" },
  { name: "HB Reality", industry: "Warehousing" },
  { name: "D&H Secheron", industry: "Indore Unit", img: "/logos/DHSecheoron.png" },
  { name: "Kratoss Seaworld", industry: "Logistics", img: "/logos/kratos.jpeg" },
  { name: "Agrospace", industry: "Industrial Hub" },
  { name: "Kusum Spices", industry: "Processing Unit" },
  { name: "De-Fresh Exports", industry: "Nashik Unit", img: "/logos/defresh.jpg" },
];

const getDirection = (ev, obj) => {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect();
  const x = (ev.pageX - left - (w / 2) * (w > h ? h / w : 1));
  const y = (ev.pageY - top - (h / 2) * (h > w ? w / h : 1));
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  return d;
};

const SocialCard = ({ client }) => {
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setDirection(getDirection(e, e.currentTarget));
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    setDirection(getDirection(e, e.currentTarget));
    setIsHovered(false);
  };

  const variants = {
    initial: (d) => ({
      x: d === 1 ? '100%' : d === 3 ? '-100%' : 0,
      y: d === 0 ? '-100%' : d === 2 ? '100%' : 0,
    }),
    animate: { x: 0, y: 0 },
    exit: (d) => ({
      x: d === 1 ? '100%' : d === 3 ? '-100%' : 0,
      y: d === 0 ? '-100%' : d === 2 ? '100%' : 0,
    }),
  };

  return (
    <motion.div
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.content}>
        {client.img ? (
          <div className={styles.clientLogoImage}>
            <img src={client.img} alt={client.name} />
          </div>
        ) : (
          <div className={styles.logoBox}>
            {client.name.split(' ').map(w => w[0]).join('')}
          </div>
        )}
        <div className={styles.info}>
          <h3 className={styles.name}>{client.name}</h3>
          <p className={styles.industry}>{client.industry}</p>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className={styles.corners}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`${styles.corner} ${styles[`corner${i}`]}`}
            animate={{ 
              opacity: isHovered ? 1 : 0.3,
              scale: isHovered ? 1.2 : 1
            }}
          />
        ))}
      </div>

      {/* Directional Overlay */}
      <AnimatePresence custom={direction}>
        {isHovered && (
          <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={styles.overlay}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FramerSocialGrid = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subheading">Trusted Clients</span>
          <h2 className="heading-md">Industrial <span className="text-gradient">Partnerships</span></h2>
        </div>
        
        <div className={styles.grid}>
          {clients.map((client, i) => (
            <SocialCard key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FramerSocialGrid;
