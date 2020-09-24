let myLibrary = [];
let keyCounter = 0;

const container = document.querySelector('.container');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	let newKey = keyCounter + 1;
	keyCounter = newKey;
	addBookToLibrary(title, author, pages, newKey);
	addCard();
	e.preventDefault();
});

function addBookToLibrary(title, author, pages, key) {
  	const newBook = new Book(title, author, pages, key);
  	myLibrary.push(newBook);
}

function Book(title, author, pages, key) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.key = key;
}

Book.prototype.removeCard = removeCard;

function addCard () {
	const index = myLibrary.length-1; 
	const latestBook = myLibrary[index]; 
	createCard(latestBook);
}

function removeCard (e) {
	const selectedKey = e.target.parentNode.getAttribute('data-key');
	const refArray = myLibrary;
	const selectedBook = refArray.find(book => {
		book.key == selectedKey
	}); 
	const selectedCard = document.querySelector(`[data-key='${selectedKey}']`);
	selectedCard.parentNode.removeChild(selectedCard);
}

function createCard(book) {
	const { title, author, pages, key } = book;

	const card = document.createElement('div');
	card.classList.add('card');
	card.setAttribute('data-key', key);

	const titleHead = document.createElement('h1');
	titleHead.classList.add('titleHead');
	titleHead.innerHTML = title;

	const authorHead = document.createElement('h2');
	authorHead.classList.add('authorHead');
	authorHead.innerHTML = author;

	const pagesHead = document.createElement('h3');
	pagesHead.classList.add('pagesHead');
	pagesHead.innerHTML = pages;

	const removeButton = document.createElement('button');
	removeButton.addEventListener('click', (e) => {
		removeCard(e);
	})

	const hasRead = document.getElementById('read').checked;

	card.appendChild(titleHead);
	card.appendChild(authorHead);
	card.appendChild(pagesHead);
	card.appendChild(removeButton);
	container.appendChild(card);
}



