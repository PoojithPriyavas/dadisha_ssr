// components/elearning/PopularCourses/CourseList.jsx
import React, { useContext } from 'react';
import styles from './styles/CourseList.module.css';
import { Context } from '../../../context/context';
import { useNavigate } from 'react-router-dom';

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading amazing courses...</p>
    </div>
);

export default function CourseList({ courses }) {
    const { courseFilter, filterLoading } = useContext(Context);
    const navigate = useNavigate();
    console.log(courseFilter, "filter");

    const routerClick = (slug) => {
        console.log("click called")
        navigate(`/courseDetails/${slug}`);
    }

    // Show loading spinner when filterLoading is true
    if (filterLoading) {
        return (
            <div className={styles.wrapper}>
                <LoadingSpinner />
            </div>
        );
    }

    if (!courseFilter || courseFilter.length === 0) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.noCourses}>No courses found.</div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.courseGrid}>
                {courseFilter?.results?.map((course) => (
                    <div key={course.id} className={styles.courseCard} style={{ cursor: 'pointer' }} onClick={() => routerClick(course.slug)}>
                        <img src={course.image} alt={course.title} className={styles.courseImage} />
                        <div className={styles.courseContent}>
                            <h4 className={styles.courseTitle}>{course.name}</h4>
                            <p className={styles.courseDescription}>{course.small_description}</p>
                            <div className={styles.courseMeta}>
                                <span>Level: {course.level}</span>
                                <span>Hours: {course.total_hour}</span>
                            </div>
                            <div className={styles.coursePricing}>
                                <span className={styles.coursePrice}>${course.sale_price}</span>
                                {course.mrp && (
                                    <span className={styles.courseOriginalPrice}>${course.mrp}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}