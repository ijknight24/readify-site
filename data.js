const bookData = [
    {
        id: 1,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        length: "Long",
        image: "r images/dune.jpg",
        synopsis: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
        sequels: ["Dune Messiah", "Children of Dune"],
        ratings: [{ user: "Paul", score: 5 }]
    },
    {
        id: 2,
        title: "The Martian",
        author: "Andy Weir",
        genre: "Sci-Fi",
        length: "Medium",
        image: "r images/themartian.jpg",       
        synopsis: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he's sure he'll be the first person to die there.",
        sequels: ["None"],
        ratings: [{ user: "Mark", score: 5 }]
    },
    {
        id: 3,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        length: "Medium",
        image: "r images/thehobbit.jpg", // Fantasy book
        synopsis: "A reluctant Hobbit sets out on a quest to reclaim a lost kingdom from the lonely mountain.",
        sequels: ["The Fellowship of the Ring"],
        ratings: [{ user: "Bilbo", score: 5 }]
    },
    {
        id: 4,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        length: "Medium",
        image: "r images/harrypotteratps.jpg",
        synopsis: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
        sequels: ["Chamber of Secrets"],
        ratings: [{ user: "Ron", score: 5 }]
    },
    {
        id: 5,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        length: "Short",
        image: "r images/thegreatgatsby.jpg",
        synopsis: "The story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.",
        sequels: ["None"],
        ratings: [{ user: "Nick", score: 4 }]
    },
    {
        id: 6,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        length: "Medium",
        image: "r images/tokillamockingbird.jpg",
        synopsis: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
        sequels: ["Go Set a Watchman"],
        ratings: [{ user: "Scout", score: 5 }]
    },
    {
        id: 7,
        title: "The Adventures of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        genre: "Mystery",
        length: "Medium",
        image: "r images/taosh.jpg",
        synopsis: "A study in scarlet. The first adventure of the world's most famous detective.",
        sequels: ["The Sign of Four"],
        ratings: [{ user: "Watson", score: 5 }]
    },
    {
        id: 8,
        title: "Gone Girl",
        author: "Gillian Flynn",
        genre: "Mystery",
        length: "Medium",
        image: "r images/gonegirl.jpg",
        synopsis: "On her fifth wedding anniversary, Amy Dunne suddenly disappears from her home on the Mississippi River.",
        sequels: ["None"],
        ratings: [{ user: "Nick", score: 2 }]
    }
];

const quotes = [
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Cicero" }
];