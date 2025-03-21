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
  // console.log('title', book.title);
  // console.log('author', book.author);
  // console.log('pages', book.pages);
}

function createBook() {
  const id = crypto.randomUUID();
  const title = prompt('Enter Book Title');
  const author = prompt('Enter Book Author');
  const pages = prompt('Enter Book Pages');
  const newBook = new Book(id, title, author, pages);
  addBookToLibrary(newBook);
  displayBook(newBook);
  // const readStatus = prompt('Book Read (yes/no)', readStatus);
  // update display table??
}

const addBookButton = document.getElementById('add-book-button');
const tableDiv = document.getElementById('table-container');
const bookTable = document.createElement('table');

addBookButton.addEventListener('click', () => {
  createBook();
});

const headers = ['Title', 'Author', 'Pages'];
const headerRow = createTableHeaders(headers);

function createTableHeaders() {
  const headerRow = document.createElement('tr');
  headers.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  return headerRow;  
}

bookTable.appendChild(headerRow);
tableDiv.appendChild(bookTable);

function displayBook(book) {
  // build book table listing
  const addRow = document.createElement('tr');
  const titleCell = document.createElement('td');
  const authorCell = document.createElement('td');
  const pagesCell = document.createElement('td');

  titleCell.textContent = book.title;
  authorCell.textContent = book.author;
  pagesCell.textContent = book.pages;

  addRow.appendChild(titleCell);
  addRow.appendChild(authorCell);
  addRow.appendChild(pagesCell);

  bookTable.appendChild(addRow);
}