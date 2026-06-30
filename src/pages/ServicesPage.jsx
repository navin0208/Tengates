import { motion } from 'framer-motion';
import { Building2, Warehouse, Layers, Route, HardHat, Ruler } from 'lucide-react';
import styles from './ServicesPage.module.css';

const coreServices = [
  {
    icon: Building2,
    title: "Industrial Civil Construction",
    desc: "End-to-end civil works for factories, admin buildings, and industrial campuses. From foundation to finishing, we deliver structures engineered for heavy-duty industrial use.",
    features: ["Factory buildings", "Admin complexes", "Industrial campuses", "Machine foundations"],
  },
  {
    icon: Warehouse,
    title: "Warehouse & Cold Storage",
    desc: "Large-scale warehousing and cold storage solutions with optimized structural integrity, dock levelers, and climate-controlled environments.",
    features: ["Warehouse construction", "Cold storage facilities", "Dock levelers", "Climate control"],
  },
  {
    icon: Layers,
    title: "Precision Concreting & Trimix Flooring",
    desc: "M35 grade trimix flooring with reinforcement, PCC, and acid-proof tiling for industrial floors requiring absolute flatness and durability.",
    features: ["M35 Trimix flooring", "Acid-proof tiling", "Grade slabs", "Night-shift concreting"],
  },
  {
    icon: Route,
    title: "Infrastructure & Roads",
    desc: "Roads, drainage, utility networks, and internal factory road systems designed for heavy vehicle traffic and long-term load endurance.",
    features: ["Factory roads", "Drainage systems", "Utility networks", "Heavy-load surfaces"],
  },
  {
    icon: HardHat,
    title: "Foundation Engineering",
    desc: "Deep and shallow foundations, pile foundations, pedestal work, and anchor bolt installations for machinery, boilers, evaporators, and chimneys.",
    features: ["Pile foundations", "Pedestal work", "Anchor bolts", "Chimney foundations"],
  },
  {
    icon: Ruler,
    title: "Turnkey Projects",
    desc: "Complete turnkey project delivery — from site survey and design through execution and handover — single-point accountability for your entire project.",
    features: ["End-to-end delivery", "Single accountability", "Design to handover", "Quality assurance"],
  },
];

const whyChoose = [
  {
    num: "01",
    title: "Expertise & Experience",
    text: "Proven track record across 9+ major industrial projects. Our skilled team brings deep technical know-how to every site.",
  },
  {
    num: "02",
    title: "Innovation & Efficiency",
    text: "Modern technology and process improvements enable cost optimization while maintaining the highest quality results.",
  },
  {
    num: "03",
    title: "Reliability & Trust",
    text: "Transparent communication, rigorous reporting, and strong compliance with safety and industry standards.",
  },
  {
    num: "04",
    title: "Client Partnerships",
    text: "Collaborative process with open communication and client involvement. Repeat partnerships and recognized reputation.",
  },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const ServicesPage = () => (
  <div className={styles.page}>

    {/* Core Services Grid */}
    <section className={styles.servicesSection}>
      <div className="container">
        <motion.div className={styles.sectionHeader} {...fadeIn()}>
          <span className="subheading">What We Build</span>
          <h2 className="heading-md">Core Capabilities</h2>
          <p className={styles.sectionDesc}>
            From precision concreting to turnkey industrial campuses, we deliver infrastructure
            that meets the most demanding industrial standards.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {coreServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={i} className={styles.serviceCard} {...fadeIn(i * 0.08)}>
                <div className={styles.serviceIcon}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f, fi) => (
                    <li key={fi}>{f}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Full-bleed image break */}
    <section className={styles.imageBreak}>
      <img src="/services_hero.png" alt="Construction site at dusk" />
      <div className={styles.imageBreakOverlay}>
        <motion.div className={styles.imageBreakContent} {...fadeIn()}>
          <span className={styles.pullQuote}>
            "Our Construction Portfolio is more than just a collection of projects — it is a representation
            of vision, innovation, and sustainability."
          </span>
        </motion.div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className={styles.whySection}>
      <div className="container">
        <div className={styles.whyLayout}>
          <motion.div className={styles.whyLeft} {...fadeIn()}>
            <span className="subheading">Why Ten Gates</span>
            <h2 className="heading-md">Why Choose Us For Your Industrial Project</h2>
            <p className={styles.whyDesc}>
              We believe successful projects are built on strong partnerships with clients.
              With our experience and commitment, we are ready to shape the industries of tomorrow.
            </p>
          </motion.div>

          <div className={styles.whyRight}>
            {whyChoose.map((item, i) => (
              <motion.div key={i} className={styles.whyCard} {...fadeIn(i * 0.1)}>
                <span className={styles.whyNum}>{item.num}</span>
                <div>
                  <h4 className={styles.whyTitle}>{item.title}</h4>
                  <p className={styles.whyText}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Process */}
    <section className={styles.processSection}>
      <div className="container">
        <motion.div className={styles.sectionHeader} {...fadeIn()}>
          <span className="subheading">Our Process</span>
          <h2 className="heading-md">How We Deliver</h2>
        </motion.div>

        <div className={styles.processGrid}>
          {[
            { step: "01", title: "Site Survey & Planning", text: "Comprehensive site analysis, soil testing, and project planning." },
            { step: "02", title: "Design & Engineering", text: "Structural design, BOQ preparation, and regulatory compliance." },
            { step: "03", title: "Execution", text: "Precision construction with quality control at every stage." },
            { step: "04", title: "Handover", text: "Final inspection, documentation, and client handover." },
          ].map((item, i) => (
            <motion.div key={i} className={styles.processCard} {...fadeIn(i * 0.1)}>
              <span className={styles.processStep}>{item.step}</span>
              <h4 className={styles.processTitle}>{item.title}</h4>
              <p className={styles.processText}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ServicesPage;
