import { useEffect } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    useEffect(() => {
        const navbar = document.getElementById('navbar');

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add(styles.scrolled);
            } else {
                navbar.classList.remove(styles.scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav id="navbar" className={styles.nav}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>Dadisha E-Learning</div>
                <ul className={styles.navLinks}>
                    <li><a onClick={() => navigate("/home")}>Home</a></li>
                    <li><a onClick={() => navigate("/")}>MarketPlace</a></li>

                </ul>
            </div>
        </nav>
    );
}