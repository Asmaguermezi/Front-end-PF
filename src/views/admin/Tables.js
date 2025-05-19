import React, { useEffect, useState } from "react";

// components

import CardTable from "components/Cards/CardTable.js";

export default function Tables() {
  const [users, setUsers] = useState([]);

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

  return (
    <>
     
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      
    </>
  );
}