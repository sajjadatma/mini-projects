// Book Class: Represent a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI Class: Handle UI Tasks
class UI {
  static displayBook() {
    const books = Store.getbooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  // add Book
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</td>
    `;
    list.appendChild(row);
  }

  // remvoe book element
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      // for reaching tr we should reach parent of a => td and parent of td => tr
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    // add class to div
    div.className = `alert alert-${className} text-center mt-3`;
    // appendchild message text to div
    div.appendChild(document.createTextNode(message));
    // get container
    const container = document.querySelector('#container');
    // get form
    const card = document.querySelector('.card');
    // insert div (alert message) befor form
    container.insertBefore(div, card);

    // remove alert after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // clear fields after enter book details
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}
//Store Class:Handle Storage

class Store {
  static getbooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBooks(book) {
    const books = Store.getbooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBooks(isbn) {
    const books = Store.getbooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event:Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

//EVENT:Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Fill all fields', 'warning');
  } else {
    // make a object from Book Class
    const existingBook = Store.getbooks();
    let existed = false;
    if (existingBook) {
      existed = existingBook.some((book) => book.isbn === isbn);
    }
    if (existed) {
      UI.showAlert('Book Alredy Exist', 'warning');
    } else {
      const book = new Book(title, author, isbn);
      // Add Book To List
      UI.addBookToList(book);
      // add book to store
      Store.addBooks(book);
      //show success alert
      UI.showAlert('Book Added', 'success');
      //ClearFields
      UI.clearFields();
    }
  }
});

//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    UI.deleteBook(e.target);
    Store.removeBooks(
      e.target.parentElement.previousElementSibling.textContent
    );
    UI.showAlert('Book Deleted', 'danger');
  }
});
