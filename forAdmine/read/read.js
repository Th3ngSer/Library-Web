class BookManager {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";
    this.init();
  }

  async fetchBooks() {
    try {
      console.log("Fetching books from:", this.SHEETDB_API_URL);
      const response = await fetch(this.SHEETDB_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);

      if (!data || data.length === 0) {
        throw new Error("No books found in the sheet.");
      }

      this.renderBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books. Please check the console for details.");
    }
  }

  renderBooks(books) {
    const tbody = document.querySelector("#bookTable tbody");
    tbody.innerHTML = "";

    books.forEach((book) => {
      const row = this.createTableRow(book);
      tbody.appendChild(row);
    });
  }

  createTableRow(book) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.isbn || "N/A"}</td>
        <td>${book.title || "N/A"}</td>
        <td>${book.author || "N/A"}</td>
        <td>
          ${
            book.link
              ? `<a href="${book.link}" target="_blank">View Link</a>`
              : "N/A"
          }
        </td>
        <td>
          ${
            book.image
              ? `<img src="${book.image}" alt="Book Image" width="100" />`
              : "N/A"
          }
        </td>
        <td>${book.type || "N/A"}</td>
        <td>${book.description || "N/A"}</td>
      `;
    return row;
  }

  init() {
    this.fetchBooks();
  }
}

const bookManager = new BookManager();
