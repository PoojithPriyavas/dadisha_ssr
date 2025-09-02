import React from 'react';
import { motion } from 'framer-motion';
import { Home, Contact, ChevronRight } from 'lucide-react';
import styles from './AboutHeroSection.module.css';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const navLinkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <motion.div
          className={styles.rowContainer}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className={styles.content} variants={containerVariants}>
            <motion.h1 variants={itemVariants}>About Us</motion.h1>
            <motion.p variants={itemVariants}>
              Business consultancy enables companies to stay competitive in a rapidly evolving
              digital landscape, ultimately leading to increased efficiency
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.navLinks}
            variants={itemVariants}
          >
            <motion.a
              href="#"
              variants={navLinkVariants}
              whileHover="hover"
            >
              <Home size={16} className={styles.icon} /> HOME
            </motion.a>
            <motion.span variants={itemVariants}>•</motion.span>
            <motion.a
              href="#"
              variants={navLinkVariants}
              whileHover="hover"
            >
              <Contact size={16} className={styles.icon} /> About
              <ChevronRight size={16} className={styles.arrow} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;