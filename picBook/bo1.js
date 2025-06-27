document.getElementById("searchButton").onclick = function () {
  // Get the book title from the input field
  var title = document.getElementById("searchInput").value;

  // If no title is entered, show an alert and stop
  if (title === "") {
    alert("Please enter a book title!");
    return;
  }

  // Make the API request using the search title
  var url = "https://openlibrary.org/search.json?q=" + title;

  // Fetch data from the API
  fetch(url)
    .then(function (response) {
      return response.json(); // Convert response to JSON format
    })
    .then(function (data) {
      // Check if there are results
      if (data.docs.length === 0) {
        document.getElementById("results").innerHTML = "No books found.";
        return;
      }

      // Get the first book from the results
      var book = data.docs[0];
      var title = book.title || "No title available";
      var author = book.author_name
        ? book.author_name[0]
        : "No author available";
      var year = book.first_publish_year || "No publication year available";

      // Get the book cover image URL (if available)
      var coverId = book.cover_i;
      var coverUrl = coverId
        ? "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg"
        : "https://via.placeholder.com/128x193.png?text=No+Image";

      // Display the book details with the cover image
      document.getElementById("results").innerHTML =
        "<h2>" +
        title +
        "</h2>" +
        "<p>Author: " +
        author +
        "</p>" +
        "<p>Published in: " +
        year +
        "</p>" +
        '<img src="' +
        coverUrl +
        '" alt="Book Cover" />';
    })
    .catch(function (error) {
      // If something goes wrong, show an error message
      console.log("Error:", error);
      document.getElementById("results").innerHTML = "Error fetching the data";
    });
};
