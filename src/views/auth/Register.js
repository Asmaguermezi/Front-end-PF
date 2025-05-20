import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import { inscriptionUtilisateur } from "../../services/ApiUser";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepteConfidentialite) {
      alert("❌ Tu dois accepter la politique de confidentialité.");
      return;
    }

    if (password.length < 6) {
      alert("❌ Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Met la première lettre du rôle en majuscule
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const userData = { name, email, password, role: formattedRole, specialite };

    try {
      const response = await inscriptionUtilisateur(userData);
      console.log(response.data);
      alert("✅ Inscription réussie !");
      history.push("/auth/login");
    } catch (error) {
      alert("❌ Une erreur s'est produite lors de l'inscription.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #43cea2, #185a9d)",
      }}
    >
    
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-black text-xl font-bold">{translations[lang].title}</h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  {/* Nom */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-black text-xs font-bold mb-2">
                      {translations[lang].name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translations[lang].placeholderName}
                      className="border px-3 py-3 rounded text-sm shadow w-full focus:outline-none focus:ring"
                      required
                    />
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
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={translations[lang].placeholderPassword}
                        className="border px-3 py-3 pr-12 rounded text-sm shadow w-full focus:outline-none focus:ring"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Rôle */}
                  <div className="relative w-full mb-3">
                    <label htmlFor="role" className="block uppercase text-black text-xs font-bold mb-2">
                      {translations[lang].role}
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className={`border px-3 py-3 rounded text-sm shadow w-full focus:outline-none focus:ring ${
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
                  <div className="relative w-full mb-3">
                    <label htmlFor="specialite" className="block uppercase text-black text-xs font-bold mb-2">
                      {translations[lang].specialite}
                    </label>
                    <input
                      id="specialite"
                      type="text"
                      value={specialite}
                      onChange={(e) => setSpecialite(e.target.value)}
                      placeholder={translations[lang].placeholderSpecialite}
                      className="border px-3 py-3 rounded text-sm shadow w-full focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  {/* Politique de confidentialité */}
                  <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accepteConfidentialite}
                        onChange={(e) => setAccepteConfidentialite(e.target.checked)}
                        className="form-checkbox border bg-white rounded ml-1 w-5 h-5 focus:outline-none"
                        required
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        {translations[lang].accept}{" "}
                        <a href="#!" className="text-lightBlue-500">
                          {translations[lang].policy}
                        </a>
                      </span>
                    </label>
                  </div>

                  {/* Bouton */}
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="w-full text-white font-semibold rounded-lg py-3 shadow-md focus:outline-none transition-all duration-150 text-base"
                      style={{
                        background: "linear-gradient(to right, #43cea2, #185a9d)",
                      }}
                    
                    >
                      {translations[lang].create}
                    </button>
                  </div>
                </form>

                {/* Liens bas */}
                <div className="flex flex-wrap mt-2">
                  <div className="w-1/2">
                    <Link to="/auth/forget" className="text-lightBlue-500">
                      <small>{translations[lang].forgot}</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/login" className="text-black">
                      <small>{translations[lang].login}</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}