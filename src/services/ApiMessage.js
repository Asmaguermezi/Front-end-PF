import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Récupérer tous les messages
export const getAllMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Échec de récupération des messages');
  }
};

// Récupérer un message par ID
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

// Créer un message
export const createMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, messageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la création du message');
  }
};

// Mettre à jour un message
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

// Supprimer un message
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
