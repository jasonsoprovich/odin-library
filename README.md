# odin-library
The Odin Project - Library

## Project: Library

This project is a simple Library application that allows users to manage a collection of books. Key features include:

- **Book Management**: Users can add new books by providing details such as title, author, number of pages, and read status.
- **Display Functionality**: The library displays all books in a structured format, either as a table or individual cards.
- **Unique Identification**: Each book is assigned a unique `id` using `crypto.randomUUID()`, ensuring stable identification for management operations.
- **Status Toggle**: Users can change the read status of a book directly from its display.
- **Removal Capability**: Books can be removed from the library, with DOM elements associated to their respective book objects via data-attributes.

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-library) curriculum, aiming to reinforce object constructors, DOM manipulation, and user interaction handling in JavaScript.