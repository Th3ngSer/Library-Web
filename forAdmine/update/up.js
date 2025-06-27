// Your SheetDB API URL
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/4hl0xnupewmhn";

// Store the original ISBN for updating
let originalISBN = "";

// Step 1: Check if the book exists by ISBN
async function checkBook() {
  const searchISBN = document.getElementById("searchISBN").value;

  if (!searchISBN) {
    alert("Please enter an ISBN to search.");
    return;
  }

  try {
    // Fetch the book by ISBN
    const response = await fetch(
      `${SHEETDB_API_URL}/search?isbn=${encodeURIComponent(searchISBN)}`
    );
    const data = await response.json();

    if (data.length > 0) {
      // Book found, show the update form
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";

      // Store the original ISBN for updating
      originalISBN = searchISBN;

      // Pre-fill the form with existing data
      const book = data[0];
      document.getElementById("bookISBN").value = book.isbn;
      document.getElementById("bookTitle").value = book.title;
      document.getElementById("bookAuthor").value = book.author;
      document.getElementById("bookLink").value = book.link;
      document.getElementById("bookImage").value = book.image;
      document.getElementById("bookType").value = book.type; // Pre-fill type
      document.getElementById("bookDescription").value = book.description;
    } else {
      alert("Book not found. Please check the ISBN and try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Step 2: Update the book
document
  .getElementById("updateForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const newISBN = document.getElementById("bookISBN").value;
    const newTitle = document.getElementById("bookTitle").value;
    const newAuthor = document.getElementById("bookAuthor").value;
    const newLink = document.getElementById("bookLink").value;
    const newImage = document.getElementById("bookImage").value;
    const newType = document.getElementById("bookType").value; // Get type value
    const newDescription = document.getElementById("bookDescription").value;

    if (
      newISBN &&
      newTitle &&
      newAuthor &&
      newLink &&
      newImage &&
      newType &&
      newDescription
    ) {
      try {
        // Update the book using the SheetDB API
        const updateResponse = await fetch(
          `${SHEETDB_API_URL}/isbn/${encodeURIComponent(originalISBN)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                isbn: newISBN,
                title: newTitle,
                author: newAuthor,
                link: newLink,
                image: newImage,
                type: newType, // Include type in the update
                description: newDescription,
              },
            }),
          }
        );

        // Log the response for debugging
        const responseData = await updateResponse.json();
        console.log("API Response:", responseData);

        if (updateResponse.ok) {
          alert("Book updated successfully!");
          document.getElementById("updateForm").reset(); // Clear the form
          document.getElementById("step2").style.display = "none";
          document.getElementById("step1").style.display = "block";
        } else {
          alert("Failed to update book. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  });
