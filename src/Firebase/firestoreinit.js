import firebase from 'firebase';
  
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBpxTDPiSS7xGfNfTWhK7GmBog2pL9Xg_Q",
    authDomain: "fb-cloudfirestore-test.firebaseapp.com",
    projectId: "fb-cloudfirestore-test",
    storageBucket: "fb-cloudfirestore-test.appspot.com",
    messagingSenderId: "842286893948",
    appId: "1:842286893948:web:555ca66404e92edb6472f9"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;