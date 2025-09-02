import React from 'react';
import { motion } from 'framer-motion';
import styles from './HomeTwelve.module.css';

export default function HomeTwelve() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className='container'>
      <motion.section
        className={styles.wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className={styles.content} variants={containerVariants}>
          <motion.p className={styles.label} variants={itemVariants}>
            Why Should Work With Us!
          </motion.p>

          <motion.h2 className={styles.heading} variants={itemVariants}>
            Driving Global Excellence in QHSE
          </motion.h2>

          <motion.p className={styles.description} variants={itemVariants}>
            Our comprehensive support empowers organizations to strengthen their operations and compliance, from identifying and managing business risks to preparing essential documentation. By delivering expert guidance in Risk Management, ICV compliance, ADNOC Pre-Qualification, and QHSE Management, we help clients meet regulatory standards, enhance their credibility, and achieve sustainable growth.
          </motion.p>

          <motion.ul className={styles.features} variants={containerVariants}>
            {['Risk Management Services',
              'ICV Documentation Services',
              'ADNOC Pre-Qualification Document Services',
              'QHSE Management Compliance Documentation Services'].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.li>
              ))}
          </motion.ul>

          <motion.button
            className={styles.cta}
            variants={itemVariants}
            whileHover={{
              backgroundColor: '#000',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Animated images section */}
        <motion.div
          className={styles.imagesContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className={styles.images}>
            <motion.img
              src="/images/home-1.webp"
              className={styles.imageBack}
              alt="Background"
              variants={imageVariants}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.img
              src="/images/home-2.webp"
              className={styles.imageFront}
              alt="Foreground"
              variants={imageVariants}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.div
              className={styles.overlayBox}
              variants={overlayVariants}
              whileHover="hover"
            >
              <strong>68%</strong>
              <span>Extra Growth For Your Company</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}