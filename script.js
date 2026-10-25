/**
 * PORTAL PEMBELAJARAN RAK BUKU - SAWERIA THEME
 */

// Data Awal Buku & Target Portal
const initialBooks = [
    {
        id: "book-1",
        title: "Teknologi Informasi dan Komunikasi",
        category: "TIK",
        color: "#FF7A00", // Saweria Orange
        url: "tik", // Target Portal Laman Pembelajaran
        description: "Perangkat untuk mengakses internet.",
        level: "Pemula",
        duration: "3 Jam",
        author: "Tim 296Studios",
        progress: 100,
        isFavorite: true,
        topics: ["perangkat input", "perangkat proses", "storage", "perangkat output"]
    },
    {
        id: "book-2",
        title: "Belajar Mengetik",
        category: "TIK",
        color: "#AB47BC",
        url: "belajar-mengetik",
        description: "Melatih kecepatan dan akurasi mengetik.",
        level: "Menengah",
        duration: "2.5 Jam",
        author: "Tim 296Studios",
        progress: 40,
        isFavorite: false,
        topics: ["Mengetik", "Typing","Testing"]
    }
];

class AppState {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('saweria_books')) || initialBooks;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentView = localStorage.getItem('saweria_view') || 'shelf';
        this.activeBookModal = null;
    }

    saveBooks() {
        localStorage.setItem('saweria_books', JSON.stringify(this.books));
    }

    addBook(book) {
        this.books.unshift(book);
        this.saveBooks();
    }

    toggleFavorite(id) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            book.isFavorite = !book.isFavorite;
            this.saveBooks();
        }
        return book ? book.isFavorite : false;
    }

    getFilteredBooks() {
        return this.books.filter(book => {
            const matchesCat = this.currentCategory === 'all' 
                ? true 
                : this.currentCategory === 'favorit'
                ? book.isFavorite
                : book.category === this.currentCategory;

            const query = this.searchQuery.toLowerCase().trim();
            const matchesSearch = query === '' || 
                book.title.toLowerCase().includes(query) ||
                book.description.toLowerCase().includes(query) ||
                book.category.toLowerCase().includes(query) ||
                book.topics.some(t => t.toLowerCase().includes(query));

            return matchesCat && matchesSearch;
        });
    }
}

const state = new AppState();

// DOM References
const bookshelfContainer = document.getElementById('bookshelfContainer');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const categoryChips = document.querySelectorAll('.cat-chip');
const viewShelfBtn = document.getElementById('viewShelfBtn');
const viewGridBtn = document.getElementById('viewGridBtn');
const emptyState = document.getElementById('emptyState');

// Modal Elements
const bookModal = document.getElementById('bookModal');
const closeBookModalBtn = document.getElementById('closeBookModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalLevel = document.getElementById('modalLevel');
const modalDuration = document.getElementById('modalDuration');
const modalAuthor = document.getElementById('modalAuthor');
const modalDescription = document.getElementById('modalDescription');
const modalProgressText = document.getElementById('modalProgressText');
const modalProgressBar = document.getElementById('modalProgressBar');
const modalTopicsList = document.getElementById('modalTopicsList');
const modalFavIcon = document.getElementById('modalFavIcon');
const toggleFavBtn = document.getElementById('toggleFavBtn');
const modalOpenLink = document.getElementById('modalOpenLink');

// Add Book Elements
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeAddModalBtn = document.getElementById('closeAddModal');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addBookForm = document.getElementById('addBookForm');

// Stats Elements
const totalBooksCountEl = document.getElementById('totalBooksCount');
const completedCountEl = document.getElementById('completedCount');
const avgProgressEl = document.getElementById('avgProgress');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const toastEl = document.getElementById('toast');
const toastMsgEl = document.getElementById('toastMsg');

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderStats();
    renderView();
    setupEventListeners();
});

function renderStats() {
    totalBooksCountEl.textContent = state.books.length;
    const completed = state.books.filter(b => b.progress >= 100).length;
    completedCountEl.textContent = completed;
    
    const sumProgress = state.books.reduce((acc, b) => acc + (b.progress || 0), 0);
    const avg = state.books.length ? Math.round(sumProgress / state.books.length) : 0;
    avgProgressEl.textContent = `${avg}%`;
}

