const myLibrary = [];

function Book(id, title, author, pages, readStatus) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

function createBook() {
  const id = crypto.randomUUID();
  const title = prompt('Enter Book Title');
  const author = prompt('Enter Book Author');
  const pages = prompt('Enter Book Pages');
  const readStatus = prompt('Read (yes/no)');
  const newBook = new Book(id, title, author, pages, readStatus);
  addBookToLibrary(newBook);
}

const addBookButton = document.getElementById('add-book-button');
const tableContainer = document.getElementById('table-container');

addBookButton.addEventListener('click', () => {
  createBook();
});

// Initialize
setupTable();
initializeLibrary();
displayLibrary();

function setupTable() {
  tableContainer.innerHTML = '';

  const bookTable = document.createElement('table');
  bookTable.id = 'book-table';

  const headers = ['Title', 'Author', 'Pages', 'Read Status'];
  const headerRow = document.createElement('tr');

  headers.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  bookTable.appendChild(headerRow);
  tableContainer.appendChild(bookTable);
}

function displayLibrary() {
  const bookTable = document.getElementById('book-table');
  while (bookTable.rows.length > 1) {
    bookTable.deleteRow(1);
  }

  myLibrary.forEach(book => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const readStatusCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readStatusCell.textContent = book.readStatus;

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(readStatusCell);

    bookTable.appendChild(row);
  });
}

function initializeLibrary() {
  const book1 = new Book(crypto.randomUUID(), 'The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read');
  const book2 = new Book(crypto.randomUUID(), 'The Fellowship of the Ring', 'J.R.R. Tolkien', '423 pages', 'not read');
  const book3 = new Book(crypto.randomUUID(), 'The Two Towers', 'J.R.R. Tolkien', '352 pages', 'not read');
  const book4 = new Book(crypto.randomUUID(), 'The Return of the King', 'J.R.R. Tolkien', '416 pages', 'not read');

  myLibrary.push(book1, book2, book3, book4)
}

