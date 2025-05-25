import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { inscriptionUtilisateur } from "../../services/ApiUser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Register() {
  const { lang } = useContext(LanguageContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [accepteConfidentialite, setAccepteConfidentialite] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const originalStyle = document.body.style.background;
    document.body.style.background = "linear-gradient(90deg, #4F46E5 0%, #7E22CE 100%)";
    return () => {
      document.body.style.background = originalStyle;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepteConfidentialite) {
      toast.error("❌ Tu dois accepter la politique de confidentialité.");
      return;
    }
    if (password.length < 6) {
      toast.error("❌ Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const userData = { name, email, password, role: formattedRole, specialite };
    try {
      await inscriptionUtilisateur(userData);
      toast.success("✅ Inscription réussie !");
      history.push("/auth/login");
    } catch (error) {
      toast.error("❌ Une erreur s'est produite lors de l'inscription.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-start justify-center px-4"
      style={{
        background: "linear-gradient(90deg, #4F46E5 0%, #7E22CE 100%)",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-start items-start justify-end h-full">
          <div
            className="w-full lg:w-4/12 px-4 flex justify-end"
            style={{ marginTop: "10px", marginRight: "3rem" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col break-words w-full max-w-md mb-6 shadow-2xl rounded-3xl bg-white border-0"
              style={{ borderRadius: '2rem' }}
            >
              <div className="flex-auto px-4 lg:px-10 py-6 text-sm">
                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <h6 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4F46E5" }}>
                      {translations[lang].title}
                    </h6>
                    <hr className="mt-3 border-b-1 border-blueGray-300" />
                  </div>

                  {/* Nom */}
                  <div className="mb-2">
                    <label className="block uppercase text-black text-sm font-semibold mb-1">
                      {translations[lang].name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translations[lang].placeholderName}
                      className="border px-3 py-2 rounded text-sm shadow w-full focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-2">
                    <label className="block uppercase text-black text-sm font-semibold mb-1">
                      {translations[lang].email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={translations[lang].placeholderEmail}
                      className="border px-3 py-2 rounded text-sm shadow w-full focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  {/* Mot de passe */}
                  <div className="mb-2">
                    <label className="block uppercase text-black text-sm font-semibold mb-1">
                      {translations[lang].password}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={translations[lang].placeholderPassword}
                        className="border px-3 py-2 pr-12 rounded text-sm shadow w-full focus:outline-none focus:ring"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                  
                      </button>
                    </div>
                  </div>

                  {/* Rôle */}
                  <div className="mb-2">
                    <label className="block uppercase text-black text-sm font-semibold mb-1">
                      {translations[lang].role}
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className={`border px-3 py-2 rounded text-sm shadow w-full focus:outline-none focus:ring ${
                        role ? "text-black" : "text-gray-400"
                      }`}
                    >
                      <option value="" disabled>
                        {translations[lang].chooseRole}
                      </option>
                      <option value="etudiant">{translations[lang].etudiant}</option>
                      <option value="enseignant">{translations[lang].enseignant}</option>
                    </select>
                  </div>

                  {/* Spécialité */}
                  <div className="mb-2">
                    <label className="block uppercase text-black text-sm font-semibold mb-1">
                      {translations[lang].specialite}
                    </label>
                    <input
                      type="text"
                      value={specialite}
                      onChange={(e) => setSpecialite(e.target.value)}
                      placeholder={translations[lang].placeholderSpecialite}
                      className="border px-3 py-2 rounded text-sm shadow w-full focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  {/* Politique de confidentialité */}
                  <div className="mb-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accepteConfidentialite}
                        onChange={(e) => setAccepteConfidentialite(e.target.checked)}
                        className="form-checkbox border bg-white rounded ml-1 w-4 h-4 focus:outline-none"
                        required
                      />
                      <span className="ml-2 text-sm font-medium text-blueGray-600">
                        {translations[lang].accept}{" "}
                        <a href="#!" className="text-indigo-600 hover:text-indigo-800">
                          {translations[lang].policy}
                        </a>
                      </span>
                    </label>
                  </div>

                  {/* Bouton */}
                  <div className="text-center mt-4">
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
                      {translations[lang].create}
                    </motion.button>
                  </div>
                </form>

                {/* Liens bas */}
                <div className="flex flex-wrap mt-2">
                  <div className="w-1/2">
                    <Link to="/auth/forget" className="text-indigo-600 hover:text-indigo-800 text-sm">
                      <small>{translations[lang].forgot}</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-800 text-sm">
                      <small>{translations[lang].login}</small>
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
