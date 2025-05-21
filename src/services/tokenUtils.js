// src/services/tokenUtils.js

export function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      // Séparer les 3 parties du JWT
      const [, payloadBase64] = token.split(".");
      if (!payloadBase64) return null;
  
      // Décoder le payload (partie centrale)
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      // Retourner l'ID utilisateur (présent dans le token signé côté backend)
      return decodedPayload.id || null;
    } catch (err) {
      console.error("❌ Erreur de décodage du token :", err);
      return null;
    }
  }
  