window.saveEmail = async () => {
  const email = document.getElementById("email_field").value.trim();

  if (!email) {
    alert("Please enter an email first.");
    return;
  }

  await setDoc(doc(db, "emails", email), {
    email,
    timestamp: new Date()
  });

  alert("Saved to Firebase!");
};