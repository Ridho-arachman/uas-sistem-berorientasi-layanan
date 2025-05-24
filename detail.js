// detail.js
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadMovieDetail() {
  const movieId = getQueryParam("id");
  if (!movieId) {
    document.getElementById("movie-detail").innerHTML =
      "<p>Movie not found.</p>";
    return;
  }
  try {
    const response = await fetch("movies-data.json");
    const data = await response.json();
    const movies = Array.isArray(data) ? data : data.movies;
    const movie = movies.find((m) => String(m.id) === String(movieId));
    if (!movie) {
      document.getElementById("movie-detail").innerHTML =
        "<p>Movie not found.</p>";
      return;
    }
    document.getElementById("movie-detail").innerHTML = `
      <div class="movie-detail-content">
        <img src="${movie.poster}" alt="${movie.title}" class="movie-detail-poster" />
        <div class="movie-detail-info">
          <h1>${movie.title}</h1>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Year:</strong> ${movie.year}</p>
          <p><strong>Rating:</strong> ${movie.rating}</p>
          <p><strong>Director:</strong> ${movie.director}</p>
          <p><strong>Cast:</strong> ${movie.cast}</p>
          <p><strong>Synopsis:</strong> ${movie.plot}</p>
          <a href="index.html#movies" class="back-link">&larr; Back to Movies</a>
        </div>
      </div>
    `;
  } catch (error) {
    document.getElementById("movie-detail").innerHTML =
      "<p>Error loading movie details.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadMovieDetail);
