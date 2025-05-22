/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext"; // adapte le chemin si besoin

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

const translations = {
  fr: {
    title: "Inscrivez-vous",
    name: "Nom",
    email: "Email",
    password: "Mot de passe",
    role: "Rôle",
    specialite: "Spécialité",
    accept: "J'accepte la",
    policy: "Politique de confidentialité",
    create: "Créer un compte",
    forgot: "Mot de passe oublié ?",
    login: "Connexion",
    placeholderName: "Votre nom",
    placeholderEmail: "Email",
    placeholderPassword: "Mot de passe",
    placeholderRole: "Rôle",
    placeholderSpecialite: "Spécialité"
  },
  en: {
    title: "Sign up",
    name: "Name",
    email: "Email",
    password: "Password",
    role: "Role",
    specialite: "Specialty",
    accept: "I accept the",
    policy: "Privacy Policy",
    create: "Create account",
    forgot: "Forgot password?",
    login: "Login",
    placeholderName: "Your name",
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    placeholderRole: "Role",
    placeholderSpecialite: "Specialty"
  },
  ar: {
    title: "سجّل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    role: "الدور",
    specialite: "التخصص",
    accept: "أوافق على",
    policy: "سياسة الخصوصية",
    create: "إنشاء حساب",
    forgot: "نسيت كلمة المرور؟",
    login: "تسجيل الدخول",
    placeholderName: "اسمك",
    placeholderEmail: "البريد الإلكتروني",
    placeholderPassword: "كلمة المرور",
    placeholderRole: "الدور",
    placeholderSpecialite: "التخصص"
  }
};

export default function AuthNavbar(props) {
  const { lang, setLang } = useContext(LanguageContext);
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  // Style pour s'assurer que le texte est blanc
  const logoStyle = {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase"
  };

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex items-center">
            <Link
              style={logoStyle}
              className="text-4xl md:text-6xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap "
              to="/"
            > 
              Etudia
            </Link>
            <div className="ml-auto">
              <select
                value={lang}
                onChange={e => setLang(e.target.value)}
                className="bg-white text-purple-700 font-bold rounded-lg px-4 py-2 shadow border border-purple-200 focus:outline-none focus:ring focus:border-purple-400 transition"
                style={{ minWidth: 100, fontSize: '1.1rem' }}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="text-white fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </>
  );
}
