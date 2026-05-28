// ============================
// FIREBASE CONFIG
// ============================
const firebaseConfig = {
    apiKey: "YOUR_REAL_API_KEY",
    authDomain: "rocky-mountain-rolls.firebaseapp.com",
    projectId: "rocky-mountain-rolls",
    storageBucket: "rocky-mountain-rolls.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ============================
// INITIALIZE FIREBASE (MODULAR)
// ============================
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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