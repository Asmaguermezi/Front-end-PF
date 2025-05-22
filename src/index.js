import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Welcome from "views/Welcome.js";
import MatierePage from "views/MatierePage.js";
import VideoCall from "views/VideoCall.js";
import Notifications from "views/etudiant/Notifications";

import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.render(
  <LanguageProvider>
    <BrowserRouter>
      <>
        <Switch>
          {/* Layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />

          {/* Pages sans layout */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/matiere/:id" exact component={MatierePage} />
          <Route path="/videocall/:id" exact component={VideoCall} /> {/* ✅ corrigé ici */}
          <Route path="/etudiant/notifications" exact component={Notifications} />
          <Route path="/" exact component={Welcome} />

          {/* Redirection par défaut */}
          <Redirect from="*" to="/" />
        </Switch>

        {/* Notifications globales */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </BrowserRouter>
  </LanguageProvider>,
  document.getElementById("root")
);
