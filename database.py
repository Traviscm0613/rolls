import sqlite3

connection = sqlite3.connect("database")
cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS books (title TEXT, pages INTEGER, read INTEGER)")

choice = None
while choice != 5:
    print("Select an option")
    print("1) Add a new book")
    print("2) Delete a book")
    print("3) Show all Books")
    print("4) Read a book")
    print("5) Exit")

    choice = input("> ")
    if choice == 1:
        pass
    elif choice == 2:
        pass
    elif choice == 3:
        pass
    elif choice == 4:
        pass