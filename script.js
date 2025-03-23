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

function createBook(title, author, pages, readStatus) {
  const id = crypto.randomUUID();
  const newBook = new Book(id, title, author, pages, readStatus);
  addBookToLibrary(newBook);
}

function initializeLibrary() {
  const book1 = new Book(crypto.randomUUID(), 'The Hobbit', 'J.R.R. Tolkien', '295', 'yes');
  const book2 = new Book(crypto.randomUUID(), 'The Fellowship of the Ring', 'J.R.R. Tolkien', '423', 'yes');
  const book3 = new Book(crypto.randomUUID(), 'The Two Towers', 'J.R.R. Tolkien', '352', 'no');
  const book4 = new Book(crypto.randomUUID(), 'The Return of the King', 'J.R.R. Tolkien', '416', 'no');

  myLibrary.push(book1, book2, book3, book4);
}

function setupTable() {
  const tableContainer = document.getElementById('table-container');
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

    const readStatusContainer = document.createElement('div');
    readStatusContainer.classList.add('read-status-container');

    const readStatusText = document.createElement('span');
    readStatusText.textContent = book.readStatus;
    readStatusContainer.appendChild(readStatusText);
    
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '✖';
    readStatusContainer.appendChild(deleteButton);

    readStatusCell.appendChild(readStatusContainer);
    
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();

      const confirmDelete = confirm(`Are you sure you want to delete '${book.title}'?`);

      if (confirmDelete){
        const index = myLibrary.findIndex(b => b.id === book.id);
        if(index !== -1) {
          myLibrary.splice(index, 1);
          displayLibrary();
        }
      }
    });

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(readStatusCell);
    
    bookTable.appendChild(row);
  });
  
  const addRow = document.createElement('tr');
  const addCell = document.createElement('td');
  addCell.colSpan = 4;
  addCell.innerHTML = '<button id="add-new-book">Add New Book</button>';
  addRow.appendChild(addCell);
  bookTable.appendChild(addRow);
  
  const dialog = document.querySelector('dialog');
  const newBookButton = document.getElementById('add-new-book');
  newBookButton.addEventListener('click', () => {
    dialog.showModal();
  });  
}

function initializeModal() {
  const dialog = document.querySelector('dialog');
  const bookForm = document.getElementById('book-form');
  const modalCancel = dialog.querySelector('.modal-cancel');
  
  if (bookForm) {
    bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const readStatus = document.getElementById('read-status').value;
      
      createBook(title, author, pages, readStatus);
      bookForm.reset();
      dialog.close();
    })
    
    modalCancel.addEventListener('click', () => {
      bookForm.reset();
      dialog.close();
    });
  } 
}

setupTable();
initializeLibrary();
displayLibrary();
initializeModal();