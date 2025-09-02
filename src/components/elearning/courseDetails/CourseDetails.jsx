import React, { useState, useContext, useEffect } from 'react';
import { Play, Clock, BookOpen, Award, Users, CheckCircle, ChevronDown, ChevronUp, Lock, FileText, HelpCircle, PenTool } from 'lucide-react';
import styles from './CourseDetails.module.css';
import { useParams } from 'react-router-dom';
import { Context } from '../../../context/context';

const CourseDetails = () => {
  const { slug } = useParams();
  const { fetchCourseDetail, courseDetails, detailsLoading } = useContext(Context);
  useEffect(() => {
    if (slug) {
      fetchCourseDetail(slug)
    }

  }, [slug])
  console.log(slug, "slugg")
  console.log(courseDetails, "detailsssss")
  const [expandedSections, setExpandedSections] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchCourseDetail(slug);
    }
  }, [slug]);

  // Set the first available video when courseDetails loads
  useEffect(() => {
    if (courseDetails?.lecture_title?.length > 0) {
      const firstSection = courseDetails.lecture_title[0];
      if (firstSection?.lectures?.length > 0) {
        const firstLecture = firstSection.lectures.find(lecture =>
          lecture.order_by === 1 && lecture.video_url
        );
        if (firstLecture) {
          setActiveVideo(firstLecture.video_url);
        }
      }
    }
  }, [courseDetails]);



  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // const getVideoId = (url) => {
  //   const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
  //   const match = url.match(regex);
  //   return match ? match[1].split('&')[0].split('?')[0] : null;
  // };

  const getVideoId = (url) => {
    if (!url) return '';

    // Handle youtu.be links
    if (url.includes('youtu.be')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }

    // Handle youtube.com links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : '';
  };

  const getLectureIcon = (type) => {
    switch (type) {
      case 'Video': return <Play className={styles.icon} />;
      case 'Quiz': return <HelpCircle className={styles.icon} />;
      case 'Assignment': return <PenTool className={styles.icon} />;
      case 'Exam': return <FileText className={styles.icon} />;
      case 'Image': return <FileText className={styles.icon} />;
      default: return <BookOpen className={styles.icon} />;
    }
  };

  const handleLectureClick = (lecture) => {
    if (lecture.order_by === 1 && lecture.video_url) {
      setActiveVideo(lecture.video_url);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Course Header */}
            <div className={styles.card}>
              <div className={styles.courseHeader}>
                <img
                  src={courseDetails.image}
                  alt={courseDetails.name}
                  className={styles.courseImage}
                />
                <div className={styles.courseInfo}>
                  <div className={styles.tags}>
                    {courseDetails?.category?.map(cat => (
                      <span key={cat.id} className={styles.categoryTag}>
                        {cat.name}
                      </span>
                    ))}
                    {courseDetails?.industry?.map(ind => (
                      <span key={ind.id} className={styles.industryTag}>
                        {ind.name}
                      </span>
                    ))}
                  </div>
                  <h1 className={styles.title}>{courseDetails?.name}</h1>
                  <p className={styles.description}>{courseDetails?.small_description}</p>
                  <div className={styles.courseStats}>
                    <span className={styles.stat}>
                      <Clock className={styles.icon} />
                      {courseDetails?.total_hour}
                    </span>
                    <span className={styles.stat}>
                      <BookOpen className={styles.icon} />
                      {courseDetails?.level}
                    </span>
                    <span className={styles.stat}>
                      <Users className={styles.icon} />
                      {courseDetails?.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player */}
            {/* {activeVideo && (
              <div className={styles.card}>
                <h3 className={styles.sectionTitle}>Course Preview</h3>
                <div className={styles.videoContainer}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={courseDetails?.lecture_title?.[0]?.lectures?.[0]?.video_url}
                    title="Course Video"
                    frameBorder="0"
                    allowFullScreen
                    className={styles.videoFrame}
                  />
                </div>
              </div>
            )} */}


            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Course Preview</h3>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getVideoId(activeVideo)}?autoplay=0&mute=1`}
                  title="Course Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoFrame}
                />
              </div>
            </div>


            {/* Course Description */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>About This Course</h3>
              <p className={styles.courseDescription}>{courseDetails.large_description}</p>
            </div>

            {/* Course Curriculum */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Course Curriculum</h3>
              <div className={styles.curriculum}>
                {courseDetails?.lecture_title?.map((section, index) => (
                  <div key={section.id} className={styles.section}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={styles.sectionButton}
                    >
                      <div className={styles.sectionHeader}>
                        <span className={styles.sectionNumber}>
                          {index + 1}
                        </span>
                        <span className={styles.sectionName}>{section.name}</span>
                        <span className={styles.lectureCount}>
                          ({section.lectures.length} lectures)
                        </span>
                      </div>
                      {expandedSections[section.id] ?
                        <ChevronUp className={styles.chevron} /> :
                        <ChevronDown className={styles.chevron} />
                      }
                    </button>

                    {expandedSections[section.id] && (
                      <div className={styles.lectures}>
                        {section.lectures.map((lecture) => (
                          <div
                            key={lecture.id}
                            className={`${styles.lecture} ${lecture.order_by === 1 ? styles.lectureAvailable : styles.lectureLocked
                              }`}
                            onClick={() => handleLectureClick(lecture)}
                          >
                            <div className={styles.lectureInfo}>
                              <div className={styles.lectureIcons}>
                                {getLectureIcon(lecture.types)}
                                {lecture.order_by === 1 ? (
                                  <CheckCircle className={styles.availableIcon} />
                                ) : (
                                  <Lock className={styles.lockIcon} />
                                )}
                              </div>
                              <span className={styles.lectureName}>
                                {lecture.name}
                              </span>
                              <span className={styles.lectureType}>
                                {lecture.types}
                              </span>
                            </div>
                            <span className={styles.lectureTime}>
                              <Clock className={styles.timeIcon} />
                              {lecture.overall_time} min
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Pricing Card */}
            <div className={styles.card}>
              <div className={styles.pricingSection}>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>₹{courseDetails.sale_price}</span>
                  <span className={styles.originalPrice}>₹{courseDetails.mrp}</span>
                </div>
                <span className={styles.discount}>
                  50% OFF
                </span>
              </div>
              <button className={styles.enrollButton}>
                Enroll Now
              </button>
            </div>

            {/* Course Info */}
            <div className={styles.card}>
              <h4 className={styles.sidebarTitle}>Course Information</h4>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Level:</span>
                  <span className={styles.infoValue}>{courseDetails.level}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Duration:</span>
                  <span className={styles.infoValue}>{courseDetails.total_hour}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Language:</span>
                  <span className={styles.infoValue}>{courseDetails.language}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Intended For:</span>
                  <span className={styles.infoValue}>{courseDetails.intended_for}</span>
                </div>
              </div>
            </div>

            {/* Certification */}
            <div className={styles.card}>
              <h4 className={styles.sidebarTitle}>
                <Award className={styles.certIcon} />
                Certification
              </h4>
              <div className={styles.certInfo}>
                <p><strong>Issued:</strong> {courseDetails.certification_issued}</p>
                <p><strong>Validity:</strong> {courseDetails.certification_validity}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className={styles.card}>
              <h4 className={styles.sidebarTitle}>Requirements</h4>
              <p className={styles.requirements}>{courseDetails.requirements}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;