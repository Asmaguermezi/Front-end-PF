import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-violet-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Copyright */}
        <div className="text-center text-gray-600">
          © {new Date().getFullYear()} Etudia. Tous droits réservés.
          
        </div>
        <p className="text-center text-gray-600">
                Plateforme collaborative pour étudiants et enseignants.
              </p>
      </div>
    </footer>
  );
}
