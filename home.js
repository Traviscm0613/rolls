
import { initializeApp } from "firebase/app";
import{ getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

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



/* form work */


const form = document.querySelector("#info_form");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const value = travelRange.value;

  // Show the travel notes on the form if they are choosing many campuses and require it
  if (value === 'many') {
    notesContainer.hidden = false;
    notes.required = true;
  }
  else {
    notesContainer.hidden = true;
    notes.required = false; 
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();


// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen < today;
}

function getSelectedCampuses() {
  //.from converts a NodeList into a real array, so then you can use .filter and .map
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value); 
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  // Let the user know if they choose many campuses but didn't put a note that they need to add a note
  if (type == 'many' && !notes) {
    output.textContent = 'Please add a travel note. Tell us how you will travel between campuses.';
    return
  }
  
  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a later date.";
    return;
  }

  output.innerHTML = `
  <h2>Preference Submitted</h2>
  <p>${firstName} ${lastName}</p>
  <p>Email: ${email}</p>
  <p>Availability: ${availableDate}</p>
  <p>Preference Level: ${type}</p>
  `;

  form.reset();
  updateNotesField();
});
          