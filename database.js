const Database = require("better-sqlite3");
const prompt = require("prompt-sync")();

const db = new Database("database.db");

// Create table if not exists
db.prepare(`
    CREATE TABLE IF NOT EXISTS books (
        title TEXT,
        pages INTEGER,
        read INTEGER
    )
`).run();

let choice = 0;

while (choice !== 5) {
    console.log("Select an option");
    console.log("1) Add a new book");
    console.log("2) Delete a book");
    console.log("3) Show all Books");
    console.log("4) Read a book");
    console.log("5) Exit");

    choice = Number(prompt("> "));

    if (choice === 1) {
        const title = prompt("Enter book name: ");
        const pages = Number(prompt("Enter number of pages: "));
        const read = 0;

        db.prepare("INSERT INTO books VALUES (?, ?, ?)").run(title, pages, read);
        console.log("Book added");

    } else if (choice === 2) {
        const title = prompt("Enter the book to remove: ");

        const result = db.prepare("DELETE FROM books WHERE title = ?").run(title);

        if (result.changes === 0) {
            console.log("ERROR! Book does not exist");
        } else {
            console.log("Book deleted");
        }

    } else if (choice === 3) {
        const rows = db.prepare("SELECT * FROM books ORDER BY title").all();

        rows.forEach(record => {
            console.log(`${record.title}\t${record.pages}\t${record.read}`);
        });

    } else if (choice === 4) {
        const records = db.prepare("SELECT title, read FROM books ORDER BY title").all();

        records.forEach((r, i) => {
            console.log(`${i + 1}) ${r.title}`);
        });

        const index = Number(prompt("> ")) - 1;
        const selected = records[index];

        if (!selected) {
            console.log("Invalid choice");
            continue;
        }

        db.prepare("UPDATE books SET read = ? WHERE title = ?")
          .run(selected.read + 1, selected.title);

        console.log("Marked as read");
    }
}

console.log("Goodbye");