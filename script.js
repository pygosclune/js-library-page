const modal = document.getElementById("add-book");
const switchButton = document.getElementById("show-modal");
const noBooksError = document.getElementById("no-books-error");
let modalSwitch = false;

function switchModal() {
    modalSwitch = !modalSwitch;
    if (modalSwitch) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

let myLibrary = [];
let bookIndex = 0;

function populateLibrary(data) {
    localStorage.setItem("myLibrary", JSON.stringify(data));
}

function updateDataIds() {
    const bookDivs = document.querySelectorAll('.card');
    let counter = 0;
    bookDivs.forEach((div, index) => {
        div.setAttribute("data-id", index);
        counter++;
    });
    bookIndex = counter;
}

function updateBooks(book) {
    if (myLibrary.length > 0) noBooksError.style.display = "none";
    const cardsContainer = document.querySelector(".cards");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "card-buttons";
    const isReadCheckbox = document.createElement("input");
    isReadCheckbox.type = "checkbox";
    isReadCheckbox.className = "larger";
    isReadCheckbox.checked = book.isRead;
    isReadCheckbox.addEventListener("click", function () {
        book.isRead = isReadCheckbox.checked;
    });

    const deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash delete-icon";
    deleteButton.addEventListener("click", function () {
        const index = parseInt(bookDiv.getAttribute("data-id"), 10);
        myLibrary.splice(index, 1);
        bookDiv.remove();
        updateDataIds();
        populateLibrary(myLibrary);
        if (myLibrary.length === 0) noBooksError.style.display = "block";
    });

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("card");
    bookDiv.setAttribute("data-id", bookIndex);
    const titleString = document.createElement("h3");
    titleString.textContent = book.title;
    titleString.className = "book-title";
    const authorString = document.createElement("h4");
    authorString.textContent = book.author;
    authorString.className = "book-author";
    const pagesString = document.createElement("p");
    pagesString.textContent = book.pages;
    pagesString.className = "book-pages"

    buttonsDiv.appendChild(isReadCheckbox);
    buttonsDiv.appendChild(deleteButton);

    const contentDiv = document.createElement("div");
    contentDiv.className = "book-content";

    contentDiv.appendChild(titleString);
    contentDiv.appendChild(authorString);
    contentDiv.appendChild(pagesString);

    bookDiv.appendChild(buttonsDiv);
    bookDiv.appendChild(contentDiv);
    cardsContainer.appendChild(bookDiv);
}

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const isRead = document.getElementById("isRead").checked;

        const newBook = new Book(title, author, pages, isRead);
        myLibrary.push(newBook);
        updateBooks(newBook);
        bookIndex++;
        populateLibrary(myLibrary);
        form.reset();
    });

    if (localStorage.getItem("myLibrary")) {
        const storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary = storedLibrary;
        storedLibrary.map(book => {
            updateBooks(book);
        });
    }
});
