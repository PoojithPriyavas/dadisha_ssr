// HomeTen.jsx
import React from 'react';
import styles from './HomeTen.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: '01',
    title: 'Dadisha Marketplace (E-Commerce)',
    desc: 'A zero-commission QHSE marketplace featuring nationally and internationally approved safety products, including PPE, signage, workplace safety tools, and compliance solutions, supporting both sellers and buyers in achieving industry standards.',
    img: '/images/marketplace-img.png',
    icon: '/icons/marketplace.svg',
    path: '/'
  },
  {
    id: '02',
    title: 'E-Learning & Professional Training',
    desc: 'Providing QHSE-focused Continues Professional Development ( CPD ) Courses with globally recognized certifications, interactive assessments, and embassy-approved certificates to ensure compliance, career advancement, and placement support with job alerts.',
    img: '/images/elearning.png',
    icon: '/icons/marketplace.svg',
    path: '/elearning'
  },
  {
    id: '03',
    title: 'SAAS & Custom Software Development',
    desc: '(Software as a Service - SAAS) Dadishas QHSE management app provides AI-driven compliance tracking, risk mitigation, and workplace safety automation with ISO-certified solutions, ensuring seamless implementation and execution of QHSE management system in every industries.',
    img: '/images/saas-img.png',
    icon: '/icons/marketplace.svg'
  },
  {
    id: '04',
    title: 'Risk Management Products & Services',
    desc: 'Developing AI-powered safety solutions, including customizable risk management stands with sensors, cameras, and automated monitoring for real-time data collection, risk detection, and compliance tracking.',
    img: '/images/riskmanagment-img.png',
    icon: '/icons/marketplace.svg'
  },
];







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

const cardVariants = {
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageHoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};


export default function HomeTen() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <motion.section
        className={styles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className={styles.headingWrapper} variants={itemVariants}>
          <div className={styles.lineHeading}>
            <motion.span className={styles.line} />
            <motion.span className={styles.subheading}>
              Our Services
            </motion.span>
            <motion.span className={styles.line} />
          </div>
          <motion.h2 className={styles.title}>
            {/* We create solutions that are <br />
            bold & up with the times */}
            Your End-to-End Partner in QHSE Excellence
          </motion.h2>
        </motion.div>

        <motion.div className={styles.cards} variants={containerVariants}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={itemVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => navigate('/risk-management')}
              style={{ cursor: 'pointer' }}
            >
              <motion.div className={styles.cardLayout} variants={cardVariants}>
                <div className={styles.leftColumn}>
                  <motion.div className={styles.iconWrapper}>
                    <img src={service.icon} alt="" className={styles.icon} />
                  </motion.div>
                  <motion.span className={styles.number}>
                    {service.id}
                  </motion.span>
                </div>

                <div className={styles.rightColumn}>
                  <motion.div className={styles.imageWrapper}>
                    <img src={service.img} alt={service.title} className={styles.image} />
                    <div className={styles.imageOverlay}></div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div className={styles.content}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <motion.button
                  className={styles.readMoreBtn}
                  whileHover={{
                    backgroundColor: '#2256e3',
                    color: '#fff'
                  }}
                  onClick={() => navigate('/risk-management')}
                >
                  Read More
                  <motion.span className={styles.arrow}>
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}