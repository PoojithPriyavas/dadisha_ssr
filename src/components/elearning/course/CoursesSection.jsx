import { useState, useEffect } from 'react';
import styles from './CoursesSection.module.css';

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    industry: '',
    level: ''
  });

  useEffect(() => {
    // Sample course data - in a real app, you'd fetch this from an API
    const sampleCourses = [
      {
        id: 1,
        title: "ISO 45001 Lead Auditor Training",
        description: "Comprehensive training for occupational health and safety management systems auditing and certification.",
        price: 299,
        originalPrice: 399,
        discount: 25,
        hours: 40,
        level: "expert",
        category: "qhse",
        industry: "manufacturing",
        icon: "🛡️"
      },
      {
        id: 2,
        title: "Quality Management Fundamentals",
        description: "Master the basics of quality management systems and continuous improvement methodologies.",
        price: 199,
        originalPrice: 249,
        discount: 20,
        hours: 25,
        level: "beginner",
        category: "qhse",
        industry: "manufacturing",
        icon: "⚙️"
      },
      {
        id: 3,
        title: "Environmental Management Systems",
        description: "Learn to implement and maintain ISO 14001 environmental management systems effectively.",
        price: 249,
        originalPrice: 319,
        discount: 22,
        hours: 30,
        level: "intermediate",
        category: "qhse",
        industry: "oil-gas",
        icon: "🌱"
      },
      {
        id: 4,
        title: "Construction Safety Management",
        description: "Comprehensive safety protocols and risk management strategies for construction projects.",
        price: 229,
        originalPrice: 289,
        discount: 21,
        hours: 35,
        level: "intermediate",
        category: "qhse",
        industry: "construction",
        icon: "🏗️"
      },
      {
        id: 5,
        title: "Leadership in Safety Culture",
        description: "Develop leadership skills to create and maintain a strong safety culture in your organization.",
        price: 179,
        originalPrice: 229,
        discount: 22,
        hours: 20,
        level: "beginner",
        category: "management",
        industry: "manufacturing",
        icon: "👥"
      },
      {
        id: 6,
        title: "Healthcare Risk Management",
        description: "Specialized training for healthcare professionals on risk assessment and patient safety.",
        price: 269,
        originalPrice: 339,
        discount: 21,
        hours: 32,
        level: "intermediate",
        category: "qhse",
        industry: "healthcare",
        icon: "🏥"
      },
      {
        id: 7,
        title: "Automotive Quality Systems",
        description: "IATF 16949 and automotive quality management systems for manufacturing excellence.",
        price: 319,
        originalPrice: 399,
        discount: 20,
        hours: 45,
        level: "expert",
        category: "technical",
        industry: "automotive",
        icon: "🚗"
      },
      {
        id: 8,
        title: "Process Safety Management",
        description: "Advanced process safety management techniques for high-risk industrial operations.",
        price: 349,
        originalPrice: 449,
        discount: 22,
        hours: 50,
        level: "expert",
        category: "qhse",
        industry: "oil-gas",
        icon: "⚡"
      },
      {
        id: 9,
        title: "Compliance and Regulatory Affairs",
        description: "Navigate complex regulatory requirements and ensure organizational compliance.",
        price: 219,
        originalPrice: 279,
        discount: 21,
        hours: 28,
        level: "intermediate",
        category: "compliance",
        industry: "healthcare",
        icon: "📋"
      }
    ];

    setCourses(sampleCourses);
    setFilteredCourses(sampleCourses);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, filters]);

  const filterCourses = () => {
    setLoading(true);

    const filtered = courses.filter(course => {
      const matchesSearch = searchTerm === '' ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = filters.category === '' || course.category === filters.category;
      const matchesIndustry = filters.industry === '' || course.industry === filters.industry;
      const matchesLevel = filters.level === '' || course.level === filters.level;

      return matchesSearch && matchesCategory && matchesIndustry && matchesLevel;
    });

    setTimeout(() => {
      setFilteredCourses(filtered);
      setLoading(false);
    }, 300);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      filterCourses();
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id.replace('Filter', '')]: e.target.value
    });
  };

  return (
    <section className={styles.coursesSection} id="courses">
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} animate-on-scroll`}>Explore Most Popular Courses</h2>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading courses...</p>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {filteredCourses.map(course => (
              <div key={course.id} className={`${styles.courseCard} animate-on-scroll`}>
                <div className={styles.courseImage}>
                  <div style={{ fontSize: '4rem' }}>{course.icon}</div>
                </div>
                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <div className={styles.courseMeta}>
                    <div className={styles.courseHours}>{course.hours} hours</div>
                    <div className={styles.courseLevel}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </div>
                  </div>
                  <div className={styles.coursePricing}>
                    <span className={styles.coursePrice}>${course.price}</span>
                    <span className={styles.courseOriginalPrice}>${course.originalPrice}</span>
                    <span className={styles.courseDiscount}>{course.discount}% OFF</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}