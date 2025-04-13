class Book {
  constructor(id, title, author, pages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  toggleReadStatus() {
    this.readStatus = this.readStatus === 'yes';
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.updateLibrary();
  }

  initializeLibrary() {
    this.addBook(new Book(crypto.randomUUID(), 'The Hobbit', 'J.R.R. Tolkien', '295', 'yes'));
    this.addBook(new Book(crypto.randomUUID(), 'The Fellowship of the Ring', 'J.R.R. Tolkien', '423', 'yes'));
    this.addBook(new Book(crypto.randomUUID(), 'The Two Towers', 'J.R.R. Tolkien', '352', 'no'));
    this.addBook(new Book(crypto.randomUUID(), 'The Return of the King', 'J.R.R. Tolkien', '416', 'no'));
  }
  
  removeBook(book) {
    const confirmDelete = confirm(`Are you sure you want to delete '${book.title}'?`);
    if (confirmDelete) {
      this.books = this.books.filter(b => b.id !== book.id);
      this.updateLibrary();
    }
  }
  
  setupTable() {
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
  
  createBookRow(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <label class='switch'>
          <input type='checkbox' ${book.readStatus === 'yes' ? 'checked' : ''}>
          <span class='slider round'></span>
        </label>
        <span class='status-text'>${book.readStatus === 'yes' ? 'Read' : 'Unread'}</span>
        <span class='delete-button'>✖</span>
      </td>
    `;
    
    const toggleInput = row.querySelector(`input[type='checkbox']`);
    const statusText = row.querySelector(`.status-text`);
    toggleInput.addEventListener('change', () => {
      book.toggleReadStatus();
      statusText.textContent = book.readStatus === 'yes' ? 'Read' : 'Unread';
    });

    const deleteButton = row.querySelector(`.delete-button`);
    deleteButton.addEventListener('click', () => this.removeBook(book));

    return row;
  }
  
  updateLibrary() {
    const bookTable = document.getElementById('book-table');
 
    while (bookTable.rows.length > 1) {
      bookTable.deleteRow(1);
    }
 
    this.books.forEach(book => {
      const row = this.createBookRow(book);
      bookTable.appendChild(row);
    });
 
    const addRow = this.addRowElement();
    bookTable.appendChild(addRow);
  }

  addRowElement() {
    const addRow = document.createElement('tr');
    const addCell = document.createElement('td');
    addCell.colSpan = 4;
    addCell.innerHTML = '<button id="add-new-book">Add New Book</button>';
    addRow.appendChild(addCell);
    
    const addBookButton = addCell.querySelector('#add-new-book');
    addBookButton.addEventListener('click', () => {
      const dialog = document.querySelector('dialog');
      dialog.showModal();
    });

    return addRow;
  }
  
  initializeModal() {
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
        
        this.addBook(new Book(crypto.randomUUID(), title, author, pages, readStatus));
        bookForm.reset();
        dialog.close();
      });
      
      modalCancel.addEventListener('click', () => {
        bookForm.reset();
        dialog.close();
      });
    } 
  }
}

const library = new Library();
library.setupTable();
library.initializeLibrary();
library.updateLibrary();
library.initializeModal();