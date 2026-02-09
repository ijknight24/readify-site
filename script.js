

// 1. Reusable Helpers
function saveToStorage(key, value) { localStorage.setItem(key, value); alert("Saved!"); }
function getFromStorage(key) { return localStorage.getItem(key); }
function toggleMenu() { document.getElementById("nav-links").classList.toggle("active"); }

// 2. Hero Rotation (Home Page)
const heroContent = [
    { text: "So many books, so little time.", author: "- Frank Zappa", image: "r images/q1.jpg" },
    { text: "A room without books is like a body without a soul.", author: "- Cicero", image: "r images/q2.jpg" },
    { text: "Reading gives us someplace to go when we have to stay where we are.", author: "- Mason Cooley", image: "r images/q3.jpg" }
];

let currentIndex = 0;

function startHeroRotation() {
    const quoteElement = document.getElementById("hero-quote-text");
    const authorElement = document.getElementById("hero-quote-author"); 
    const imageElement = document.getElementById("hero-image-display");
    
    if (!quoteElement || !imageElement || !authorElement) return;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroContent.length; 
        quoteElement.style.opacity = 0; 
        authorElement.style.opacity = 0;
        
        setTimeout(() => {
            quoteElement.innerText = '"' + heroContent[currentIndex].text + '"';
            authorElement.innerText = heroContent[currentIndex].author;
            imageElement.src = heroContent[currentIndex].image;
            quoteElement.style.opacity = 1; 
            authorElement.style.opacity = 1;
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

// 5. Modal Logic (THIS IS WHERE THE TABLE IS)
function openModal(id) {
    const book = bookData.find(b => b.id === id);
    const modal = document.getElementById("myModal");
    const content = document.getElementById("modal-body");
    
    // --- THIS GENERATES THE TABLE ROWS ---
    const tableRows = book.ratings.map(r => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${r.user}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${"⭐".repeat(r.score)}</td>
        </tr>
    `).join("");

    
    content.innerHTML = `
        <h2 style="color: var(--primary); margin-top: 0;">${book.title}</h2>
        <p>${book.synopsis}</p>
        <p><strong>Sequels:</strong> ${book.sequels.join(", ")}</p>
        <h3 style="margin-top: 20px; border-bottom: 2px solid var(--secondary); padding-bottom: 5px;">Community Ratings</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
            <tr style="background-color: var(--secondary); color: white; text-align: left;">
                <th style="padding: 10px;">User</th>
                <th style="padding: 10px;">Score</th>
            </tr>
            ${tableRows}
        </table>
    `;
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

// 7. Tracker Logic
function calculateProgress() {
    const total = document.getElementById("total").value;
    const read = document.getElementById("read").value;
    const speed = document.getElementById("speed").value; 

    if(total > 0 && read >= 0) {
        const pct = (read / total) * 100;
        document.getElementById("result").innerText = `Progress: ${pct.toFixed(2)}%`;
        
        if(speed > 0) {
            const remaining = total - read;
            const daysLeft = Math.ceil(remaining / speed);
            document.getElementById("estimate").innerText = `⏱️ At this pace, you'll finish in ${daysLeft} days.`;
        } else {
            document.getElementById("estimate").innerText = "";
        }
        localStorage.setItem("readingProgress", pct);
    } else {
        alert("Please enter valid page numbers!");
    }
}

// 8. Newsletter
function saveNewsletter() {
    const email = document.getElementById("newsletterEmail").value;
    if(email) saveToStorage("newsletter", email);
}

// 9. Flow Page Logic
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

// 10. Audio Logic
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
            }).catch(error => { console.log("Audio waiting..."); });
        }
    } else {
        audio.pause();
        btn.innerText = "Play Rain 🌧️";
        btn.style.backgroundColor = ""; 
    }
}

// 11. Initialization
document.addEventListener("DOMContentLoaded", () => {
    startHeroRotation();
    loadAuthorOfDay();
    filterBooks(); 
    renderCompletedList(); 
});