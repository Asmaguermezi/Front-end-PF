import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Récupérer toutes les sessions
export const getAllSessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/sessions`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des sessions');
  }
};

// Récupérer une session par ID
export const getSessionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Session introuvable');
  }
};

// Supprimer une session
export const deleteSessionById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la session');
  }
};

// Ajouter une nouvelle session
export const addSession = async (sessionData) => {
  try {
    const { date, heure, participants } = sessionData;
    
    if (!date || !heure) {
      throw new Error("Données invalides");
    }

    const response = await axios.post(`${API_URL}/sessions`, {
      date,
      heure,
      participants
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la création de la session');
  }
};

// Mettre à jour une session
export const updateSession = async (id, sessionData) => {
  try {
    const { date, heure } = sessionData;

    if (!date || !heure) {
      throw new Error("Données invalides");
    }

    const response = await axios.put(`${API_URL}/sessions/${id}`, {
      date,
      heure
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de la session');
  }
};

// Ajouter un participant à une session
export const ajouterParticipant = async (userId, sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/sessions/participants`, {
      userId,
      sessionId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de l\'ajout du participant');
  }
};

// Retirer un participant d'une session
export const retirerParticipant = async (userId, sessionId) => {
  try {
    const response = await axios.delete(`${API_URL}/sessions/participants`, {
      data: { userId, sessionId }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors du retrait du participant');
  }
};
