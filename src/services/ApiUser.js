import axios from "axios";

// ✅ 1. Base URL du backend
axios.defaults.baseURL = "http://localhost:5000";

// ✅ 2. Intercepteur : ajouter le token automatiquement dans chaque requête
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 🔐 Récupérer le token stocké après login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 3. Toutes les fonctions d'appel API

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

// 👥 Récupérer tous les utilisateurs (protégée)
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

// 🔑 Réinitialisation du mot de passe
export const resetPassword = (email) => {
  return axios.post(`${API_BASE}/reset-password`, { email });
};
