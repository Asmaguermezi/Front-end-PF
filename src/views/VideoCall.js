import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { getAllUtilisateurs } from "../services/ApiUser"; // ajuste si besoin

const API_MESSAGES = "http://localhost:5000/api/messages";
const GROUP_NAME = "etudiants";

export default function VideoCall() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [handRaised, setHandRaised] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const localVideoRef = useRef();
  const chatRef = useRef();
  const socket = useRef(null);

  const userId = localStorage.getItem("userId");

  // Connexion socket + réception en temps réel
  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("joinGroup", GROUP_NAME);

    socket.current.on("receiveMessage", (msg) => {
      console.log("📥 Nouveau message :", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Charger les utilisateurs (via axios)
  useEffect(() => {
    setLoadingUsers(true);
    getAllUtilisateurs()
      .then((res) => {
        setParticipants(res.data);
      })
      .catch((err) => {
        console.error("Erreur utilisateurs :", err.message);
      })
      .finally(() => setLoadingUsers(false));
  }, []);

  // Charger les anciens messages (uniquement au début)
  useEffect(() => {
    setLoadingMessages(true);
    fetch(API_MESSAGES)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Erreur chargement messages :", err))
      .finally(() => setLoadingMessages(false));
  }, []);

  // Scroll automatique
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Caméra locale
  useEffect(() => {
    async function setupMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: isAudioEnabled,
          video: isVideoEnabled,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.warn("Erreur caméra :", error.message);
      }
    }

    if (isVideoEnabled) setupMedia();
    else if (localVideoRef.current) localVideoRef.current.srcObject = null;
  }, [isAudioEnabled, isVideoEnabled]);

  // Envoyer message via socket
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      groupName: GROUP_NAME,
      sender: userId,
      message: newMessage,
    };

    socket.current.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const renderParticipant = (p) => (
    <div key={p._id} className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-32 h-32 bg-gray-800 rounded-full shadow-lg border-4 border-gray-700">
        {p._id === userId && isVideoEnabled ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-full"
          />
        ) : p.avatar ? (
          <img
            src={p.avatar}
            alt={p.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-5xl text-white font-bold">
            {p.name?.charAt(0).toUpperCase()}
          </span>
        )}
        {p.muted && (
          <span className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-1">
            <i className="fas fa-microphone-slash"></i>
          </span>
        )}
        {p._id === userId && handRaised && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-white rounded-full p-1">
            <i className="fas fa-hand-paper"></i>
          </span>
        )}
      </div>
      <span className="mt-2 text-white text-lg font-semibold drop-shadow-lg">
        {p.name}
      </span>
    </div>
  );

  const ControlButton = ({ onClick, active, color, icon, title }) => (
    <button
      onClick={onClick}
      className={`mx-2 p-4 rounded-full shadow-lg text-2xl focus:outline-none transition-all duration-200 ${
        active ? color : "bg-gray-700 hover:bg-gray-600"
      } text-white`}
      title={title}
    >
      <i className={`fas fa-${icon}`}></i>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Participants */}
        <div
          className={`flex-1 flex flex-col items-center justify-center ${
            showChat ? "lg:pr-80" : ""
          } transition-all duration-300`}
        >
          <div className="flex flex-wrap gap-12 justify-center items-center h-full">
            {loadingUsers ? (
              <span className="text-white">Chargement des utilisateurs...</span>
            ) : participants.length === 0 ? (
              <span className="text-white">Aucun participant</span>
            ) : (
              participants.map(renderParticipant)
            )}
          </div>
        </div>

        {/* Chat */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-xl z-30 transition-transform duration-300 ${
            showChat ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <span className="text-white font-bold text-lg">Messages</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-2"
            >
              {loadingMessages ? (
                <span className="text-white">Chargement des messages...</span>
              ) : messages.length === 0 ? (
                <span className="text-white">Aucun message</span>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className="bg-gray-800 text-white rounded-lg p-2"
                  >
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{msg.sender}</span>
                      <span>
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString().slice(0, 5)
                          : ""}
                      </span>
                    </div>
                    <div>{msg.message}</div>
                  </div>
                ))
              )}
            </div>
            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-gray-800 flex"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 rounded-l-lg p-2 bg-gray-700 text-white border-none focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Barre de contrôle */}
      <div className="w-full flex justify-center items-center py-6 bg-transparent absolute bottom-0 left-0 z-40">
        <div className="flex bg-black/70 rounded-full px-6 py-2 shadow-2xl border border-gray-700">
          <ControlButton onClick={() => setIsAudioEnabled(!isAudioEnabled)} active={!isAudioEnabled} color="bg-red-600" icon={isAudioEnabled ? "microphone" : "microphone-slash"} title={isAudioEnabled ? "Couper le micro" : "Activer le micro"} />
          <ControlButton onClick={() => setIsVideoEnabled(!isVideoEnabled)} active={!isVideoEnabled} color="bg-red-600" icon={isVideoEnabled ? "video" : "video-slash"} title={isVideoEnabled ? "Couper la caméra" : "Activer la caméra"} />
          <ControlButton onClick={() => setHandRaised(!handRaised)} active={handRaised} color="bg-yellow-500" icon="hand-paper" title={handRaised ? "Baisser la main" : "Lever la main"} />
          <ControlButton onClick={() => setShowChat(!showChat)} active={showChat} color="bg-blue-600" icon="comment-alt" title={showChat ? "Masquer le chat" : "Afficher le chat"} />
          <ControlButton onClick={() => window.location.href = "/"} active={false} color="bg-red-700" icon="phone-slash" title="Quitter l'appel" />
        </div>
      </div>
    </div>
  );
}
