// ✅ Welcome.js fusionné avec contenu dynamique (services, cours, témoignages)
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";


const PHRASES = [
  "Ta plateforme e-learning : révise avec d'autres étudiants, trouve un enseignant, et booste ta réussite !",
  "Réussis tes examens avec notre communauté d'apprentissage collaborative et interactive !",
  "Développe tes compétences à ton rythme avec des enseignants experts dans leur domaine !",
  "Rejoins des groupes d'études et partage tes connaissances avec d'autres passionnés !"
];

const COLOR_PALETTES = [
  { from: "#43cea2", to: "#185a9d" },
 
  { from: "#4776E6", to: "#8E54E9" },
 
  { from: "#348F50", to: "#56B4D3" }
];

const Welcome = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const typingRef = useRef(null);

  const [backgroundColors, setBackgroundColors] = useState(COLOR_PALETTES[0]);
  const [colorIndex, setColorIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    const currentPhrase = PHRASES[currentPhraseIndex];
    const length = displayText.length;

    if (isTyping && length < currentPhrase.length) {
      typingRef.current = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, length + 1));
      }, 40);
    } else if (isTyping && length === currentPhrase.length) {
      typingRef.current = setTimeout(() => setIsTyping(false), 2000);
    } else if (!isTyping && length > 0) {
      typingRef.current = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, length - 1));
      }, 20);
    } else {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      setIsTyping(true);
    }

    return () => clearTimeout(typingRef.current);
  }, [displayText, currentPhraseIndex, isTyping]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      let newPercent = percent + 0.1 * direction;
      if (newPercent >= 100) {
        newPercent = 100;
        setDirection(-1);
      } else if (newPercent <= 0) {
        newPercent = 0;
        setDirection(1);
        setColorIndex((prev) => (prev + 1) % COLOR_PALETTES.length);
      }
      setPercent(newPercent);
      setBackgroundColors(COLOR_PALETTES[colorIndex]);
    });
    return () => cancelAnimationFrame(id);
  }, [percent, direction, colorIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <IndexNavbar fixed className={`transition-all duration-500 ${isScrolled ? 'shadow-md bg-white bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`} />

      {/* ✅ Hero Section animée */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden px-8 animate-bg-move transition-colors duration-1000" style={{ background: `linear-gradient(${isScrolled ? '135deg' : '120deg'}, ${backgroundColors.from}, ${backgroundColors.to})`, backgroundSize: "200% 200%" }}>
        <div className="container mx-auto px-4 relative z-10 text-left text-white py-20 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Bienvenue sur <span className="text-yellow-300">Etudia</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-8 h-24" role="status" aria-live="polite">
            {displayText}<span className="animate-blink inline-block w-1 h-5 ml-1 bg-white"></span>
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/auth/register" className={`bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg text-sm transform transition ${hoveredButton === 'start' ? 'scale-105' : ''}`} onMouseEnter={() => setHoveredButton('start')} onMouseLeave={() => setHoveredButton(null)}>
              Commencer maintenant
            </Link>
            <Link to="/auth/login" className={`bg-white text-black hover:bg-indigo-600 hover:text-white font-semibold px-6 py-3 rounded-full shadow-lg text-sm transform transition ${hoveredButton === 'connect' ? 'scale-105' : ''}`} onMouseEnter={() => setHoveredButton('connect')} onMouseLeave={() => setHoveredButton(null)}>
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Section Features intégrée */}
      <section className="features-section scroll-animation">
        <div className="section-header">
          <h2>Pourquoi choisir notre plateforme</h2>
          <p>Découvrez les avantages qui nous différencient</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-laptop-code"></i></div>
            <h3>Apprentissage interactif</h3>
            <p>Des cours interactifs avec des quiz et des projets pratiques</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-certificate"></i></div>
            <h3>Certifications reconnues</h3>
            <p>Obtenez des certificats valorisés par les employeurs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-user-graduate"></i></div>
            <h3>Instructeurs experts</h3>
            <p>Apprenez avec des professionnels du secteur</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-clock"></i></div>
            <h3>Apprentissage flexible</h3>
            <p>Étudiez à votre rythme, où que vous soyez</p>
          </div>
        </div>
      </section>

      {isScrolled && (
        <button onClick={scrollToTop} title="Revenir en haut" className="fixed bottom-5 right-5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg transform transition hover:scale-105">
          ⬆️
        </button>
      )}

      <Footer />

      <style jsx>{`
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        @keyframes zoomPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-bg-move { animation: zoomPan 20s ease infinite; }
      `}</style>
    </>
  );
};

export default Welcome;