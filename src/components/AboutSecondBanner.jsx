import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import styles from './AboutSecondBanner.module.css';
import { useNavigate } from 'react-router-dom';

const AboutBanner = () => {
  const navigate = useNavigate();
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
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

  const buttonHover = {
    hover: {
      x: 5,
      transition: { duration: 0.3 }
    }
  };

  const arrowHover = {
    hover: {
      x: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      className={styles.hero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      <div className={styles.overlay}>
        <motion.div
          className={styles.rowContainer}
          variants={container}
        >
          <motion.div className={styles.content}>
            <motion.div variants={item}>
              <motion.p
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                More
              </motion.p>
              <motion.h1 variants={item}>
                Have Any Project? Let's Talk <br />
                & Grow your Business
              </motion.h1>
            </motion.div>

            <motion.button
              className={styles.appointmentBtn}
              variants={item}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contactus')}
            >
              <Calendar size={18} className={styles.btnIcon} />
              Make An Appointment
              <motion.span className={styles.arrow} variants={arrowHover}>
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutBanner;