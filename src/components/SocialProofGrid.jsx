import { motion } from 'framer-motion';
import styles from './SocialProofGrid.module.css';

const clients = [
  { name: "McDonald's", industry: "International Airport T2", size: "small", img: "/logos/mcdonalds-png-logo-2774.png" },
  { name: "D&H Secheron", industry: "Indore Unit", size: "medium", img: "/logos/DHSecheoron.png" },
  { name: "Sahyadri Farmers", industry: "Facility Center", size: "medium", img: "/logos/Sahyadri.svg" },
  { name: "Kratoss Seaworld", industry: "Shipping & Logistics", size: "small", img: "/logos/kratos.jpeg" },
  { name: "De-Fresh Exports", industry: "Nashik Unit", size: "medium", img: "/logos/defresh.jpg" },
  { name: "Foods And Inns Ltd", industry: "Agro-Processing", size: "large" },
  { name: "HB Reality", industry: "Warehousing", size: "large" },
  { name: "Agrospace", industry: "Industrial Hub", size: "medium" },
  { name: "Kusum Spices", industry: "Processing Unit", size: "small" },
];

const SocialProofGrid = () => {
  return (
    <section className={styles.gridSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subheading">Trusted Partnerships</span>
          <h2 className="heading-md">The Industry <span className="text-gradient">Standard</span></h2>
          <p className={styles.desc}>Collaborating with global leaders to deliver infrastructure that defines the future.</p>
        </div>

        <div className={styles.masonryGrid}>
          {clients.map((client, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${styles[client.size]}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardContent}>
                {client.img ? (
                  <div className={styles.clientLogoImage}>
                    <img src={client.img} alt={`${client.name} logo`} />
                  </div>
                ) : (
                  <div className={styles.logoPlaceholder}>
                    {client.name.split(' ').map(w => w[0]).join('')}
                  </div>
                )}
                <h3 className={styles.clientName}>{client.name}</h3>
                <span className={styles.industry}>{client.industry}</span>
              </div>
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofGrid;
