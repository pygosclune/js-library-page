const modal = document.getElementById("add-book");
const switchButton = document.getElementById("show-modal");
let modalSwitch = false;

function switchModal() {
    modalSwitch = !modalSwitch;
    if (modalSwitch) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

const myLibrary = [];
let bookIndex = 0;

function updateBooks(book) {
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
    });

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("card");
    bookDiv.setAttribute("data-id", bookIndex);
    const titleString = document.createElement("h3");
    titleString.textContent = book.title;
    const authorString = document.createElement("h4");
    authorString.textContent = book.author;
    const pagesString = document.createElement("p");
    pagesString.textContent = book.pages;

    buttonsDiv.appendChild(isReadCheckbox);
    buttonsDiv.appendChild(deleteButton);
    bookDiv.appendChild(buttonsDiv);
    bookDiv.appendChild(titleString);
    bookDiv.appendChild(authorString);
    bookDiv.appendChild(pagesString);
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
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let isRead = document.getElementById("isRead").checked;

        let newBook = new Book(title, author, pages, isRead);
        myLibrary.push(newBook);
        console.log(myLibrary); // DEBUG
        updateBooks(newBook);
        bookIndex++;
        form.reset();
    });
});
