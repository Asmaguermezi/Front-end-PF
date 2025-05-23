import React, { useState, useEffect } from "react";
import { getMonProfil, updateUtilisateurAvecImage } from "services/ApiUser";
import { toast } from "react-toastify";
import "./CardProfile.css";

export default function CardProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMonProfil();
        setUser(res.data);
        setFormData(res.data);
        if (res.data.image) {
          setImagePreview(`http://localhost:5000/files/${res.data.image}?t=${Date.now()}`);
        }
      } catch (err) {
        console.error("❌ Erreur récupération profil :", err.response?.data || err.message);
        toast.error("Erreur lors du chargement du profil");
      }
    };
    fetchUser();
  }, []);

  const handleImageAutoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await updateUtilisateurAvecImage(user._id, form);
      setUser(res.data);
      setFormData(res.data);
      setImagePreview(`http://localhost:5000/files/${res.data.image}?t=${Date.now()}`);
      toast.success("Image mise à jour avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'image");
      console.error("Erreur upload image :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name || "");
    form.append("email", formData.email || "");
    form.append("specialite", formData.specialite || "");

    try {
      const res = await updateUtilisateurAvecImage(user._id, form);
      setUser(res.data);
      setFormData(res.data);
      setEditMode(false);
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
      console.error("Erreur mise à jour :", error);
    }
  };

  if (!user) {
    return (
      <div className="profile-content loading">
        <div className="loading-spinner"></div>
        <p>Chargement de votre profil...</p>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="profile-content edit-mode">
        <h2 className="edit-title">Modifier le profil</h2>
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label>Photo de profil</label>
            <div className="avatar-upload">
              <img
                src={imagePreview || "https://via.placeholder.com/150"}
                alt="Preview"
                className="avatar-preview"
              />
              <input
                type="file"
                onChange={handleImageAutoUpload}
                className="file-input"
                accept="image/*"
              />
              <div className="upload-overlay">
                <i className="fas fa-camera"></i>
                <span>Changer la photo</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="Votre email"
            />
          </div>

          <div className="form-group">
            <label>Spécialité</label>
            <input
              type="text"
              name="specialite"
              value={formData.specialite || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="Votre spécialité"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="cancel-btn"
            >
              <i className="fas fa-times"></i>
              Annuler
            </button>
            <button type="submit" className="save-btn">
              <i className="fas fa-check"></i>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={imagePreview || "https://via.placeholder.com/150"}
            alt="Photo de profil"
            className="avatar-image"
          />
          <div className="avatar-status online"></div>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-role">{user.specialite}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-book-open"></i>
          </div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Cours suivis</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-certificate"></i>
          </div>
          <div className="stat-info">
            <h3>8</h3>
            <p>Certificats</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-info">
            <h3>95%</h3>
            <p>Taux de réussite</p>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button
          onClick={() => setEditMode(true)}
          className="edit-profile-btn"
        >
          <i className="fas fa-edit"></i>
          Modifier le profil
        </button>
        <button className="settings-btn">
          <i className="fas fa-cog"></i>
          Paramètres
        </button>
      </div>

      <div className="recent-progress">
        <h3 className="section-title">Progression récente</h3>
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-header">
              <span>JavaScript Avancé</span>
              <span>85%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <span>React Fondamentaux</span>
              <span>70%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "70%" }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <span>Node.js</span>
              <span>60%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}