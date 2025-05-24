// Smooth scrolling untuk navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)";
  }
});

// Intersection Observer untuk animasi scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe semua section
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease";
  observer.observe(section);
});

// Hero section sudah terlihat
document.querySelector(".hero").style.opacity = "1";
document.querySelector(".hero").style.transform = "translateY(0)";

// Parallax effect untuk hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroHeight = hero.offsetHeight;

  if (scrolled < heroHeight) {
    const bgAnimation = document.querySelector(".hero-bg-animation");
    bgAnimation.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Interactive movie cards
document.querySelectorAll(".movie-poster").forEach((poster) => {
  poster.addEventListener("mouseenter", function () {
    this.style.transform = "rotateY(10deg) rotateX(5deg) scale(1.05)";
  });

  poster.addEventListener("mouseleave", function () {
    this.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });

  poster.addEventListener("click", function () {
    const movieTitle = this.querySelector("h3").textContent;
    alert(`Menampilkan detail untuk: ${movieTitle}`);
  });
});

// CTA Button interaction
const ctaButton = document.querySelector(".cta-button");
ctaButton.addEventListener("click", () => {
  document.querySelector("#movies").scrollIntoView({
    behavior: "smooth",
  });
});

// Random floating animation untuk cards
function randomFloat() {
  const cards = document.querySelectorAll(".movie-card");
  cards.forEach((card, index) => {
    const randomX = Math.sin(Date.now() * 0.001 + index) * 10;
    const randomY = Math.cos(Date.now() * 0.001 + index) * 10;
    card.style.transform += ` translate(${randomX}px, ${randomY}px)`;
  });
}

// Update floating animation setiap frame
function animate() {
  randomFloat();
  requestAnimationFrame(animate);
}

// Mulai animasi setelah page load
window.addEventListener("load", () => {
  animate();
});

// Loading animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
});

// Advanced search functionality
class MovieSearch {
  constructor() {
    this.movies = [
      { title: "The Matrix", genre: "sci-fi", year: 1999, rating: 8.7 },
      { title: "Inception", genre: "thriller", year: 2010, rating: 8.8 },
      { title: "Interstellar", genre: "sci-fi", year: 2014, rating: 8.6 },
      { title: "Avengers", genre: "action", year: 2012, rating: 8.0 },
    ];
    this.initSearch();
  }

  initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    searchInput.addEventListener("input", (e) => {
      this.performSearch(e.target.value);
    });

    searchBtn.addEventListener("click", () => {
      this.performSearch(searchInput.value);
    });
  }

  performSearch(query) {
    const results = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    this.displayResults(results);
  }

  displayResults(results) {
    // Implementation for displaying search results
    console.log("Search results:", results);
  }
}

// Initialize search
const movieSearch = new MovieSearch();

