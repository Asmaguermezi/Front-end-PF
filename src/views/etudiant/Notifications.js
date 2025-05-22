import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNotifications } from "../../services/ApiNotification";
import { Bell, RefreshCw, Check, Trash2, Eye, EyeOff } from "lucide-react";

const styles = {
  mainContainer: {
    backgroundColor: "#f9fafb",
    padding: "2rem",
    minHeight: "100vh",
  },
  header: {
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "1.5rem",
  },
  pageTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#1e40af",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  actionsBar: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    alignItems: "center",
  },
  button: {
    background: "white",
    border: "1px solid #d1d5db",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: "#374151",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    borderLeft: "4px solid #3b82f6",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    transition: "transform 0.2s ease",
  },
  cardRead: {
    opacity: 0.6,
  },
  content: { flex: 1 },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,
    color: "#1f2937",
  },
  link: {
    marginTop: "0.5rem",
    display: "inline-block",
    color: "#2563eb",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
  linkDisabled: {
    marginTop: "0.5rem",
    display: "inline-block",
    color: "gray",
    fontWeight: 500,
    cursor: "not-allowed",
    textDecoration: "none",
  },
  date: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#6b7280",
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [readStatus, setReadStatus] = useState({});

  const loadNotifications = () => {
    setLoading(true);
    getAllNotifications()
      .then((data) => {
        setNotifications(data);
        const initial = {};
        data.forEach((n) => {
          if (!readStatus.hasOwnProperty(n._id)) {
            initial[n._id] = false;
          }
        });
        setReadStatus((prev) => ({ ...prev, ...initial }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement notifications :", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = (id) => setReadStatus((prev) => ({ ...prev, [id]: true }));
  const markAsUnread = (id) => setReadStatus((prev) => ({ ...prev, [id]: false }));
  const deleteNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  const markAllAsRead = () => {
    const updated = {};
    notifications.forEach((n) => (updated[n._id] = true));
    setReadStatus(updated);
  };

  const filtered = notifications.filter((n) => {
    if (filter === "read") return readStatus[n._id];
    if (filter === "unread") return !readStatus[n._id];
    return true;
  });

  return (
    <div style={styles.mainContainer}>
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>
          <Bell size={24} /> Notifications
        </h2>
      </div>

      <div style={styles.actionsBar}>
        <button style={styles.button} onClick={loadNotifications}>
          <RefreshCw className={loading ? "animate-spin" : ""} /> Actualiser
        </button>
        <button style={styles.button} onClick={markAllAsRead}>
          <Check /> Tout lire
        </button>
        <select
          style={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="read">Lues</option>
          <option value="unread">Non lues</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center mt-12">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-600 mt-12">Aucune notification</div>
      ) : (
        <ul style={styles.list}>
          {filtered.map((notif) => {
            console.log("✅ Notification ID:", notif._id, "SessionID:", notif.sessionId); // Debug
            return (
              <li
                key={notif._id}
                style={{
                  ...styles.card,
                  ...(readStatus[notif._id] ? styles.cardRead : {}),
                }}
              >
                <div style={styles.content}>
                  <div style={styles.headerContent}>
                    <h3>{notif.titre}</h3>
                    <span style={styles.date}>
                      {new Date(notif.date).toLocaleString()}
                    </span>
                  </div>
                  <p>{notif.contenu}</p>

                  {/* ✅ Redirection cliquable si sessionId existe */}
                  {notif.sessionId ? (
                    <Link
                      to={`/videocall/${notif.sessionId}`}
                      style={styles.link}
                    >
                      👉 Rejoindre la session
                    </Link>
                  ) : (
                    <span style={styles.linkDisabled}>
                      🔒 Session non disponible
                    </span>
                  )}
                </div>

                <div style={styles.actions}>
                  {readStatus[notif._id] ? (
                    <button
                      style={styles.iconBtn}
                      onClick={() => markAsUnread(notif._id)}
                      title="Marquer comme non lu"
                    >
                      <EyeOff />
                    </button>
                  ) : (
                    <button
                      style={styles.iconBtn}
                      onClick={() => markAsRead(notif._id)}
                      title="Marquer comme lu"
                    >
                      <Eye />
                    </button>
                  )}
                  <button
                    style={styles.iconBtn}
                    onClick={() => deleteNotification(notif._id)}
                    title="Supprimer"
                  >
                    <Trash2 />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
