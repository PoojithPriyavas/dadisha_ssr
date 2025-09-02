import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Code, Shield, Phone, Calendar } from 'lucide-react';
import styles from './ServiceAbout.module.css';
import { Context } from '../context/context';
import { useNavigate } from 'react-router-dom';

const ServiceAbout = () => {

  const { settings } = useContext(Context);
  const navigate = useNavigate();
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const scaleUp = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const pulse = {
    hover: {
      scale: 1.1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.div className={styles.leftSection} variants={container}>
        <motion.div
          className={styles.growthBox}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
          >
            250%
          </motion.h2>
          <p>Extra Growth For<br />Your Company</p>
        </motion.div>

        <motion.div
          className={styles.mainImageBox}
          variants={item}
        >
          <motion.img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
            alt="Main Team"
            className={styles.mainImage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className={styles.overlayImageBox}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
              alt="Team Discussion"
              className={styles.overlayImage}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className={styles.rightSection} variants={container}>
        <motion.span
          className={styles.serviceBadge}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          Service We Provide
        </motion.span>

        <motion.h1 className={styles.heading} variants={item}>
          {/* Meet our expert dynamic<br />digital agency team */}
          Transforming 22 Industries <br /> with Integrated QHSE Solutions
        </motion.h1>

        <motion.p className={styles.description} variants={item}>
          Dadisha Private Limited provides complete QHSE solutions across 22 industries, ensuring regulatory compliance, risk prevention, and operational excellence. Our expertise spans AI-powered workplace safety, certified e-learning, QHSE-focused e-commerce, and custom software development. We manufacture advanced risk management products, integrating AI-driven safety technologies and real-time monitoring. Our solutions empower businesses to implement and optimize QHSE strategies, fostering a safer, more efficient, and compliant work environment globally.
        </motion.p>

        <motion.div className={styles.services} variants={container}>
          <motion.div className={styles.serviceRow} variants={container}>
            {[
              { icon: <Users size={20} />, text: "Dadisha Marketplace (E-Commerce)" },
              { icon: <BookOpen size={20} />, text: "E-Learning & Professional Training" }
            ].map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceItem}
                variants={item}
                whileHover="hover"
              >
                <motion.div
                  className={styles.iconCircle}
                  variants={pulse}
                >
                  {service.icon}
                </motion.div>
                <p>{service.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className={styles.serviceRow} variants={container}>
            {[
              { icon: <Code size={20} />, text: "SAAS & Custom Software Development" },
              { icon: <Shield size={20} />, text: "Risk Management Products & Services" }
            ].map((service, index) => (
              <motion.div
                key={index + 2}
                className={styles.serviceItem}
                variants={item}
                whileHover="hover"
              >
                <motion.div
                  className={styles.iconCircle}
                  variants={pulse}
                >
                  {service.icon}
                </motion.div>
                <p>{service.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.callText}
          variants={item}
        >
          Call to ask any question{' '}
          <motion.a
            href="tel:+01010033377"
            whileHover={{ scale: 1.05 }}
          >
            <Phone size={16} style={{ marginRight: 8 }} />
            {/* (+01) 0100 333 77 */}
            {settings?.mobile_number}
          </motion.a>
        </motion.p>

        <motion.button
          className={styles.appointmentBtn}
          variants={item}
          whileHover="hover"
          onClick={() => navigate('/contactus')}
        >
          <Calendar size={18} style={{ marginRight: 8 }} />
          Make An Appointment →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ServiceAbout;