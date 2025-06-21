// All Books are stored in the myLibrary array
const myLibrary = [];

// Button and form dialog variables for event listeners
const addNewBookDialog = document.querySelector(".addNewBook");
const addNewBookForm = document.querySelector("form");
const showAddNewBookDialog = document.querySelector(".addButton");
const confirmAddNewBook = document.querySelector(".confirmButton");
const cancelAddNewBook = document.querySelector(".cancelButton");

const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");

// Book class
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }

  toggleIsRead() {
    if (this.isRead == "Unread") {
      this.isRead = "Read";
    } else {
      this.isRead = "Unread";
    }
  }
}

// Checks if book exists in myLibrary (name and author match), if not creates book
function addBookToLibrary(title, author, pages, isRead = "Unread") {
  // Is there a better way to search for array objects? myLibrary.includes()?
  for (n = 0; n < myLibrary.length; n++) {
    if (myLibrary[n].title == title && myLibrary[n].author == author) {
      console.log("This book is already in the library!");
      return;
    }
  }

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

// Deletes book from myLibrary
function deleteBookFromLibrary(id) {
  for (n = 0; n < myLibrary.length; n++) {
    if (myLibrary[n].id == id) {
      myLibrary.splice(n, 1);
    }
  }
}

// Creates and displays the HTML table
function displayBooks() {
  const tblBody = document.querySelector("tbody");

  // Deletes all the table rows to ensure no duplicates are displayed
  const tblBodyRows = tblBody.rows.length;
  for (r = 1; r < tblBodyRows; r++) {
    tblBody.deleteRow(1);
  }

  // Create a new table row for each book in the library
  for (const book in myLibrary) {
    const newRow = tblBody.insertRow();

    // Create a new cell within the new row for each book property
    for (const property in myLibrary[book]) {
      // Ignore toggleIsRead function, we don't want to display it
      if (property == "toggleIsRead") {
        continue;
        // Add a button for the isRead property so the value can be toggled
      } else if (property == "isRead") {
        newRow.insertCell().innerHTML = `<button type="button" class="toggleIsRead" data-id="${myLibrary[book].id}">${myLibrary[book][property]}</button>`;
        continue;
      }

      newRow.insertCell().textContent = myLibrary[book][property];
    }

    newRow.insertCell().innerHTML = `<button type="button" class="deleteRow" data-id="${myLibrary[book].id}">Delete</button>`;
  }

  // The delete button and read/unread event listeners only starts once there are books in the library
  startDeleteButtonListener();
  startToggleIsReadButtonListener();
}

// Event Listeners

// The delete button event listener only starts once there are books in the library
function startDeleteButtonListener() {
  const deleteButtons = document.querySelectorAll(".deleteRow");

  for (n = 0; n < deleteButtons.length; n++) {
    const delButton = deleteButtons[n];

    delButton.addEventListener("click", (e) => {
      if (e.target.dataset.id == delButton.dataset.id) {
        const row = e.target.parentElement.parentElement;
        deleteBookFromLibrary(e.target.dataset.id);
        row.remove();
      }
    });
  }
}

// The read/unread event listener only starts once there are books in the library
function startToggleIsReadButtonListener() {
  const toggleIsReadButtons = document.querySelectorAll(".toggleIsRead");

  for (n = 0; n < toggleIsReadButtons.length; n++) {
    const readButton = toggleIsReadButtons[n];

    readButton.addEventListener("click", (e) => {
      if (e.target.dataset.id == readButton.dataset.id) {
        for (n = 0; n < myLibrary.length; n++) {
          if (e.target.dataset.id == myLibrary[n].id) {
            myLibrary[n].toggleIsRead();
            displayBooks();
          }
        }
      }
    });
  }
}

// Form Validation
// bookTitle, bookAuthor, and bookPages each have a function to check each constraint individually.
// Functions are attached to appropriate eventListeners.

function checkBookTitle() {
  if (bookTitle.validity.valueMissing) {
    bookTitle.setCustomValidity(
      "Book titles must have at least one character!"
    );
  } else {
    bookTitle.setCustomValidity("");
  }
}

function checkBookAuthor() {
  if (bookAuthor.validity.valueMissing) {
    bookAuthor.setCustomValidity(
      "Authors must have at least one character in their name!"
    );
  } else {
    bookAuthor.setCustomValidity("");
  }
}

function checkBookPages() {
  if (bookPages.validity.rangeUnderflow) {
    bookPages.setCustomValidity("The book must have at least one page!");
  } else if (bookPages.validity.stepMismatch) {
    bookPages.setCustomValidity("Whole numbers only, please!");
  } else {
    bookPages.setCustomValidity("");
  }
}

bookTitle.addEventListener("input", () => {
  checkBookTitle();
});

bookAuthor.addEventListener("input", () => {
  checkBookAuthor();
});

bookPages.addEventListener("input", () => {
  checkBookPages();
});

// "Add a new book!" button opens dialog when clicked
showAddNewBookDialog.addEventListener("click", () => {
  addNewBookDialog.showModal();
});

// "Confirm" button sends book data to the library, closes dialog and resets the form when clicked
confirmAddNewBook.addEventListener("click", (e) => {
  const bookIsRead = document.querySelector("input[type=radio]:checked");

  if (addNewBookForm.checkValidity()) {
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookIsRead.value
    );

    e.preventDefault();
    addNewBookDialog.close();
    addNewBookForm.reset();
  }
});

// "Cancel" button closes dialog and resets the form when clicked
cancelAddNewBook.addEventListener("click", () => {
  addNewBookDialog.close();
  addNewBookForm.reset();
});

// Initialize the library with a few books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Somehow I Manage", "Michael Scott", 31);
addBookToLibrary("Case Closed, Jake Open", "Jake Peralta", 99);
