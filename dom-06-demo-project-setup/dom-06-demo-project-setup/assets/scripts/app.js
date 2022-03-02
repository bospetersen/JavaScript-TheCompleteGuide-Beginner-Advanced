const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const addBackdrop = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text')
const movieList = document.getElementById('movie-list')

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

// console.log(userInputs);
const updateUI = () => {
  if (movies.length === 0) {

    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const cancelMovieDeletion = () => { 
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible')
}

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1);
  const movieListRoot = document.getElementById('movie-list');
  movieListRoot.removeChild(movieListRoot.children[movieIndex]);
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  // deleteMovie(movieId);
};

const renderMovieListItem = (id, title, imageUrl, rating) => {
  const newMovieListItem = document.createElement('li');
  newMovieListItem.className = 'movie-element';
  newMovieListItem.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}" />
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;

  newMovieListItem.addEventListener('click', deleteMovieHandler.bind(null, id));
  const movieListRoot = document.getElementById('movie-list');
  movieListRoot.append(newMovieListItem);

}

const toggleBackdrop = () => {
  addBackdrop.classList.toggle('visible');
}

const closeBackdrop = () => {
  addMovieModal.classList.remove('visible')
}


startAddMovieButton.addEventListener('click', () => {
  addMovieModal.classList.add('visible')
  toggleBackdrop();
});

addBackdrop.addEventListener('click', () => {
  addMovieModal.classList.add('visible')
  toggleBackdrop();
  cancelMovieDeletion();
});

cancelAddMovieButton.addEventListener('click', () => {
  addMovieModal.classList.add('visible')
  toggleBackdrop();
  clearInputs()
});

const clearInputs = () => {
  // userInputs[0].value = '';
  // userInputs[1].value = '';
  // userInputs[2].value = '';

  for (const userInput of userInputs) {
    userInput.value = '';
  }
}

confirmAddMovieButton.addEventListener('click', () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5) {
    alert('Please enter valid data (Ratings can go from 1-5).')
    return
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }

  movies.push(newMovie);
  console.log(movies)
  addMovieModal.classList.toggle('visible')
  toggleBackdrop();
  closeBackdrop();
  renderMovieListItem(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
  clearInputs()
});