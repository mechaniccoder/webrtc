import firebase from "firebase";
import { initializeFirebase } from "./firebase";
import "./style.css";

let db;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const webcamBtn = document.getElementById("webcamBtn");
const localVideo = document.getElementById("videos__local");
const remoteVideo = document.getElementById("videos__remote");
const callBtn = document.getElementById("call");
const callInput = document.getElementById("callInput");

function webrtc() {
  const pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  webcamBtn.onclick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    console.log("success getting local stream ", localStream);
    remoteStream = new MediaStream();

    // localStream.getTracks().forEach((track) => {
    //   pc.addTrack(track, localStream);
    // });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;
  };

  callBtn.onclick = async () => {
    const callDoc = db.collection("calls").doc();
    // db.collection("calls").add({ test: "test" });
    const offerCandidates = callDoc.collection("offerCandidates");
    offerCandidates.add({ offer: 10 });
    const answerCandidates = callDoc.collection("answerCandidates");
    // callInput.value = callDoc.id;

    // pc.onicecandidate = (event) => {
    //   event.candidate && offerCandidates.add(event.candidate.toJSON());
    // };

    // const offerDescription = await pc.createOffer();
    // await pc.setLocalDescription(offerDescription);

    // const offer = {
    //   sdp: offerDescription.sdp,
    //   type: offerDescription.type,
    // };

    // await callDoc.set({ offer });
  };
}

function main() {
  db = initializeFirebase();
  webrtc();
}

main();
