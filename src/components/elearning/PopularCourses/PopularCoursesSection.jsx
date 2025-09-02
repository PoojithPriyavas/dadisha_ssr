import { useState, useEffect, useContext } from 'react';
import styles from './styles/PopularCoursesSection.module.css';
import CourseFilters from './CourseFilters';
import CourseGrid from './CourseGrid';
import { Context } from '../../../context/context';
export default function PopularCoursesSection() {
  const { coursesData } = useContext(Context);
  console.log("data :", coursesData)
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    industry: '',
    level: ''
  });

  // useEffect(() => {
  //   // Sample course data
  //   const sampleCourses = [
  //     {
  //       id: 1,
  //       title: "ISO 45001 Lead Auditor Training",
  //       description: "Comprehensive training for occupational health and safety management systems auditing and certification.",
  //       price: 299,
  //       originalPrice: 399,
  //       discount: 25,
  //       hours: 40,
  //       level: "expert",
  //       category: "qhse",
  //       industry: "manufacturing",
  //       image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 2,
  //       title: "Quality Management Fundamentals",
  //       description: "Master the basics of quality management systems and continuous improvement methodologies.",
  //       price: 199,
  //       originalPrice: 249,
  //       discount: 20,
  //       hours: 25,
  //       level: "beginner",
  //       category: "qhse",
  //       industry: "manufacturing",
  //       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 3,
  //       title: "Environmental Management Systems",
  //       description: "Learn to implement and maintain ISO 14001 environmental management systems effectively.",
  //       price: 249,
  //       originalPrice: 319,
  //       discount: 22,
  //       hours: 30,
  //       level: "intermediate",
  //       category: "qhse",
  //       industry: "oil-gas",
  //       image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 4,
  //       title: "Construction Safety Management",
  //       description: "Comprehensive safety protocols and risk management strategies for construction projects.",
  //       price: 229,
  //       originalPrice: 289,
  //       discount: 21,
  //       hours: 35,
  //       level: "intermediate",
  //       category: "qhse",
  //       industry: "construction",
  //       image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 5,
  //       title: "Leadership in Safety Culture",
  //       description: "Develop leadership skills to create and maintain a strong safety culture in your organization.",
  //       price: 179,
  //       originalPrice: 229,
  //       discount: 22,
  //       hours: 20,
  //       level: "beginner",
  //       category: "management",
  //       industry: "manufacturing",
  //       image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 6,
  //       title: "Healthcare Risk Management",
  //       description: "Specialized training for healthcare professionals on risk assessment and patient safety.",
  //       price: 269,
  //       originalPrice: 339,
  //       discount: 21,
  //       hours: 32,
  //       level: "intermediate",
  //       category: "qhse",
  //       industry: "healthcare",
  //       image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 7,
  //       title: "Automotive Quality Systems",
  //       description: "IATF 16949 and automotive quality management systems for manufacturing excellence.",
  //       price: 319,
  //       originalPrice: 399,
  //       discount: 20,
  //       hours: 45,
  //       level: "expert",
  //       category: "technical",
  //       industry: "automotive",
  //       image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 8,
  //       title: "Process Safety Management",
  //       description: "Advanced process safety management techniques for high-risk industrial operations.",
  //       price: 349,
  //       originalPrice: 449,
  //       discount: 22,
  //       hours: 50,
  //       level: "expert",
  //       category: "qhse",
  //       industry: "oil-gas",
  //       image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     },
  //     {
  //       id: 9,
  //       title: "Compliance and Regulatory Affairs",
  //       description: "Navigate complex regulatory requirements and ensure organizational compliance.",
  //       price: 219,
  //       originalPrice: 279,
  //       discount: 21,
  //       hours: 28,
  //       level: "intermediate",
  //       category: "compliance",
  //       industry: "healthcare",
  //       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  //     }
  //     // ... (other course data remains the same)
  //   ];

  //   // Simulate loading
  //   setTimeout(() => {
  //     // setCourses(sampleCourses);
  //     // setFilteredCourses(sampleCourses);
  //     setCourses(coursesData.results);
  //     setFilteredCourses(coursesData.results);
  //     setLoading(false);
  //   }, 1500);
  // }, []);
  // console.log(courses,"dfd")

  // useEffect(() => {
  //   filterCourses();
  // }, [filters, courses]);

  // const filterCourses = () => {
  //   const filtered = courses.filter(course => {
  //     const matchesCategory = filters.category === '' || course.category === filters.category;
  //     const matchesIndustry = filters.industry === '' || course.industry === filters.industry;
  //     const matchesLevel = filters.level === '' || course.level === filters.level;

  //     return matchesCategory && matchesIndustry && matchesLevel;
  //   });

  //   setFilteredCourses(filtered);
  // };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      industry: '',
      level: ''
    });
  };

  

  return (
    <section className={styles.coursesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Most Popular Courses</h2>
          <p className={styles.sectionSubtitle}>
            Discover our top-rated courses trusted by thousands of professionals worldwide
          </p>
        </div>

        {/* <CourseFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        /> */}

        <CourseGrid
          courses={coursesData.results}
          loading={loading}
          onClearFilters={clearFilters}
        />
      </div>
    </section>
  );
}