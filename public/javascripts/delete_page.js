const deleteButton = document.getElementById('delete')
const id = deleteButton.getAttribute("data-id")
const bookid = deleteButton.getAttribute("data-bookid")
deleteButton.onclick = async (e) => {
	e.preventDefault() 	// do not trigger default functionality		
	console.log(id)
	await fetch(`http://localhost:3000/books/page/delete/${id}`, {
		method: 'DELETE'
	})
	window.location.href = `/books/${bookid}`;
}

// headers: {
		// 	'Content-Type': 'text/html'
		// }
