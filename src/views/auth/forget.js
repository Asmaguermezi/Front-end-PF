import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

export default function Forget() {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demande de reset pour :", email);
    // axios.post("/api/auth/forgot-password", { email })...
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="relative w-full mb-3 mt-4">
                  <label
                    htmlFor="forget-email"
                    className="block uppercase text-black text-xs font-bold mb-2"
                  >
                    {translations[lang].email}
                  </label>
                  <input
                    id="forget-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={translations[lang].placeholderEmail}
                    className="border border-gray-400 px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>

                {/* Bouton Envoyer */}
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="w-full text-white font-semibold rounded-lg py-3 shadow-md focus:outline-none transition-all duration-150 text-base"
                    style={{
                      background: "linear-gradient(to bottom, #635bfa 0%, #6d38a7 100%)"
                    }}
                  >
                    {translations[lang].forgot}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Liens bas de page */}
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/login" className="text-white">
                <small>{translations[lang].login}</small>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/register" className="text-white">
                <small>{translations[lang].create}</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}