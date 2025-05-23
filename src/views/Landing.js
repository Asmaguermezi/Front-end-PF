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
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const itemsPerPage = 6;
  const role = localStorage.getItem("role") || "etudiant";

  const categories = ["Tous", "Technologie", "Business", "Design", "Sciences"];

  const filteredMatieres = matieres.filter(matiere => {
    const matchesSearch = matiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       matiere.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || matiere.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const totalPages = Math.ceil(filteredMatieres.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMatieres = filteredMatieres.slice(indexOfFirstItem, indexOfLastItem);

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
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <Navbar transparent />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">ETUDIA</div>
         
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            
            <h1 className="hero-title">L'Éducation Réinventée</h1>
            <p className="hero-subtitle">
              Une expérience d'apprentissage immersive et moderne qui redéfinit 
              les standards de l'éducation numérique avec des outils innovants.
            </p>
            <div className="hero-buttons">
              <Link to={`/${role}/notifications`} className="btn btn-primary">
             
                Notifications
              </Link>
              <Link to="/profile" className="btn btn-secondary">
              
                Mon Profil
              </Link>
            </div>
          
          </div>
          
          
        </div>
      </section>
      
      {/* Section Recherche */}
      <section className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Rechercher une matière, un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

          <div className="courses-grid">
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="course-card animate-pulse">
                  <div className="course-icon"></div>
                  <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg mb-3 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
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
                    <i className="fas fa-book-open"></i>
                  </div>
                  <h3 className="course-title">{matiere.nom}</h3>
                  <p className="course-description">{matiere.description}</p>
                  <div className="course-link">
                    <span>Explorer le cours</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ))
            ) : searchTerm ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="empty-title">Aucun résultat trouvé</h3>
                <p className="empty-description">
                  Aucune matière ne correspond à "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-times"></i>
                  Effacer la recherche
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3 className="empty-title">Aucune matière disponible</h3>
                <p className="empty-description">
                  Les matières seront bientôt disponibles
                </p>
              </div>
            )}
          </div>

          {filteredMatieres.length > itemsPerPage && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pagination-button ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        
     

 
    </>
  );
}