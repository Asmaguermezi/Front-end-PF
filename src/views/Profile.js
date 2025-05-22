import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Profile() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        {/* Bannière avec image */}
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>

        {/* Section profile */}
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <CardProfile />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}