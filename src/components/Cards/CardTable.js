import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAllUtilisateurs,
  inscriptionUtilisateur,
  updateUtilisateur,
  supprimerUtilisateur,
} from "services/ApiUser";
import { toast } from "react-toastify";

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});
  const [addedUsers, setAddedUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Etudiant",
    specialite: "",
  });

  const getUsers = async () => {
    try {
      const res = await getAllUtilisateurs();
      setUsers(res.data);
    } catch (error) {
      // Erreur silencieuse, pas de toast
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUserData({ ...editingUserData, [name]: value });
  };

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "Etudiant",
      specialite: "",
    });
  };

  const AddNewUser = async () => {
    if (!newUser.password || newUser.password.length < 6) {
      toast.error("❌ Mot de passe requis (6 caractères minimum)");
      return;
    }

    try {
      const res = await inscriptionUtilisateur(newUser);
      console.log('Utilisateur ajouté (API):', res.data.user);
      setUsers((prev) => [...prev, res.data.user]);
      toast.success("✅ Utilisateur ajouté !");
      resetForm();
      await getUsers();
    } catch (error) {
      toast.error("❌ Erreur lors de l'ajout !");
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditingUserData({ ...user });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditingUserData({});
  };

  const saveEdit = async () => {
    try {
      await updateUtilisateur(editingUserId, editingUserData);
      toast.success("✅ Utilisateur modifié");
      getUsers();
      cancelEditing();
    } catch (error) {
      toast.error("❌ Erreur lors de la mise à jour");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("❌ Confirmer la suppression ?")) return;
    try {
      await supprimerUtilisateur(id);
      toast.success("✅ Supprimé !");
      getUsers();
    } catch (error) {
      toast.error("❌ Erreur lors de la suppression");
    }
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "all" || user.role === filterRole;
    const searchMatch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return roleMatch && searchMatch;
  });

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      <div className="rounded-t px-4 py-4 border-0">
        <h3 className="font-semibold text-lg mb-4">Liste des utilisateurs</h3>

        {/* FORMULAIRE */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={newUser.name}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={newUser.password}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            name="specialite"
            placeholder="Spécialité"
            value={newUser.specialite}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="p-2 rounded text-black"
          >
            <option value="Etudiant">Etudiant</option>
            <option value="Enseignant">Enseignant</option>
          </select>
          <button
            onClick={AddNewUser}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
          >
            Ajouter
          </button>
        </div>

        
        {/* TABLEAU */}
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="text-left text-xs uppercase">
                <th className="px-6 py-3">Nom complet</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Rôle</th>
                <th className="px-6 py-3">Spécialité</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editingUserData.name}
                          onChange={handleEditChange}
                          className="p-1 rounded text-black"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="email"
                          name="email"
                          value={editingUserData.email}
                          onChange={handleEditChange}
                          className="p-1 rounded text-black"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {editingUserId === user._id ? (
                        <select
                          name="role"
                          value={editingUserData.role}
                          onChange={handleEditChange}
                          className="p-1 rounded text-black"
                        >
                          <option value="Etudiant">Etudiant</option>
                          <option value="Enseignant">Enseignant</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="specialite"
                          value={editingUserData.specialite || ""}
                          onChange={handleEditChange}
                          className="p-1 rounded text-black"
                        />
                      ) : (
                        user.specialite
                      )}
                    </td>
                    <td className="px-6 py-2 space-x-1">
                      {editingUserId === user._id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Sauver
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(user)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {addedUsers.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-md mb-2">Utilisateurs ajoutés cette session</h4>
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase">
                  <th className="px-6 py-3">Nom complet</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Rôle</th>
                  <th className="px-6 py-3">Spécialité</th>
                </tr>
              </thead>
              <tbody>
                {addedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-2">{user.name}</td>
                    <td className="px-6 py-2">{user.email}</td>
                    <td className="px-6 py-2">{user.role}</td>
                    <td className="px-6 py-2">{user.specialite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
