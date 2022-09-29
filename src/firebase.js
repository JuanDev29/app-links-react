import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7t3IErLft1hlXsyw87bk-I7MNwkDb9gQ",
  authDomain: "crud-react-41bcc.firebaseapp.com",
  projectId: "crud-react-41bcc",
  storageBucket: "crud-react-41bcc.appspot.com",
  messagingSenderId: "794202792762",
  appId: "1:794202792762:web:420739cc8fda760b722603"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();