import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import CardProfile from "components/Cards/CardProfile.js";
import "assets/styles/profile.css";

export default function Profile() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-container">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-end mb-6">
              <button className="px-6 py-2 bg-white rounded-full text-gray-700 text-sm shadow-sm hover:shadow-md transition-all duration-300">
                Français
              </button>
            </div>
            <CardProfile />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}