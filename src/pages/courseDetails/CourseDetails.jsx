// import React from 'react';
import React, { useState } from 'react';


import Testimonial from '../../components/elearning/testi/TestimonialsSection';

import Navbar from '../../components/elearning/navbar/Navbar';
import CourseDetails from '../../components/elearning/courseDetails/CourseDetails';
import PopularCoursesSection from '../../components/elearning/PopularCourses/PopularCoursesSection';


import FooterTwo from "../../components/FooterTwo";
// import FooterTwo from "../../components/FooterTwo";





export default function CourseDetail() {
  return (
    <div>
      <Navbar />
      {/* <CourseDetails /> */}

      <CourseDetails />
      <Testimonial />
      <PopularCoursesSection />

      {/* <Status /> */}
      <FooterTwo />
    </div>
  );
}
