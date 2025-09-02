import React, { useState } from 'react';
import styles from './Hero.module.css';

export default function Hero({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>Empowering Safer Workplaces Across 22 Industries</h1>
          <p>Master new skills with our industry-leading courses. Join thousands of professionals who've accelerated their careers through our comprehensive learning platform.</p>
          
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for a course..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
            />
            <button className={styles.ctaButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
