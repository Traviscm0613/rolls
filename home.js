// ============================
// FIREBASE CONFIG
// Replace with your Firebase project settings
// ============================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ============================
// SAVE EMAIL FUNCTION
// ============================
function saveEmail() {
    const email = document.getElementById("email_field").value.trim();

    if (email === "") {
        alert("Please enter an email.");
        return;
    }

    // Basic email validation
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