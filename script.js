let myLibrary = [{'title': 'Boo', 'author': 'Doo'}, {'title': 'Doo', 'author': 'Obama'}, {'title': 'Star Wars', 'author': 'Charles'}];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(title, author) {
  	const newBook = new Book(title, author);
  	myLibrary.push(newBook);
}

const container = document.querySelector('.container');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	addBookToLibrary(title, author);
	addCard();
	e.preventDefault();
});

function createCard(book) {
	const card = document.createElement('div');
	card.classList.add('card');

	const titleHead = document.createElement('h1');
	titleHead.classList.add('titleHead');
	titleHead.innerHTML = book.title;

	const authorHead = document.createElement('h2');
	authorHead.classList.add('authorHead');
	authorHead.innerHTML = book.author;

	card.appendChild(titleHead);
	card.appendChild(authorHead);

	container.appendChild(card);
}

function addCard () {
	const index = myLibrary.length-1; 
	const latestBook = myLibrary[index]; 
	createCard(latestBook);
}



myLibrary.forEach(book => {
	createCard(book);
})

