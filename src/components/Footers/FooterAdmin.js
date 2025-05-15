import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="mt-auto block py-4 bg-white">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full text-center">
              <p className="text-sm text-blueGray-600 font-semibold py-1">
                © {new Date().getFullYear()} Etudia — Plateforme éducative pour étudiants et enseignants.
              </p>
              <p className="text-xs text-blueGray-400">
                Interface d'administration réservée.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
