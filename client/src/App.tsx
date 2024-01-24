import { io } from "socket.io-client";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

const socket = io("http://localhost:8900");

function App() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (!myVideo.current) return;
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id: string) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  // const callUser = (id: string) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (data) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name,
  //     });
  //   });

  //   peer.on("stream", (stream) => {
  //     if (!userVideo.current) return;
  //     userVideo.current.srcObject = stream;
  //   });

  //   socket.on("callAccepted", (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
  };

  return (
    <>
      <div className="">
        <h1>Zoomish</h1>
        <div className="grid grid-cols-[7fr_3fr]">
          <div className="grid grid-cols-[1fr_1fr] justify-center content-center ml-40 mt-40">
            {/* <div className="">{
              stream && <video playsInline muted ref={myVideo} autoPlay className="w-[300px]"/>
            }</div>
            <div className="">{
              callAccepted && !callEnded && <video playsInline muted ref={userVideo} autoPlay className="w-[300px]"/>
            }</div> */}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]"></div>
      </div>
    </>
  );
}

export default App;
