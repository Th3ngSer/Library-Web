class BookManager {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";
    this.allBooks = [];
    this.displayedBooks = 10;
    this.booksPerPage = 10;

    this.init();
  }

  async fetchBooks() {
    try {
      const response = await fetch(this.SHEETDB_API_URL);
      const data = await response.json();
      this.allBooks = data;
      this.renderBooks(this.allBooks.slice(0, this.displayedBooks));
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books. Please try again.");
    }
  }

  renderBooks(books) {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = "";

    if (books.length === 0) {
      booksContainer.innerHTML = `<p class="no-books-message">No books found.</p>`;
      return;
    }

    books.forEach((book) => {
      const bookCard = this.createBookCard(book);
      booksContainer.appendChild(bookCard);
    });

    this.addCardClickListeners();

    const seeMoreButton = document.getElementById("seeMoreButton");
    if (this.displayedBooks >= this.allBooks.length) {
      seeMoreButton.style.display = "none";
    } else {
      seeMoreButton.style.display = "block";
    }
  }

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

  addCardClickListeners() {
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

  filterBooks() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const searchCategory = document.getElementById("searchCategory").value;

    const filteredBooks = this.allBooks.filter((book) => {
      const matchesTitle = book.title
        ? book.title.toLowerCase().includes(searchInput)
        : false;
      const matchesAuthor = book.author
        ? book.author.toLowerCase().includes(searchInput)
        : false;
      const matchesCategory =
        searchCategory === "all" || book.category === searchCategory;
      return (matchesTitle || matchesAuthor) && matchesCategory;
    });

    this.displayedBooks = 10;
    this.renderBooks(filteredBooks.slice(0, this.displayedBooks));
  }

  loadMoreBooks() {
    this.displayedBooks += this.booksPerPage;
    this.renderBooks(this.allBooks.slice(0, this.displayedBooks));
  }

  init() {
    document
      .getElementById("searchButton")
      .addEventListener("click", () => this.filterBooks());
    document
      .getElementById("seeMoreButton")
      .addEventListener("click", () => this.loadMoreBooks());
    this.fetchBooks();
  }
}

const bookManager = new BookManager();
