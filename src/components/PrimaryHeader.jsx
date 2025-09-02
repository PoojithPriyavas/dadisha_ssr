import { useContext, useState, useEffect } from "react";
import "./PrimaryHeader.css";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PrimaryHeader() {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <span className="announcement">
          Our Awards: 2024 Red Herring Top 100 Asia Winners Official Announcement
        </span>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i> Facebook</a>
          <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="#"><i className="fab fa-linkedin-in"></i> Linkedin</a>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-bar">
        <div className="logo">
          <img src="https://via.placeholder.com/50" alt="logo" />

        </div>
        <div className="contact-info">
          <div className="message">
            <div className="icon"><i className="fa-solid fa-envelope"></i></div>
            <div className="contact-content">
              <p>SEND US A MESSAGE</p>
              <strong>solution@bigzen.com</strong>
            </div>
          </div>
          <div className="address">
            <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
            <div className="contact-content">
              <p>ADDRESS HERE</p>
              <strong>452 Marie Avenue, 166HK</strong>
            </div>
          </div>
        </div>
        <button className="appointment-btn">
          Make An Appointment ↗
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul className="nav-links">
          <li>HOME</li>
          <li>ABOUT </li>
          <li>MARKET PLACE </li>
          <li>BLOGS </li>
          <li>COURSES </li>
          <li>CONTACT </li>
        </ul>
        <div className="nav-actions">
          <span>EN</span>
          <span> <FiSearch className="text-white fs-6" /></span>
          <span><FiMenu className="text-white fs-6" /></span>
        </div>
      </nav>
    </header>
  );
}
