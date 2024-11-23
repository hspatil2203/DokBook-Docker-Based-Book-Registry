let books = [];

// Load books from localStorage
document.addEventListener('DOMContentLoaded', () => {
  loadBooksFromLocalStorage();
  displayBooks();
});

// Handle Add Book form submission
document.getElementById('addBookForm')?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Create a new book object
  const book = {
    bookId: Date.now().toString(),
    bookName: document.getElementById('bookName').value,
    authorName: document.getElementById('authorName').value,
    quantity: parseInt(document.getElementById('quantity').value),
    status: document.getElementById('status').value,
  };
  
  // Add the new book to the books array
  books.push(book);
  
  // Save the books array to localStorage
  saveBooksToLocalStorage();
  
  // Clear the form and redirect to home page
  clearForm();
  window.location.href = 'index.html';
});

// Handle Edit Book form submission
document.getElementById('editBookForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve the book ID and updated details
  const bookId = document.getElementById('bookId').value;
  const updatedBook = {
    bookId,
    bookName: document.getElementById('bookName').value,
    authorName: document.getElementById('authorName').value,
    quantity: parseInt(document.getElementById('quantity').value),
    status: document.getElementById('status').value,
  };

  // Find the index of the book to update
  const bookIndex = books.findIndex(book => book.bookId === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = updatedBook;

    // Save the updated books array to localStorage
    saveBooksToLocalStorage();

    // Redirect to home page
    window.location.href = 'index.html';
  }
});

// Handle book deletion
function deleteBook(bookId) {
  books = books.filter(book => book.bookId !== bookId);

  // Save the updated books array to localStorage
  saveBooksToLocalStorage();

  // Display the updated list of books
  displayBooks();
}

// Search books by query
document.getElementById('searchInput')?.addEventListener('input', function() {
  searchBooks(this.value);
});

// Sort books by name or quantity
function sortBooks(attribute) {
  if (attribute === 'name') {
    books.sort((a, b) => a.bookName.localeCompare(b.bookName));
  } else if (attribute === 'quantity') {
    books.sort((a, b) => a.quantity - b.quantity);
  }
  displayBooks();
}

// Display the list of books
function displayBooks() {
  const bookList = document.getElementById('bookList');
  if (!bookList) return;

  bookList.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${book.bookName}</strong> by ${book.authorName} (Qty: ${book.quantity}) 
      - <em>${book.status}</em>
      <button onclick="editBook('${book.bookId}')">Edit</button>
      <button onclick="deleteBook('${book.bookId}')">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

// Edit book details (Redirect to the edit page with pre-filled values)
function editBook(bookId) {
  // Redirect to the edit page with the book ID in the query string
  window.location.href = `edit-book.html?bookId=${bookId}`;
}

// Search through books based on user input
function searchBooks(query) {
  const filteredBooks = books.filter(book => {
    return book.bookId.toLowerCase().includes(query.toLowerCase()) ||
           book.bookName.toLowerCase().includes(query.toLowerCase()) ||
           book.authorName.toLowerCase().includes(query.toLowerCase());
  });

  displayFilteredBooks(filteredBooks);
}

// Display filtered books based on the search query
function displayFilteredBooks(filteredBooks) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${book.bookName}</strong> by ${book.authorName} (Qty: ${book.quantity}) 
      - <em>${book.status}</em>
      <button onclick="editBook('${book.bookId}')">Edit</button>
      <button onclick="deleteBook('${book.bookId}')">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

// Save books array to localStorage
function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Load books from localStorage
function loadBooksFromLocalStorage() {
  const booksData = localStorage.getItem('books');
  if (booksData) {
    books = JSON.parse(booksData);
  }
}

// Clear the form
function clearForm() {
  document.getElementById('addBookForm')?.reset();
}



//These are added in the last:


document.addEventListener('DOMContentLoaded', () => {
  loadBooksFromLocalStorage();
});

// Dynamic search input listener
document.getElementById('searchInput')?.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  if (query) {
    const filteredBooks = books.filter(book =>
      book.bookName.toLowerCase().includes(query) ||
      book.authorName.toLowerCase().includes(query)
    );
    displaySearchResults(filteredBooks);
  } else {
    clearSearchResults();
  }
});

// Display search results dynamically
function displaySearchResults(filteredBooks) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (filteredBooks.length === 0) {
    resultsContainer.innerHTML = '<p>No matching books found.</p>';
    return;
  }

  filteredBooks.forEach(book => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('search-result-item');
    resultItem.innerHTML = `
      <p><strong>${book.bookName}</strong> by ${book.authorName}</p>
    `;
    resultsContainer.appendChild(resultItem);
  });
}

// Clear search results
function clearSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
}

// Load books from localStorage
function loadBooksFromLocalStorage() {
  const booksData = localStorage.getItem('books');
  if (booksData) {
    books = JSON.parse(booksData);
  }
}