// Responsive navigation toggle (untuk mobile)
function createMobileNav() {
  const nav = document.querySelector(".nav-container");
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "☰";
  menuToggle.style.cssText = `
        display: none;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;

  nav.appendChild(menuToggle);

  menuToggle.addEventListener("click", () => {
    const navMenu = document.querySelector(".nav-menu");
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
}

// Initialize mobile navigation
if (window.innerWidth <= 768) {
  createMobileNav();
}

// Resize handler
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    createMobileNav();
  }
});

console.log("CineInfo website loaded successfully! 🎬");

// Movie Data Manager
class MovieDataManager {
  constructor() {
    this.movies = [];
    this.genres = [];
    this.years = [];
    this.filteredMovies = [];
    this.loadMovieData();
  }

  async loadMovieData() {
    try {
      const response = await fetch("./movies-data.json");
      const data = await response.json();

      this.movies = data.movies;
      this.genres = data.genres;
      this.years = data.years;
      this.filteredMovies = [...this.movies];

      this.renderMovies();
      this.setupFilters();
      this.setupSearch();

      console.log("Movie data loaded successfully!");
    } catch (error) {
      console.error("Error loading movie data:", error);
      this.loadFallbackData();
    }
  }

  loadFallbackData() {
    // Fallback data jika JSON tidak bisa dimuat
    this.movies = [
      {
        id: 1,
        title: "The Matrix",
        genre: ["Sci-Fi", "Action"],
        year: 1999,
        rating: 8.7,
        duration: "136 min",
        director: "The Wachowskis",
        plot: "Seorang programmer komputer menemukan kenyataan yang mengejutkan tentang dunia yang dia tinggali.",
        poster: "🎬",
        featured: true,
      },
      {
        id: 2,
        title: "Inception",
        genre: ["Thriller", "Sci-Fi"],
        year: 2010,
        rating: 8.8,
        duration: "148 min",
        director: "Christopher Nolan",
        plot: "Seorang pencuri yang mencuri rahasia perusahaan melalui teknologi berbagi mimpi diberi tugas terbalik.",
        poster: "🎭",
        featured: true,
      },
      {
        id: 3,
        title: "Interstellar",
        genre: ["Sci-Fi", "Drama"],
        year: 2014,
        rating: 8.6,
        duration: "169 min",
        director: "Christopher Nolan",
        plot: "Tim penjelajah melakukan perjalanan melalui lubang cacing di luar angkasa untuk memastikan kelangsungan hidup umat manusia.",
        poster: "🚀",
        featured: true,
      },
      {
        id: 4,
        title: "Avengers: Endgame",
        genre: ["Action", "Adventure"],
        year: 2019,
        rating: 8.4,
        duration: "181 min",
        director: "Anthony Russo, Joe Russo",
        plot: "Setelah peristiwa Infinity War, para Avengers berkumpul sekali lagi untuk mengalahkan Thanos.",
        poster: "🦸",
        featured: true,
      },
    ];

    this.genres = [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Horror",
      "Romance",
      "Sci-Fi",
      "Thriller",
    ];
    this.years = [
      2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
      2012, 2011, 2010,
    ];
    this.filteredMovies = [...this.movies];

    this.renderMovies();
    this.setupFilters();
    this.setupSearch();
  }

  renderMovies() {
    const moviesGrid = document.querySelector(".movies-grid");
    if (!moviesGrid) return;

    moviesGrid.innerHTML = "";

    this.filteredMovies.forEach((movie) => {
      const movieElement = this.createMovieElement(movie);
      moviesGrid.appendChild(movieElement);
    });

    // Setup movie interactions
    this.setupMovieInteractions();
  }

  createMovieElement(movie) {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";
    movieItem.dataset.movieId = movie.id;

    const posterSrc = movie.poster.startsWith("http")
      ? movie.poster
      : movie.poster;
    const isEmoji = !movie.poster.startsWith("http");

    movieItem.innerHTML = `
            <div class="movie-poster">
                ${
                  isEmoji
                    ? `<div class="poster-placeholder">${movie.poster}</div>`
                    : `<img src="${movie.poster}" alt="${movie.title}" class="poster-image" loading="lazy">`
                }
                <div class="movie-overlay">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre.join(", ")} • ${movie.year}</p>
                    <div class="rating">⭐ ${movie.rating}</div>
                    <div class="duration">${movie.duration}</div>
                    <a class="view-details-btn" href="detail.html?id=${
                      movie.id
                    }">Lihat Detail</a>
                </div>
            </div>
        `;

    return movieItem;
  }

  setupMovieInteractions() {
    // Movie poster hover effects
    document.querySelectorAll(".movie-poster").forEach((poster) => {
      poster.addEventListener("mouseenter", function () {
        this.style.transform = "rotateY(10deg) rotateX(5deg) scale(1.05)";
      });

      poster.addEventListener("mouseleave", function () {
        this.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      });
    });
    // No need to add click event for .view-details-btn anymore
  }

  showMovieDetails(movieId) {
    const movie = this.movies.find((m) => m.id === movieId);
    if (!movie) return;

    // Create modal for movie details
    const modal = document.createElement("div");
    modal.className = "movie-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h2>${movie.title}</h2>
                    <div class="movie-meta">
                        <span class="rating">⭐ ${movie.rating}</span>
                        <span class="year">${movie.year}</span>
                        <span class="duration">${movie.duration}</span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="movie-info">
                        <p><strong>Genre:</strong> ${movie.genre.join(", ")}</p>
                        <p><strong>Sutradara:</strong> ${movie.director}</p>
                        ${
                          movie.cast
                            ? `<p><strong>Pemeran:</strong> ${movie.cast.join(
                                ", "
                              )}</p>`
                            : ""
                        }
                        <p><strong>Sinopsis:</strong> ${movie.plot}</p>
                    </div>
                    ${
                      movie.trailer
                        ? `<div class="trailer-section">
                        <button class="watch-trailer-btn" onclick="window.open('${movie.trailer}', '_blank')">Tonton Trailer</button>
                    </div>`
                        : ""
                    }
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  setupFilters() {
    // Create filter controls if they don't exist
    this.createFilterControls();

    // Setup filter event listeners
    const genreFilter = document.getElementById("genre-filter");
    const yearFilter = document.getElementById("year-filter");
    const ratingFilter = document.getElementById("rating-filter");

    if (genreFilter) {
      genreFilter.addEventListener("change", () => this.applyFilters());
    }
    if (yearFilter) {
      yearFilter.addEventListener("change", () => this.applyFilters());
    }
    if (ratingFilter) {
      ratingFilter.addEventListener("change", () => this.applyFilters());
    }
  }

  createFilterControls() {
    const moviesSection = document.querySelector(".movies-section .container");
    const existingFilters = document.querySelector(".filter-controls");

    if (existingFilters || !moviesSection) return;

    const filterControls = document.createElement("div");
    filterControls.className = "filter-controls";
    filterControls.innerHTML = `
            <div class="filter-group">
                <label for="genre-filter">Genre:</label>
                <select id="genre-filter">
                    <option value="all">Semua Genre</option>
                    ${this.genres
                      .map(
                        (genre) => `<option value="${genre}">${genre}</option>`
                      )
                      .join("")}
                </select>
            </div>
            <div class="filter-group">
                <label for="year-filter">Tahun:</label>
                <select id="year-filter">
                    <option value="all">Semua Tahun</option>
                    ${this.years
                      .map((year) => `<option value="${year}">${year}</option>`)
                      .join("")}
                </select>
            </div>
            <div class="filter-group">
                <label for="rating-filter">Rating:</label>
                <select id="rating-filter">
                    <option value="all">Semua Rating</option>
                    <option value="9+">9.0+</option>
                    <option value="8+">8.0+</option>
                    <option value="7+">7.0+</option>
                    <option value="6+">6.0+</option>
                </select>
            </div>
        `;

    const sectionTitle = moviesSection.querySelector(".section-title");
    sectionTitle.insertAdjacentElement("afterend", filterControls);
  }

  setupSearch() {
    // Create search if it doesn't exist
    this.createSearchControls();

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        this.debounce((e) => {
          this.performSearch(e.target.value);
        }, 300)
      );
    }
  }

  createSearchControls() {
    const navbar = document.querySelector(".nav-container");
    const existingSearch = document.querySelector(".search-container");

    if (existingSearch || !navbar) return;

    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `
            <input type="text" id="search-input" placeholder="Cari film...">
            <button id="search-btn">🔍</button>
        `;

    const logo = navbar.querySelector(".logo");
    logo.insertAdjacentElement("afterend", searchContainer);
  }

  applyFilters() {
    const genreFilter = document.getElementById("genre-filter")?.value || "all";
    const yearFilter = document.getElementById("year-filter")?.value || "all";
    const ratingFilter =
      document.getElementById("rating-filter")?.value || "all";

    this.filteredMovies = this.movies.filter((movie) => {
      const genreMatch =
        genreFilter === "all" || movie.genre.includes(genreFilter);
      const yearMatch =
        yearFilter === "all" || movie.year.toString() === yearFilter;

      let ratingMatch = true;
      if (ratingFilter !== "all") {
        const minRating = parseFloat(ratingFilter.replace("+", ""));
        ratingMatch = movie.rating >= minRating;
      }

      return genreMatch && yearMatch && ratingMatch;
    });

    this.renderMovies();
  }

  performSearch(query) {
    if (!query.trim()) {
      this.filteredMovies = [...this.movies];
    } else {
      this.filteredMovies = this.movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.some((g) =>
            g.toLowerCase().includes(query.toLowerCase())
          ) ||
          movie.director.toLowerCase().includes(query.toLowerCase())
      );
    }
    this.renderMovies();
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize movie data manager
const movieManager = new MovieDataManager();

fetch("movies-data.json")
  .then((response) => response.json())
  .then((data) => {
    // Populate Genre Filter
    const genreFilter = document.getElementById("genre-filter");
    genreFilter.innerHTML =
      '<option value="all">Semua Genre</option>' +
      data.genres
        .map((genre) => `<option value="${genre}">${genre}</option>`)
        .join("");

    // Populate Year Filter
    const yearFilter = document.getElementById("year-filter");
    yearFilter.innerHTML =
      '<option value="all">Semua Tahun</option>' +
      data.years
        .map((year) => `<option value="${year}">${year}</option>`)
        .join("");

    this.renderMovies();
  });
