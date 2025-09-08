// import React from 'react';
import React, { useState, useRef, useContext, useEffect } from 'react';
import Header from '../../components/Header';
import Hero from '../../components/elearning/hero/Hero';
import Search from '../../components/elearning/search/SearchSection';
import Status from '../../components/elearning/status/StatsSection';
import Testimonial from '../../components/elearning/testi/TestimonialsSection';
import Trust from '../../components/elearning/trust/TrustSection';
import CourseSection from '../../components/elearning/course/CoursesSection';
import Navbar from '../../components/elearning/navbar/Navbar';
import PopularCoursesSection from '../../components/elearning/PopularCourses/PopularCoursesSection';
import EnhancedCourse from '../../components/elearning/PopularCourses/EnhancedCourseFilters';
import CourseList from '../../components/elearning/PopularCourses/CourseList';
import FooterTwo from "../../components/FooterTwo";
import { Context } from '../../context/context';
import context from 'react-bootstrap/esm/AccordionContext';
import { useElearningSSRData } from '../../hooks/useSSRData';




export default function Elearning() {
  // Get SSR data if available
  const ssrElearningData = useElearningSSRData();
  const { courses } = useContext(context);
  const { coursesData } = useContext(Context);
  
  // Use SSR data if available
  useEffect(() => {
    if (ssrElearningData) {
      console.log('Using SSR data for e-learning page');
    }
  }, [ssrElearningData]);

  const [filters, setFilters] = useState({
    category: '',
    industry: '',
    level: '',
    search: '',
  });



  const enhancedCourseRef = useRef(null);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };


  const handleClearFilters = () => {
    setFilters({
      category: '',
      industry: '',
      level: '',
      search: '',
    });
  };

  const handleHeroSearch = (searchValue) => {
    setFilters(prev => ({
      ...prev,
      search: searchValue
    }));

    setTimeout(() => {
      if (enhancedCourseRef.current) {
        enhancedCourseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };



  return (
    <div>
      <Navbar />

      {/* <Header /> */}
      <Hero onSearch={handleHeroSearch} />
      {/* <Search /> */}
      {/* <CourseSection /> */}
      {/* <Trust /> */}
      <PopularCoursesSection />
      <Testimonial />
      {/* <EnhancedCourse /> */}
      <div ref={enhancedCourseRef}>
        <EnhancedCourse
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>
      <CourseList courses={ssrElearningData || coursesData} />
      {/* <Status /> */}
      <FooterTwo />
    </div >
  );
}
