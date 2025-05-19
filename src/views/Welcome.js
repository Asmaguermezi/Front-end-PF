/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Welcome() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px bg-blueGray-100">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Bienvenue sur <span className="text-lightBlue-500">Etudia</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Plateforme collaborative pour étudiants : révisez ensemble, trouvez un enseignant,
                organisez vos sessions et échangez facilement. Tout est réuni pour réussir.
              </p>
              <div className="mt-12">
                <Link
                  to="/auth/register"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-2 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg transition duration-150"
                >
                  Commencer maintenant
                </Link>
                <Link
                  to="/auth/login"
                  className="ml-2 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg transition duration-150"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 px-4 text-center">
              <div className="text-blueGray-500 text-6xl mb-6">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-2xl font-semibold">Révision en Groupe</h3>
              <p className="mt-2 text-blueGray-500">
                Créez ou rejoignez des groupes d’étude avec des camarades ayant les mêmes matières.
              </p>
            </div>

            <div className="w-full md:w-6/12 px-4 text-center">
              <div className="text-blueGray-500 text-6xl mb-6">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3 className="text-2xl font-semibold">Enseignement personnalisé</h3>
              <p className="mt-2 text-blueGray-500">
                Trouvez un enseignant pour vous expliquer des notions ou organiser une session privée.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap mt-12">
            <div className="w-full md:w-6/12 px-4 text-center">
              <div className="text-blueGray-500 text-6xl mb-6">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="text-2xl font-semibold">Sessions en ligne</h3>
              <p className="mt-2 text-blueGray-500">
                Organisez vos révisions en ligne avec commentaires en direct et partage de ressources.
              </p>
            </div>

            <div className="w-full md:w-6/12 px-4 text-center">
              <div className="text-blueGray-500 text-6xl mb-6">
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="text-2xl font-semibold">Ressources partagées</h3>
              <p className="mt-2 text-blueGray-500">
                Accédez à des fiches, des documents, des vidéos, et plus encore partagés par la communauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blueGray-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold">Une plateforme conçue pour les étudiants</h2>
          <p className="mt-4 text-lg">
            Etudia est développée par des étudiants, pour des étudiants. Notre mission : faciliter l'entraide et améliorer la réussite scolaire.
          </p>
          <div className="mt-10">
            <Link
              to="/landing"
              className="bg-white text-blueGray-800 font-bold px-6 py-3 rounded shadow hover:shadow-lg uppercase text-sm transition duration-150"
            >
              Découvrir la plateforme
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}