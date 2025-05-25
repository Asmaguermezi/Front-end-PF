import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { motion } from "framer-motion";

// components

import Navbar from "components/Navbars/AuthNavbar.js";


// views

import Login from "views/auth/Login.js";
import forget from "views/auth/forget";
import Register from "views/auth/Register.js";

import etudiaLogo from "assets/img/etudia-LOGO.png";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full"
            style={{
              background: "#e0e7ff",
            }}
          >
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", transform: "translate(100px, -140px)" }}
              >
                <img src={etudiaLogo} alt="ETUDIA Logo" style={{ width: 180, height: 180, marginRight: 48 }} />
                <div>
                  <h1 style={{ color: "#7c3aed", fontSize: 64, fontWeight: 700, margin: 0 }}>
                    <span style={{ color: "#7c3aed", whiteSpace: "nowrap" }}>ETUDIA</span>
                  </h1>
                  <p style={{ color: "#222", fontSize: 32, margin: 0, fontWeight: 400 }}>Apprendre ensemble, Réussir ensemble.</p>
                </div>
              </motion.div>
            </div>
          </div>
          <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/forget" exact component={forget} />
          <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          
        </section>
      </main>
    </>
  );
}
