import { useState, useEffect, useContext } from 'react';
import styles from './styles/EnhancedCourseFilters.module.css';
import { Context } from '../../../context/context';

export default function EnhancedCourseFilters({
    filters = { category: '', industry: '', level: '', language: '', search: '' },
    onFilterChange = () => { },
    courseCount = 0,
}) {
    const [localFilters, setLocalFilters] = useState(filters);
    const { courseFilter, courseCategories, fetchDadishaCoursesFilter } = useContext(Context);

    // Sync with parent filters
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleInputChange = (key, value) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearAll = () => {
        const cleared = { category: '', industry: '', level: '', language: '', search: '' };
        setLocalFilters(cleared);
    };

    // 🔁 Watch all filters except search — trigger instantly
    useEffect(() => {
        const { category, industry, level, language, search } = localFilters;

        const payload = {
            level_id: level || '',
            category_id: category || '',
            industry_id: industry || '',
            language_id: language || '',
            seach_query: search || '',
        };

        onFilterChange(localFilters);
        fetchDadishaCoursesFilter(payload);
    }, [localFilters.category, localFilters.industry, localFilters.level, localFilters.language]);

    // 🔁 Debounced search effect
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            const payload = {
                level_id: localFilters.level || '',
                category_id: localFilters.category || '',
                industry_id: localFilters.industry || '',
                language_id: localFilters.language || '',
                seach_query: localFilters.search || '',
            };

            onFilterChange(localFilters);
            fetchDadishaCoursesFilter(payload);
        }, 500); // Adjust delay as needed

        return () => clearTimeout(debounceTimeout);
    }, [localFilters.search]);

    return (
        <div className={styles.filterWrapper}>
            <div className={styles.searchFilterContainer}>
                <div className={styles.searchHeader}>
                    <h3 className={styles.searchTitle}>Find the perfect course</h3>
                    <span className={styles.resultsCount}>{courseFilter.count} courses found</span>
                </div>

                <div className={styles.searchInputContainer}>
                    <svg
                        className={styles.searchIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search courses by title, description..."
                        className={styles.searchInput}
                        value={localFilters.search}
                        onChange={(e) => handleInputChange('search', e.target.value)}
                    />
                </div>

                <div className={styles.filterRow}>
                    {/* Category Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Category</label>
                        <select
                            value={localFilters.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value=''>All Categories</option>
                            {courseCategories?.category?.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Industry Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Industry</label>
                        <select
                            value={localFilters.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value=''>All Industries</option>
                            {courseCategories?.industry?.map((ind) => (
                                <option key={ind.id} value={ind.id}>{ind.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Level Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Level</label>
                        <select
                            value={localFilters.level}
                            onChange={(e) => handleInputChange('level', e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value=''>All Levels</option>
                            {courseCategories?.level?.map((level) => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Language Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Languages</label>
                        <select
                            value={localFilters.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value=''>All Languages</option>
                            {courseCategories?.language?.map((lan) => (
                                <option key={lan.id} value={lan.id}>{lan.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button onClick={clearAll} className={styles.clearButton}>
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
