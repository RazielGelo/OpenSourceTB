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
      const card = bookCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = book.title
      body.textContent = book.authorName
      bookCardContainer.append(card)
      return { title: book.title, authorName: book.authorName, element: card }
    })
  })

// async function test() {
// 	const data = 
// 	await fetch("http://localhost:3000/books/all", {
// 		method: "GET"
// 	})
// 	console.log(data)
// }

// test()



// console.log(data)

// const deleteButton = document.getElementById('delete')
// const id = deleteButton.getAttribute("data-id")
// searchInput. = async (e) => {
// 	e.preventDefault() 	// do not trigger default functionality
// 	console.log(id)
// 	await fetch(`http://localhost:3000/books`, {
// 		method: 'DELETE'
// 	})
// 	window.location.href = '/users/profile';
// }