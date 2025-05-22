import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { getMessagesBySessionId } from "../services/ApiMessage.js";
import { 
  Mic, MicOff, Video, VideoOff, MessageSquare, 
  Users, Settings, MoreVertical, Hand, Monitor, 
  PhoneOff, Send, X, Copy, Share, Volume2, VolumeX
} from "lucide-react";

// Styles CSS en ligne pour forcer les couleurs sombres
const darkModeStyles = {
  mainContainer: {
    backgroundColor: "#111827",
    color: "white",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden"
  },
  header: {
    backgroundColor: "#1f2937",
    borderBottom: "1px solid #374151",
    padding: "1rem"
  },
  videoContainer: {
    backgroundColor: "#111827"
  },
  controlsBar: {
    backgroundColor: "rgba(31, 41, 55, 0.95)"
  }
};

const socket = io("http://localhost:5000");

export default function VideoCall() {
  const { sessionId } = useParams();
  const history = useHistory();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const localVideoRef = useRef();
  const userVideoStream = useRef();
  const [participants, setParticipants] = useState([]);

  // Nouveaux états pour l'interface améliorée
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("Connexion...");

  useEffect(() => {
    if (!sessionId) return;

    // Timer pour la durée de la réunion
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setMeetingDuration(elapsed);
    }, 1000);

    // Auto-hide controls
    const controlsTimer = setTimeout(() => setShowControls(false), 4000);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      userVideoStream.current = stream;
      setConnectionStatus("Connecté");

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

    return () => {
      clearInterval(timer);
      clearTimeout(controlsTimer);
      socket.disconnect();
    };
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

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const msg = { 
        sessionId, 
        sender: "Moi", 
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (userVideoStream.current?.getAudioTracks) {
      const audioTrack = userVideoStream.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = !isAudioOn;
    }
    socket.emit("toggle-audio", !isAudioOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (userVideoStream.current?.getVideoTracks) {
      const videoTrack = userVideoStream.current.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = !isVideoOn;
    }
    socket.emit("toggle-video", !isVideoOn);
  };

  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
    socket.emit("hand-raise", !handRaised);
  };

  const toggleScreenShare = async () => {
    if (!isSharingScreen) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        localVideoRef.current.srcObject = screenStream;
        setIsSharingScreen(true);

        screenTrack.onended = () => {
          window.location.reload();
        };
      } catch (error) {
        console.error("Erreur partage écran :", error);
      }
    } else {
      window.location.reload();
    }
  };

  const handleLeaveCall = () => {
    if (userVideoStream.current) {
      userVideoStream.current.getTracks().forEach(track => track.stop());
    }
    socket.disconnect();
    history.push("/landing");
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
    }
    return `${minutes}min ${secs.toString().padStart(2, '0')}s`;
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const ParticipantVideo = ({ peer, userId, isLocal = false }) => (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
      {isLocal ? (
        <video 
          ref={localVideoRef} 
          autoPlay 
          muted 
          className={`w-full h-full object-cover transition-all duration-300 ${
            isVideoOn ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'scaleX(-1)' }}
        />
      ) : (
        <RemoteVideo peer={peer} userId={userId} />
      )}
      
      {/* Overlay quand vidéo désactivée */}
      {((isLocal && !isVideoOn) || (!isLocal && !isVideoOn)) && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-xl font-bold">
                {isLocal ? "Vous" : userId?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <VideoOff className="w-6 h-6 text-white mx-auto opacity-60" />
          </div>
        </div>
      )}
      
      {/* Informations participant */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          {isLocal ? (
            isAudioOn ? (
              <Mic className="w-4 h-4 text-green-400" />
            ) : (
              <MicOff className="w-4 h-4 text-red-400" />
            )
          ) : (
            <Volume2 className="w-4 h-4 text-green-400" />
          )}
          <span className="text-white text-sm font-medium">
            {isLocal ? "Vous" : `Utilisateur ${userId?.slice(0, 5)}`}
          </span>
        </div>
        
        {handRaised && (
          <div className="bg-yellow-500 rounded-full p-1 animate-bounce">
            <Hand className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Indicateur de connexion */}
      <div className="absolute top-3 right-3">
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === "Connecté" ? "bg-green-500" : "bg-yellow-500"
        } animate-pulse`}></div>
      </div>
    </div>
  );

  return (
    <div style={darkModeStyles.mainContainer} className="h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <div style={darkModeStyles.header} className="border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold text-lg">Réunion #{sessionId?.slice(0, 8)}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === "Connecté" ? "bg-green-500" : "bg-yellow-500"
            }`}></div>
            <span>{connectionStatus}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyMeetingLink}
            className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">Partager</span>
          </button>
          <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Zone vidéo principale */}
      <div style={darkModeStyles.videoContainer} className={`flex-1 flex transition-all duration-300 ${
        showChat || isParticipantsOpen ? 'mr-80' : ''
      }`}>
        <div className="flex-1 p-6">
          <div className="grid gap-4 h-full" style={{
            backgroundColor: "#111827",
            gridTemplateColumns: peers.length === 0 ? '1fr' : 
                               peers.length === 1 ? 'repeat(2, 1fr)' :
                               peers.length <= 4 ? 'repeat(2, 1fr)' :
                               'repeat(3, 1fr)',
            gridTemplateRows: peers.length <= 2 ? '1fr' :
                           peers.length <= 4 ? 'repeat(2, 1fr)' :
                           'repeat(2, 1fr)'
          }}>
            {/* Vidéo locale */}
            <ParticipantVideo isLocal={true} />
            
            {/* Vidéos des participants */}
            {peers.map((p) => (
              <ParticipantVideo key={p.id} peer={p.peer} userId={p.id} />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-20 shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <h3 className="font-semibold text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
              Messages
            </h3>
            <button 
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{backgroundColor: "#1f2937"}}>
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-1 animate-fade-in">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="font-medium">{msg.sender}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 text-sm text-white shadow-sm">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{color: 'black'}}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Participants connectés */}
          <div className="p-4 border-t border-gray-700">
            <div className="font-semibold mb-2 text-white">👥 Participants</div>
            <ul className="space-y-1 text-sm text-gray-300 max-h-32 overflow-y-auto">
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

      {/* Participants Sidebar */}
      {isParticipantsOpen && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-20 shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <h3 className="font-semibold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              Participants ({participants.length + 1})
            </h3>
            <button 
              onClick={() => setIsParticipantsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{backgroundColor: "#1f2937"}}>
            {/* Utilisateur local */}
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Vous</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Vous</div>
                  <div className="text-xs text-blue-400">Organisateur</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {handRaised && <Hand className="w-4 h-4 text-yellow-400" />}
                {isAudioOn ? (
                  <Mic className="w-4 h-4 text-green-400" />
                ) : (
                  <MicOff className="w-4 h-4 text-red-400" />
                )}
                {isVideoOn ? (
                  <Video className="w-4 h-4 text-green-400" />
                ) : (
                  <VideoOff className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>

            {/* Autres participants */}
            {participants.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-700 bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {p.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-white">
                    Utilisateur {p.slice(0, 5)}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Volume2 className="w-4 h-4 text-green-400" />
                  <Video className="w-4 h-4 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contrôles en bas */}
      <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
        showControls ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div style={darkModeStyles.controlsBar} className="backdrop-blur-sm p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Informations de la réunion */}
            <div className="flex items-center space-x-4 text-white">
              <div className="text-sm">
                <div className="font-medium">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-gray-300 text-xs">{formatDuration(meetingDuration)}</div>
              </div>
            </div>

            {/* Contrôles principaux */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isAudioOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } transform hover:scale-105`}
                title={isAudioOn ? "Couper le micro" : "Activer le micro"}
              >
                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isVideoOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } transform hover:scale-105`}
                title={isVideoOn ? "Arrêter la caméra" : "Démarrer la caméra"}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleHandRaise}
                className={`p-3 rounded-full transition-all duration-200 ${
                  handRaised 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white animate-pulse' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } transform hover:scale-105`}
                title="Lever la main"
              >
                <Hand className="w-5 h-5" />
              </button>

              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isSharingScreen 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } transform hover:scale-105`}
                title="Partager l'écran"
              >
                <Monitor className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-full transition-all duration-200 ${
                  showChat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } transform hover:scale-105`}
                title="Chat"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isParticipantsOpen 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } transform hover:scale-105`}
                title="Participants"
              >
                <Users className="w-5 h-5" />
              </button>

              <button
                onClick={handleLeaveCall}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105 ml-4"
                title="Quitter la réunion"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

            {/* Informations participants */}
            <div className="text-white text-sm text-right">
              <div className="font-medium">{participants.length + 1} participants</div>
              <div className="text-gray-300 text-xs">Réunion active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone de clic pour afficher les contrôles */}
      <div 
        className="absolute inset-0 z-10"
        onClick={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
      />
    </div>
  );
}

// Composant pour les vidéos distantes
function RemoteVideo({ peer, userId }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <video 
      playsInline 
      autoPlay 
      ref={ref} 
      className="w-full h-full object-cover"
    />
  );
}
