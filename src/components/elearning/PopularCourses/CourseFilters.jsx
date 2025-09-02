import styles from './styles/CourseFilters.module.css';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'qhse', label: 'QHSE' },
  { value: 'management', label: 'Management' },
  { value: 'technical', label: 'Technical' },
  { value: 'compliance', label: 'Compliance' }
];

const industries = [
  { value: '', label: 'All Industries' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'oil-gas', label: 'Oil & Gas' },
  { value: 'construction', label: 'Construction' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'automotive', label: 'Automotive' }
];

const levels = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' }
];

export default function CourseFilters({ filters, onFilterChange, onClearFilters }) {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersWrapper}>
        <select 
          value={filters.category} 
          onChange={(e) => onFilterChange('category', e.target.value)}
          className={styles.filterSelect}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <select 
          value={filters.industry} 
          onChange={(e) => onFilterChange('industry', e.target.value)}
          className={styles.filterSelect}
        >
          {industries.map(ind => (
            <option key={ind.value} value={ind.value}>{ind.label}</option>
          ))}
        </select>

        <select 
          value={filters.level} 
          onChange={(e) => onFilterChange('level', e.target.value)}
          className={styles.filterSelect}
        >
          {levels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>

        <button onClick={onClearFilters} className={styles.clearFiltersBtn}>
          Clear All
        </button>
      </div>
    </div>
  );
}