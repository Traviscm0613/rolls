// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClC6QLVoSF8aSeDr7gS7cwavNWLOCd-fU",
  authDomain: "rocky-mountain-rolls.firebaseapp.com",
  projectId: "rocky-mountain-rolls",
  storageBucket: "rocky-mountain-rolls.firebasestorage.app",
  messagingSenderId: "953087171248",
  appId: "1:953087171248:web:5afa477880eb2cf0b2f975",
  measurementId: "G-X2B2NCHSQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ============================
// SAVE EMAIL FUNCTION
// ============================
function saveEmail() {
    const email = document.getElementById("email_field").value.trim();

    if (!email) {
        alert("Please enter an email.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email.");
        return;
    }

    db.collection("emails").add({
        email: email,
        timestamp: new Date()
    })
    .then(() => {
        alert("Email saved successfully!");
        document.getElementById("email_field").value = "";
    })
    .catch((error) => {
        console.error("Error saving email: ", error);
        alert("There was an error saving the email.");
    });
}