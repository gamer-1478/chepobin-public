const firebase = require("firebase");
require('firebase/firestore')
const firebaseConfig = {
    //enter your firebase key here
}

firebase.initializeApp(firebaseConfig);
module.exports = firebase;
