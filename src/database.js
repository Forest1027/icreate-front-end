import firebase from "firebase";

const databaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://icreate-3ce57-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(databaseConfig)
export const databaseRef = firebase.database()
