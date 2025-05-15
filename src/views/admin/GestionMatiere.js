import React, { useEffect, useState } from "react";
import {
  getAllMatieres,
  ajouterMatiere,
  updateMatiere,
  deleteMatiere,
} from "../../services/ApiMatiere";

export default function GestionMatiere() {
  const [matieres, setMatieres] = useState([]);
  const [nouvelleMatiere, setNouvelleMatiere] = useState({
    nom: "",
    description: "",
  });

  useEffect(() => {
    fetchMatieres();
  }, []);

  const fetchMatieres = async () => {
    try {
      const res = await getAllMatieres();
      setMatieres(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouvelleMatiere({ ...nouvelleMatiere, [name]: value });
  };

  const handleAjouterMatiere = async () => {
    try {
      await ajouterMatiere(nouvelleMatiere);
      setNouvelleMatiere({ nom: "", description: "" });
      fetchMatieres();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModifierMatiere = async (id) => {
    try {
      await updateMatiere(id, nouvelleMatiere);
      setNouvelleMatiere({ nom: "", description: "" });
      fetchMatieres();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSupprimerMatiere = async (id) => {
    try {
      await deleteMatiere(id);
      fetchMatieres();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (matiere) => {
    setNouvelleMatiere(matiere);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Gestion des Matières</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          name="nom"
          value={nouvelleMatiere.nom}
          placeholder="Nom de la matière"
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full md:w-1/3 shadow-sm"
        />
        <input
          name="description"
          value={nouvelleMatiere.description}
          placeholder="Description"
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full md:w-2/3 shadow-sm"
        />

        <button
          onClick={
            nouvelleMatiere._id
              ? () => handleModifierMatiere(nouvelleMatiere._id)
              : handleAjouterMatiere
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          {nouvelleMatiere._id ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <table className="w-full table-auto border border-collapse shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-left">
            <th className="p-3 border">Nom</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((mat) => (
            <tr key={mat._id} className="hover:bg-gray-50">
              <td className="p-3 border">{mat.nom}</td>
              <td className="p-3 border">{mat.description}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(mat)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleSupprimerMatiere(mat._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
