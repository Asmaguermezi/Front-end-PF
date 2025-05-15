import axios from "axios";

// Définir une base générale
axios.defaults.baseURL = "http://localhost:5000";

const API_BASE = "/api/users";

// 📥 Inscription
export const inscriptionUtilisateur = (userData) => {
  return axios.post(`${API_BASE}/inscription`, userData);
};

// 🔐 Connexion
export const loginUtilisateur = (credentials) => {
  return axios.post(`${API_BASE}/login`, credentials);
};

// 🔓 Déconnexion
export const logoutUtilisateur = () => {
  return axios.get(`${API_BASE}/logout`);
};

// 👥 Récupérer tous les utilisateurs
export const getAllUtilisateurs = () => {
  return axios.get(`${API_BASE}/getAllUtilisateurs`);
};

// 👤 Par ID
export const getUtilisateurParId = (id) => {
  return axios.get(`${API_BASE}/getUtilisateurById/${id}`);
};

// 🔍 Par nom
export const searchUtilisateurByNom = (nom) => {
  return axios.get(`${API_BASE}/searchUtilisateurByNom`, {
    params: { nom },
  });
};

// 🔍 Par rôle
export const listeUtilisateursParRole = (role) => {
  return axios.get(`${API_BASE}/getUtilisateursParRole/${role}`);
};

// ✏️ Mise à jour
export const updateUtilisateur = (id, userData) => {
  return axios.put(`${API_BASE}/updateUtilisateurById/${id}`, userData);
};

// ❌ Suppression
export const supprimerUtilisateur = (id) => {
  return axios.delete(`${API_BASE}/deleteUtilisateurById/${id}`);
};

// 📷 Inscription avec image
export const inscriptionUtilisateurAvecImage = (formData) => {
  return axios.post(`${API_BASE}/inscriptionAvecImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 📷 Mise à jour avec image
export const updateUtilisateurAvecImage = (id, formData) => {
  return axios.put(`${API_BASE}/updateUtilisateurAvecImage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
