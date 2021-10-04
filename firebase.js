const firebase = require("firebase");
require('firebase/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyAHedaDs3Ulm-r4K3WM91TDfboli-Lirxk",
    authDomain: "chepobin-6c246.firebaseapp.com",
    projectId: "chepobin-6c246",
    storageBucket: "chepobin-6c246.appspot.com",
    messagingSenderId: "280053095614",
    appId: "1:280053095614:web:eae552e91c10db4c3b52ef",
    measurementId: "G-6DPRQRST44"
}

firebase.initializeApp(firebaseConfig);
module.exports = firebase;
