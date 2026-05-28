// ============================
// FIREBASE INITIALIZATION
// ============================
const firebaseConfig = {
    apiKey: "AIzaSyClC6QLVoSF8aSeDr7gS7cwavNWLOCd-fU",
    authDomain: "rocky-mountain-rolls.firebaseapp.com",
    projectId: "rocky-mountain-rolls",
    storageBucket: "rocky-mountain-rolls.firebasestorage.app",
    messagingSenderId: "953087171248",
    appId: "1:953087171248:web:5afa477880eb2cf0b2f975",
    measurementId: "G-X2B2NCHSQ5"
};

// Initialize Firebase (CDN version)
firebase.initializeApp(firebaseConfig);

// Firestore reference
const db = firebase.firestore();


// ============================
// SAVE EMAIL FUNCTION
// ============================
function saveEmail() {
    const emailField = document.getElementById("email_field");
    const email = emailField.value.trim();

    // Basic validation
    if (!email) {
        alert("Please enter an email.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email.");
        return;
    }

    // Save to Firestore
    db.collection("emails")
        .add({
            email: email,
            timestamp: new Date()
        })
        .then(() => {
            alert("Email saved successfully!");
            emailField.value = "";
        })
        .catch((error) => {
            console.error("Error saving email: ", error);
            alert("There was an error saving the email.");
        });
}