import { useEffect, useRef } from 'react';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "This platform completely transformed my career. The QHSE courses gave me the expertise I needed to advance to a management position in just 6 months.",
      author: "Sarah Johnson",
      role: "Safety Manager, Manufacturing",
      initial: "S",
      rating: 5
    },
    {
      text: "The flexibility of learning at my own pace while working full-time was perfect. The instructors are knowledgeable and always available for support.",
      author: "Michael Chen",
      role: "Quality Engineer, Automotive",
      initial: "M",
      rating: 4
    },
    {
      text: "Outstanding course content and practical applications. I've applied what I learned immediately in my workplace with great results.",
      author: "Emily Rodriguez",
      role: "Environmental Specialist, Oil & Gas",
      initial: "E",
      rating: 5
    },
  ];

  const containerRef = useRef(null);

  // Simple fade-in animation without auto-scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.testimonialsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Trusted by Industry Professionals</h2>
          <p className={styles.sectionSubtitle}>Hear from professionals who transformed their careers with our courses</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialText}>{testimonial.text}</p>

              {/* <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.star} ${i < testimonial.rating ? styles.filled : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div> */}

              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{testimonial.initial}</div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.author}</h4>
                  {/* <p>{testimonial.role}</p> */}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}