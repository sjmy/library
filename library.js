const myLibrary = [];

// Constructor
function Book(title, author, pages) {
    // This is a way of checking to see if the variable was declared using new.
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.id = crypto.randomUUID();

    this.info = function() {
        if (this.isRead) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
        };
    };
};

function addBookToLibrary(title, author, pages) {
    // Is there a better way to search for array objects? myLibrary.includes()?
    for (n = 0; n < myLibrary.length; n++) {
        if (myLibrary[n].title == title) {
            console.log("This book is already in the library!");
            return;
        };
    };
    
    const new_book = new Book(title, author, pages);
    myLibrary.push(new_book);
    displayBooks();
};

function displayBooks() {
    const tblBody = document.querySelector("tbody");

    for (i = 0; i < 2; i++) {
        const row = document.createElement("tr");

        for (j = 0; j < 5; j++) {
            const cell = document.createElement("td");
            const book = myLibrary[i];
            row.appendChild(book.title);
        };

        tblBody.appendChild(row);
    };
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Somehow I Manage", "Michael Scott", 78);
console.table(myLibrary);