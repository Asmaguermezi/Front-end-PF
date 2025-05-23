/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full bg-white shadow-md">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between py-3">
          {/* Logo ETUDIA */}
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="flex items-center"
            >
              <span className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-violet-600">
                ETUDIA
              </span>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars text-violet-600"></i>
            </button>
          </div>

          {/* Menu principal */}
          <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-gray-700 hover:text-violet-600"
                  to="/cours"
                >
                  Cours
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-gray-700 hover:text-violet-600"
                  to="/enseignants"
                >
                  Enseignants
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-gray-700 hover:text-violet-600"
                  to="/a-propos"
                >
                  À propos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-gray-700 hover:text-violet-600"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item ml-4">
                <Link
                  to="/auth/login"
                  className="bg-white text-violet-600 px-4 py-2 rounded-full font-semibold border border-violet-600 hover:bg-violet-50 transition-colors duration-300"
                >
                  Connexion
                </Link>
              </li>
              <li className="nav-item ml-2">
                <Link
                  to="/auth/register"
                  className="bg-violet-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-violet-700 transition-colors duration-300"
                >
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer pour compenser la navbar fixed */}
    </>
  );
}
