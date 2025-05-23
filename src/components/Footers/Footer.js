import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .luxury-footer {
          position: relative;
          background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #EEF2FF 100%);
          color: #4F46E5;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .luxury-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4F46E5, transparent);
        }

        .wave-separator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 80px;
          pointer-events: none;
          overflow: hidden;
          margin-top: -80px;
          transform: translateZ(0);
        }

        .wave-polygon {
          fill: #EEF2FF;
          opacity: 0.95;
        }

        .footer-main-content {
          padding: 20px 0 20px; /* réduit */
          position: relative;
          z-index: 2;
        }

        .footer-grid {
          display: flex;
          flex-wrap: wrap;
          text-align: center;
        }

        .footer-left-section {
          width: 100%;
          padding: 0 1rem;
          margin-bottom: 15px; /* réduit */
        }

        .footer-brand-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 10px;
          background: linear-gradient(45deg, #4F46E5, #6366F1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
        }

        .footer-brand-subtitle {
          font-size: 1rem;
          color: #6B7280;
          margin-bottom: 15px;
          line-height: 1.4;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          font-size: 16px;
          background: linear-gradient(45deg, rgba(79, 70, 229, 0.15), rgba(99, 102, 241, 0.1));
          border: 2px solid rgba(79, 70, 229, 0.3);
          border-radius: 50%;
          color: #4F46E5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(79, 70, 229, 0.1);
        }

        .social-btn:hover {
          background: linear-gradient(45deg, #4F46E5, #6366F1);
          color: white;
          transform: translateY(-3px) scale(1.05);
        }

        .footer-right-section {
          width: 100%;
          padding: 0 1rem;
        }

        .footer-links-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin-bottom: 20px; /* réduit */
        }

        .footer-links-column {
          flex: 1;
          min-width: 200px;
          max-width: 250px;
        }

        .footer-column-title {
          text-transform: uppercase;
          color: #4F46E5;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 10px;
          position: relative;
        }

        .footer-column-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: linear-gradient(45deg, #4F46E5, #6366F1);
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-list li {
          margin-bottom: 8px;
        }

        .footer-link {
          color: #6B7280;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #4F46E5;
          transform: translateY(-1px);
        }

        .footer-divider {
          margin: 20px 0 15px; /* réduit */
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.3), transparent);
        }

        .footer-bottom {
          display: flex;
          justify-content: center;
          padding-bottom: 10px;
        }

        .copyright-text {
          font-size: 0.85rem;
          color: #6B7280;
          background: rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(79, 70, 229, 0.1);
        }

        .brand-highlight {
          background: linear-gradient(45deg, #4F46E5, #6366F1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 1024px) {
          .footer-grid {
            text-align: left;
          }
          .footer-left-section {
            width: 50%;
            margin-bottom: 0;
          }
          .footer-right-section {
            width: 50%;
          }
          .social-links {
            justify-content: flex-start;
          }
          .footer-links-wrapper {
            justify-content: flex-end;
          }
          .footer-column-title::after {
            left: 0;
            transform: none;
          }
        }
      `}</style>

      <footer className="luxury-footer">
        <div className="wave-separator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 2560 100"
          >
            <polygon className="wave-polygon" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="footer-main-content">
            <div className="footer-grid">
              <div className="footer-left-section">
                <h4 className="footer-brand-title">ETUDIA</h4>
                <h5 className="footer-brand-subtitle">
                  Plateforme collaborative pour étudiants et enseignants.
                </h5>
                <div className="social-links">
                  <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-btn"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="social-btn"><i className="fab fa-instagram"></i></a>
                </div>
              </div>

              <div className="footer-right-section">
                <div className="footer-links-wrapper">
                  <div className="footer-links-column">
                    <span className="footer-column-title">Navigation</span>
                    <ul className="footer-links-list">
                      <li><Link to="/about" className="footer-link">À propos</Link></li>
                      <li><Link to="/courses" className="footer-link">Cours</Link></li>
                      <li><Link to="/contact" className="footer-link">Contact</Link></li>
                    </ul>
                  </div>

                  <div className="footer-links-column">
                    <span className="footer-column-title">Ressources</span>
                    <ul className="footer-links-list">
                      <li><Link to="/help" className="footer-link">Centre d'aide</Link></li>
                      <li><Link to="/terms" className="footer-link">Conditions d'utilisation</Link></li>
                      <li><Link to="/privacy" className="footer-link">Politique de confidentialité</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
              <div className="copyright-text">
                © {new Date().getFullYear()} <span className="brand-highlight">Etudia</span> - Tous droits réservés.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
