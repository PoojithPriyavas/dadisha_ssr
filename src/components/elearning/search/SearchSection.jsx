import { useState } from 'react';
import styles from './SearchSection.module.css';

export default function SearchSection({ onSearch, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for courses, skills, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="categoryFilter">Category</label>
            <select
              id="categoryFilter"
              className={styles.filterSelect}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="qhse">Quality, Health, Safety & Environment</option>
              <option value="management">Management & Leadership</option>
              <option value="technical">Technical Skills</option>
              <option value="compliance">Compliance & Regulatory</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="industryFilter">Industry</label>
            <select
              id="industryFilter"
              className={styles.filterSelect}
              onChange={(e) => onFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="construction">Construction</option>
              <option value="healthcare">Healthcare</option>
              <option value="oil-gas">Oil & Gas</option>
              <option value="automotive">Automotive</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="levelFilter">Level</label>
            <select
              id="levelFilter"
              className={styles.filterSelect}
              onChange={(e) => onFilterChange('level', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}