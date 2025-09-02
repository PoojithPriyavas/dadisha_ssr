import { useEffect, useState } from 'react';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animateCounters();
            setAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(`.${styles.statsSection}`);
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, [animated]);

  const animateCounters = () => {
    const statNumbers = document.querySelectorAll(`.${styles.statNumber}`);
    statNumbers.forEach((stat) => {
      const text = stat.textContent;
      const number = parseInt(text.replace(/[^\d]/g, ''));
      const suffix = text.replace(/[\d]/g, '');

      animateCounter(stat, number, 2000);
      setTimeout(() => {
        stat.textContent = number + suffix;
      }, 2000);
    });
  };

  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsGrid}>
        <div className={`${styles.statItem} animate-on-scroll`}>
          <div className={styles.statNumber}>50K+</div>
          <div className={styles.statLabel}>Active Students</div>
        </div>
        <div className={`${styles.statItem} animate-on-scroll`}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Expert Courses</div>
        </div>
        <div className={`${styles.statItem} animate-on-scroll`}>
          <div className={styles.statNumber}>95%</div>
          <div className={styles.statLabel}>Success Rate</div>
        </div>
        <div className={`${styles.statItem} animate-on-scroll`}>
          <div className={styles.statNumber}>24/7</div>
          <div className={styles.statLabel}>Support Available</div>
        </div>
      </div>
    </section>
  );
}