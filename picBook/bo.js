// Define a class for handling book search and display
class BookSearch {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.resultsDiv = document.getElementById("results");
    this.searchInput = document.getElementById("searchInput");
    this.searchButton = document.getElementById("searchButton");
    this.initialize();
  }

  // Initialize event listeners
  initialize() {
    this.searchButton.addEventListener("click", () => this.handleSearch());
  }

  // Fetch data from the Open Library API
  async fetchBooks(query) {
    try {
      const response = await fetch(
        `${this.apiUrl}${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.docs;
    } catch (error) {
      this.displayError(`Error fetching data: ${error.message}`);
    }
  }

  // Handle the search operation
  async handleSearch() {
    const query = this.searchInput.value.trim();
    this.resultsDiv.innerHTML = ""; // Clear previous results

    if (!query) {
      this.displayError("Please enter a book title.");
      return;
    }

    const books = await this.fetchBooks(query);
    if (books && books.length > 0) {
      this.displayBooks(books);
    } else {
      this.displayError("No results found.");
    }
  }

  // Display the book results
  displayBooks(books) {
    books.slice(0, 10).forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "card";

      // Image logic (if available)
      const bookImage = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "../picforweb/jer1.jpg"; // Fallback image

      bookElement.innerHTML = `
          <img src="${bookImage}" alt="${book.title}" />
          <h2>${book.title}</h2>
          <p><strong>Author:</strong> ${
            book.author_name ? book.author_name.join(", ") : "Unknown"
          }</p>
          <p><strong>First Published:</strong> ${
            book.first_publish_year || "Unknown"
          }</p>
        `;

      this.resultsDiv.appendChild(bookElement);
    });
  }

  // Display error messages
  displayError(message) {
    this.resultsDiv.innerHTML = `<p>${message}</p>`;
  }
}

// Instantiate the BookSearch class and initialize it
const bookSearchApp = new BookSearch("https://openlibrary.org/search.json?q=");
