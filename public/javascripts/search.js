const bookCardTemplate = document.querySelector("[data-book-template]")
const bookCardContainer = document.querySelector("[data-book-cards-container]")
const searchInput = document.querySelector("[data-search]")

let books = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  books.forEach(book => {
    const isVisible =
	book.title.toLowerCase().includes(value) ||
	book.authorName.toLowerCase().includes(value)
    book.element.classList.toggle("hide", !isVisible)
  })
})


fetch("http://localhost:3000/books/all")
  .then(res => res.json())
  .then(data => {
    books = data.map(book => {
      const card = bookCardTemplate.content.cloneNode(true).children[0] // Clones data-book-templates child element <starts with index 0>
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
	  const link = card.querySelector("[data-link]")
      header.textContent = book.title
      body.textContent = book.authorName
	  link.innerHTML = `<a href=/books/${book.id}>View Book</a>`
      bookCardContainer.append(card)
      return { title: book.title, authorName: book.authorName, bookID: book.bookID, element: card }
    })
  })