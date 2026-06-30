import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './Services.module.css';
import { Shield, Building2, Layers, HardHat, Factory, LayoutGrid } from 'lucide-react';

const services = [
  { title: "Industrial Civil Construction", desc: "End-to-end civil works for factories, admin buildings, and industrial campuses.", icon: Building2, num: "01" },
  { title: "Warehouses", desc: "Large-scale warehousing solutions with optimized structural integrity.", icon: Factory, num: "02" },
  { title: "Foundations", desc: "Deep and shallow foundations engineered for maximum load capacity.", icon: Layers, num: "03" },
  { title: "Infrastructure Development", desc: "Roads, drainage, and utility networks for industrial zones.", icon: HardHat, num: "04" },
  { title: "Industrial Flooring", desc: "High-performance flooring systems for heavy industrial operations.", icon: LayoutGrid, num: "05" },
  { title: "Heavy Structures", desc: "Reinforced concrete and steel structures for demanding environments.", icon: Shield, num: "06" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      whileHover={{ z: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={styles.cardGlow}></div>
      <div className={styles.cardNumber}>{service.num}</div>
      <div className={styles.iconWrapper}>
        <Icon size={28} color="var(--accent-amber)" strokeWidth={1.5} />
      </div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>
      <div className={styles.cardBorder}></div>
      <div className={styles.cardCorner}></div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.bgDeco}></div>
      <div className={`container`}>
        <div className={styles.header}>
          <motion.span
            className="subheading"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Core Capabilities
          </motion.span>
          <motion.h2
            className="heading-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Structural <span className="text-gradient">Expertise</span>
          </motion.h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
