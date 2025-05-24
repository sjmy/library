function Book(title, author, pages) {
    // This is a way of checking to see if the variable was declared using new.
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;

    this.info = function() {
        if (this.isRead) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
        };
    };
};

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
console.log(theHobbit.info());