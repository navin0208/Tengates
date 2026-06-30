import styles from './LogoMarquee.module.css';

const clients = [
  { name: "McDonald's", img: "/logos/mcdonalds-png-logo-2774.png" },
  { name: "D&H Secheron", img: "/logos/DHSecheoron.png" },
  { name: "Sahyadri Farmers", img: "/logos/Sahyadri.svg" },
  { name: "Kratoss Seaworld", img: "/logos/kratos.jpeg" },
  { name: "De-Fresh Exports", img: "/logos/defresh.jpg" },
  { name: "Foods And Inns Ltd", text: "Foods & Inns" },
  { name: "HB Reality", img: "/logos/logo.png" },
  { name: "Agrospace", text: "Agrospace" },
  { name: "Kusum Spices", text: "Kusum Spices" },
];

const LogoMarquee = () => {
  return (
    <section className={styles.marqueeSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="subheading">Trusted Clients</span>
          <h2 className="heading-md">Industrial <span className="text-gradient">Partnerships</span></h2>
        </div>
        
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Render twice for infinite seamless loop */}
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className={styles.logoItem}>
                {client.img ? (
                  <img src={client.img} alt={client.name} className={styles.logoImage} />
                ) : (
                  <span className={styles.logoText}>{client.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
