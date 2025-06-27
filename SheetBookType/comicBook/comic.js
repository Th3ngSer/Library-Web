class BookManager {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn"; // Your SheetDB API URL
    // this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";
    this.allBooks = []; // Store all books fetched from the sheet
    this.displayedBooks = 10; // Number of books to display initially
    this.booksPerPage = 10; // Number of books to load each time "See More" is clicked
  }

  // Fetch books from Google Sheet
  async fetchBooks() {
    try {
      const response = await fetch(this.SHEETDB_API_URL);
      const data = await response.json();
      this.allBooks = data; // Store all books

      // Filter books with type "comic"
      this.allBooks = this.allBooks.filter((book) => {
        return book.type && book.type.toLowerCase() === "comic";
      });

      this.renderBooks(this.allBooks.slice(0, this.displayedBooks)); // Render initial set of books
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books. Please try again.");
    }
  }

  // Render books in the container
  renderBooks(books) {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = ""; // Clear existing content

    if (books.length === 0) {
      // If no books are found, display a message
      booksContainer.innerHTML = `<p class="no-books-message">No books found matching your search.</p>`;
      return;
    }

    // Loop through the books and create book cards
    books.forEach((book) => {
      const bookCard = this.createBookCard(book);
      booksContainer.appendChild(bookCard); // Add the card to the container
    });

    // Add the show functionality to the newly created book cards
    this.addShowFunctionality();

    // Show or hide the "See More" button based on the number of books
    const seeMoreButton = document.getElementById("seeMoreButton");
    if (this.displayedBooks >= this.allBooks.length) {
      seeMoreButton.style.display = "none"; // Hide the button if all books are displayed
    } else {
      seeMoreButton.style.display = "block"; // Show the button if there are more books to display
    }
  }

  // Create a book card element
  createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <div class="book-image">
        <img src="${book.image || "../../picforweb/book.jpg"}" alt="${
      book.title
    }" />
      </div>
      <div class="book-details cc1">
        <h3 class="book-title">${book.title || "No Title"}</h3>
        <p class="book-author">By ${book.author || "Unknown Author"}</p>
        <div class="book-rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <span>(245 reviews)</span>
        </div>
        <p class="book-description">${
          book.description || "No description available."
        }</p>
        <a href="${
          book.link || "#"
        }" target="_blank" class="add-to-cart-btn cc goToReadBtn">
          <i class="fa-solid fa-book"></i> GO to Read
        </a>
      </div>
    `;
    return bookCard;
  }

  // Add the show functionality to book cards
  addShowFunctionality() {
    const cards = document.querySelectorAll(".book-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isCurrentlyShown = card.classList.contains("show");

        cards.forEach((c) => c.classList.remove("show"));
        document
          .querySelectorAll(".book-image")
          .forEach((img) => img.classList.remove("show"));

        if (!isCurrentlyShown) {
          card.classList.add("show");
          document.body.style.overflow = "hidden";
          const image = card.querySelector(".book-image");
          if (image) image.classList.add("show");
        } else {
          document.body.style.overflow = "";
        }
      });
    });
  }

  // Load more books when "See More" is clicked
  loadMoreBooks() {
    this.displayedBooks += this.booksPerPage; // Increase the number of displayed books
    this.renderBooks(this.allBooks.slice(0, this.displayedBooks)); // Render the updated set of books
  }

  // Initialize the BookManager
  init() {
    document
      .getElementById("seeMoreButton")
      .addEventListener("click", () => this.loadMoreBooks());

    // Fetch and display books when the page loads
    this.fetchBooks();
  }
}

// Create an instance of BookManager and initialize it
const bookManager = new BookManager();
bookManager.init();
