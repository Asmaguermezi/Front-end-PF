import axios from 'axios';

const API_URL = 'http://localhost:5000/api/matieres';

// ➕ Ajouter une matière
export const ajouterMatiere = async (matiereData) => {
  return axios.post(API_URL, matiereData);
};

// 📄 Récupérer toutes les matières
export const getAllMatieres = async () => {
  return axios.get(API_URL);
};

// 🔍 Récupérer une matière par ID
export const getMatiereById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// ✏️ Modifier une matière
export const updateMatiere = async (id, matiereData) => {
  return axios.put(`${API_URL}/${id}`, matiereData);
};

// 🗑️ Supprimer une matière
export const deleteMatiere = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
