const selectCategory = document.getElementById("searchCategory");

selectCategory.addEventListener("change", function () {
  const selectedValue = this.value;
  const arr = document.getElementById("book");
  const links = {
    all: "index.html",
    fiction: "../../SheetBookType/History/history.html",
    "non-fiction": "../../SheetBookType/comicBook/comic.html",
    science: "../../SheetBookType/science/science.html",
    history: "../../SheetBookType/KhmerBook/khmer.html",
  };
  if (links[selectedValue]) {
    window.location.href = links[selectedValue];
  }
});
