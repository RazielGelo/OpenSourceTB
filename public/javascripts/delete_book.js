const deleteButton = document.getElementById('delete');
const id = deleteButton.getAttribute('data-id');
deleteButton.onclick = async (e) => {
	e.preventDefault(); 	// do not trigger default functionality		
	console.log(id);
	if (confirm('Are you sure you want to delete this? Once deleted all pages of this book are permanently deleted as well. Continue?')) {
		await fetch(`/books/delete/${id}`, {
			method: 'DELETE'
		});
		window.location.href = '/users/profile';
	} else {
		window.location.href = '/users/profile';
	}

};
