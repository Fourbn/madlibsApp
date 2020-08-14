import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCbCf_NllK9ML_D04soZXCQ9U7EoE1ZQaY",
   authDomain: "madlibs-app.firebaseapp.com",
   databaseURL: "https://madlibs-app.firebaseio.com",
   projectId: "madlibs-app",
   storageBucket: "madlibs-app.appspot.com",
   messagingSenderId: "1077558462525",
   appId: "1:1077558462525:web:fa7882737ab0b920e5c254"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;