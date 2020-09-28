let myLibrary = [];
let keyCounter = 0;

const container = document.querySelector('.container');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	const hasRead = document.getElementById('read').checked;
	let newKey = keyCounter + 1;
	keyCounter = newKey;
	addBookToLibrary(title, author, pages, hasRead, newKey);
	addCard();
	e.preventDefault();
});

function addBookToLibrary(title, author, pages, read, key) {
  	const newBook = new Book(title, author, pages, read, key);
  	myLibrary.push(newBook);
}

function Book(title, author, pages, read, key) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.key = key;
}

function toggleRead (e) {
	const selectedKey = e.target.parentNode.getAttribute('data-key');
	const refArray = myLibrary;
	const newLibraryArr = refArray.map(book => {
		if (book.key == selectedKey) {
			if (book.read == true) {
				book.read = false;
			} else {
				book.read = true;
			}
			return book
		}
		return book
	});
	myLibrary = newLibraryArr;
}

function toggleReadDom (e) {
	const selectedKey = e.target.parentNode.getAttribute('data-key');
	const refArray = myLibrary;
	const selectedBook = refArray.find(book => book.key == selectedKey);
	const selectedCard = document.querySelector(`[data-key='${selectedKey}']`);
	const selectedCardReadHead = selectedCard.querySelector('.hasRead');
	selectedCardReadHead.innerHTML = `Has Been Read: ${selectedBook.read}`;
}

function addCard () {
	const index = myLibrary.length-1; 
	const latestBook = myLibrary[index]; 
	createCard(latestBook);
}

function removeCard (e) {
	const selectedKey = e.target.parentNode.getAttribute('data-key');
	const refArray = myLibrary;
	const newLibraryArr = refArray.filter(book => {
		if (book.key != selectedKey) {
			return book
		}
	});
	myLibrary = newLibraryArr;
	const selectedCard = document.querySelector(`[data-key='${selectedKey}']`);
	selectedCard.parentNode.removeChild(selectedCard);
}

function createCard(book) {
	const { title, author, pages, read, key } = book;

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

	const hasReadHead = document.createElement('h4');
	hasReadHead.classList.add('hasRead');
	hasReadHead.innerHTML = `Has Been Read: ${read}`;

	const hasReadButton = document.createElement('button');
	hasReadButton.addEventListener('click', (e) => {
		toggleRead(e);
		toggleReadDom(e);
	})

	card.appendChild(titleHead);
	card.appendChild(authorHead);
	card.appendChild(pagesHead);
	card.appendChild(hasReadHead);
	card.appendChild(hasReadButton);
	card.appendChild(removeButton);
	container.appendChild(card);
}



