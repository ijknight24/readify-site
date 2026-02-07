// 1. Reusable Functions
function saveToStorage(key, value) { localStorage.setItem(key, value); alert("Saved!"); }
function getFromStorage(key) { return localStorage.getItem(key); }

// 2. Mobile Menu
function toggleMenu() { document.getElementById("nav-links").classList.toggle("active"); }

// 3. Author of the Day (Date Logic)
function loadAuthorOfDay() {
    const today = new Date().getDate(); // Gets day number (1-31)
    const authorIndex = today % bookData.length; // Cycles through data
    const authorElement = document.getElementById("author-display");
    if(authorElement) authorElement.innerText = "Author of the Day: " + bookData[authorIndex].author;
}

// 4. Newsletter
function saveNewsletter() {
    const email = document.getElementById("newsletterEmail").value;
    saveToStorage("newsletter", email);
}

// 5. Book Explorer Logic (Search/Filter)
function renderBooks(filterText = "") {
    const grid = document.getElementById("book-grid");
    if(!grid) return; // Only runs on Explorer page
    grid.innerHTML = "";
    
    bookData.filter(book => book.title.toLowerCase().includes(filterText.toLowerCase()) || book.genre.toLowerCase().includes(filterText.toLowerCase()))
    .forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button onclick="openModal(${book.id})">Details</button>
        `;
        grid.appendChild(card);
    });
}

// 6. Modal Logic
function openModal(id) {
    const book = bookData.find(b => b.id === id);
    const modal = document.getElementById("myModal");
    const content = document.getElementById("modal-body");
    content.innerHTML = `<h2>${book.title}</h2><p>${book.synopsis}</p><p><strong>Sequels:</strong> ${book.sequels.join(", ")}</p>`;
    modal.style.display = "flex";
}
function closeModal() { document.getElementById("myModal").style.display = "none"; }

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadAuthorOfDay();
    renderBooks();
});

/* =========================================
   ADD THIS TO THE BOTTOM OF script.js
   ========================================= */

// --- Recommender Logic ---
let currentRecommendation = null;

function recommendBook() {
    const genre = document.getElementById("genreSelect").value;
    const length = document.getElementById("lengthSelect").value;
    
    // Filter books based on dropdowns
    const eligibleBooks = bookData.filter(book => {
        return (genre === "all" || book.genre === genre) &&
               (length === "all" || book.length === length);
    });

    if (eligibleBooks.length === 0) {
        alert("No books match those filters! Try different ones.");
        return;
    }

    // Random Math Logic
    const randomIndex = Math.floor(Math.random() * eligibleBooks.length);
    currentRecommendation = eligibleBooks[randomIndex];

    // Display Result
    document.getElementById("recommendation-result").style.display = "block";
    document.getElementById("rec-title").innerText = currentRecommendation.title;
    document.getElementById("rec-author").innerText = "by " + currentRecommendation.author;
    document.getElementById("rec-desc").innerText = currentRecommendation.synopsis;
}

function saveRecommendation() {
    if (!currentRecommendation) return;
    let list = JSON.parse(localStorage.getItem("myReadingList")) || [];
    list.push(currentRecommendation.title);
    localStorage.setItem("myReadingList", JSON.stringify(list));
    alert(currentRecommendation.title + " saved to your list!");
}

// --- Flow Page Logic (Sounds & Tracker) ---

function toggleSound() {
    const audio = document.getElementById("rainAudio");
    const btn = document.getElementById("soundBtn");
    
    if (audio.paused) {
        audio.play();
        btn.innerText = "Pause Sounds ⏸️";
    } else {
        audio.pause();
        btn.innerText = "Play Sounds 🌧️";
    }
}

function addCompletedBook() {
    const input = document.getElementById("completedBookInput");
    const title = input.value;
    if (!title) return;

    // Save to LocalStorage
    let completed = JSON.parse(localStorage.getItem("completedBooks")) || [];
    completed.push(title);
    localStorage.setItem("completedBooks", JSON.stringify(completed));

    // Update UI
    renderCompletedList();
    input.value = ""; // Clear input
}

function renderCompletedList() {
    const list = document.getElementById("completedList");
    if (!list) return; // Stop if not on Flow page

    const completed = JSON.parse(localStorage.getItem("completedBooks")) || [];
    list.innerHTML = ""; // Clear current list
    
    completed.forEach(book => {
        const li = document.createElement("li");
        li.textContent = "✅ " + book;
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        list.appendChild(li);
    });
}

// Call this when page loads to show saved books
document.addEventListener("DOMContentLoaded", renderCompletedList);