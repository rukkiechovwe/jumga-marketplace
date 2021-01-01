import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD6-PHt9HYknKs9UtWxFzmqH4Fg0PZC5bU",
  authDomain: "jumga-marketplace.firebaseapp.com",
  projectId: "jumga-marketplace",
  storageBucket: "jumga-marketplace.appspot.com",
  messagingSenderId: "924105883521",
  appId: "1:924105883521:web:0518996072cef08b00b280",
};
export default firebase.initializeApp(firebaseConfig);
