import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMatiereById } from "../services/ApiMatiere";
import "../assets/styles/matiere-page.css";

export default function MatierePage() {
  const { id } = useParams();
  const history = useHistory();
  const [matiere, setMatiere] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("chapitres");

  useEffect(() => {
    setLoading(true);
    getMatiereById(id)
      .then((res) => {
        setMatiere(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la matière:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!matiere) {
    return <div>Matière non trouvée. <button onClick={() => history.goBack()}>Retour</button></div>;
  }

  // Exemple de données statiques (à remplacer par tes vraies données si besoin)
  const chapitres = [
    { titre: "Introduction aux fondamentaux", description: "Bases et concepts essentiels", duree: "2h", exercices: 4 },
    { titre: "Structures avancées", description: "Développement des concepts intermédiaires", duree: "3h", exercices: 6 },
    { titre: "Applications pratiques", description: "Mise en œuvre des connaissances", duree: "4h", exercices: 8 },
    { titre: "Études de cas", description: "Analyse de situations réelles", duree: "3h", exercices: 5 },
    { titre: "Évaluation et synthèse", description: "Consolidation des acquis", duree: "2h", exercices: 7 }
  ];

  const documents = [
    { titre: "Guide pratique", type: "PDF", taille: "2.3 MB" },
    { titre: "Fiche résumé", type: "DOC", taille: "1.1 MB" },
    { titre: "Exercices complémentaires", type: "PDF", taille: "3.5 MB" },
    { titre: "Ressources externes", type: "LINK", taille: "" },
    { titre: "Tutoriel vidéo", type: "VIDEO", taille: "25 MB" },
    { titre: "Présentation", type: "PPT", taille: "4.2 MB" },
    { titre: "Glossaire", type: "PDF", taille: "0.8 MB" },
    { titre: "Référence rapide", type: "PDF", taille: "1.5 MB" }
  ];

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header">
        <div className="header-container">
          <button className="back-button" onClick={() => history.goBack()}>
            <span style={{marginRight: 8}}>←</span> Retour
          </button>
        </div>
      </div>

      {/* Carte matière */}
      <div className="course-card">
        <div className="course-header">
          <div className="course-icon">
            <span role="img" aria-label="Livre">📚</span>
          </div>
          <div>
            <div className="course-title">{matiere.nom}</div>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-heading">📑 Chapitres</div>
            <div className="stat-value">5</div>
          </div>
          <div className="stat-card">
            <div className="stat-heading">⏰ Durée totale</div>
            <div className="stat-value">14h</div>
          </div>
          <div className="stat-card">
            <div className="stat-heading">📄 Documents</div>
            <div className="stat-value">8</div>
          </div>
        </div>
        <div className="course-description">{matiere.description}</div>
      </div>

      {/* Onglets */}
      <div className="tabs-container">
        <div className="tabs-wrapper">
          <button
            className={`tab-button${activeTab === "chapitres" ? " active" : ""}`}
            onClick={() => setActiveTab("chapitres")}
          >
            📑 Chapitres
          </button>
          <button
            className={`tab-button${activeTab === "documents" ? " active" : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            📄 Documents
          </button>
          <button
            className={`tab-button${activeTab === "progression" ? " active" : ""}`}
            onClick={() => setActiveTab("progression")}
          >
            🏆 Progression
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div>
        {activeTab === "chapitres" && (
          <div>
            {chapitres.map((chapitre, index) => (
              <div key={index} className="chapter-card">
                <div className="chapter-number">{index + 1}</div>
                <div className="chapter-content">
                  <div className="chapter-title">{chapitre.titre}</div>
                  <div className="chapter-description">{chapitre.description}</div>
                </div>
                <div className="chapter-details">
                  <div className="chapter-stat">
                    <div className="chapter-stat-label">Durée</div>
                    <div className="chapter-stat-value">{chapitre.duree}</div>
                  </div>
                  <div className="chapter-stat">
                    <div className="chapter-stat-label">Exercices</div>
                    <div className="chapter-stat-value">{chapitre.exercices}</div>
                  </div>
                </div>
                <button className="access-button">
                  Accéder <span style={{marginLeft: 6}}>→</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="documents-grid">
            {documents.map((doc, index) => (
              <div key={index} className="document-card">
                <div className={`document-icon ${doc.type.toLowerCase()}`}>
                  {doc.type}
                </div>
                <div className="document-content">
                  <div className="document-title">{doc.titre}</div>
                  <div className="document-details">{doc.taille}</div>
                </div>
                <button className="download-button">⬇️</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "progression" && (
          <div className="progress-container">
            <div className="progress-section">
              <div className="progress-title">Votre progression globale</div>
              <div className="progress-bar-container">
                <div className="progress-bar global" style={{width: "25%"}}></div>
              </div>
              <div className="progress-details">
                <span className="progress-details-value">Progression: 25%</span>
                <span>2/8 activités complétées</span>
              </div>
            </div>
            <div className="progress-section">
              <div className="progress-title">Progression par chapitre</div>
              <div className="chapter-progress-list">
                {chapitres.map((chapitre, index) => (
                  <div key={index} className="chapter-progress-card">
                    <div className="chapter-progress-header">
                      <span className="chapter-progress-title">{chapitre.titre}</span>
                      <span className={`progress-percentage ${
                        index === 0 ? "completed" : index === 1 ? "partial" : "empty"
                      }`}>
                        {index === 0 ? "100%" : index === 1 ? "50%" : "0%"}
                      </span>
                    </div>
                    <div className="progress-bar-container">
                      <div className={`progress-bar ${
                        index === 0 ? "completed" : index === 1 ? "partial" : "empty"
                      }`} style={{width: index === 0 ? "100%" : index === 1 ? "50%" : "0%"}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
