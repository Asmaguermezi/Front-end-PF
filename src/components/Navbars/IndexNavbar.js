/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg transition-all duration-300">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo ETUDIA */}
          <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start items-center">
            <Link
              to="/"
              className="text-white text-5xl md:text-6xl font-extrabold tracking-widest drop-shadow-lg hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "sans-serif", letterSpacing: "0.15em" }}
            >
              ETUDIA
            </Link>
            <button
              className="text-3xl px-3 py-1 border border-transparent rounded lg:hidden text-white hover:bg-white/10 transition"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>

          {/* Boutons à droite */}
          <div
            className={
              "lg:flex flex-grow items-center justify-end" +
              (navbarOpen ? " block animate-fade-in" : " hidden lg:block")
            }
          >
            <ul className="flex flex-col lg:flex-row flex-wrap list-none lg:ml-auto space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
              <li>
                <Link
                  to="/auth/login"
                  className="bg-white/90 border border-white text-indigo-700 px-6 py-2 rounded-full font-bold shadow hover:bg-indigo-100 hover:scale-105 transition-all duration-200"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-pink-600 hover:scale-105 transition-all duration-200"
                >
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.4s;
          }
        `}</style>
      </nav>
    </>
  );
}
