document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "AIzaSyC1nLm_Zt-Hdd_7G_g4e1oBYDe7cp8S7Ek";
  const booksContainer = document.querySelector(".books-container");
  const seeMoreButton = document.querySelector(".seeMore button");
  let startIndex = 0;
  const maxResults = 15;

  const oldCards = document.querySelectorAll(".book-card");
  oldCards.forEach((card) => {
    card.style.display = "none";
  });

  const search = "khmer";
  function fetchBooks(startIndex) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}&startIndex=${startIndex}&maxResults=${maxResults}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          data.items.forEach((item) => {
            const book = item.volumeInfo;
            const bookElement = document.createElement("div");
            bookElement.className = "book-card";

            const bookImage = document.createElement("div");
            bookImage.className = "book-image";
            const image = document.createElement("img");
            image.src = book.imageLinks
              ? book.imageLinks.thumbnail
              : "path/to/default/image.jpg";
            image.alt = book.title;
            bookImage.appendChild(image);

            const bookDetails = document.createElement("div");
            bookDetails.className = "book-details";

            const title = document.createElement("h3");
            title.className = "book-title";
            title.textContent =
              book.title.length > 15
                ? book.title.substring(0, 15) + "..."
                : book.title;

            const author = document.createElement("p");
            author.className = "book-author";
            author.textContent = `By ${
              book.authors
                ? book.authors.join(", ").substring(0, 18) + "..."
                : "Unknown Author"
            }`;

            const rating = document.createElement("div");
            rating.className = "book-rating";
            rating.innerHTML = `
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <span>(${book.ratingsCount || 0} reviews)</span>
            `;

            const description = document.createElement("p");
            description.className = "book-description";
            description.textContent = book.description
              ? book.description.substring(0, 25) + "..."
              : "No description available.";

            const button = document.createElement("a");
            button.className = "add-to-cart-btn";
            button.innerHTML = `<i class="fa-solid fa-book"></i> GO to Read`;

            if (book.previewLink) {
              button.href = book.previewLink;
              button.target = "_blank";
            } else {
              button.href = "#";
              button.onclick = (e) => {
                e.stopPropagation();
                alert("No preview available for this book.");
                return false;
              };
            }

            bookDetails.appendChild(title);
            bookDetails.appendChild(author);
            bookDetails.appendChild(rating);
            bookDetails.appendChild(description);
            bookDetails.appendChild(button);

            bookElement.appendChild(bookImage);
            bookElement.appendChild(bookDetails);

            booksContainer.appendChild(bookElement);
          });

          attachShowEventListeners();
        } else {
          seeMoreButton.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        booksContainer.innerHTML = "<p>Error loading books.</p>";
      });
  }

  fetchBooks(startIndex);

  seeMoreButton.addEventListener("click", () => {
    startIndex += maxResults;
    fetchBooks(startIndex);
  });
});

function attachShowEventListeners() {
  const cards = document.querySelectorAll(".book-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart-btn")) {
        return;
      }

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
