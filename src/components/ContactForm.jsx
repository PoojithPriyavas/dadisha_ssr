import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { FaArrowRight } from 'react-icons/fa';
import axios from '../utilities/customAxios.js';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [submitData, setSubmitData] = useState({
        name: '',
        email: '',
        mobile_number: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubmitData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: submitData.name,
            email: submitData.email,
            mobile_number: submitData.mobile_number,
            message: `subject :${submitData.subject} ,message: ${submitData.message}`,
        };
        try {
            setIsSubmitting(true);
            const response = await axios.post('/disha/contact-form', payload);
            toast.success('Message sent successfully!');
            setSubmitData({
                name: '',
                email: '',
                mobile_number: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.contactSection}>
            <div className={styles.formWrapper}>
                <div className={styles.formBox}>
                    <p className={styles.subheading}><a href="#">What’s Going On</a></p>
                    <h2 className={styles.heading}>You can connect with us<br />when need help!</h2>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={submitData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={submitData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.row}>
                            <input
                                type="text"
                                name="mobile_number"
                                placeholder="Contact Number"
                                value={submitData.mobile_number}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={submitData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Write Your Message..."
                            value={submitData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button className={styles.buttonTwo} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'} <FaArrowRight />
                        </button>
                        {responseMessage && (
                            <p className={styles.responseMsg}>{responseMessage}</p>
                        )}
                    </form>
                </div>

                <div className={styles.mapBox}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.51503472669!2d76.09167077463808!3d10.567693889568623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ed0b590015b7%3A0x54e05c0c066c09f9!2sDadisha%20Private%20limited!5e1!3m2!1sen!2sin!4v1752920974674!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
