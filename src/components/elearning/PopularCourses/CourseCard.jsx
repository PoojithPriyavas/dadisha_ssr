import styles from './styles/CourseCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const handleClick = (slug) => {
    console.log("click hh called")
    navigate(`/courseDetails/${slug}`);
  }
  console.log(course, 'jjj')
  return (
    <div className={styles.courseCard} style={{ cursor: 'pointer' }} onClick={() => handleClick(course.slug)} >
      <div className={styles.courseImage}>
        <img src={course.image} alt={course.name} />
        <div className={styles.courseBadge}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </div>
      </div>

      <div className={styles.courseContent}>
        <div className={styles.courseHeader}>
          <h3 className={styles.courseTitle}>{course.name}</h3>
          <div className={styles.coursePrice}>
            <span className={styles.currentPrice}>${course.sale_price}</span>
            {course.mrp && (
              <span className={styles.originalPrice}>${course.mrp}</span>
            )}
          </div>
        </div>

        <p className={styles.courseDescription}>{course.small_description}</p>

        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v6h6v-2h-4z"></path>
            </svg>
            {course.total_hour} hours
          </div>
          <div className={styles.metaItem}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v6h6v-2h-4z"></path>
            </svg>
            {course.discount}% OFF
          </div>
        </div>

        <button className={styles.enrollBtn}>
          Enroll Now
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 17l5-5-5-5v10z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}