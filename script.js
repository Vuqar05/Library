const library = []
const template = document.querySelector("template")
const bookTemplate = template.content.querySelector("div.book")
const booksContainer = document.querySelector(".books-container")


function Book(title, author, numberOfPages, isRead) {
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.isRead = isRead
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.numberOfPages}, ${this.isRead ? "read" : "not read yet"}`
    }
}

function addBookToLibrary(book) {
    let [title, author, pages, isRead] =
        [book.title, book.author, book.numberOfPages, book.isRead]

    let bookElement = bookTemplate.cloneNode(true)

    bookElement.querySelector(".title").innerText = title
    bookElement.querySelector(".author").innerText = author
    bookElement.querySelector(".pages").innerText = pages + " pages"

    let readStatus = bookElement.querySelector(".read-status")
    if (isRead) {
        readStatus.style.backgroundColor = "#EFC3E6"
        readStatus.innerText = "unread"
    }
    else {
        readStatus.style.backgroundColor = "#F0A6CA"
        readStatus.innerText = "read"
    }

    booksContainer.appendChild(bookElement)
}


// Create some book instances
initialBooks = [
new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
new Book("1984", "George Orwell", 328, true),
new Book("The Catcher in the Rye", "J.D. Salinger", 234, false),
new Book("The Grapes of Wrath", "John Steinbeck", 464, true),
new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
new Book("The Da Vinci Code", "Dan Brown", 689, false),
new Book("The Alchemist", "Paulo Coelho", 208, true),
new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, false),
]
// Add the books to the library array
initialBooks.forEach(book => library.push(book))

// Add the books to the DOM
library.forEach(book => addBookToLibrary(book))


// Add book dialog
const dialog = document.querySelector("dialog")
const titleField = dialog.querySelector(".title-field")
const authorField = dialog.querySelector(".author-field")
const pagesField = dialog.querySelector(".pages-field")
const readField = dialog.querySelector(".read-field")
const submitBookButton = dialog.querySelector("button")

function submitBook () {
    // Get input values
    const title = titleField.value;
    const author = authorField.value;
    const pages = pagesField.value;
    const isRead = readField.value;

    if (title && author && pages) {
        const book = new Book(title, author, pages, isRead)
        addBookToLibrary(book)

        titleField.value = null
        authorField.value = null
        pagesField.value = null
        readField.checked = false
        dialog.close()
    }

}


function changeReadStatus(readStatusDiv) {
    let currentStatus = readStatusDiv.innerText;
    if (currentStatus === "read") {
        readStatusDiv.innerText = "unread"
        readStatusDiv.style.backgroundColor = "#EFC3E6"
    }
    else {
        readStatusDiv.innerText = "read"
        readStatusDiv.style.backgroundColor = "#F0A6CA"
    }
}


document.addEventListener("click", e => {
    let target = e.target;
    let classList = target.classList;
    if (classList.contains("remove-book-button")) {
        target.parentNode.remove()
    }
    else if (classList.contains("close-dialogue-button")) {
        dialog.close()
    }
    else if (classList.contains("new-book-button")) {
        dialog.open = true;
    }
    else if (classList.contains("submit-book-button")){
        submitBook()
    }
    else if (classList.contains("read-status")) {
        changeReadStatus(target)
    }

})
