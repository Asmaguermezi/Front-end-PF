import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { loginUtilisateur } from "../../services/ApiUser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login() {
  const { lang } = useContext(LanguageContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const originalStyle = document.body.style.background;
    document.body.style.background = "linear-gradient(90deg, #4F46E5 0%, #7E22CE 100%)";
    return () => {
      document.body.style.background = originalStyle;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUtilisateur({ email, password }, { withCredentials: true });
      toast.success("✅ Connexion réussie !");
      history.push("/landing");
    } catch (error) {
      toast.error("❌ Email ou mot de passe incorrect.");
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-start justify-end px-4"
      style={{
        background: "linear-gradient(90deg, #4F46E5 0%, #7E22CE 100%)",
        paddingTop: "20px",
        paddingBottom: "60px",
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-start items-start justify-end h-full">
          {/* ✅ Carte alignée à droite, légèrement en haut, non collée */}
          <div
            className="w-full lg:w-4/12 px-4 flex justify-end"
            style={{ marginTop: "40px", marginRight: "3rem" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col break-words w-full max-w-md mb-6 shadow-2xl rounded-3xl bg-white border-0"
              style={{ borderRadius: '2rem' }}
            >
              <div className="flex-auto px-4 lg:px-10 py-10">
                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-6">
                    <h6 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4F46E5" }}>
                      {translations[lang].login}
                    </h6>
                    <hr className="mt-4 border-b-1 border-blueGray-300" />
                  </div>

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

                  {/* Se souvenir de moi 
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

                  /* Connexion */}
                  <div className="text-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      type="submit"
                      className="w-full text-white font-semibold rounded-lg py-3 shadow-md focus:outline-none transition-all duration-300 text-base"
                      style={{
                        background: "linear-gradient(90deg, #4F46E5 0%, #7E22CE 100%)",
                        boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
                      }}
                    >
                      {translations[lang].login}
                    </motion.button>
                  </div>
                </form>

                {/* Liens bas */}
                <div className="flex flex-wrap mt-4">
                  <div className="w-1/2">
                    <Link to="/auth/forget" className="text-indigo-600 hover:text-indigo-800">
                      <small>{translations[lang].forgot}</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-800">
                      <small>{translations[lang].create}</small>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
