'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/riskManagement/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/riskManagement/card';
import { Input } from '../../components/riskManagement/input';
import { Textarea } from '../../components/riskManagement/textarea';
import { Label } from '../../components/riskManagement/label';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Star,
    Loader2
} from 'lucide-react';
import { Shield } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Users } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Award } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';

import './RiskMt.css';
import SecondaryHeader from '../../components/SecondaryHeader';
import FooterTwo from '../../components/FooterTwo';
import Header from '../../components/Header';
import axios from 'axios';
import { useAccordionButton } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Make sure to install: npm install react-toastify
import { Context } from '../../context/context';

export default function Home() {
    const [riskMt, setRiskMt] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { settings } = useContext(Context);
    console.log(settings, "setings")

    // Scroll to section functions
    const scrollToContactForm = () => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    async function fetchRiskMt() {
        try {
            const response = await axios.get('https://admin.dadisha.com/disha/risk-management')
            setRiskMt(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRiskMt()
    }, [])

    // Updated form data structure to match the API payload
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

    const processSteps = [
        {
            step: "01",
            title: "Assessment & Analysis",
            description: "We conduct a thorough evaluation of your current QHSE practices, identifying gaps and opportunities for improvement.",
            icon: FileText
        },
        {
            step: "02",
            title: "Strategy Development",
            description: "Our experts develop customized solutions and implementation strategies tailored to your specific industry and requirements.",
            icon: TrendingUp
        },
        {
            step: "03",
            title: "Implementation & Support",
            description: "We guide you through the implementation process and provide ongoing support to ensure sustainable improvements.",
            icon: CheckCircle
        }
    ];

    return (
        <>
            <Header />
            <div className="qhse-container">
                {/* Hero Banner Section */}
                <section className="hero-section">
                    <div className="hero-background"></div>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Excellence in
                                <span className="hero-title-gradient">
                                    QHSE Services
                                </span>
                            </h1>
                            <p className="hero-description">
                                Comprehensive Quality, Health, Safety & Environmental solutions to protect your people,
                                assets, and reputation while ensuring regulatory compliance.
                            </p>
                            <div className="hero-buttons">
                                <Button className="btn-primarly btn-large" onClick={scrollToContactForm}>
                                    Get Started Today
                                    <ArrowRight className="btn-icon" />
                                </Button>
                                <Button className="btn-outline btn-large" onClick={scrollToServices}>
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services-section" className="services-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Our QHSE Services</h2>
                            <p className="section-description">
                                We provide comprehensive solutions across Quality, Health, Safety & Environmental management
                                to help your organization achieve excellence and compliance.
                            </p>
                        </div>

                        <div className="services-grid">
                            {riskMt.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <Card key={index} className="service-card" onClick={() => navigate(`/risk-management/${service.slug}`)} style={{ cursor: "pointer" }}>
                                        <div className="service-image-container">
                                            <img
                                                src={`https://admin.dadisha.com${service.featured_image}`}
                                                alt={service.title}
                                                className="service-image"
                                            />
                                            <div className="service-image-overlay"></div>
                                            <div className="service-icon">
                                                <img src={`https://admin.dadisha.com${service.icon}`} style={{ color: 'white', height: '1.5rem', width: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} aria-hidden="true" />
                                            </div>
                                        </div>
                                        <CardHeader className="service-header">
                                            <CardTitle className="service-title line-clamp-2" >
                                                {service.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="service-description  line-clamp-4">
                                                {service.short_description}
                                            </CardDescription>
                                            <Button className="service-learn-more" onClick={() => navigate(`/risk-management/${service.slug}`)}>
                                                Learn More <ArrowRight className="btn-icon-small" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="process-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Our Process</h2>
                            <p className="section-description">
                                We follow a proven three-step methodology to deliver exceptional QHSE solutions
                                tailored to your organization's unique needs.
                            </p>
                        </div>

                        <div className="process-steps">
                            {processSteps.map((step, index) => {
                                const IconComponent = step.icon;
                                return (
                                    <div key={index} className="process-step">
                                        <Card className="process-card">
                                            <CardHeader className="process-header">
                                                <div className="process-icon-container">
                                                    <IconComponent className="process-icon" />
                                                </div>
                                                <div className="process-step-number">{step.step}</div>
                                                <CardTitle className="process-title">{step.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="process-content">
                                                <p className="process-description">{step.description}</p>
                                            </CardContent>
                                        </Card>

                                        {/* Connection line */}
                                        {index < processSteps.length - 1 && (
                                            <div className="process-connector">
                                                <ArrowRight className="process-arrow" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section id="contact-section" className="contact-section">
                    <div className="container">
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
                    </div>
                </section>
                {/* <footer className="footer">
                    <div className="container">
                        <div className="footer-content">
                            <h3 className="footer-title">QHSE Excellence</h3>
                            <p className="footer-description">
                                Your trusted partner in Quality, Health, Safety & Environmental management.
                            </p>
                            <div className="footer-links">
                                <a href="#" className="footer-link">Privacy Policy</a>
                                <a href="#" className="footer-link">Terms of Service</a>
                                <a href="#" className="footer-link">Contact</a>
                            </div>
                            <p className="footer-copyright">
                                © 2025 QHSE Services. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer> */}
            </div>
            <FooterTwo />
        </>
    );
}