

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import ProductFooter from '../products/ProductFooter';
import axios from '../../utilities/customAxios.js';
import './blogs.css';
import { useBlogListSSRData } from "../../hooks/useSSRData";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const MAX_VISIBLE_PAGES = 5;
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
        startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return (
        <div className="pagination-controls">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-arrow"
            >
                &lt;
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={currentPage === 1 ? 'active' : ''}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="pagination-ellipsis">...</span>}
                </>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={currentPage === totalPages ? 'active' : ''}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-arrow"
            >
                &gt;
            </button>
        </div>
    );
};

export default function BlogDetails() {
    const { page } = useParams();
    const navigate = useNavigate();

    const [blogCategories, setBlogCategories] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeTag, setActiveTag] = useState(null);

    const productsPerPage = 10;
    const currentPage = Math.max(parseInt(page) || 1, 1);

    // Get SSR data if available
    const ssrBlogListData = useBlogListSSRData();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // If we have SSR data, use it instead of making a new request
                if (ssrBlogListData && ssrBlogListData.blogs) {
                    setBlogCategories(ssrBlogListData.categories || []);
                    setAllBlogs(ssrBlogListData.blogs || []);
                    setTags(ssrBlogListData.tags || []);
                    setRecentPosts(ssrBlogListData.recentPosts || []);
                    setLoading(false);
                    return;
                }
                
                // Otherwise, fetch data client-side
                const [categories, blogs, tagsData, posts] = await Promise.all([
                    axios.get('/disha/blog-categories'),
                    axios.get('/disha/get-blogs'),
                    axios.get('/disha/blog-tags'),
                    axios.get('/disha/recent-posts')
                ]);

                setBlogCategories(categories.data);
                setAllBlogs(blogs.data?.results || []);
                setTags(tagsData.data);
                setRecentPosts(posts.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ssrBlogListData]);

    const filteredBlogs = useMemo(() => {
        return allBlogs.filter(blog => {
            const matchesSearch = searchTerm === "" ||
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.meta_desc && blog.meta_desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (blog.tags && blog.tags.some(tag =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())));

            const matchesCategory = !activeCategory || blog.category_name === activeCategory;
            const matchesTag = !activeTag || (blog.tags && blog.tags.includes(activeTag));

            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [allBlogs, searchTerm, activeCategory, activeTag]);

    const totalPages = Math.ceil(filteredBlogs.length / productsPerPage);
    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return filteredBlogs.slice(startIndex, startIndex + productsPerPage);
    }, [filteredBlogs, currentPage, productsPerPage]);

    useEffect(() => {
        if (filteredBlogs.length > 0 && (currentPage < 1 || currentPage > totalPages)) {
            navigate('/blogs/1', { replace: true });
        }
    }, [currentPage, totalPages, navigate, filteredBlogs]);

    useEffect(() => {
        if (currentPage !== 1 && (searchTerm || activeCategory || activeTag)) {
            navigate('/blogs/1');
        }
    }, [searchTerm, activeCategory, activeTag]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            navigate(`/blogs/${newPage}`);
            window.scrollTo(0, 0);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveTag(null);
        setSearchTerm("");
    };

    const handleTagClick = (tag) => {
        setActiveTag(tag);
        setActiveCategory(null);
        setSearchTerm("");
    };

    const clearFilters = () => {
        setActiveCategory(null);
        setActiveTag(null);
        setSearchTerm("");
    };

    if (loading) {
        return <div className="loading">Loading blogs...</div>;
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="intro">
                    <h1>Recent Blogs</h1>
                    <p>
                        Stay informed with the latest insights, tips, and updates from the world of QHSE.
                    </p>
                </div>

                <div className="container-wrapper">
                    <div className="blogs-container">
                        {paginatedBlogs.length > 0 ? (
                            paginatedBlogs.map((blog) => (
                                <div
                                    key={blog.slug}
                                    className="blog-card"
                                    onClick={() => navigate(`/blogs/pages/${blog.slug}`)}
                                >
                                    <div className="blog-badge-container">
                                        {blog.category_name && (
                                            <span className="blog-category-badge">
                                                {blog.category_name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="blog-image-container">
                                        <img
                                            src={blog.image}
                                            alt={blog.alt || "Blog"}
                                            className="blog-image"
                                        />
                                    </div>
                                    <div className="blog-content">
                                        <h2 className="blog-title line-clamp-2">{blog.title}</h2>
                                        <p className="blog-description line-clamp-3">
                                            {blog.meta_desc}
                                        </p>
                                        <div className="blog-footer">
                                            <p className="blog-date">
                                                <i className="far fa-clock"></i> {blog.date}
                                            </p>
                                            <span className="blog-read-more">
                                                Read More <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No blogs found matching your criteria</p>
                                {(searchTerm || activeCategory || activeTag) && (
                                    <button
                                        onClick={clearFilters}
                                        className="clear-filters-btn"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="sidebar">
                        <div className="sidebar-section">
                            <h3>Search</h3>
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Enter Keyword..."
                                    className="search-input"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <div className="sidebar-header">
                                <h3>Categories</h3>
                                {activeCategory && (
                                    <button
                                        className="clear-btn"
                                        onClick={() => setActiveCategory(null)}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            <ul className="category-list">
                                {blogCategories.map((cat) => (
                                    <li
                                        key={cat.id}
                                        className={activeCategory === cat.name ? 'active' : ''}
                                        onClick={() => handleCategoryClick(cat.name)}
                                    >
                                        ⚡ {cat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sidebar-section">
                            <h3>Recent Posts</h3>
                            <ul className="recent-posts-list">
                                {recentPosts.map((post) => (
                                    <li
                                        key={post.slug}
                                        onClick={() => navigate(`/blogs/pages/${post.slug}`)}
                                    >
                                        {post.title}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* <div className="sidebar-section">
                            <div className="sidebar-header">
                                <h3>Tags</h3>
                                {activeTag && (
                                    <button
                                        className="clear-btn"
                                        onClick={() => setActiveTag(null)}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            <div className="tags-container">
                                {tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className={`tag ${activeTag === tag.tag ? 'active' : ''}`}
                                        onClick={() => handleTagClick(tag.tag)}
                                    >
                                        {tag.tag}
                                    </span>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            <ProductFooter />
        </>
    );
}