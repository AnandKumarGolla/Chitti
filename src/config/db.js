// db.js

import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyBIeAUT1Tjku0lN8RAfLD23MoX0vHQV8WA",
  authDomain: "chitti-a47d0.firebaseapp.com",
  databaseURL: "https://chitti-a47d0.firebaseio.com",
  projectId: "chitti-a47d0",
  storageBucket: "",
  messagingSenderId: "37934067421"
};
let app = Firebase.initializeApp(config);
export const db = app.database();