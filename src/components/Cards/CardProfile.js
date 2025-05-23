import React, { useState, useEffect } from "react";
import { getMonProfil, updateUtilisateurAvecImage } from "services/ApiUser";
import { toast } from "react-toastify";
import "assets/styles/profile.css";

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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="profile-card">
        <button
          onClick={() => setEditMode(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>

        <form onSubmit={handleUpdate} className="edit-form">
          {/* Champ d'image désactivé */}
          {/*
          <div className="relative w-32 h-32 mx-auto mb-8">
            <img
              src={imagePreview || "https://via.placeholder.com/150"}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <i className="fas fa-camera text-white text-xl"></i>
              <input
                type="file"
                onChange={handleImageAutoUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          */}

          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Nom complet</label>
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
              <label className="form-label">Email</label>
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
              <label className="form-label">Spécialité</label>
              <input
                type="text"
                name="specialite"
                value={formData.specialite || ""}
                onChange={handleChange}
                className="form-input"
                placeholder="Votre spécialité"
              />
            </div>
          </div>

          <div className="text-right mt-6">
            <button type="submit" className="edit-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">Cours</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">8</div>
          <div className="stat-label">Certificats</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">4.8</div>
          <div className="stat-label">Note</div>
        </div>
      </div>

      <div className="profile-info">
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <div className="profile-speciality">
          <i className="fas fa-graduation-cap"></i>
          <span>{user.specialite}</span>
        </div>
      </div>

      <div className="text-center">
        <button onClick={() => setEditMode(true)} className="edit-button">
          <i className="fas fa-pencil"></i>
          Modifier
        </button>
      </div>
    </div>
  );
}
