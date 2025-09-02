import { useContext } from 'react';
import { Context } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import './FloatingIcons.css';

export default function CompareButton() {
  const { selectedProductIds } = useContext(Context);
  const navigate = useNavigate();
  
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("dadishaToken");
  }

  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  return (
    <>
      {/* Floating Icons - Remove container wrapper */}
      <div className="floating-icons">
        {/* Phone Icon - Only on mobile */}
        {isMobile() && (
          <a
            href="tel:+918848292849"
            className="icon phone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPhone size={24} />
          </a>
        )}

        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/918848292849"
          className="icon whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>

      {/* Compare Button */}
      {token && selectedProductIds?.length > 1 && (
        <div className="compare-button-wrapper">
          <div
            className="compare-button"
            onClick={() => navigate('/compare')}
          >
            Compare Product
            <span className="compare-badge">
              {selectedProductIds?.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}