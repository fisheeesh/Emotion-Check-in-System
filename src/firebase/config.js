import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAxkvcyPpGDnCQ0ImeTZwdLqfimjERn9hg",
    authDomain: "emotion-check-in-system.firebaseapp.com",
    projectId: "emotion-check-in-system",
    storageBucket: "emotion-check-in-system.appspot.com",
    messagingSenderId: "375472115987",
    appId: "1:375472115987:web:a7e4f9fc517e6fa62bcae6"
};

firebase.initializeApp(firebaseConfig)

let auth = firebase.auth()

export { auth }