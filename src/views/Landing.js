import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMatieres } from "services/ApiMatiere.js";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [matieres, setMatieres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Optionnel : détecter le rôle (utilisateur ou enseignant)
  const role = localStorage.getItem("role") || "etudiant"; // fallback si vide

  const totalPages = Math.ceil(matieres.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMatieres = matieres.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getAllMatieres()
      .then((res) => setMatieres(res.data))
      .catch((err) => console.error("❌ Erreur chargement matières :", err));
  }, []);

  return (
    <>
      <Navbar transparent />
      <main>
        {/* Bannière d'introduction */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Vos matières sur Etudia
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Accédez à l'ensemble des matières proposées sur la plateforme
                    pour progresser à votre rythme.
                  </p>

                  {/* ✅ Bouton vers la page notifications */}
                  <div className="mt-6">
                    <Link
                      to={`/${role}/notifications`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
                    >
                      📬 Voir mes notifications
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Section des matières */}
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              {currentMatieres.length > 0 ? (
                currentMatieres.map((matiere, index) => (
                  <Link
                    key={index}
                    to={`/matiere/${matiere._id}`}
                    className="w-full md:w-4/12 px-4 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-xl">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                          <i className="fas fa-book-open"></i>
                        </div>
                        <h6 className="text-xl font-semibold capitalize">
                          {matiere.nom}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {matiere.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-blueGray-500 text-lg mt-8">
                  Aucune matière disponible pour le moment.
                </p>
              )}
            </div>

            {/* Pagination */}
            {matieres.length > itemsPerPage && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
                >
                  &lt;
                </button>
                <span className="text-lg text-blueGray-700 mx-2">
                  {currentPage} sur {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
