import React, { useState, useEffect } from "react";
import { getMonProfil, updateUtilisateurAvecImage } from "services/ApiUser";
import { toast } from "react-toastify";

export default function CardProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMonProfil();
        setUser(res.data);
        setFormData(res.data);
        if (res.data.image) {
          setImagePreview(`http://localhost:5000/files/${res.data.image}?t=${Date.now()}`);
        }
      } catch (err) {
        console.error("❌ Erreur récupération profil :", err.response?.data || err.message);
      }
    };
    fetchUser();
  }, []);

  const handleImageAutoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await updateUtilisateurAvecImage(user._id, form);
      setUser(res.data);
      setFormData(res.data);
      setImagePreview(`http://localhost:5000/files/${res.data.image}?t=${Date.now()}`);
      toast.success("📸 Image mise à jour automatiquement !");
    } catch (error) {
      toast.error("❌ Erreur lors de la mise à jour de l'image");
      console.error("Erreur upload auto image :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Ajouter uniquement les champs nécessaires
    form.append("name", formData.name || "");
    form.append("email", formData.email || "");
    form.append("specialite", formData.specialite || "");

    try {
      const res = await updateUtilisateurAvecImage(user._id, form);
      setUser(res.data);
      setFormData(res.data);
      setEditMode(false);
      toast.success("✅ Informations mises à jour !");
    } catch (error) {
      toast.error("❌ Erreur lors de la mise à jour");
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(user);
    setImagePreview(`http://localhost:5000/files/${user.image}`);
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return editMode ? (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 p-6">
      <h3 className="text-xl font-semibold mb-4">Modifier Profil</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-blueGray-600 capitalize mb-1">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageAutoUpload}
            className="mb-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        {["name", "email", "specialite"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-blueGray-600 capitalize mb-1">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
            />
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 px-5 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-lightBlue-500 text-white font-semibold rounded hover:bg-lightBlue-600 transition"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-3/12 px-4 flex justify-center">
            <div className="relative">
              <img
                alt="..."
                src={`http://localhost:5000/files/${user.image}`}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 text-center mt-20">
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
              {user.name}
            </h3>
            <p className="text-sm text-blueGray-400">{user.email}</p>
            <p className="text-sm text-blueGray-400">{user.specialite}</p>
          </div>
        </div>

        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="w-full lg:w-9/12 px-4 mx-auto">
            <button
              onClick={() => setEditMode(true)}
              className="inline-block px-6 py-3 bg-lightBlue-500 text-white font-semibold rounded-md shadow hover:bg-lightBlue-600 transition"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
