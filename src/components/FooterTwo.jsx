import React, { useContext, useEffect, useState } from 'react';
import styles from './FooterTwo.module.css';
import { FaWhatsapp, FaLinkedin, FaQuora, FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context';
import axios from '../CustomAxios/CustomAxios';

export default function FooterTwo() {
    const { setPolicyDetails, settings } = useContext(Context);
    const [policy, setPolicy] = useState([]);
    const navigate = useNavigate();
    const getPolicy = async () => {
        try {
            const result = await axios.get('/disha/settings');
            setPolicyDetails(result.data);
            setPolicy(result.data);
        } catch (error) {
            console.error('Error fetching policy:', error);
        }
    };

    useEffect(() => {
        getPolicy();
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                {/* Column 1 - Logo and description */}
                <div className={styles.col}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>Dadisha Private limited</span>
                    </div>
                    <p className={styles.description} >
                        Your Trusted QHSE Solutions-Delivering Synergetic Industrial Excellence
                    </p>


                    <br></br>
                    <div className={styles.socialIcons}>
                        <a href="https://www.facebook.com/profile.php?id=61567822319706"> <FaFacebookF /></a>
                        <a href="https://www.linkedin.com/company/dadisha-private-limited-company/"> <FaLinkedin /></a>
                        <a href="https://x.com/Dad_of_QHSE?t=qAC_pGAJ0iMSnZBI5hNLtw&s=08"> <FaTwitter /></a>
                        <a href="https://www.quora.com/profile/DADISHA-PVT-LTD-DAD-OF-QHSE-SOLUTIONS?ch=10&oid=2969548644&share=7f78e4b4&srid=5576sF&target_type=user"> <FaWhatsapp />
                        </a> <a href="https://youtube.com/@dadofqhsesolutions?si=p7nL7imUgyDDqGeN"> <FaYoutube /></a>
                        <a href="https://www.instagram.com/dad_of_qhse/"> <FaInstagram /></a>



                    </div>
                </div>

                {/* Column 2 - What We Do */}
                <div className={styles.col}>
                    <h3 className={styles.title}>What We Do</h3>
                    <ul>
                        <li onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            navigate('/about');
                        }}>→ About</li>

                        <li onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            navigate('/contactus');
                        }}>→ Contact</li>

                        <li onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            navigate('/faqs');
                        }}>→ Faq</li>

                        <li onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            navigate('/blogs/1');
                        }}>→ Blog</li>
                    </ul>
                </div>

                {/* Column 3 - Quick Links */}
                <div className={styles.col}>
                    <h3 className={styles.title}>Other Links</h3>
                    <ul>


                        <li onClick={() => navigate('/sellwithus')}>→ Become Seller</li>
                        <li onClick={() => navigate('/privacy-policy')}>→ Privacy Policy</li>
                        <li onClick={() => navigate('/shopping-policy')}>→ Shopping Policy</li>
                        <li onClick={() => navigate('/supplier-policy')}>→ Supplier Policy</li>
                        <li onClick={() => navigate('/terms-and-conditions')}>→ Terms & Conditions</li>


                    </ul>
                </div>

                {/* Column 4 - Address */}
                <div className={styles.col}>
                    <h3 className={styles.title}>Company Address</h3>
                    <ul className={styles.contact}>
                        <li><FaPhone /> {settings?.mobile_number}</li>
                        <li><FaEnvelope /> {settings?.email}</li>
                        <li><FaMapMarkerAlt /> India, UAE</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p className="fs-6 mb-0 ">©2025 Dadisha Private Limited. All Rights Reserved</p>
                <div className={styles.links}>

                    <p className="fs-6 mb-0"> Designed And Developed By <span style={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => window.open('http://www.codhatch.com')} >COD HATCH</span></p>
                </div>
            </div>
        </footer>
    );
};


