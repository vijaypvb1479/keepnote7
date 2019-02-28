  import * as firebase from 'firebase';
  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAY0zad0wwiNkctQG73uQjdP6YQnIt2wA",
    authDomain: "notesapp-442c4.firebaseapp.com",
    databaseURL: "https://notesapp-442c4.firebaseio.com",
    projectId: "notesapp-442c4",
    storageBucket: "notesapp-442c4.appspot.com",
    messagingSenderId: "718354294143"
  };
  firebase.initializeApp(config);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

   
  export {firebase ,googleProvider};
