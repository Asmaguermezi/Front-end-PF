import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Welcome.css';
import elearningImage from '../assets/img/creer-site-e-learning-740x416.jpg';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Développement Web",
      description: "Apprenez HTML, CSS et JavaScript pour créer des sites web modernes",
      students: 1280,
      lessons: 16,
      level: "Débutant",
      instructor: "Marie Dubois",
    },
    {
      id: 2,
      title: "Data Science",
      description: "Maîtrisez Python et les techniques d'analyse de données",
      students: 952,
      lessons: 24,
      level: "Intermédiaire",
      instructor: "Thomas Martin",
    },
    {
      id: 3,
      title: "Marketing Digital",
      description: "Stratégies efficaces pour promouvoir votre entreprise en ligne",
      students: 820,
      lessons: 18,
      level: "Tous niveaux",
      instructor: "Sophie Bernard",
    },
    {
      id: 4,
      title: "Design UX/UI",
      description: "Créez des interfaces utilisateur attrayantes et fonctionnelles",
      students: 625,
      lessons: 20,
      level: "Intermédiaire",
      instructor: "Paul Dupont",
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Lucie Moreau",
      role: "Développeuse Web",
      content: "Cette plateforme a complètement transformé ma carrière. Les cours sont structurés de manière logique et les instructeurs sont très compétents.",
    },
    {
      id: 2,
      name: "Antoine Durand",
      role: "Étudiant",
      content: "J'ai pu acquérir des compétences pratiques que mon université ne m'enseignait pas. Le format vidéo et les exercices pratiques sont parfaits pour mon style d'apprentissage.",
    },
    {
      id: 3,
      name: "Emma Petit",
      role: "Entrepreneure",
      content: "En tant que fondatrice de startup, ces cours m'ont permis d'acquérir rapidement les connaissances techniques dont j'avais besoin sans devoir embaucher des consultants coûteux.",
    }
  ]);

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollElements = document.querySelectorAll('.scroll-animation');
    scrollElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      if (elementPosition < viewportHeight - 100) {
        element.classList.add('visible');
      }
    });
  };

  return (
    <>
      <IndexNavbar />
      <div className={`welcome-page ${isVisible ? 'visible' : ''}`}>
        {/* Hero Section */}
        <header className="hero-section">
     
          <div className="hero-content">
            <h1>Apprendre ensemble, Réussir ensemble.</h1>
            <p className="hero-description">
              Etudia est une plateforme éducative collaborative qui connecte étudiants et enseignants pour apprendre ensemble.
            </p>
            <div className="hero-buttons">
              <Link to="/auth/register" className="btn btn-primary">Commencer maintenant</Link>
              <Link to="/auth/login" className="btn btn-outline">Se connecter</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Étudiants</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Cours</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src={elearningImage} alt="Plateforme d'apprentissage en ligne" className="hero-img" />
          </div>
        </header>

        {/* Features Section */}
        <section className="features-section scroll-animation">
          <div className="section-header">
            <h2>Pourquoi choisir notre plateforme</h2>
            <p>Découvrez les avantages qui nous différencient</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Apprentissage interactif</h3>
              <p>Des cours interactifs avec des quiz et des projets pratiques</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Instructeurs experts</h3>
              <p>Apprenez avec des professionnels du secteur</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Apprentissage flexible</h3>
              <p>Étudiez à votre rythme, où que vous soyez</p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="stats-section scroll-animation">
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">15K+</span>
              <span className="stat-label">Étudiants satisfaits</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">200+</span>
              <span className="stat-label">Cours vidéo</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">50+</span>
              <span className="stat-label">Instructeurs experts</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">99%</span>
              <span className="stat-label">Taux de réussite</span>
            </div>
          </div>
        </section>

      

        {/* Call to Action Section */}
        <section className="cta-section scroll-animation">
          <div className="cta-content">
            <h2>Prêt à commencer votre parcours d'apprentissage ?</h2>
            <p>Inscrivez-vous dès aujourd'hui et accédez à des centaines de cours de qualité</p>
            <div className="cta-buttons">
              <Link to="/auth/register" className="btn btn-primary">S'inscrire dès maintenant</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Welcome;
