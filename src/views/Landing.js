import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMatieres } from "services/ApiMatiere.js";
import "../assets/styles/landing-page.css";

export default function Landing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [matieres, setMatieres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const categories = ["Tous", "Technologie", "Business", "Design", "Sciences"];

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

  return (
    <div className="main-container">
      <div className="top-section">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Rechercher un cours, une..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="top-buttons">
          <Link to="/etudiant/notifications" className="top-button notifications-button">
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </Link>
          <Link to="/profile" className="top-button profile-button">
            <i className="fas fa-user"></i>
            <span>Profil</span>
          </Link>
        </div>
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
    </div>
  );
}