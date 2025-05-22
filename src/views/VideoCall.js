import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { getMessagesBySessionId } from "../services/ApiMessage.js";
import { IoMdSend } from "react-icons/io";

const socket = io("http://localhost:5000");

export default function VideoCall() {
  const { sessionId } = useParams();
  const history = useHistory();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false); // ✅
  const [showChat, setShowChat] = useState(false); // ✅ chat caché par défaut
  const [handRaised, setHandRaised] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const localVideoRef = useRef();
  const userVideoStream = useRef();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!sessionId) return;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      userVideoStream.current = stream;

      socket.emit("join-room", sessionId, socket.id);

      socket.on("user-connected", (userId) => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current.push({ peerID: userId, peer });
        setPeers((prev) => [...prev, { id: userId, peer }]);
      });

      socket.on("signal", ({ from, signal }) => {
        const item = peersRef.current.find(p => p.peerID === from);
        if (item) {
          item.peer.signal(signal);
        } else {
          const peer = addPeer(signal, from, stream);
          peersRef.current.push({ peerID: from, peer });
          setPeers((prev) => [...prev, { id: from, peer }]);
        }
      });

      socket.on("user-disconnected", (userId) => {
        peersRef.current = peersRef.current.filter(p => p.peerID !== userId);
        setPeers((prev) => prev.filter(p => p.id !== userId));
      });
    });

    getMessagesBySessionId(sessionId)
      .then((data) => setMessages(data))
      .catch((err) => console.error("Erreur chargement messages :", err));

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("update-participants", (userList) => {
      setParticipants(userList);
    });

    return () => socket.disconnect();
  }, [sessionId]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (signal) => {
      socket.emit("signal", { to: userToSignal, from: callerID, signal });
    });
    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (signal) => {
      socket.emit("signal", { to: callerID, from: socket.id, signal });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const msg = { sessionId, sender: "Moi", message: newMessage };
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    }
  };

  const handleLeaveCall = () => {
    if (userVideoStream.current) {
      userVideoStream.current.getTracks().forEach(track => track.stop());
    }
    socket.disconnect();
    history.push("/landing");
  };

  const toggleScreenShare = async () => {
    if (!isSharingScreen) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        localVideoRef.current.srcObject = screenStream;
        setIsSharingScreen(true);

        screenTrack.onended = () => {
          window.location.reload(); // recharge la page pour revenir à la webcam
        };
      } catch (error) {
        console.error("Erreur partage écran :", error);
      }
    } else {
      window.location.reload(); // pour annuler le partage
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 🎥 Partie vidéo */}
      <div className="flex-1 flex flex-col items-center justify-start bg-black overflow-y-auto py-4">
        {/* Vidéo locale */}
        <div className="flex flex-col items-center mb-4">
          <video ref={localVideoRef} autoPlay muted className="rounded-lg w-[70%] max-w-3xl h-64 object-cover" />
          <div className="mt-2 text-white">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Moi ({socket.id?.slice(0, 5)})
          </div>
        </div>

        {/* Vidéos des autres utilisateurs */}
        {peers.map((p) => (
          <Video key={p.id} peer={p.peer} userId={p.id} />
        ))}

        {/* Contrôles */}
        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={() => setIsAudioOn(!isAudioOn)} className={`p-3 rounded-full ${isAudioOn ? "bg-green-500" : "bg-red-500"} text-white`}>
            {isAudioOn ? "🎤" : "🔇"}
          </button>
          <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-3 rounded-full ${isVideoOn ? "bg-green-500" : "bg-red-500"} text-white`}>
            {isVideoOn ? "🎥" : "📷"}
          </button>
          <button onClick={toggleScreenShare} className={`p-3 rounded-full ${isSharingScreen ? "bg-blue-600" : "bg-gray-500"} text-white`}>
            📺
          </button>
          <button onClick={() => setShowChat(!showChat)} className="p-3 rounded-full bg-gray-600 text-white">
            💬
          </button>
          <button onClick={() => setHandRaised(!handRaised)} className="p-3 rounded-full bg-yellow-500 text-white">
            ✋
          </button>
          <button onClick={handleLeaveCall} className="p-3 rounded-full bg-red-600 text-white font-bold">
            ❌ Quitter
          </button>
        </div>
      </div>

      {/* 💬 Partie chat (affiché si showChat = true) */}
      {showChat && (
        <div className="w-80 bg-white border-l border-gray-300 flex flex-col">
          <div className="p-4 border-b font-bold text-lg flex justify-between">
            💬 Chat
            <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-black">✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-blue-100 p-2 rounded text-sm flex justify-between items-center">
                <div>
                  <strong>{msg.sender}</strong> : {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              className="flex-1 border rounded px-2 py-1"
              placeholder="Écris un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition duration-200 flex items-center justify-center"
            >
              <IoMdSend size={20} className="text-white" />
            </button>
          </div>
          {/* 👥 Participants connectés */}
          <div className="p-4 border-t">
            <div className="font-semibold mb-2">👥 Participants</div>
            <ul className="space-y-1 text-sm text-gray-700 max-h-32 overflow-y-auto">
              {participants.map((p, i) => (
                <li key={i}>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {p === socket.id ? "Moi" : `User ${p.slice(0, 5)}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎥 Composant vidéo utilisateur distant
function Video({ peer, userId }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div className="flex flex-col items-center mb-4">
      <video playsInline autoPlay ref={ref} className="rounded-lg w-[70%] max-w-3xl h-64 object-cover" />
      <div className="mt-2 text-white">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
        {userId ? userId.slice(0, 5) : "Utilisateur"}
      </div>
    </div>
  );
}
