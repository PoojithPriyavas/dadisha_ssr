import styles from './styles/CourseGrid.module.css';
import CourseCard from './CourseCard';

export default function CourseGrid({ courses, loading, onClearFilters }) {
  console.log(courses,"coursessss")
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading amazing courses...</p>
      </div>
    );
  }

  if (!courses) {
    return (
      <div className={styles.noResults}>
        <div className={styles.noResultsIcon}>🔍</div>
        <h3>No courses found</h3>
        <p>Try adjusting your filters to find the perfect course for you.</p>
        <button onClick={onClearFilters} className={styles.clearFiltersBtn}>
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className={styles.coursesGrid}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}