class BookManager {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";
    this.init();
  }

  async deleteBook(isbn, title) {
    try {
      // Fetch the book by ISBN and title
      const response = await fetch(
        `${this.SHEETDB_API_URL}/search?isbn=${encodeURIComponent(
          isbn
        )}&title=${encodeURIComponent(title)}`
      );
      const data = await response.json();

      // Check if the book exists
      if (data.length > 0) {
        // Book found, delete it
        const deleteResponse = await fetch(
          `${this.SHEETDB_API_URL}/isbn/${encodeURIComponent(isbn)}`,
          {
            method: "DELETE",
          }
        );

        // Log the response for debugging
        const responseData = await deleteResponse.json();
        console.log("API Response:", responseData);

        if (deleteResponse.ok) {
          alert("Book deleted successfully!");
          document.getElementById("deleteForm").reset(); // Clear the form
        } else {
          alert("Failed to delete book. Please try again.");
        }
      } else {
        alert("Book not found. Please check the ISBN and title.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  async handleFormSubmission(e) {
    e.preventDefault();

    const isbn = document.getElementById("bookISBN").value;
    const title = document.getElementById("bookTitle").value;

    if (isbn && title) {
      await this.deleteBook(isbn, title);
    } else {
      alert("Please fill in all fields.");
    }
  }

  init() {
    document
      .getElementById("deleteForm")
      .addEventListener("submit", (e) => this.handleFormSubmission(e));
  }
}

const bookManager = new BookManager();
