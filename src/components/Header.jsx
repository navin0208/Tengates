import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HamburgerIcon from './HamburgerIcon';
import styles from './Header.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current;
    if (latest > 120 && diff > 5) {
      setHidden(true);
    } else if (diff < -5) {
      setHidden(false);
    }
    setScrolled(latest > 50);
    lastY.current = latest;
  });

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at 100% 0%)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      clipPath: 'circle(150% at 100% 0%)',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: 0 }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`container ${styles.headerInner}`}>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src="/logos/TenGates.png" alt="Ten Gates" className={styles.logoImg} />
          </Link>

          {/* Desktop Nav — centered links */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`${styles.navLink} ${location.pathname === link.href ? styles.activeLink : ''}`}
              >
                {link.name}
                {location.pathname === link.href && (
                  <motion.span
                    className={styles.activeDot}
                    layoutId="navDot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className={styles.rightGroup}>
            <Link to="/contact" className={styles.ctaBtn}>
              <span>Get Quote</span>
              <span className={styles.ctaArrow}>↗</span>
            </Link>

            <button 
              className={styles.menuToggle} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileNav}>
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} custom={i} variants={linkVariants}>
                    <Link
                      to={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.mobileLinkNum}>0{i + 1}</span>
                      <span className={styles.mobileLinkText}>{link.name}</span>
                      <ArrowUpRight className={styles.mobileLinkIcon} size={28} />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className={styles.mobileFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={styles.contactInfo}>
                  <p>Inquiries</p>
                  <a href="mailto:hello@tengates.com">hello@tengates.com</a>
                </div>
                <div className={styles.socialLinks}>
                  <a href="#">LinkedIn</a>
                  <a href="#">Instagram</a>
                </div>
              </motion.div>
            </div>
            
            <div className={styles.menuGrid} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
