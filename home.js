// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
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
const db = getFirestore(app);

// Form Elements
const infoForm = document.getElementById("infoForm");
const reviewForm = document.getElementById("reviewForm");
const tableBody = document.getElementById("contactTableBody");
const reviewTableBody = document.getElementById("reviewTableBody");

// Save Data to Firestore
async function saveEmail(firstName, lastName, email, address) {
    try {
        await addDoc(collection(db, "emails"), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            timestamp: new Date()
        });


        //Error handling
        alert("Information saved successfully!");
    } catch (error) {
        console.error("Error saving document:", error);
        alert("Error saving information. Check the console.");
    }
}
async function saveReview(review) {
    try {
        await addDoc(collection(db, "reviews"), {
            review: review,
            timestamp: new Date()
        });


        //Error handling
        alert("Information saved successfully!");
    } catch (error) {
        console.error("Error saving document:", error);
        alert("Error saving information. Check the console.");
    }
}





// Form Submission
infoForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.getElementById("first").value.trim();
    const lastName = document.getElementById("last_field").value.trim();
    const email = document.getElementById("email_field").value.trim();
    const address = document.getElementById("address_field").value.trim();

    // Email Validation
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    // Add Row to Table
    const row = document.createElement("tr");

    //this creates the html for the results of the form
    row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${address}</td>
        
    `;

    tableBody.appendChild(row);

    // Save contact info to Firestore
    await saveEmail(
        firstName,
        lastName,
        email,
        address
    );
    
    // Clear Form
    infoForm.reset();
});

//This is for the review form, its a copy of the last one.
reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const review = document.getElementById("review_field").value.trim();
    
    const row = document.createElement("tr");
    
    row.innerHTML = `
    <td>${review}</td>
    `;

    reviewTableBody.appendChild(row);

    // Save review to Firestone
    await saveReview(review);

    reviewForm.reset();
});