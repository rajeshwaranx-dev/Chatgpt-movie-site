/* ===========================
   AskMovies — script.js
   Organized sections (mandatory order):
   - MOVIE DATABASE
   - AUTO ID GENERATOR
   - GLOBAL STATE
   - INITIALIZATION
   - FILTER ENGINE
   - RENDER FUNCTION
   - CREATE MOVIE CARD
   - PAGINATION
   - SEARCH TOGGLE
   - SEARCH LOGIC
   - CATEGORY FILTER
   - MOBILE MENU (basic)
   =========================== */

/* ===========================
   MOVIE DATABASE
   - Do NOT include id fields in objects
   =========================== */
const movies = [
  { title: "Master", year: 2021, quality: "HD", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Master", telegramLink:"https://t.me/example_master" },
  { title: "Vikram", year: 2022, quality: "HD", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Vikram", telegramLink:"https://t.me/example_vikram" },
  { title: "Beast", year: 2022, quality: "HD", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Beast", telegramLink:"https://t.me/example_beast" },
  { title: "Jailer", year: 2023, quality: "PreDvd", category: ["Tamil","Drama"], image: "https://via.placeholder.com/300x450?text=Jailer", telegramLink:"https://t.me/example_jailer" },
  { title: "Ponniyin Selvan", year: 2022, quality: "HD", category: ["Tamil","Historical"], image: "https://via.placeholder.com/300x450?text=PS1", telegramLink:"https://t.me/example_ps1" },
  { title: "Leo", year: 2023, quality: "PreDvd", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Leo", telegramLink:"https://t.me/example_leo" },
  { title: "Dunki", year: 2023, quality: "HD", category: ["Hindi","Drama"], image: "https://via.placeholder.com/300x450?text=Dunki", telegramLink:"https://t.me/example_dunki" },
  { title: "KGF Chapter 2", year: 2022, quality: "HD", category: ["Kannada","Action"], image: "https://via.placeholder.com/300x450?text=KGF2", telegramLink:"https://t.me/example_kgf2" },
  { title: "RRR", year: 2022, quality: "HD", category: ["Telugu","Action"], image: "https://via.placeholder.com/300x450?text=RRR", telegramLink:"https://t.me/example_rrr" },
  { title: "The Batman", year: 2022, quality: "HD", category: ["English","Action"], image: "https://via.placeholder.com/300x450?text=Batman", telegramLink:"https://t.me/example_batman" },
  { title: "Top Gun", year: 2022, quality: "HD", category: ["English","Action"], image: "https://via.placeholder.com/300x450?text=Top+Gun", telegramLink:"https://t.me/example_topgun" },
  { title: "Avatar The Way of Water", year: 2022, quality: "HD", category: ["English","Sci-Fi"], image: "https://via.placeholder.com/300x450?text=Avatar+2", telegramLink:"https://t.me/example_avatar2" },
  { title: "The Kashmir Files", year: 2022, quality: "HD", category: ["Hindi","Drama"], image: "https://via.placeholder.com/300x450?text=Kashmir+Files", telegramLink:"https://t.me/example_kashmir" },
  { title: "Petta", year: 2019, quality: "HD", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Petta", telegramLink:"https://t.me/example_petta" },
  { title: "Kaithi", year: 2019, quality: "HD", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Kaithi", telegramLink:"https://t.me/example_kaithi" },
  { title: "Sita Ramam", year: 2022, quality: "HD", category: ["Telugu","Romance"], image: "https://via.placeholder.com/300x450?text=Sita+Ramam", telegramLink:"https://t.me/example_sitaram" },
  { title: "English Vinglish", year: 2012, quality: "HD", category: ["Hindi","Drama"], image: "https://via.placeholder.com/300x450?text=English+Vinglish", telegramLink:"https://t.me/example_ev" },
  { title: "Interstellar", year: 2014, quality: "HD", category: ["English","Sci-Fi"], image: "https://via.placeholder.com/300x450?text=Interstellar", telegramLink:"https://t.me/example_interstellar" },
  { title: "Toy Story", year: 1995, quality: "HD", category: ["English","Family"], image: "https://via.placeholder.com/300x450?text=Toy+Story", telegramLink:"https://t.me/example_toystory" },
  { title: "Vikram Vedha", year: 2017, quality: "HD", category: ["Tamil","Thriller"], image: "https://via.placeholder.com/300x450?text=Vikram+Vedha", telegramLink:"https://t.me/example_vv" },
  { title: "Masterchef", year: 2020, quality: "PreDvd", category: ["English","Reality"], image: "https://via.placeholder.com/300x450?text=Masterchef", telegramLink:"https://t.me/example_masterchef" },
  { title: "Guardians", year: 2021, quality: "HD", category: ["English","Action"], image: "https://via.placeholder.com/300x450?text=Guardians", telegramLink:"https://t.me/example_guardians" },
  { title: "Thunivu", year: 2023, quality: "PreDvd", category: ["Tamil","Action"], image: "https://via.placeholder.com/300x450?text=Thunivu", telegramLink:"https://t.me/example_thunivu" },
  { title: "Don", year: 2006, quality: "HD", category: ["Hindi","Action"], image: "https://via.placeholder.com/300x450?text=Don", telegramLink:"https://t.me/example_don" }
];
/* ===========================
   END MOVIE DATABASE
   =========================== */


/* ===========================
   AUTO ID GENERATOR
   - Assign IDs starting at 1
   - Unique and recalculated when movies array changes
   =========================== */
function assignAutoIds(list){
  if(!Array.isArray(list)) return;
  list.forEach((movie, index) => {
    movie.id = index + 1; // auto id generator
  });
}
/* initial assign */
assignAutoIds(movies);
/* ===========================
   END AUTO ID GENERATOR
   =========================== */


/* ===========================
   GLOBAL STATE
   =========================== */
const state = {
  allMovies: movies,        // original DB (with generated ids)
  filtered: [],             // result after search+filter
  currentPage: 1,
  itemsPerPage: 20,
  selectedCategory: "All",
  searchQuery: "",
  isSearchOpen: false
};
/* ===========================
   END GLOBAL STATE
   =========================== */


/* ===========================
   INITIALIZATION
   - cache DOM nodes
   - initial rendering
   - attach high-level event listeners
   =========================== */
const dom = {
  moviesGrid: document.getElementById("moviesGrid"),
  paginationWrap: document.getElementById("paginationWrap"),
  categoryFilters: document.getElementById("categoryFilters"),
  searchToggle: document.getElementById("searchToggle"),
  searchWrapper: document.getElementById("searchWrapper"),
  searchInput: document.getElementById("searchInput"),
  summaryText: document.getElementById("summaryText")
};

function init(){
  // initial filtered is full list
  state.filtered = [...state.allMovies];
  renderCategoryButtons();
  render();
  bindUI();
}
init();
/* ===========================
   END INITIALIZATION
   =========================== */


/* ===========================
   FILTER ENGINE
   - produces filtered list based on search & category
   - efficient, immutable approach
   =========================== */
function applyFilters(){
  let list = state.allMovies;

  // category filter (skip if All)
  if(state.selectedCategory && state.selectedCategory !== "All"){
    const cat = state.selectedCategory;
    list = list.filter(m => Array.isArray(m.category) && m.category.includes(cat));
  }

  // search filter (case-insensitive on title)
  if(state.searchQuery && state.searchQuery.trim().length){
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter(m => (m.title || "").toLowerCase().includes(q));
  }

  // update filtered and reset pagination if needed
  state.filtered = list;
  // if current page exceeds total pages, clamp it
  const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.itemsPerPage));
  if(state.currentPage > totalPages) state.currentPage = totalPages;
}
/* ===========================
   END FILTER ENGINE
   =========================== */


/* ===========================
   RENDER FUNCTION
   - orchestrates rendering of grid + pagination + summary
   - uses document fragments to minimize reflows
   =========================== */
function render(){
  applyFilters();

  // render grid
  renderGrid();

  // render pagination
  renderPagination();

  // summary text
  dom.summaryText.textContent = `${state.filtered.length} result${state.filtered.length !== 1 ? "s" : ""} • Showing page ${state.currentPage}`;
}
/* ===========================
   END RENDER FUNCTION
   =========================== */


/* ===========================
   CREATE MOVIE CARD
   - Returns DOM element for a movie
   - uses defensive checks
   =========================== */
function createMovieCard(movie){
  if(!movie || typeof movie !== 'object') return null;

  // card wrapper
  const card = document.createElement("article");
  card.className = "movie-card fade-in";
  card.dataset.id = movie.id;

  // poster
  const poster = document.createElement("div");
  poster.className = "poster";
  poster.style.backgroundImage = `url('${movie.image || "https://via.placeholder.com/300x450?text=No+Image"}')`;
  poster.setAttribute("role","img");
  poster.setAttribute("aria-label", movie.title || "movie poster");

  // quality badge
  const q = document.createElement("span");
  q.className = "quality-badge";
  q.textContent = movie.quality || "HD";
  card.appendChild(q);

  // overlay (Watch Now)
  const overlay = document.createElement("div");
  overlay.className = "card-overlay";
  const watchBtn = document.createElement("button");
  watchBtn.className = "watch-btn";
  watchBtn.textContent = "Watch Now";
  watchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // defensive check
    if(movie.telegramLink && typeof movie.telegramLink === "string"){
      window.open(movie.telegramLink, "_blank");
    } else {
      console.warn("Missing telegram link for movie id:", movie.id);
    }
  });
  overlay.appendChild(watchBtn);

  card.appendChild(poster);
  card.appendChild(overlay);

  // card body
  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = movie.title || "Untitled";
  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `<span>${movie.year || ""}</span>`;

  // category pills
  const pillWrap = document.createElement("div");
  pillWrap.style.marginTop = "8px";
  (Array.isArray(movie.category) ? movie.category : []).forEach(cat => {
    const p = document.createElement("span");
    p.className = "cat-pill";
    p.textContent = cat;
    pillWrap.appendChild(p);
  });

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(pillWrap);

  card.appendChild(body);

  // event: clicking card opens telegram link as well
  card.addEventListener("click", () => {
    if(movie.telegramLink && typeof movie.telegramLink === "string"){
      window.open(movie.telegramLink, "_blank");
    }
  });

  return card;
}
/* ===========================
   END CREATE MOVIE CARD
   =========================== */


/* ===========================
   PAGINATION
   - 20 movies per page
   - renders prev / page numbers / next
   - smooth scrollTo top on change
   =========================== */
function renderGrid(){
  const grid = dom.moviesGrid;
  // clear
  grid.innerHTML = "";

  const total = state.filtered.length;
  if(total === 0){
    const no = document.createElement("div");
    no.className = "no-results";
    no.textContent = "No Results Found";
    grid.appendChild(no);
    return;
  }

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const pageItems = state.filtered.slice(start, end);

  const frag = document.createDocumentFragment();
  pageItems.forEach(m => {
    const card = createMovieCard(m);
    if(card) frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function renderPagination(){
  const wrap = dom.paginationWrap;
  wrap.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.itemsPerPage));
  const pagination = document.createElement("div");
  pagination.className = "pagination";

  // Prev
  const prev = document.createElement("button");
  prev.className = "page-btn";
  prev.textContent = "Previous";
  prev.disabled = state.currentPage <= 1;
  prev.addEventListener("click", () => {
    if(state.currentPage <= 1) return;
    state.currentPage--;
    onPageChange();
  });
  pagination.appendChild(prev);

  // page numbers (show up to 7 pages with smart window)
  const maxToShow = 7;
  let start = 1, end = totalPages;
  if(totalPages > maxToShow){
    const half = Math.floor(maxToShow / 2);
    start = Math.max(1, state.currentPage - half);
    end = start + maxToShow - 1;
    if(end > totalPages){
      end = totalPages;
      start = end - maxToShow + 1;
    }
  }
  for(let i = start; i <= end; i++){
    const btn = document.createElement("button");
    btn.className = "page-btn" + (i === state.currentPage ? " active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      if(state.currentPage === i) return;
      state.currentPage = i;
      onPageChange();
    });
    pagination.appendChild(btn);
  }

  // Next
  const next = document.createElement("button");
  next.className = "page-btn";
  next.textContent = "Next";
  next.disabled = state.currentPage >= totalPages;
  next.addEventListener("click", () => {
    if(state.currentPage >= totalPages) return;
    state.currentPage++;
    onPageChange();
  });
  pagination.appendChild(next);

  wrap.appendChild(pagination);
}

/* Called after page change to re-render and scroll */
function onPageChange(){
  renderGrid();
  renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
/* ===========================
   END PAGINATION
   =========================== */


/* ===========================
   SEARCH TOGGLE
   - toggles the search input with smooth CSS animation
   =========================== */
function toggleSearch(open){
  state.isSearchOpen = typeof open === "boolean" ? open : !state.isSearchOpen;
  if(state.isSearchOpen){
    dom.searchWrapper.classList.add("open");
    dom.searchWrapper.setAttribute("aria-hidden","false");
    dom.searchInput.focus();
  } else {
    dom.searchWrapper.classList.remove("open");
    dom.searchWrapper.setAttribute("aria-hidden","true");
    dom.searchInput.value = ""; // optionally clear
    state.searchQuery = "";
    state.currentPage = 1;
    render();
  }
}
/* ===========================
   END SEARCH TOGGLE
   =========================== */


/* ===========================
   SEARCH LOGIC
   - real-time search (debounced)
   - case-insensitive
   =========================== */
let searchDebounceTimer = null;
function onSearchInput(e){
  const value = e.target.value;
  // debounce for a tiny interval for performance
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    state.searchQuery = value || "";
    state.currentPage = 1;
    render();
  }, 180);
}
/* ===========================
   END SEARCH LOGIC
   =========================== */


/* ===========================
   CATEGORY FILTER
   - renders category buttons
   - uses movie.category.includes(selectedCategory)
   - highlight active in red
   - works with search + pagination
   =========================== */
const AVAILABLE_CATEGORIES = ["All","Tamil","English","Action","HD","PreDvd","Hindi","Telugu","Kannada","Sci-Fi","Drama","Romance","Family","Thriller","Historical"];

function renderCategoryButtons(){
  const wrap = dom.categoryFilters;
  wrap.innerHTML = "";
  AVAILABLE_CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (state.selectedCategory === cat ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      if(state.selectedCategory === cat) return;
      state.selectedCategory = cat;
      state.currentPage = 1;
      // reflect active states visually
      Array.from(wrap.children).forEach(child => child.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
    wrap.appendChild(btn);
  });
}
/* ===========================
   END CATEGORY FILTER
   =========================== */


/* ===========================
   MOBILE MENU (basic)
   - placeholder for vertical menu icon click
   =========================== */
function openMenu(){
  // For this demo the menu is minimal - can be extended.
  // Show a small toast or console for now.
  console.info("Menu button clicked — extend as needed.");
}
/* ===========================
   END MOBILE MENU
   =========================== */


/* ===========================
   BIND UI
   - attach top-level listeners
   - use event delegation where appropriate
   =========================== */
function bindUI(){
  // search toggle
  dom.searchToggle.addEventListener("click", () => toggleSearch());

  // search input realtime
  dom.searchInput.addEventListener("input", onSearchInput);

  // clicking outside search should close it (on desktop)
  document.addEventListener("click", (ev) => {
    const isInside = ev.target.closest && (ev.target.closest("#searchWrapper") || ev.target.closest("#searchToggle"));
    if(!isInside && state.isSearchOpen){
      toggleSearch(false);
    }
  });

  // menu
  const menuBtn = document.getElementById("menuBtn");
  if(menuBtn) menuBtn.addEventListener("click", openMenu);

  // accessibility: close search on Escape
  document.addEventListener("keydown", (ev) => {
    if(ev.key === "Escape" && state.isSearchOpen){
      toggleSearch(false);
    }
  });
}

/* ===========================
   Utilities: addMovie / removeMovie (demonstrate AUTO ID update)
   - example functions showing how to update DB and reassign IDs
   =========================== */
function addMovie(newMovie){
  if(!newMovie || !newMovie.title) return;
  // ensure we don't include id in the passed object
  const movieClone = Object.assign({}, newMovie);
  state.allMovies.push(movieClone);
  assignAutoIds(state.allMovies);
  render();
}

function removeMovieById(id){
  const idx = state.allMovies.findIndex(m => m.id === id);
  if(idx === -1) return;
  state.allMovies.splice(idx,1);
  assignAutoIds(state.allMovies);
  render();
}

/* ===========================
   End of script
   =========================== */
