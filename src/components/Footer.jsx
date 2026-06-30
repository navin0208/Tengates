import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoLink}>
              <img src="/logos/TenGates.png" alt="Ten Gates" className={styles.logoImg} />
            </Link>
            <p className={styles.desc}>Premier construction company dedicated to<br/>delivering top-notch infrastructure projects.</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Divisions</h4>
              <Link to="/services">Civil Construction</Link>
              <Link to="/services">Industrial Flooring</Link>
              <Link to="/services">Warehousing</Link>
            </div>
            <div className={styles.column}>
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/about">Mission & Vision</Link>
              <Link to="/projects">Projects</Link>
            </div>
            <div className={styles.column}>
              <h4>Inquiries</h4>
              <p>+91 9011951083<br/>+91 8554827013</p>
              <a href="mailto:project@10gatesinfrastructure.com" style={{ textTransform: 'lowercase', marginTop: '10px', display: 'block' }}>project@10gatesinfrastructure.com</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>&copy; {new Date().getFullYear()} Ten Gates Infrastructure Pvt. Ltd. All rights reserved.</div>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
