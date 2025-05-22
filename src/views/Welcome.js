// ✅ Welcome.js fusionné avec contenu dynamique (services, cours, témoignages)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Welcome.css';
import elearningImage from '../assets/img/creer-site-e-learning-740x416.jpg';

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
    
    // Ajoutez ici les éventuelles API calls pour récupérer des données dynamiques
    
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
    <div className={`welcome-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1> Apprendre ensemble, Réussir ensemble. </h1>
          <p>Etudia est une plateforme éducative collaborative qui connecte étudiants et enseignants pour apprendre ensemble.</p>
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
          <img src={elearningImage} alt="Plateforme d'apprentissage en ligne" className="w-full h-auto" />
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

      {/* Popular Courses Section */}
      <section className="courses-section scroll-animation">
        <div className="section-header">
          <h2>Cours populaires</h2>
          <p>Rejoignez des milliers d'apprenants qui ont déjà progressé</p>
        </div>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-level">{course.level}</div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <div className="meta-item">
                    <i className="fas fa-user"></i>
                    <span>{course.students} étudiants</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-book"></i>
                    <span>{course.lessons} leçons</span>
                  </div>
                </div>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <img src="/api/placeholder/40/40" alt={course.instructor} />
                  </div>
                  <span>{course.instructor}</span>
                </div>
                <Link to={`/course/${course.id}`} className="btn btn-outline btn-full">
                  Voir le cours
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="center-button">
          <Link to="/courses" className="btn btn-primary">Voir tous les cours</Link>
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

      {/* Testimonials Section */}
      <section className="testimonials-section scroll-animation">
        <div className="section-header">
          <h2>Ce que disent nos étudiants</h2>
          <p>Découvrez les témoignages de nos apprenants</p>
        </div>
        <div className="testimonials-container">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section scroll-animation">
        <div className="cta-content">
          <h2>Prêt à commencer votre parcours d'apprentissage ?</h2>
          <p>Inscrivez-vous dès aujourd'hui et accédez à des centaines de cours de qualité</p>
          <div className="cta-buttons">
            <Link to="/auth/register" className="btn btn-primary">S'inscrire gratuitement</Link>
            <Link to="/courses" className="btn btn-outline">Explorer les cours</Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section scroll-animation">
        <div className="newsletter-content">
          <h3>Restez informé des nouveaux cours</h3>
          <p>Abonnez-vous à notre newsletter pour recevoir des conseils d'apprentissage et des offres exclusives</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit" className="btn btn-primary">S'abonner</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Welcome;