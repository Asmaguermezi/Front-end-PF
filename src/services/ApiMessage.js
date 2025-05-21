import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ✅ 1. Récupérer tous les messages (utile pour admin uniquement)
export const getAllMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Échec de récupération des messages');
  }
};

// ✅ 2. Récupérer un message par ID
export const getMessageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Message non trouvé');
    }
    throw new Error('Erreur serveur');
  }
};

// ✅ 3. Créer un message (API REST — ⚠️ pas utilisé si tu passes par Socket.IO)
export const createMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, messageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la création du message');
  }
};

// ✅ 4. Mettre à jour un message
export const updateMessage = async (id, messageData) => {
  try {
    const response = await axios.put(`${API_URL}/messages/${id}`, messageData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Message non trouvé');
    }
    throw new Error('Erreur lors de la mise à jour');
  }
};

// ✅ 5. Supprimer un message
export const deleteMessage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/messages/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Message non trouvé');
    }
    throw new Error('Erreur lors de la suppression');
  }
};

// ✅ 6. Récupérer tous les messages d'une session (pour VideoCall.js)
export const getMessagesBySessionId = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur chargement des messages de la session');
  }
};
