import React, { useEffect, useRef, useState } from "react";

const Videos = ({ socket }: { socket: any }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string | null>(
    null
  );
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getMediaDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const audioInputDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );

      setVideoDevices(videoInputDevices);
      setAudioDevices(audioInputDevices);

      if (videoInputDevices.length > 0) {
        setSelectedVideoDevice(videoInputDevices[0].deviceId); // Default to the first video device
      }
      if (audioInputDevices.length > 0) {
        setSelectedAudioDevice(audioInputDevices[0].deviceId); // Default to the first audio device
      }
    };

    getMediaDevices();
  }, []);

  useEffect(() => {
    const startConnection = async () => {
      // Access user's webcam and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: selectedVideoDevice
          ? { deviceId: { exact: selectedVideoDevice } }
          : true,
        audio: selectedAudioDevice
          ? { deviceId: { exact: selectedAudioDevice } }
          : true,
      });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      // Create a new RTCPeerConnection
      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      // Send ICE candidates to the signaling server
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("ice-candidate", event.candidate);
        }
      };
    };

    if (selectedVideoDevice && selectedAudioDevice) {
      startConnection();
    }

    // Handle WebSocket signaling
    socket.current.on("offer", async (offer) => {
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.current.emit("answer", answer);
    });

    socket.current.on("answer", async (answer) => {
      await peerConnectionRef.current.setRemoteDescription(answer);
    });

    socket.current.on("ice-candidate", async (candidate) => {
      if (candidate) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    });
  }, [socket]);

  const createOffer = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.current.emit("offer", offer);
  };

  return (
    <div>
      <h1>WebRTC Video Chat</h1>
      <div className="w-full max-w-sm">
        <div className="relative">
          <select
            id="video-select"
            value={selectedVideoDevice || ""}
            onChange={(e) => setSelectedVideoDevice(e.target.value)}
            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Video Device ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      </div>{" "}
      <div className="w-full max-w-sm">
        <div className="relative">
          <select
            id="video-select"
            value={selectedVideoDevice || ""}
            onChange={(e) => setSelectedVideoDevice(e.target.value)}
            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            {audioDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Audio Device ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <h2>Local Stream</h2>
        <video ref={localVideoRef} autoPlay playsInline muted />
      </div>
      <div>
        <h2>Remote Stream</h2>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <button onClick={createOffer}>Start Call</button>
    </div>
  );
};

export default Videos;
