const deleteButton = document.getElementById('delete')
const id = deleteButton.getAttribute("data-id")
deleteButton.onclick = async (e) => {
	e.preventDefault() 	// do not trigger default functionality		
	console.log(id)
	await fetch(`http://localhost:3000/books/delete/${id}`, {
		method: 'DELETE'
	})
	window.location.href = '/users/profile';
}

// headers: {
// 	'Content-Type': 'text/html'
// }
