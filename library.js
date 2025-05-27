const myLibrary = [];
const addNewBookDialog = document.querySelector(".addNewBook");
const showAddNewBookDialog = document.querySelector(".addButton");
const confirmAddNewBook = document.querySelector(".confirmButton")
const cancelAddNewBook = document.querySelector(".cancelButton");

// Constructor
function Book(title, author, pages, isRead) {
    // This is a way of checking to see if the variable was declared using new.
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, isRead = "Unread") {
    // Is there a better way to search for array objects? myLibrary.includes()?
    for (n = 0; n < myLibrary.length; n++) {
        if (myLibrary[n].title == title && myLibrary[n].author == author) {
            console.log("This book is already in the library!");
            return;
        };
    };
    
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
};

// function checkID(newID) {
//     // Check to see if the book is already in the array
//     // Currently not working

//     const tblBody = document.querySelector("tbody");
    
//     for (i = 0; i < tblBody.rows.length; i++) {
//         const row = tblBody.rows[i];

//         for (j = 0; j < row.cells.length; j++) {
//             console.log(row.cells[j].textContent);
//             console.log(newID);
//             if (row.cells[j].textContent == newID) {
//                 return;
//             };
//         };
//     };
// };

function displayBooks() {
    const tblBody = document.querySelector("tbody");

    // Deletes all the table rows to ensure no duplicates are displayed
    const tblBodyRows = tblBody.rows.length;
    for (r = 1; r < tblBodyRows; r++) {
        tblBody.deleteRow(1);
    };

    // Create a new table row for each book in the library
    for (const book in myLibrary) {
        const newRow = tblBody.insertRow();

        // Create a new cell within the new row for each book property
        for (const property in myLibrary[book]) {
            newRow.insertCell().textContent = myLibrary[book][property];
        };
    };
};


// Event Listeners

showAddNewBookDialog.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

confirmAddNewBook.addEventListener("click", (e) => {
    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    const bookPages = document.querySelector("#bookPages").value;
    const bookIsRead = document.querySelector("input[type=radio]:checked").value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookIsRead);
    
    e.preventDefault();
});

cancelAddNewBook.addEventListener("click", () => {
    addNewBookDialog.close();
});



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Somehow I Manage", "Michael Scott", 31);
addBookToLibrary("Case Closed, Jake Open", "Jake Peralta", 99);
console.table(myLibrary);