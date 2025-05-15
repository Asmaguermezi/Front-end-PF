import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ➕ Ajouter une notification
export const ajouterNotification = async (notificationData) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, notificationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de l\'ajout de la notification');
  }
};

// 📥 Récupérer toutes les notifications
export const getAllNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des notifications');
  }
};

// 📌 Récupérer une notification par ID
export const getNotificationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/notifications/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Non trouvée');
    }
    throw new Error(error.response?.data?.error || 'Erreur serveur');
  }
};

// 📝 Modifier une notification
export const updateNotification = async (id, notificationData) => {
  try {
    const response = await axios.put(`${API_URL}/notifications/${id}`, notificationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la modification de la notification');
  }
};

// ❌ Supprimer une notification
export const deleteNotification = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notifications/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur lors de la suppression de la notification');
  }
};
