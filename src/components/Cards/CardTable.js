import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAllUtilisateurs,
  supprimerUtilisateur,
  updateUtilisateur,
  inscriptionUtilisateur,
} from "../../services/ApiUser"; // ✅ import propre avec les bons noms

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getAllUtilisateurs(); // ✅ nom backend respecté
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await supprimerUtilisateur(id); // ✅ nom backend respecté
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const AddNewUser = async () => {
    try {
      await inscriptionUtilisateur(newUser); // ✅ nom backend respecté
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewUser = async (user, id) => {
    try {
      await updateUtilisateur(id, user); // ✅ nom backend respecté
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg">Liste des utilisateurs</h3>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={handleChange}
                  className="p-2 rounded text-black mr-2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={handleChange}
                  className="p-2 rounded text-black mr-2"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={newUser.age}
                  onChange={handleChange}
                  className="p-2 rounded text-black mr-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="p-2 rounded text-black mr-2"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  className="p-2 rounded text-black mr-2"
                />
                <br />
                <button
                  onClick={() => AddNewUser()}
                  className="bg-yellow-400 text-black mt-2 px-4 py-2 rounded"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => updateNewUser(newUser, newUser._id)}
                  className="bg-yellow-400 text-black mt-2 ml-2 px-4 py-2 rounded"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="text-left text-xs uppercase">
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-2">{user.firstName}</td>
                  <td className="px-6 py-2">{user.lastName}</td>
                  <td className="px-6 py-2">{user.email}</td>
                  <td className="px-6 py-2">
                    {user.createdAt?.slice(0, 10)}
                  </td>
                  <td className="px-6 py-2 text-right">
                    <button
                      onClick={() => setNewUser(user)}
                      className="text-yellow-300 underline mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-400 underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
