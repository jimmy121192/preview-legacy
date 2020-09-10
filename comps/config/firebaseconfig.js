import * as firebase from 'firebase';

const config ={
    apiKey: "AIzaSyAr9lc9MXxT4hbqJiEVqJlTukgdyaVw9IQ",
    authDomain: "previews-13469.firebaseapp.com",
    databaseURL: "https://previews-13469.firebaseio.com",
    projectId: "previews-13469",
    storageBucket: "previews-13469.appspot.com",
    messagingSenderId: "283703508344"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();