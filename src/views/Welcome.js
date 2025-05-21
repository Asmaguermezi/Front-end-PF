import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Welcome() {
  // État pour le texte animé
  const [displayText, setDisplayText] = useState("");
  const phrases = [
    "Ta plateforme e-learning : révise avec d'autres étudiants, trouve un enseignant, et booste ta réussite !",
    "Réussis tes examens avec notre communauté d'apprentissage collaborative et interactive !",
    "Développe tes compétences à ton rythme avec des enseignants experts dans leur domaine !",
    "Rejoins des groupes d'études et partage tes connaissances avec d'autres passionnés !"
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // État pour les interactions
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isHoveredButton, setIsHoveredButton] = useState(null);
  
  // État pour les statistiques
  const [stats, setStats] = useState([
    { value: 0, target: 5000, label: "Étudiants inscrits", icon: "👨‍🎓" },
    { value: 0, target: 850, label: "Enseignants disponibles", icon: "👩‍🏫" },
    { value: 0, target: 1240, label: "Groupes d'études", icon: "👥" },
    { value: 0, target: 35, label: "Universités", icon: "🏛️" }
  ]);
  
  // État pour les témoignages
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Marie Dupont",
      role: "Étudiante en médecine",
      text: "Etudia m'a permis de trouver un groupe d'étude parfait pour réviser l'anatomie. Nous progressons ensemble chaque semaine !",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Thomas Martin",
      role: "Enseignant en mathématiques",
      text: "La plateforme est intuitive et me permet de suivre facilement la progression de mes étudiants. Je recommande !",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Léa Moreau",
      role: "Étudiante en droit",
      text: "J'ai trouvé un excellent tuteur qui m'a aidée à comprendre le droit constitutionnel. Mes notes ont augmenté de 30% !",
      avatar: "/api/placeholder/100/100"
    }
  ]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false);

  // Services avec animations au survol
  const services = [
    {
      id: 1,
      title: "Formation Certifiée",
      description: "Des diplômes reconnus par les professionnels du secteur. Nos formations sont validées par les meilleurs experts académiques.",
      icon: (
        <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .358.186.687.465.874l8.879 4.126a1 1 0 001.352-.448l1.58-3.593a1 1 0 00-.392-1.203l-7.049-4.102a.996.996 0 01-.156-.156l-1.513-1.741a1 1 0 01-.168-.555zM5.55 7.289c.024.068.05.145.085.23l1.035 2.359a1 1 0 00.357.422l7.274 4.77a1 1 0 001.375-.34l1.592-3.48a1 1 0 00-.255-1.203l-7.356-4.361a1 1 0 00-1.017-.07l-2.095.9z"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "Apprentissage Flexible",
      description: "Apprenez à votre rythme, où que vous soyez. Nos cours sont disponibles 24/7 et adaptés à votre emploi du temps.",
      icon: (
        <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Support Personnalisé",
      description: "Une équipe dédiée pour vous accompagner dans votre parcours d'apprentissage et répondre à toutes vos questions.",
      icon: (
        <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
        </svg>
      )
    }
  ];

  // Animation du texte d'introduction
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    let timer;
    if (!isDeleting && count < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, count + 1));
        setCount(count + 1);
      }, 40);
    } else if (isDeleting && count > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, count - 1));
        setCount(count - 1);
      }, 20);
    } else if (count === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    } else if (count === currentPhrase.length && !isDeleting) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [count, isDeleting, currentPhraseIndex, phrases]);

  // Animation pour les statistiques
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setStats(prev => 
        prev.map(stat => ({
          ...stat,
          value: stat.value < stat.target ? Math.min(stat.value + Math.ceil(stat.target/50), stat.target) : stat.target
        }))
      );
    }, 30);
    
    // Nettoyage après animation complète
    const timeoutId = setTimeout(() => {
      clearInterval(statsInterval);
    }, 2000);
    
    return () => {
      clearInterval(statsInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  // Rotation automatique des témoignages
  useEffect(() => {
    if (isTestimonialAnimating) return;
    
    const intervalId = setInterval(() => {
      setIsTestimonialAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTestimonialAnimating(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [testimonials.length, isTestimonialAnimating]);

  // Gérer le défilement de la page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour changer manuellement de témoignage
  const changeTestimonial = (index) => {
    if (isTestimonialAnimating) return;
    setIsTestimonialAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTestimonialAnimating(false);
    }, 500);
  };

  return (
    <>
      <IndexNavbar fixed />

      {/* Hero Section avec animation de texte */}
      <section
        className="relative min-h-screen flex items-center justify-start overflow-hidden px-8"
        style={{
          background: "linear-gradient(to right, #43cea2, #185a9d)",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-left text-white py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Bienvenue sur <span className="text-yellow-300">Etudia</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-8 h-24">
            {displayText}
            <span className="animate-blink">|</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth/register"
              className={`bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition duration-200 transform ${isHoveredButton === 'start' ? 'scale-105' : ''}`}
              onMouseEnter={() => setIsHoveredButton('start')}
              onMouseLeave={() => setIsHoveredButton(null)}
            >
              Commencer maintenant
            </Link>
            <Link
              to="/auth/login"
              className={`bg-white text-black hover:text-white hover:bg-indigo-600 font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition duration-200 transform ${isHoveredButton === 'connect' ? 'scale-105' : ''}`}
              onMouseEnter={() => setIsHoveredButton('connect')}
              onMouseLeave={() => setIsHoveredButton(null)}
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Section Statistiques avec animation et icônes */}
      <section className="py-16 bg-indigo-50 stats-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center px-4 py-10 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center px-6 py-4 transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <h3 className="text-5xl font-bold text-gray-800 mb-3">
                  {stat.value.toLocaleString()}+
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services avec animations au survol */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Découvrez ce qui fait de nous votre meilleur choix pour l'apprentissage en ligne
          </p>

          {/* Conteneur pour l'empilement vertical des cartes */}
          <div className="flex flex-col items-center w-full space-y-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-lg shadow-md w-full max-w-4xl transform transition-all duration-300 ${activeService === service.id ? 'scale-105 shadow-xl' : ''}`}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="p-12 flex flex-col md:flex-row items-center">
                  <div className={`mb-8 md:mb-0 md:mr-8 transition-all duration-300 ${activeService === service.id ? 'text-indigo-600 transform rotate-6' : 'text-orange-500'}`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-5 text-gray-800 transition-colors duration-300 ${activeService === service.id ? 'text-indigo-600' : ''}`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages avec carousel */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Ils nous font confiance</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Découvrez les retours de nos utilisateurs satisfaits
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div 
                className={`bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500 ${isTestimonialAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonials[currentTestimonial].text}"</p>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-indigo-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action dynamique */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre aventure d'apprentissage ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers d'étudiants qui améliorent leurs résultats académiques avec Etudia
          </p>
          <Link 
            to="/auth/register"
            className={`bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition duration-300 transform ${isHoveredButton === 'cta' ? 'scale-105' : ''}`}
            onMouseEnter={() => setIsHoveredButton('cta')}
            onMouseLeave={() => setIsHoveredButton(null)}
          >
            S'inscrire gratuitement
          </Link>
          <p className="mt-4 text-sm text-indigo-200">Pas d'engagement, annulez à tout moment</p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}