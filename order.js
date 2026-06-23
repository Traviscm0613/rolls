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
