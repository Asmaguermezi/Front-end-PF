import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-gradient-to-b from-blue-400 to-blue-700"
            : "relative bg-gradient-to-b from-blue-400 to-blue-700") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full text-center">
              <p className="text-sm text-white font-semibold py-1">
                © {new Date().getFullYear()} Etudia – Tous droits réservés.
              </p>
              <p className="text-sm text-white mt-2">
                Plateforme collaborative pour étudiants et enseignants.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
