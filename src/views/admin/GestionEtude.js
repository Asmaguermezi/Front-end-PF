import React, { useEffect, useState } from "react";
import {
  getAllSessions,
  addSession,
  updateSession,
  deleteSessionById,
} from "../../services/ApiSessionEtude.js";
import { ajouterNotification } from "../../services/ApiNotification.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GestionSessionEtude() {
  const [sessions, setSessions] = useState([]);
  const [nouvelleSession, setNouvelleSession] = useState({
    _id: "",
    date: "",
    heure: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await getAllSessions();
      setSessions(res);
    } catch (err) {
      console.error("Erreur de chargement des sessions", err);
      toast.error("❌ Erreur lors du chargement des sessions");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouvelleSession({ ...nouvelleSession, [name]: value });
  };

  const handleAjouterSession = async () => {
    try {
      await addSession(nouvelleSession);
      setNouvelleSession({ date: "", heure: "" });
      fetchSessions();
      toast.success("✅ Session ajoutée !");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de l'ajout");
    }
  };

  const handleModifierSession = async (id) => {
    try {
      await updateSession(id, nouvelleSession);
      setNouvelleSession({ date: "", heure: "" });
      fetchSessions();
      toast.success("✏️ Session modifiée !");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de la modification");
    }
  };

  const handleSupprimerSession = async (id) => {
    try {
      await deleteSessionById(id);
      fetchSessions();
      toast.success("🗑️ Session supprimée !");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de la suppression");
    }
  };

  const handleEdit = (session) => {
    setNouvelleSession(session);
  };

  const handleCopierID = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("✅ ID copié dans le presse-papiers !");
  };

  const handleEnvoyerNotification = async (session) => {
    try {
      const notificationData = {
        titre: "Nouvelle session d'étude disponible 📚",
        contenu: `Une session est prévue le ${session.date} à ${session.heure}. Cliquez ici pour rejoindre.`,
        sessionId: session._id, // ✅ Le lien est généré automatiquement côté frontend
        destinataire: null, // ou un ID utilisateur spécifique
      };

      await ajouterNotification(notificationData);
      toast.success("✅ Notification envoyée avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'envoi de la notification :", err.message);
      toast.error("❌ Échec de l'envoi de la notification.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Gestion des Sessions d'Étude
      </h2>

      {/* Formulaire */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          name="date"
          type="date"
          value={nouvelleSession.date}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full md:w-1/4 shadow-sm"
        />
        <input
          name="heure"
          type="time"
          value={nouvelleSession.heure}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full md:w-1/4 shadow-sm"
        />
        <button
          onClick={
            nouvelleSession._id
              ? () => handleModifierSession(nouvelleSession._id)
              : handleAjouterSession
          }
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
        >
          {nouvelleSession._id ? "Modifier" : "Ajouter"}
        </button>
      </div>

      {/* Tableau */}
      <table className="w-full table-auto border border-collapse shadow">
        <thead>
          <tr className="bg-green-100 text-green-800 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Heure</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id} className="hover:bg-gray-50">
              <td className="p-3 border text-sm text-gray-600">
                {session._id}
              </td>
              <td className="p-3 border">{session.date}</td>
              <td className="p-3 border">{session.heure}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(session)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleSupprimerSession(session._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handleEnvoyerNotification(session)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded"
                >
                  Notifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
