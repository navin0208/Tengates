import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutPage.module.css';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const values = [
  {
    title: "Excellence",
    desc: "We strive for excellence in every project, ensuring customer satisfaction through innovative solutions.",
  },
  {
    title: "Safety",
    desc: "Rigorous safety protocols and compliance with industry standards at every construction site.",
  },
  {
    title: "Sustainability",
    desc: "Creating value through sustainable practices that minimize environmental impact.",
  },
  {
    title: "Innovation",
    desc: "Leveraging modern technology and process improvements for cost optimization and superior quality.",
  },
];

const milestones = [
  { year: "2023", title: "Ten Gates Infrastructure Pvt Ltd established", desc: "With a vision to be a leader in the construction industry." },
  { year: "2023", title: "First multi-crore industrial projects", desc: "De-Fresh Exports, Agrospace, and McDonald's (Mumbai Airport T2)." },
  { year: "2024", title: "₹32 Cr+ in active projects", desc: "Foods And Inns (₹12.53 Cr), Sahyadri FPC (₹14.50 Cr), D&H Secheron." },
  { year: "2026", title: "New frontiers", desc: "Kratoss Seaworld (₹6.20 Cr) and HB Reality (₹7.27 Cr) in progress." },
];

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileSafeFadeIn = (delay = 0) => {
    if (isMobile) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: '0px' },
        transition: { duration: 0.6, delay }
      };
    }
    return fadeIn(delay);
  };

  return (
  <div className={styles.page}>

    {/* Story Section */}
    <section className={styles.storySection}>
      <div className="container">
        <div className={styles.storyLayout}>
          <motion.div className={styles.storyLeft} {...mobileSafeFadeIn()}>
            <span className="subheading">Our Story</span>
            <h2 className="heading-md">Building Superior Infrastructure</h2>
          </motion.div>
          <motion.div className={styles.storyRight} {...mobileSafeFadeIn(0.15)}>
            <p className={styles.storyText}>
              TEN GATES INFRASTRUCTURE PVT LTD. is a premier construction company
              dedicated to delivering top-notch infrastructure projects. Established with a
              vision to be a leader in the construction industry, Ten Gates has consistently
              set benchmarks in quality, safety, and sustainability.
            </p>
            <p className={styles.storyText}>
              From precision concreting at midnight to managing ₹14 crore farmer-producer
              facilities, we bring the same unwavering commitment to every site. Our portfolio
              spans across Maharashtra, Madhya Pradesh, and Karnataka — with projects
              ranging from airport interiors to large-scale industrial campuses.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ═══ Leadership — Cinematic Founder Section ═══ */}
    <section className={styles.leadershipSection}>
      <div className={styles.leadershipBg}>
        <div className={styles.leadershipGlow}></div>
      </div>

      <div className="container">
        <motion.div className={styles.leadershipHeader} {...fadeIn()}>
          <span className="subheading">Leadership</span>
          <h2 className="heading-md">The Visionaries Behind Ten Gates</h2>
        </motion.div>

        <div className={styles.foundersGrid}>
          {/* Founder */}
          <motion.div className={styles.founderCard} {...fadeIn(0.1)}>
            <div className={styles.founderImageWrap}>
              <img src="/founder.png" alt="Founder" className={styles.founderImage} />
              <div className={styles.founderImageOverlay}></div>
              <div className={styles.founderGlowEdge}></div>
            </div>
            <div className={styles.founderInfo}>
              <span className={styles.founderRole}>Founder & Managing Director</span>
              <h3 className={styles.founderName}>Founder Name</h3>
              <div className={styles.founderDivider}></div>
              <p className={styles.founderQuote}>
                "Our mission is to build superior infrastructure that enhances the quality 
                of life and contributes to the economic growth of the communities we serve."
              </p>
              <div className={styles.founderStats}>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatValue}>₹56 Cr+</span>
                  <span className={styles.founderStatLabel}>Projects Delivered</span>
                </div>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatValue}>4</span>
                  <span className={styles.founderStatLabel}>States</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Co-Founder */}
          <motion.div className={styles.founderCard} {...fadeIn(0.2)}>
            <div className={styles.founderImageWrap}>
              <img src="/cofounder.png" alt="Co-Founder" className={styles.founderImage} />
              <div className={styles.founderImageOverlay}></div>
              <div className={styles.founderGlowEdge}></div>
            </div>
            <div className={styles.founderInfo}>
              <span className={styles.founderRole}>Co-Founder & Director</span>
              <h3 className={styles.founderName}>Co-Founder Name</h3>
              <div className={styles.founderDivider}></div>
              <p className={styles.founderQuote}>
                "We are ready to shape the industries of tomorrow — with innovation, 
                precision, and an unwavering commitment to safety."
              </p>
              <div className={styles.founderStats}>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatValue}>9+</span>
                  <span className={styles.founderStatLabel}>Key Projects</span>
                </div>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatValue}>100%</span>
                  <span className={styles.founderStatLabel}>On-Time Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Full-bleed image */}
    <section className={styles.imageSection}>
      <img src="/about_hero.png" alt="Industrial construction site aerial" />
      <div className={styles.imageOverlay}></div>
    </section>

    {/* Mission & Vision */}
    <section className={styles.mvSection}>
      <div className="container">
        <div className={styles.mvGrid}>
          <motion.div className={styles.mvCard} {...fadeIn()}>
            <span className={styles.mvLabel}>Mission</span>
            <h3 className={styles.mvTitle}>Build. Enhance. Grow.</h3>
            <p className={styles.mvText}>
              Our mission is to build superior infrastructure that enhances the quality of
              life and contributes to the economic growth of the communities we serve. We
              strive for excellence in every project, ensuring customer satisfaction through
              innovative solutions and unwavering commitment to quality.
            </p>
          </motion.div>
          <motion.div className={styles.mvCard} {...fadeIn(0.1)}>
            <span className={styles.mvLabel}>Vision</span>
            <h3 className={styles.mvTitle}>Globally Recognized</h3>
            <p className={styles.mvText}>
              To be a globally recognized construction company known for our excellence,
              innovation, and sustainable practices, creating value for our clients,
              employees, and stakeholders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className={styles.valuesSection}>
      <div className="container">
        <motion.div className={styles.sectionHeader} {...fadeIn()}>
          <span className="subheading">Our Values</span>
          <h2 className="heading-md">What Drives Us</h2>
        </motion.div>

        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <motion.div key={i} className={styles.valueCard} {...fadeIn(i * 0.08)}>
              <span className={styles.valueNum}>0{i + 1}</span>
              <h4 className={styles.valueTitle}>{v.title}</h4>
              <p className={styles.valueText}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Image Break */}
    <section className={styles.imageSection}>
      <img src="/hero_bg.png" alt="Construction at night" />
      <div className={styles.imageOverlay}></div>
    </section>

    {/* Milestones */}
    <section className={styles.milestonesSection}>
      <div className="container">
        <motion.div className={styles.sectionHeader} {...fadeIn()}>
          <span className="subheading">Our Journey</span>
          <h2 className="heading-md">Key Milestones</h2>
        </motion.div>

        <div className={styles.timeline}>
          {milestones.map((m, i) => (
            <motion.div key={i} className={styles.milestone} {...fadeIn(i * 0.1)}>
              <span className={styles.milestoneYear}>{m.year}</span>
              <div className={styles.milestoneLine}></div>
              <div className={styles.milestoneContent}>
                <h4 className={styles.milestoneTitle}>{m.title}</h4>
                <p className={styles.milestoneDesc}>{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact CTA */}
    <section className={styles.contactSection}>
      <div className="container">
        <motion.div className={styles.contactBox} {...fadeIn()}>
          <h3 className={styles.contactTitle}>Ready to Build Together?</h3>
          <p className={styles.contactText}>
            Get in touch with us for your next industrial infrastructure project.
          </p>
          <div className={styles.contactDetails}>
            <a href="tel:9011951083" className={styles.contactLink}>
              <span className={styles.contactLabel}>Phone</span>
              <span>9011951083 / 8554827013</span>
            </a>
            <a href="mailto:project@10gatesinfrastructure.com" className={styles.contactLink}>
              <span className={styles.contactLabel}>Email</span>
              <span>project@10gatesinfrastructure.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
  );
};

export default AboutPage;
