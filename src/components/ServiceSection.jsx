import React from 'react';
import styles from './ServiceSection.module.css';

const servicesData = [
    {
        id: '01',
        title: 'Strategic Solutions',
        desc: 'Business consultancy enables companies to stay competitive in a rapidly evolving digital landscape, ultimately leading to increased efficiency...',
        img: '/images/service1.jpg',
        icon: '/icons/strategy-icon.png',
    },
    {
        id: '02',
        title: 'Growth Consultants',
        desc: 'Business consultancy enables companies to stay competitive in a rapidly evolving digital landscape, ultimately leading to increased efficiency...',
        img: '/images/service2.jpg',
        icon: '/icons/growth-icon.png',
    },
    {
        id: '03',
        title: 'Market Research & Analysis',
        desc: 'Business consultancy enables companies to stay competitive in a rapidly evolving digital landscape, ultimately leading to increased efficiency...',
        img: '/images/service3.jpg',
        icon: '/icons/analysis-icon.png',
    },
];

const ServiceSection = () => {
    return (
        <div className={styles.servicesSection}>
            <div className={styles.header}>
                <p className={styles.subTitle}>OUR SERVICES</p>
                <h2>
                    {/* We create solutions that are <br />
                    <strong>bold & up with the times</strong> */}
                    Your End-to-End Partner in QHSE Excellence
                </h2>
            </div>

            <div className={styles.cardsContainer}>
                {servicesData.map((service) => (
                    <div className={styles.card} key={service.id}>
                        <div className={styles.iconArea}>
                            <img src={service.icon} alt="icon" className={styles.icon} />
                            <span className={styles.idNumber}>{service.id}</span>
                        </div>
                        <img src={service.img} alt={service.title} className={styles.image} />
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                        <button className={styles.readMore}>Read More ↗</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceSection;
