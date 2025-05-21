import React from "react";

// components

/**
 * CardSettings est un composant qui affiche un formulaire permettant à l'utilisateur
 * de visualiser et potentiellement modifier les informations de son compte.
 * Il est structuré en plusieurs sections : Informations utilisateur, Coordonnées, et À propos de moi.
 */
export default function CardSettings() {
  return (
    <>
      {/* Conteneur principal de la carte de paramètres */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* En-tête de la carte */}
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mon compte</h6>
            {/* Bouton d'action (ex: Sauvegarder les paramètres) - fonctionnalité à implémenter */}
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        {/* Corps de la carte contenant le formulaire */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            {/* Section: Informations utilisateur */}
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informations utilisateur
            </h6>
            <div className="flex flex-wrap">
              {/* Champ: Nom d'utilisateur */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="username"
                  >
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="lucky.jesse"
                  />
                </div>
              </div>
              {/* Champ: Adresse Email */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="jesse@example.com"
                  />
                </div>
              </div>
              {/* Champ: Prénom */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="first-name"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Lucky"
                  />
                </div>
              </div>
              {/* Champ: Nom de famille */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="last-name"
                  >
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Jesse"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            {/* Section: Coordonnées */}
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Coordonnées
            </h6>
            <div className="flex flex-wrap">
              {/* Champ: Adresse */}
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  />
                </div>
              </div>
              {/* Champ: Ville */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="city"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="New York"
                  />
                </div>
              </div>
              {/* Champ: Pays */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="country"
                  >
                    Pays
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="United States"
                  />
                </div>
              </div>
              {/* Champ: Code Postal */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="postal-code"
                  >
                    Code Postal
                  </label>
                  <input
                    type="text"
                    id="postal-code"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Postal Code"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            {/* Section: À propos de moi */}
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              À propos de moi
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="about-me"
                  >
                    À propos de moi
                  </label>
                  <textarea
                    id="about-me"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
