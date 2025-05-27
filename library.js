const myLibrary = [];
const addNewBookDialog = document.querySelector(".addNewBook");
const addNewBookForm = document.querySelector("form");
const showAddNewBookDialog = document.querySelector(".addButton");
const confirmAddNewBook = document.querySelector(".confirmButton")
const cancelAddNewBook = document.querySelector(".cancelButton");

// Book Constructor
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

// Checks if book exists in myLibrary (name and author match), if not creates book
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

    // The delete button event listener only starts once there are books in the library
    startDeleteButtonListener();
};

// Deletes book from myLibrary
function deleteBookFromLibrary(id) {
    for (n = 0; n < myLibrary.length; n++) {
        if (myLibrary[n].id == id) {
            myLibrary.splice(n, 1);
        };
    };
};

// Creates and displays the HTML table
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

        newRow.insertCell().innerHTML = `<button type="button" class="deleteRow" data-id="${myLibrary[book].id}">Delete</button>`
    };
};


// Event Listeners

// The delete button event listener only starts once there are books in the library
function startDeleteButtonListener() {
    const deleteButtons = document.querySelectorAll(".deleteRow");

    for (n = 0; n < deleteButtons.length; n++) {
        const button = deleteButtons[n];
        
        button.addEventListener("click", (e) => {
            if (e.target.dataset.id == button.dataset.id) {
                const row = e.target.parentElement.parentElement;
                deleteBookFromLibrary(e.target.dataset.id);
                row.remove();
            };
        });
    };
};

// "Add a new book!" button opens dialog when clicked
showAddNewBookDialog.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

// "Confirm" button sends book data to the library, closes dialog and resets the form when clicked
confirmAddNewBook.addEventListener("click", (e) => {
    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    const bookPages = document.querySelector("#bookPages").value;
    const bookIsRead = document.querySelector("input[type=radio]:checked").value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookIsRead);
    
    e.preventDefault();
    addNewBookDialog.close();
    addNewBookForm.reset();
});

// "Cancel" button closes dialog and resets the form when clicked
cancelAddNewBook.addEventListener("click", () => {
    addNewBookDialog.close();
    addNewBookForm.reset();
});



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Somehow I Manage", "Michael Scott", 31);
addBookToLibrary("Case Closed, Jake Open", "Jake Peralta", 99);
console.table(myLibrary);