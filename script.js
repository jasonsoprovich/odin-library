const myLibrary = [];


function Book(id, title, author, pages) {
  // take params, create a book then store it in the array
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.readStatus = readStatus;
  // this.rating = rating;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayTable() {
  // build book table listing
}

function createBook() {
  const id = crypto.randomUUID();
  const title = prompt('Enter Book Title');
  const author = prompt('Enter Book Author');
  const pages = prompt('Enter Book Pages');
  const addBook = new Book(id, title, author, pages);
  addBookToLibrary(addBook)
  // const readStatus = prompt('Book Read (yes/no)', readStatus);
  // update display table??
}

const addBookButton = document.getElementById('add-book-button');

addBookButton.addEventListener('click', () => {
  createBook();
});