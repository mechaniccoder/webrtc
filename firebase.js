import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHUfP1IiRz_hDd0lTaoQ_VIf8dsQjvYuA",
  authDomain: "webrtc-baf08.firebaseapp.com",
  projectId: "webrtc-baf08",
  storageBucket: "webrtc-baf08.appspot.com",
  messagingSenderId: "782266328353",
  appId: "1:782266328353:web:75a30d22306f61548c0a60",
};

export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
}
