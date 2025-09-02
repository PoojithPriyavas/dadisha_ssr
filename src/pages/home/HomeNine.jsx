import React from 'react';
import './EmpowerSection.css';
import { motion } from 'framer-motion';

// Animation configurations
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      when: "beforeChildren"
    }
  }
};

const imageAnim = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 0.8
    }
  }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.6
    }
  }
};

const featureItem = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5
    }
  }
};

const buttonGroup = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4
    }
  }
};

const buttonItem = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};



// ... (keep your existing animation configurations)

export default function EmpowerSection() {
  return (
    <div className='empower-container'>
      <motion.section
        className="empower-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Left Column - Image */}
        <motion.div
          className="empower-images"
          variants={imageAnim}
        >
          <motion.img
            src='/images/test/about.webp'
            alt="Empower section visual"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="empower-content"
          variants={container}
        >
          <motion.p className="subheading" variants={item}>
            SUSTAINED SUCCESS
          </motion.p>

          <motion.h2 className="heading" variants={item}>
            Driving Global Excellence in QHSE
          </motion.h2>

          <motion.p className="description" variants={item}>
            To be the global leader in QHSE solutions, setting a benchmark for innovation, reliability, and sustainability. We envision industries thriving through compliance, skilled workforces, and environmental responsibility, ensuring synergetic industrial excellence and long-term success.
          </motion.p>

          <motion.div className="features" variants={container}>
            <motion.div className="feature" variants={featureItem}>
              <motion.div
                className="icon"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <i className="fa-solid fa-user-group"></i>
              </motion.div>
              <div className="text">
                <h4>Benchmarking Innovation and Sustainability</h4>
                <p>We aim to set industry standards through cutting-edge innovation, dependable solutions, and sustainable practices that lead the way globally.</p>
              </div>
            </motion.div>

            <motion.div className="feature" variants={featureItem}>
              <motion.div
                className="icon"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <i className="fa-solid fa-puzzle-piece"></i>
              </motion.div>
              <div className="text">
                <h4>Empowering Compliance and Skilled Workforce</h4>
                <p>Our vision supports industries in thriving by fostering regulatory compliance and building a capable, responsible workforce for lasting success.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="empower-buttons"
            variants={buttonGroup}
          >
            <motion.button
              className="btn primary"
              variants={buttonItem}
              whileHover={{
                y: -3,
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(251, 174, 36, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started ↗
            </motion.button>

            <motion.button
              className="btn secondary"
              variants={buttonItem}
              whileHover={{
                y: -3,
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(242, 244, 255, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo ⏵
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}