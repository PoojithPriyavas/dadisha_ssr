import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import styles from './NewAboutMession.module.css';

export default function AboutSectionOne() {
  const [isInView, setIsInView] = useState(false);
  const [animateStars, setAnimateStars] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setTimeout(() => setAnimateStars(true), 400);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={`${styles.headerContent} ${isInView ? styles.inView : ''}`}>
            {/* Star Rating */}
            <div className={styles.starRating}>
              <div className={styles.starContainer}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${styles.star} ${animateStars ? styles.animated : ''}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className={`${styles.ratingText} ${animateStars ? styles.animated : ''}`}>
                5 Star Rating
              </span>
            </div>

            {/* Main Title */}
            <h1 className={`${styles.title} ${isInView ? styles.inView : ''}`}>
              We're your{' '}
              <span className={styles.titleAccent}>
                QHSE Guardians
                <div className={`${styles.titleUnderline} ${isInView ? styles.inView : ''}`}></div>
              </span>
            </h1>
          </div>
        </div>

        {/* Vision and Mission Grid */}
        <div className={styles.grid}>
          {/* Vision Section */}
          <div className={`${styles.visionSection} ${isInView ? styles.inView : ''}`}>
            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeader}>
                <div className={`${styles.colorBar} ${styles.blue}`}></div>
                Our Mission
              </h2>

              <div className={styles.content}>
                <div className={styles.contentItem}>
                  <p className={styles.paragraph}>
                    Our mission is to transform industries through innovative Quality, Health, Safety, and Environmental (QHSE) solutions that ensure operational excellence and protect lives while delivering substantial financial and ethical advantages. With our integrated industrial solutions and cutting-edge technologies, we are wholeheartedly dedicated to compliance and the relentless pursuit of safety and sustainability. We strive not only to create safe, efficient, and environmentally responsible workplaces but also to cultivate a competent workforce through impactful training; we make it happen. By fostering trust and offering expert, customized digital and dynamic solutions, we position ourselves as the essential partner in advancing global industrial progress and enhancing well-being of all.
                  </p>
                </div>

                {/* <div className={`${styles.separator} ${styles.blue}`}></div>

                <div className={styles.contentItem}>
                  <p className={styles.paragraph}>
                    Setting a benchmark for innovation, reliability, and sustainability, enabling industries to thrive through compliance and skilled workforces, and promoting environmental responsibility and long-term industrial excellence.
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className={`${styles.missionSection} ${isInView ? styles.inView : ''}`}>
            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeader}>
                <div className={`${styles.colorBar} ${styles.green}`}></div>
                Our Vision
              </h2>

              <div className={styles.content}>
                <div className={styles.contentItem}>
                  <p className={styles.paragraph}>
                    To become the global leader in Quality, Health, Safety, and Environmental Management, setting a benchmark for innovation in delivering industrial solutions that embody reliability and sustainability. We envision a world where industries thrive through safe practices, a skilled workforce, environmental stewardship, and consistent synergistic industrial excellence. Our approach aims to empower a future of shared prosperity and well-being for everyone.
                  </p>
                </div>

                {/* <div className={`${styles.separator} ${styles.green}`}></div>

                <div className={styles.contentItem}>
                  <p className={styles.paragraph}>
                    Integrating AI-powered risk management, compliance automation, and workplace safety strategies, leveraging advanced technology and globally recognized training, and providing customized digital solutions to help businesses implement, execute, and sustain industry-leading safety and compliance practices.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}