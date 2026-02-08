/* =========================================
   SCRIPT.JS - CLEANED & UNIFIED
   ========================================= */

// 1. Reusable Helpers
function saveToStorage(key, value) { localStorage.setItem(key, value); alert("Saved!"); }
function getFromStorage(key) { return localStorage.getItem(key); }
function toggleMenu() { document.getElementById("nav-links").classList.toggle("active"); }

// 2. Hero Rotation (Home Page)
const heroContent = [
    { text: "So many books, so little time.", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80" },
    { text: "A room without books is like a body without a soul.", image: "https://images.unsplash.com/photo-1507842217121-9eac83eaf0f8?auto=format&fit=crop&w=800&q=80" },
    { text: "Reading gives us someplace to go when we have to stay where we are.", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" }
];

let currentIndex = 0;

function startHeroRotation() {
    const quoteElement = document.getElementById("hero-quote-text");
    const imageElement = document.getElementById("hero-image-display");
    if (!quoteElement || !imageElement) return;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroContent.length; 
        quoteElement.style.opacity = 0; 
        setTimeout(() => {
            quoteElement.innerText = '"' + heroContent[currentIndex].text + '"';
            imageElement.src = heroContent[currentIndex].image;
            quoteElement.style.opacity = 1; 
        }, 500);
    }, 4000);
}

// 3. Author of the Day
function loadAuthorOfDay() {
    const authorElement = document.getElementById("author-display");
    if(authorElement && typeof bookData !== 'undefined') {
        const today = new Date().getDate(); 
        const author = bookData[today % bookData.length].author;
        authorElement.innerText = author;
    }
}

// 4. Filter Books (Explorer Page)
function filterBooks() {
    const grid = document.getElementById("book-grid");
    if(!grid) return; 

    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedGenre = document.getElementById("genreFilter").value;

    grid.innerHTML = ""; 

    const filteredBooks = bookData.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(searchText);
        const matchesGenre = (selectedGenre === "all") || (book.genre === selectedGenre);
        return matchesTitle && matchesGenre;
    });

    if(filteredBooks.length === 0) {
        grid.innerHTML = "<p style='text-align:center; col-span:3;'>No books found!</p>";
        return;
    }

    filteredBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p style="font-size: 0.8rem; color: #666;">${book.genre}</p>
            <button onclick="openModal(${book.id})">Details</button>
        `;
        grid.appendChild(card);
    });
}

// 5. Modal Logic
function openModal(id) {
    const book = bookData.find(b => b.id === id);
    const modal = document.getElementById("myModal");
    const content = document.getElementById("modal-body");
    content.innerHTML = `<h2>${book.title}</h2><p>${book.synopsis}</p><p><strong>Sequels:</strong> ${book.sequels.join(", ")}</p>`;
    modal.style.display = "flex";
}
function closeModal() { document.getElementById("myModal").style.display = "none"; }

// 6. Recommender Logic
let currentRecommendation = null;

function recommendBook() {
    const genre = document.getElementById("genreSelect").value;
    const length = document.getElementById("lengthSelect").value;
    
    const eligibleBooks = bookData.filter(book => {
        return (genre === "all" || book.genre === genre) &&
               (length === "all" || book.length === length);
    });

    if (eligibleBooks.length === 0) {
        alert("No books match those filters!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * eligibleBooks.length);
    currentRecommendation = eligibleBooks[randomIndex];

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
    alert("Saved!");
}

// 7. Newsletter
function saveNewsletter() {
    const email = document.getElementById("newsletterEmail").value;
    if(email) saveToStorage("newsletter", email);
}

// 8. Flow Page Logic (Tracker)
function addCompletedBook() {
    const input = document.getElementById("completedBookInput");
    const title = input.value;
    if (!title) return;

    let completed = JSON.parse(localStorage.getItem("completedBooks")) || [];
    completed.push(title);
    localStorage.setItem("completedBooks", JSON.stringify(completed));
    renderCompletedList();
    input.value = ""; 
}

function renderCompletedList() {
    const list = document.getElementById("completedList");
    if (!list) return; 

    const completed = JSON.parse(localStorage.getItem("completedBooks")) || [];
    list.innerHTML = ""; 
    
    completed.forEach(book => {
        const li = document.createElement("li");
        li.textContent = "✅ " + book;
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        list.appendChild(li);
    });
}

function clearCompletedList() {
    if(confirm("Delete history?")) {
        localStorage.removeItem("completedBooks"); 
        renderCompletedList(); 
    }
}

// 9. AUDIO FIX (Prevents Interrupted Error)
function toggleSound() {
    const audio = document.getElementById("rainAudio");
    const btn = document.getElementById("soundBtn");

    if (!audio) return;

    if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.innerText = "Pause Rain ⏸️";
                btn.style.backgroundColor = "#e63946"; 
            }).catch(error => {
                console.log("Audio waiting...");
            });
        }
    } else {
        audio.pause();
        btn.innerText = "Play Rain 🌧️";
        btn.style.backgroundColor = ""; 
    }
}

// 10. Initialization (Run Once)
document.addEventListener("DOMContentLoaded", () => {
    startHeroRotation();
    loadAuthorOfDay();
    filterBooks(); // For Explorer
    renderCompletedList(); // For Flow
});