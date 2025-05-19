import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [stats, setStats] = useState({
    utilisateurs: 0,
    enseignants: 0,
    etudiants: 0,
    matieres: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Erreur de récupération des stats :", error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Utilisateurs"
                  statTitle={stats.utilisateurs.toString()}
                  statArrow="up"
                  statPercent="100"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total utilisateurs"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Enseignants"
                  statTitle={stats.enseignants.toString()}
                  statArrow="up"
                  statPercent="100"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total enseignants"
                  statIconName="fas fa-chalkboard-teacher"
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Étudiants"
                  statTitle={stats.etudiants.toString()}
                  statArrow="up"
                  statPercent="100"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total étudiants"
                  statIconName="fas fa-user-graduate"
                  statIconColor="bg-pink-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Matières"
                  statTitle={stats.matieres.toString()}
                  statArrow="up"
                  statPercent="100"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total matières"
                  statIconName="fas fa-book"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
