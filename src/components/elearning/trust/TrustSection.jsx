import React, { useEffect, useRef } from 'react';
import styles from './TrustSection.module.css';

const TrustSection = () => {
  const statsBannerRef = useRef(null);
  const animatedElements = useRef(null);


  useEffect(() => {
    // Initialize intersection observers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Animation observer for scroll-triggered elements
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animated);
        }
      });
    }, observerOptions);

    // Get all elements to animate
    animatedElements.current = document.querySelectorAll(`.${styles.animateOnScroll}`);
    animatedElements.current.forEach(el => {
      animationObserver.observe(el);
    });

    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(`.${styles.statNumber}`);
          statNumbers.forEach((stat, index) => {
            const targets = [50000, 95, 200, 98];
            const suffixes = ['', '%', '', '%'];
            setTimeout(() => {
              animateCounter(stat, targets[index]);

              setTimeout(() => {
                if (stat.textContent) {
                  stat.textContent = targets[index].toLocaleString() + (suffixes[index] || '') + (index === 0 ? '+' : '');
                }
              }, 2000);
            }, index * 200);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsBannerRef.current) {
      statsObserver.observe(statsBannerRef.current);
    }

    // Cleanup
    return () => {
      animatedElements.current?.forEach(el => {
        animationObserver.unobserve(el);
      });
      if (statsBannerRef.current) {
        statsObserver.unobserve(statsBannerRef.current);
      }
    };
  }, []);

  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    let startTime = null;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const current = Math.floor(start + (target - start) * progress);
        element.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };


  const trustCards = [
    {
      icon: '🎯',
      title: 'Flexible Learning Experience',
      description: 'Learn at your own pace with our adaptive learning platform. Access courses anytime, anywhere, and pick up right where you left off.'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and certified experts with years of real-world experience in their respective fields.'
    },
    {
      icon: '🏆',
      title: 'Industry Recognition',
      description: 'Earn certificates and credentials that are recognized by leading companies and organizations worldwide.'
    },
    {
      icon: '🔄',
      title: 'Continuous Updates',
      description: 'Stay current with the latest industry trends and regulations through our regularly updated course content.'
    },
    {
      icon: '💼',
      title: 'Career Support',
      description: 'Get personalized career guidance and job placement assistance to help you achieve your professional goals.'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join a worldwide network of learners and professionals, sharing knowledge and experiences across industries.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '95%', label: 'Completion Rate' },
    { number: '200+', label: 'Expert Instructors' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} ${styles.animateOnScroll}`}>Why Learners Trust Us</h2>
          <p className={`${styles.sectionSubtitle} ${styles.animateOnScroll}`}>
            Join thousands of professionals who have transformed their careers with our comprehensive learning platform
          </p>
        </div>

        <div className={styles.trustGrid}>
          {trustCards.map((card, index) => (
            <div
              key={index}
              className={`${styles.trustCard} ${styles.animateOnScroll}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.trustIcon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        <div
          ref={statsBannerRef}
          className={`${styles.statsBanner} ${styles.animateOnScroll}`}
        >
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;