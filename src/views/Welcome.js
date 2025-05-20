import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Welcome() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Ta plateforme e-learning : révise avec d'autres étudiants, trouve un enseignant, et booste ta réussite !";
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stats, setStats] = useState([
    { value: 0, target: 5000, label: "Étudiants inscrits" },
    { value: 0, target: 850, label: "Enseignants disponibles" },
    { value: 0, target: 1240, label: "Groupes d'études" },
    { value: 0, target: 35, label: "Universités" }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Animation des statistiques
    const interval = setInterval(() => {
      setStats(prev => 
        prev.map(stat => ({
          ...stat,
          value: stat.value < stat.target ? Math.min(stat.value + Math.ceil(stat.target/100), stat.target) : stat.target
        }))
      );
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[count]);
        setCount(count + 1);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [count, fullText]);

  return (
    <>
      <IndexNavbar fixed />

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
          <p className="text-lg sm:text-xl max-w-xl mb-8">
            {displayText}
            <span className="animate-blink">|</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth/register"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition duration-200 transform hover:scale-105"
            >
              Commencer
            </Link>
            <Link
              to="/auth/login"
              className="bg-white text-black hover:text-white hover:bg-indigo-600 font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition duration-200 transform hover:scale-105"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Section Statistiques avec animation */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center px-4 py-10 max-w-6xl mx-auto">
            {/* Stat 1 */}
            <div className="text-center px-10 py-4">
              <h3 className="text-5xl font-bold text-gray-800 mb-3">
                {stats[0].value.toLocaleString()}+
              </h3>
              <p className="text-gray-600">{stats[0].label}</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center px-10 py-4">
              <h3 className="text-5xl font-bold text-gray-800 mb-3">
                {stats[1].value.toLocaleString()}+
              </h3>
              <p className="text-gray-600">{stats[1].label}</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center px-10 py-4">
              <h3 className="text-5xl font-bold text-gray-800 mb-3">
                {stats[2].value.toLocaleString()}+
              </h3>
              <p className="text-gray-600">{stats[2].label}</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center px-10 py-4">
              <h3 className="text-5xl font-bold text-gray-800 mb-3">
                {stats[3].value.toLocaleString()}+
              </h3>
              <p className="text-gray-600">{stats[3].label}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Découvrez ce qui fait de nous votre meilleur choix pour l'apprentissage en ligne
          </p>

          <div className="flex flex-wrap justify-center mb-12 max-w-3xl mx-auto px-4">
            {/* Carte 1 */}
            <div className="w-full mb-8">
              <div className="bg-white rounded-lg shadow-xl p-12 h-full flex flex-col items-center">
                <div className="mx-auto mb-8 flex items-center justify-center">
                  <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">Formation Certifiée</h3>
                <p className="text-gray-600 text-center">
                  Des diplômes reconnus par les professionnels du secteur
                </p>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="w-full mb-8">
              <div className="bg-white rounded-lg shadow-xl p-12 h-full flex flex-col items-center">
                <div className="mx-auto mb-8 flex items-center justify-center">
                  <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .358.186.687.465.874l8.879 4.126a1 1 0 001.352-.448l1.58-3.593a1 1 0 00-.392-1.203l-7.049-4.102a.996.996 0 01-.156-.156l-1.513-1.741a1 1 0 01-.168-.555zM5.55 7.289c.024.068.05.145.085.23l1.035 2.359a1 1 0 00.357.422l7.274 4.77a1 1 0 001.375-.34l1.592-3.48a1 1 0 00-.255-1.203l-7.356-4.361a1 1 0 00-1.017-.07l-2.095.9z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">Apprentissage Flexible</h3>
                <p className="text-gray-600 text-center">
                  Apprenez à votre rythme, où que vous soyez
                </p>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="w-full mb-8">
              <div className="bg-white rounded-lg shadow-xl p-12 h-full flex flex-col items-center">
                <div className="mx-auto mb-8 flex items-center justify-center">
                  <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">Support Personnalisé</h3>
                <p className="text-gray-600 text-center">
                  Une équipe dédiée pour vous accompagner
                </p>
              </div>
            </div>
          </div>
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