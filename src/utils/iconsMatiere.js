// utils/iconsMatiere.js
export const getIconForMatiere = (nom) => {
    const lowerNom = nom.toLowerCase();
    if (lowerNom.includes("math")) return "fas fa-square-root-alt";
    if (lowerNom.includes("prog")) return "fas fa-code";
    if (lowerNom.includes("réseau")) return "fas fa-network-wired";
    if (lowerNom.includes("web")) return "fas fa-laptop-code";
    if (lowerNom.includes("ia") || lowerNom.includes("intel")) return "fas fa-robot";
    if (lowerNom.includes("cloud")) return "fas fa-cloud";
    if (lowerNom.includes("cyber")) return "fas fa-shield-alt";
    if (lowerNom.includes("arabe")) return "fas fa-book-open";
    return "fas fa-book";
  };
  