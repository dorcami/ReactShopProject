import firebase from "firebase/app";
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOySYf9lWoyA7z0AAzEXGuJOPxHO6HyvE",
  authDomain: "reactfinal-de5f7.firebaseapp.com",
  projectId: "reactfinal-de5f7",
  storageBucket: "reactfinal-de5f7.appspot.com",
  messagingSenderId: "571345852555",
  appId: "1:571345852555:web:c1f6688f11f4d020bfdc8e"
};

  firebase.initializeApp(firebaseConfig)
  export default firebase;
