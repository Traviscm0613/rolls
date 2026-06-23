
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





/* form work */

const form = document.getElementById("infoForm");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last_field").value;
    const email = document.getElementById("email_field").value;
    const address = document.getElementById("address_field").value;

    // if you want to add multiple infos
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${address}</td>
    `;

    // Add row to table
    tableBody.appendChild(row);

    // firestone whenever that works
    saveEmail();

    // clears form
    form.reset();
});




