import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ➕ Ajouter une matière
export const ajouterMatiere = async (matiereData) => {
  try {
    const response = await axios.post(`${API_URL}/matieres`, matiereData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de l\'ajout de la matière');
  }
};

// 📄 Récupérer toutes les matières
export const getAllMatieres = async () => {
  try {
    const response = await axios.get(`${API_URL}/matieres`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des matières');
  }
};

// 🔍 Récupérer une matière par ID
export const getMatiereById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/matieres/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Matière non trouvée');
    }
    throw new Error(error.response?.data?.error || 'Erreur serveur');
  }
};

// ✏️ Modifier une matière
export const updateMatiere = async (id, matiereData) => {
  try {
    const response = await axios.put(`${API_URL}/matieres/${id}`, matiereData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la modification de la matière');
  }
};

// 🗑️ Supprimer une matière
export const deleteMatiere = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/matieres/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la suppression de la matière');
  }
};
