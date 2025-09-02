import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import './RiskMtDetail.css';
import DOMPurify from "dompurify";
import FooterTwo from '../../components/FooterTwo';
import { Button } from '../../components/riskManagement/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/riskManagement/card';
import { Context } from '../../context/context';
import { Input } from '../../components/riskManagement/input';
import { Textarea } from '../../components/riskManagement/textarea';
import { Label } from '../../components/riskManagement/label';
import {
    ArrowRight,
    Star,
    Loader2
} from 'lucide-react';

export default function RiskMtDetail() {
    const [mtDetails, setMtDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [featured, setFeatured] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { settings } = useContext(Context);
    const { slug } = useParams();
    const navigate = useNavigate();
    // Fetch single service details
    async function fetchMtDetails(slug) {
        console.log('api is calling for details');
        try {
            const response = await axios.get(
                `https://admin.dadisha.com/disha/risk-management?slug=${slug}`
            );
            setMtDetails(response.data);
        } catch (error) {
            console.error('Error fetching MT details:', error);
        }
    }

    // Fetch featured services
    async function fetchFeaturedMt(searchValue = '') {
        console.log('api is calling for featured');
        try {
            const params = { featured: 'Active' };
            if (searchValue.trim()) {
                params.search_text = searchValue.trim();
            }

            const response = await axios.get(
                'https://admin.dadisha.com/disha/risk-management/',
                { params }
            );
            setFeatured(response.data);
        } catch (error) {
            console.error('Error fetching featured MT:', error);
        }
    }

    // Input change handler
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    // Clear search handler
    const handleClear = () => {
        setSearchValue('');
    };

    // Search icon click handler (optional - can trigger search manually)
    const handleSearchClick = () => {
        fetchFeaturedMt(searchValue);
    };

    // Auto fetch featured list when search value changes (live search)
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchFeaturedMt(searchValue);
        }, 300); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchValue]);

    // Fetch data when component loads or slug changes
    useEffect(() => {
        if (slug) {
            fetchMtDetails(slug);
        }
        fetchFeaturedMt();
    }, [slug]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile_number: '', // Changed from 'phone' to 'mobile_number'
        company: '',
        subject: '', // Added subject field
        message: ''
    });

    // Enhanced handleSubmit function with proper error handling and API integration
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create payload matching the API structure
        const payload = {
            name: formData.name,
            email: formData.email,
            mobile_number: formData.mobile_number,
            message: `Company: ${formData.company}, Subject: ${formData.subject}, Message: ${formData.message}`,
        };

        try {
            setIsSubmitting(true);
            const response = await axios.post('https://admin.dadisha.com/disha/contact-form', payload);

            // Success notification
            toast.success('Message sent successfully! We will get back to you within 24 hours.');

            // Reset form data
            setFormData({
                name: '',
                email: '',
                mobile_number: '',
                company: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Contact form submission error:', error);

            // Error notification with more specific messages
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 'Failed to send message. Please try again.';
                toast.error(errorMessage);
            } else if (error.request) {
                // Network error
                toast.error('Network error. Please check your connection and try again.');
            } else {
                // Other error
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <>
            <Header />
            <div className="service-detail-container">
                {/* Left Section */}
                <div className="left-section">
                    {mtDetails ? (
                        <>
                            <h1 className="service-title">{mtDetails.title}</h1>

                            <div className="service-image-container">
                                <img
                                    src={`https://admin.dadisha.com${mtDetails.featured_image}`}
                                    alt={mtDetails.title}
                                    className="service-image2"
                                />
                            </div>

                            <div
                                className="service-detail-description"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(mtDetails?.short_description || "")
                                }}
                            />
                            <div
                                className="service-detail-description"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(mtDetails?.long_description || "")
                                }}
                            />
                        </>
                    ) : (
                        <div className="loading">Loading service details...</div>
                    )}
                </div>

                {/* Right Section */}
                <div className="right-section">
                    {/* Search Bar */}
                    <div className="search-section">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    value={searchValue}
                                    onChange={handleSearchInputChange}
                                    className="search-input"
                                />
                                <button
                                    onClick={handleSearchClick}
                                    className="search-icon-button"
                                    aria-label="Search"
                                >
                                    <svg
                                        className="search-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* <button onClick={handleClear} className="clear-button">
                                Clear
                            </button> */}
                        </div>
                    </div>

                    {/* Featured Services */}
                    {/* <div className="featured-section">
                        <h3 className="featured-title">Featured Services</h3>
                        <div className="service-cards-container">
                            {featured.length > 0 ? (
                                featured.map((service, index) => (
                                    <div key={index} className="service-card2">
                                        <div className="service-card-image">
                                            <img
                                                src={`https://admin.dadisha.com${service.featured_image}`}
                                                alt={service.title}
                                            // className="service-image"
                                            />
                                        </div>
                                        <div className="service-card-content">
                                            <h4 className="service-card-title">{service.title}</h4>
                                            <p className="service-card-description">
                                                {service.description?.length > 100
                                                    ? `${service.description.substring(0, 100)}...`
                                                    : service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-featured">
                                    No featured services available
                                </div>
                            )}
                        </div>
                    </div> */}
                    <div className="risk-sidebar-section">
                        <h3>Featured Services</h3>
                        <ul className="recent-posts-list">
                            {featured.map((post, index) => (
                                <>
                                    <h6>{post.title}</h6>
                                    <li
                                        key={post.index}
                                        onClick={() => navigate(`/risk-management/${post.slug}`)}
                                    >

                                        {post.short_description.substring(0, 100)}...

                                    </li>
                                </>

                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <section id="contact-section" className="contact-section" style={{ padding: '20px' }}>
                {/* <div className="container"> */}
                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="contact-header">
                            <h2 className="contact-title">Get In Touch</h2>
                            <p className="contact-description">
                                Ready to enhance your QHSE performance? Contact our expert team today to discuss
                                your requirements and discover how we can help your organization achieve excellence.
                            </p>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div className="contact-details" style={{ justifyContent: 'start' }}>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fa fa-phone icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="contact-text">
                                        <p className="contact-label">Contact Number</p>
                                        <p className="contact-value">{settings.mobile_number}</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fa fa-envelope icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="contact-text">
                                        <p className="contact-label">Email</p>
                                        <p className="contact-value">{settings.email}</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fa-solid fa-location-dot icon"></i>
                                    </div>
                                    <div className="contact-text">
                                        <p className="contact-label">Location</p>
                                        <p className="contact-value">
                                            {/* {settings.business_address},{settings.business_pincode} */}
                                            India ,UAE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Trust Indicators */}
                        <div className="trust-indicator">
                            <div className="stars">
                                <Star className="star-filled" />
                                <Star className="star-filled" />
                                <Star className="star-filled" />
                                <Star className="star-filled" />
                                <Star className="star-filled" />
                            </div>
                            <p className="testimonial">
                                "Outstanding QHSE consulting services. Professional, thorough, and results-driven approach."
                            </p>
                            <p className="testimonial-author">- Client Review</p>
                        </div>
                    </div>

                    {/* Enhanced Contact Form */}
                    <Card className="contact-form-card">
                        <CardHeader>
                            <CardTitle className="form-title">Request Consultation</CardTitle>
                            <CardDescription className="form-description">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-field">
                                        <Label htmlFor="name" className="form-label">Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <Label htmlFor="email" className="form-label">Email *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your.email@company.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <Label htmlFor="mobile_number" className="form-label">Contact Number</Label>
                                        <Input
                                            id="mobile_number"
                                            name="mobile_number"
                                            placeholder="(555) 123-4567"
                                            value={formData.mobile_number}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <Label htmlFor="company" className="form-label">Company</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            placeholder="Your company name"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <Label htmlFor="subject" className="form-label">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="What can we help you with?"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-field">
                                    <Label htmlFor="message" className="form-label">Message *</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us about your QHSE requirements..."
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className="form-textarea"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="form-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="btn-icon animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <ArrowRight className="btn-icon" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {/* </div> */}
            </section>

            <FooterTwo />
        </>
    );
}