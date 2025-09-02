import React, { useEffect, useState } from 'react';
import styles from './HomeThirteen.module.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from '../../utilities/customAxios';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function HomeThirteen() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('/disha/get-blogs');
      setBlogs(data.data);
    };
    fetchData();
  }, []);

  console.log(blogs, "hhsdasd")

  return (
    <motion.section
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h2 className={styles.heading} variants={itemVariants}>
        <motion.span
          className={styles.line}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        Our Blog Posts
        <motion.span
          className={styles.line}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </motion.h2>

      <motion.h2
        className="heading"
        style={{ textAlign: 'center' }}
        variants={itemVariants}
      >
        Read our blog for the<br />updates on QHSE
      </motion.h2>

      <br />

      {blogs.results?.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <motion.div variants={containerVariants}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
              1440: { slidesPerView: 5, spaceBetween: 35 },
              1920: { slidesPerView: 6, spaceBetween: 40 },
            }}
            navigation
            pagination={{ clickable: true }}
            className={styles.grid}
          >
            {blogs.results?.map((blog) => (
              <SwiperSlide key={blog.id}>
                <motion.div
                  className={styles.card}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}

                >
                  <motion.div
                    className={styles.cardContent}
                    variants={cardVariants}
                    onClick={()=>navigate(`/blogs/pages/${blog.slug}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.meta}>
                      <span className={styles.date}>🕒 {blog.date}</span>
                      <span className={styles.category}>📄 {blog.category_name}</span>
                    </div>

                    <h3 className={styles.title} style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: '1.4'
                    }}>
                      {blog.title}
                    </h3>

                    <motion.div
                      className={styles.imageContainer}
                      variants={imageVariants}
                    >
                      <img
                        src={blog.image}
                        alt={blog.alt || blog.title}
                        className={styles.image}
                      />
                    </motion.div>

                    <p className={styles.desc}>
                      {blog.meta_desc?.slice(0, 120)}...
                    </p>

                    <motion.a
                      href={`/blogs/pages/${blog.slug}`}
                      className={styles.link}
                      whileHover={{ x: 5 }}
                      style={{ textAlign: 'left' }}
                    >
                      Read More
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </motion.section>
  );
}