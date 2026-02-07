
// data.js - Link this in ALL your HTML files BEFORE script.js
const bookData = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fiction",
        length: "Medium",
        image: "https://placehold.co/150x220?text=Midnight+Library", // Replace with real images later if time permits
        synopsis: "Between life and death there is a library, and within that library, the shelves go on forever.",
        sequels: ["None"],
        ratings: [{ user: "Ali", score: 5 }, { user: "Sam", score: 4 }]
    },
    {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        length: "Long",
        image: "https://placehold.co/150x220?text=Dune",
        synopsis: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding.",
        sequels: ["Dune Messiah", "Children of Dune"],
        ratings: [{ user: "Mo", score: 5 }, { user: "Sarah", score: 5 }]
    },
    {
        id: 3,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        length: "Medium",
        image: "https://placehold.co/150x220?text=The+Hobbit",
        synopsis: "A reluctant Hobbit sets out on a quest to reclaim a lost kingdom.",
        sequels: ["The Fellowship of the Ring"],
        ratings: [{ user: "Frodo", score: 5 }]
    }
    // Add 2-3 more books to make it look full
];

const quotes = [
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Cicero" }
];