function renderView() {
    const books = state.getFilteredBooks();

    if (books.length === 0) {
        bookshelfContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    if (state.currentView === 'shelf') {
        render3DBookshelf(books);
    } else {
        renderGridView(books);
    }
}

// Render Rak Buku 3D
function render3DBookshelf(books) {
    bookshelfContainer.className = 'bookshelf-view';
    
    const categoriesMap = {};
    books.forEach(b => {
        if (!categoriesMap[b.category]) categoriesMap[b.category] = [];
        categoriesMap[b.category].push(b);
    });

    let html = '';
    for (const [catName, catBooks] of Object.entries(categoriesMap)) {
        html += `
            <div class="shelf-row">
                <div class="shelf-category-title">
                    <i class="fa-solid fa-bookmark text-primary"></i> ${catName} (${catBooks.length})
                </div>
                <div class="shelf-books-container">
        `;

        catBooks.forEach(book => {
            const isDone = book.progress >= 100;
            html += `
                <div class="book-item-3d" data-id="${book.id}">
                    <div class="book-tooltip">
                        <span style="font-size:0.7rem; font-weight:700; color:var(--primary);">${book.category}</span>
                        <h4 style="font-size:0.9rem; font-weight:800; margin: 3px 0;">${book.title}</h4>
                        <p style="font-size:0.75rem; color:var(--text-muted);">${book.description}</p>
                    </div>
                    <div class="book-spine" style="background-color: ${book.color};">
                        <i class="fa-solid fa-book spine-top-icon"></i>
                        <span class="spine-title">${book.title}</span>
                        <div class="spine-progress-dot ${isDone ? 'completed' : ''}"></div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="shelf-plank"></div>
            </div>
        `;
    }

    bookshelfContainer.innerHTML = html;

    document.querySelectorAll('.book-item-3d').forEach(el => {
        el.addEventListener('click', () => {
            const bookId = el.getAttribute('data-id');
            openBookModal(bookId);
        });
    });
}

// Render Grid Kartu
function renderGridView(books) {
    bookshelfContainer.className = 'grid-container';

    let html = '';
    books.forEach(book => {
        html += `
            <div class="book-card-grid" data-id="${book.id}">
                <div class="card-header-accent" style="background-color: ${book.color}"></div>
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom: 0.75rem; margin-top:0.5rem;">
                        <span style="font-size:0.75rem; font-weight:700; color:var(--primary); padding: 0.2rem 0.6rem; background:var(--bg-main); border-radius:15px; border:1px solid var(--border-color);">${book.category}</span>
                    </div>
                    <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:0.5rem;">${book.title}</h3>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">${book.description}</p>
                </div>
                <div>
                    <button class="btn btn-primary" style="width:100%;">Buka Modul Pembelajaran <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `;
    });

    bookshelfContainer.innerHTML = html;

    document.querySelectorAll('.book-card-grid').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openBookModal(id);
        });
    });
}

function openBookModal(bookId) {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return;

    state.activeBookModal = book;

    modalTitle.textContent = book.title;
    modalCategory.textContent = book.category;
    modalLevel.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${book.level}`;
    modalDuration.innerHTML = `<i class="fa-solid fa-clock"></i> ${book.duration}`;
    modalAuthor.innerHTML = `<i class="fa-solid fa-user"></i> ${book.author}`;
    modalDescription.textContent = book.description;

    modalProgressText.textContent = `${book.progress}%`;
    modalProgressBar.style.width = `${book.progress}%`;

    modalTopicsList.innerHTML = book.topics
        .map(t => `<li style="background:var(--bg-shelf); border:1px solid var(--border-color); padding:0.35rem 0.75rem; border-radius:20px; font-size:0.8rem;"><i class="fa-solid fa-check text-primary"></i> ${t}</li>`)
        .join('');

    modalOpenLink.href = book.url;
    bookModal.classList.remove('hidden');
}

function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
        renderView();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderView();
    });

    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.currentCategory = chip.getAttribute('data-category');
            renderView();
        });
    });

    viewShelfBtn.addEventListener('click', () => {
        state.currentView = 'shelf';
        viewShelfBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        renderView();
    });

    viewGridBtn.addEventListener('click', () => {
        state.currentView = 'grid';
        viewGridBtn.classList.add('active');
        viewShelfBtn.classList.remove('active');
        renderView();
    });

    closeBookModalBtn.addEventListener('click', () => bookModal.classList.add('hidden'));

    addBookBtn.addEventListener('click', () => addBookModal.classList.remove('hidden'));
    closeAddModalBtn.addEventListener('click', () => addBookModal.classList.add('hidden'));
    cancelAddBtn.addEventListener('click', () => addBookModal.classList.add('hidden'));

    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('bookTitle').value;
        const category = document.getElementById('bookCategory').value;
        const color = document.querySelector('input[name="spineColor"]:checked').value;
        const url = document.getElementById('bookUrl').value;
        const description = document.getElementById('bookDesc').value || 'Modul pembelajaran interaktif baru.';
        const level = document.getElementById('bookLevel').value;
        const duration = document.getElementById('bookDuration').value || '1 Jam';

        const newBook = {
            id: `book-${Date.now()}`,
            title, category, color, url, description, level, duration,
            author: "Saya", progress: 0, isFavorite: false,
            topics: ["Materi Dasar", "Praktikum Interaktif"]
        };

        state.addBook(newBook);
        renderStats();
        renderView();

        addBookForm.reset();
        addBookModal.classList.add('hidden');
        showToast("Buku Pembelajaran Berhasil Ditambahkan!");
    });

    themeToggleBtn.addEventListener('click', toggleTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('saweria_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('saweria_theme', 'light');
        showToast("Mode Terang Saweria");
    } else {
        document.body.classList.replace('light-theme', 'dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('saweria_theme', 'dark');
        showToast("Mode Gelap Saweria");
    }
}

function showToast(msg) {
    toastMsgEl.textContent = msg;
    toastEl.classList.remove('hidden');
    setTimeout(() => toastEl.classList.add('hidden'), 2800);
}