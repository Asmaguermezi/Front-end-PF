import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import CardProfile from "components/Cards/CardProfile.js";
import "../assets/styles/profile-page.css";

export default function Profile() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        {/* Section héro */}
        <section className="hero-section relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="hero-content text-center z-10">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Mon Profil
            </h1>
            <p className="hero-description max-w-2xl mx-auto">
              Gérez vos informations personnelles et suivez votre progression
            </p>
          </div>
        </section>

        {/* Section profil */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="profile-card bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-500/20">
              <CardProfile />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}