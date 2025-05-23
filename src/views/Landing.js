import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMatieres } from "services/ApiMatiere.js";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import "../assets/styles/landing-page.css";
// adapte le chemin si nécessaire


export default function Landing() {
  const [matieres, setMatieres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // ✅ Optionnel : détecter le rôle (utilisateur ou enseignant)
  const role = localStorage.getItem("role") || "etudiant"; // fallback si vide

  const filteredMatieres = matieres.filter(matiere => 
    matiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    matiere.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredMatieres.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMatieres = filteredMatieres.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllMatieres()
      .then((res) => {
        setMatieres(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur chargement matières :", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Reset to page 1 when searching
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen">
      <Navbar transparent />
      
     
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-fadeIn">
          <h1 className="hero-title animate-gradient-x">
            ETUDIA
          </h1>
          <h2 className="hero-subtitle">
            L'Éducation Réinventée
          </h2>
          <p className="hero-description">
            Une expérience d'apprentissage immersive qui redéfinit
            les standards de l'éducation numérique
          </p>

          <div className="button-group">
            <Link
              to={`/${role}/notifications`}
              className="primary-button"
            >
              <i className="fas fa-bell"></i>
              Notifications
            </Link>

            <Link
              to="/profile"
              className="secondary-button"
            >
              <i className="fas fa-user"></i>
              Mon profil
            </Link>
          </div>
        </div>
      </section>

      {/* Section Recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher une matière..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Section des matières */}
      <section className="container mx-auto px-4 py-16">
        <div className="courses-grid">
          {isLoading ? (
            // Skeleton loader
            [...Array(6)].map((_, index) => (
              <div key={index} className="course-card animate-pulse">
                <div className="course-icon"></div>
                <div className="h-8 bg-white/10 rounded-lg mb-4 w-3/4"></div>
                <div className="h-4 bg-white/10 rounded-lg mb-3 w-full"></div>
                <div className="h-4 bg-white/10 rounded-lg w-2/3"></div>
              </div>
            ))
          ) : currentMatieres.length > 0 ? (
            currentMatieres.map((matiere, index) => (
              <Link
                key={index}
                to={`/matiere/${matiere._id}`}
                className="course-card"
              >
                <div className="course-icon">
                  <i className="fas fa-book-open text-2xl text-white"></i>
                </div>
                
                <h3 className="course-title">
                  {matiere.nom}
                </h3>
                
                <p className="course-description">
                  {matiere.description}
                </p>
                
                <div className="course-link">
                  <span>Explorer le cours</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))
          ) : searchTerm ? (
            <div className="empty-state col-span-full">
              <div className="empty-icon">
                <i className="fas fa-search text-3xl"></i>
              </div>
              <h3 className="empty-title">
                Aucun résultat trouvé
              </h3>
              <p className="empty-description">
                Aucune matière ne correspond à "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="secondary-button"
              >
                <i className="fas fa-times"></i>
                Effacer la recherche
              </button>
            </div>
          ) : (
            <div className="empty-state col-span-full">
              <div className="empty-icon">
                <i className="fas fa-book-open text-3xl"></i>
              </div>
              <h3 className="empty-title">
                Aucune matière disponible
              </h3>
              <p className="empty-description">
                Les matières seront bientôt disponibles
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMatieres.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum <= 2 ||
                pageNum > totalPages - 2 ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => goToPage(pageNum)}
                    className={`pagination-button ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === 3 && currentPage > 4) ||
                (pageNum === totalPages - 2 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={i} className="px-2 text-white">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </section>

      

      <Footer />
    </div>
  );
}