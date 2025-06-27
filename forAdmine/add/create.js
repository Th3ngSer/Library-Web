class BookManager {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";
    this.init();
  }

  async isISBNUnique(isbn) {
    try {
      const response = await fetch(
        `${this.SHEETDB_API_URL}/search?isbn=${isbn}`
      );
      const data = await response.json();
      return data.length === 0;
    } catch (error) {
      console.error("Error checking ISBN:", error);
      return false;
    }
  }

  async handleFormSubmission(e) {
    e.preventDefault();

    const isbn = document.getElementById("bookISBN").value;
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const link = document.getElementById("bookLink").value;
    const image = document.getElementById("bookImage").value;
    const type = document.getElementById("bookType").value;
    const description = document.getElementById("bookDescription").value;

    if (isbn && title && author && link && image && type && description) {
      const isUnique = await this.isISBNUnique(isbn);

      if (!isUnique) {
        alert("ISBN already exists. Please use a unique ISBN.");
        return;
      }

      const newBook = {
        isbn,
        title,
        author,
        link,
        image,
        type,
        description,
      };

      try {
        const response = await fetch(this.SHEETDB_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [newBook] }),
        });

        console.log("Response status:", response.status);
        const responseData = await response.json();
        console.log("Response data:", responseData);

        if (response.ok) {
          alert("Book added successfully!");
          document.getElementById("createForm").reset();
        } else {
          alert(
            `Failed to add book. Error: ${
              responseData.error || "Unknown error"
            }`
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  }

  init() {
    document
      .getElementById("createForm")
      .addEventListener("submit", (e) => this.handleFormSubmission(e));
  }
}

const bookManager = new BookManager();
