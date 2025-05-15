import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { loginUtilisateur } from "../../services/ApiUser";

export default function Login() {
  const { lang } = useContext(LanguageContext);
  const history = useHistory(); // ✅ v5 = useHistory

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUtilisateur({ email, password });
      alert("✅ Connexion réussie !");
      localStorage.setItem("token", response.data.token);

      // ✅ Rediriger après connexion
      history.push("/dashboard"); // ⬅️ change cette route si besoin
    } catch (error) {
      alert("❌ Email ou mot de passe incorrect.");
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full bg-white">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-black text-xl font-bold">
                  {translations[lang].login}
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xs font-bold mb-2">
                    {translations[lang].email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={translations[lang].placeholderEmail}
                    className="border px-3 py-3 rounded text-sm shadow w-full focus:outline-none focus:ring"
                    required
                  />
                </div>

                {/* Mot de passe */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xs font-bold mb-2">
                    {translations[lang].password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={translations[lang].placeholderPassword}
                    className="border px-3 py-3 rounded text-sm shadow w-full focus:outline-none focus:ring"
                    required
                  />
                </div>

                {/* Se souvenir de moi */}
                <div className="mb-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="form-checkbox border bg-white rounded ml-1 w-5 h-5 focus:outline-none"
                    />
                    <span className="ml-2 text-sm font-semibold text-black">
                      {translations[lang].remember}
                    </span>
                  </label>
                </div>

                {/* Connexion */}
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="w-full text-white font-semibold rounded-lg py-3 shadow-md focus:outline-none transition-all duration-150 text-base"
                    style={{ background: "linear-gradient(to bottom, #635bfa 0%, #6d38a7 100%)" }}
                  >
                    {translations[lang].login}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bas de page */}
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/forget" className="text-lightBlue-500">
                <small>{translations[lang].forgot}</small>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/register" className="text-black">
                <small>{translations[lang].create}</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
