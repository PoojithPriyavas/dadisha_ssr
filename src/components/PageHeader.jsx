import React from 'react';
import styles from './PageHeader.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaSearch, FaBars } from 'react-icons/fa';

const PageHeader = () => {
  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.social}>
          <a href="#"><FaFacebookF /> Facebook</a>
          <a href="#"><FaTwitter /> Twitter</a>
          <a href="#"><FaLinkedinIn /> Linkedin</a>
        </div>
        <div className={styles.contact}>
          <a href="mailto:info-help@bigzen.com"><FaEnvelope /> info-help@bigzen.com</a>
          <span><FaMapMarkerAlt /> 258 Street Avenue, Berlin, Germany</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>▶</span>
            <span className={styles.logoText}>Bizgen</span>
          </div>
          <nav className={styles.navLinks}>
            <a href="#">HOME ▾</a>
            <a href="#">PAGES ▾</a>
            <a href="#">SERVICES ▾</a>
            <a href="#">PROJECTS ▾</a>
            <a href="#">BLOG ▾</a>
            <a className={styles.active} href="#">CONTACT ▾</a>
          </nav>
        </div>

        <div className={styles.right}>
          <button className={styles.appointmentBtn}>
            Make An Appointment <FaArrowRight />
          </button>
          <div className={styles.iconBtn}><FaSearch /></div>
          <div className={styles.iconBtn}><FaBars /></div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
