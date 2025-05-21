import axios from "axios";

// ✅ 1. Base URL du backend
axios.defaults.baseURL = "http://localhost:5000";

// ✅ 2. Intercepteur (inutile ici car on utilise les cookies, pas le header)
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ 3. Toutes les fonctions d'appel API
const API_BASE = "/api/users";
export const inscriptionUtilisateur = (userData) => {
  return axios.post("/api/users/inscription", userData, { withCredentials: true, // ✅ AJOUTE ça pour que le cookie fonctionne juste après inscription
  });
};

// 🔐 Connexion (le backend va stocker le cookie)
export const loginUtilisateur = (credentials, config = {}) => {
  return axios.post("/api/users/login", credentials, {
    withCredentials: true, // 🔐 Obligatoire pour les cookies
    ...config,
  });
};


// 🔓 Déconnexion (le cookie sera supprimé côté backend)
export const logoutUtilisateur = () => {
  return axios.get(`${API_BASE}/logout`, { withCredentials: true });
};

// 👥 Récupérer tous les utilisateurs (protégée)
export const getAllUtilisateurs = () => {
  return axios.get(`${API_BASE}/getAllUtilisateurs`, { withCredentials: true });
};

// 👤 Par ID
export const getUtilisateurParId = (id) => {
  return axios.get(`${API_BASE}/getUtilisateurById/${id}`, { withCredentials: true });
};

// 🔍 Par nom
export const searchUtilisateurByNom = (nom) => {
  return axios.get(`${API_BASE}/searchUtilisateurByNom`, {
    params: { nom },
    withCredentials: true,
  });
};

// 🔍 Par rôle
export const listeUtilisateursParRole = (role) => {
  return axios.get(`${API_BASE}/getUtilisateursParRole/${role}`, { withCredentials: true });
};

// ✏️ Mise à jour
export const updateUtilisateur = (id, userData) => {
  return axios.put(`${API_BASE}/updateUtilisateurById/${id}`, userData, {
    withCredentials: true,
  });
};

// ❌ Suppression
export const supprimerUtilisateur = (id) => {
  return axios.delete(`${API_BASE}/deleteUtilisateurById/${id}`, {
    withCredentials: true,
  });
};

// 📷 Inscription avec image
export const inscriptionUtilisateurAvecImage = (formData) => {
  return axios.post(`${API_BASE}/inscriptionAvecImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

// 📷 Mise à jour avec image
export const updateUtilisateurAvecImage = (id, formData) =>
  axios.put(`${API_BASE}/updateUtilisateurAvecImage/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🔑 Réinitialisation du mot de passe
export const resetPassword = (email) => {
  return axios.post(`${API_BASE}/reset-password`, { email });
};
export const getMonProfil = () => {
  return axios.get("/api/users/getMonProfil", {
    withCredentials: true, // ✅ IMPORTANT pour envoyer le cookie
  });
};
