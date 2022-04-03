const deleteButton = document.getElementById('delete');
const id = deleteButton.getAttribute('data-id');
const bookid = deleteButton.getAttribute('data-bookid');
deleteButton.onclick = async (e) => {
	e.preventDefault(); 	// do not trigger default functionality		
	console.log(id);
	if (confirm('Are you sure you want to delete this page?')) {
		await fetch(`/books/page/delete/${id}`, {
			method: 'DELETE'
		});
		window.location.href = `/books/${bookid}`;
	} else {
		window.location.href = `/books/page/${id}`;
	}
};
