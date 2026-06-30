import styles from './Trust.module.css';

const Trust = () => {
  const reasons = [
    {
      title: "Expertise & Experience",
      desc: "Proven track record in industrial projects with a skilled team of technical experts."
    },
    {
      title: "Innovation & Efficiency",
      desc: "Modern technology and process improvements ensuring cost optimization with high-quality results."
    },
    {
      title: "Reliability & Trust",
      desc: "Transparent communication, reporting, and strong compliance with safety and standards."
    }
  ];

  return (
    <section className={styles.trustSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subheading">Why Choose Us</span>
          <h2 className="heading-md">The Ten Gates Edge</h2>
        </div>

        <div className={styles.grid}>
          {reasons.map((item, i) => (
            <div key={i} className={`glass-panel ${styles.reasonCard}`}>
              <h3 className={styles.reasonTitle}>{item.title}</h3>
              <p className={styles.reasonDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`glass-panel ${styles.collabBox}`}>
          <div className={styles.collabContent}>
            <h3 className={styles.collabTitle}>Collaborative Process</h3>
            <p className={styles.collabText}>
              We believe successful projects are built on strong partnerships. Our process involves open communication and deep client involvement to ensure every vision is realized with precision.
            </p>
          </div>
          <div className={styles.collabStat}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Satisfied Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
