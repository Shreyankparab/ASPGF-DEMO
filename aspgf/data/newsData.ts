export type Category = "All" | "Health" | "Old Age" | "Education";

export interface NewsItem {
    id: number;
    title: string;
    category: Category;
    image: string;
    location: string;
    date: string;
}

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: "There are many variations of",
        category: "Health",
        image: "/images/News/news1.webp",
        location: "Pune",
        date: "23/07/2025",
    },
    {
        id: 2,
        title: "Play for the world with us",
        category: "Old Age",
        image: "/images/News.webp",
        location: "Alandi",
        date: "23/07/2025",
    },
    {
        id: 3,
        title: "Contrary to popular belief",
        category: "Education",
        image: "/images/News.webp",
        location: "Pune",
        date: "23/07/2025",
    },
    {
        id: 4,
        title: "Medical support initiative",
        category: "Health",
        image: "/images/News.webp",
        location: "Mumbai",
        date: "10/08/2025",
    },
    {
        id: 5,
        title: "Senior citizen welfare program",
        category: "Old Age",
        image: "/images/News.webp",
        location: "Pune",
        date: "11/08/2025",
    },
    {
        id: 6,
        title: "Education awareness drive",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
    {
        id: 7,
        title: "Contrary to popular belief (Copy 1)",
        category: "Education",
        image: "/images/News.webp",
        location: "Pune",
        date: "23/07/2025",
    },
    {
        id: 8,
        title: "Medical support initiative (Copy 1)",
        category: "Health",
        image: "/images/News.webp",
        location: "Mumbai",
        date: "10/08/2025",
    },
    {
        id: 9,
        title: "Senior citizen welfare program (Copy 1)",
        category: "Old Age",
        image: "/images/News.webp",
        location: "Pune",
        date: "11/08/2025",
    },
    {
        id: 10,
        title: "Education awareness drive (Copy 1)",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
    {
        id: 11,
        title: "Contrary to popular belief (Copy 2)",
        category: "Education",
        image: "/images/News.webp",
        location: "Pune",
        date: "23/07/2025",
    },
    {
        id: 12,
        title: "Medical support initiative (Copy 2)",
        category: "Health",
        image: "/images/News.webp",
        location: "Mumbai",
        date: "10/08/2025",
    },
    {
        id: 13,
        title: "Senior citizen welfare program (Copy 2)",
        category: "Old Age",
        image: "/images/News.webp",
        location: "Pune",
        date: "11/08/2025",
    },
    {
        id: 14,
        title: "Education awareness drive (Copy 2)",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
    {
        id: 15,
        title: "Education awareness drive (Copy 2)",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
    {
        id: 16,
        title: "Education awareness drive (Copy 2)",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
    {
        id: 17,
        title: "Education awareness drive (Copy 2)",
        category: "Education",
        image: "/images/News.webp",
        location: "Nashik",
        date: "15/08/2025",
    },
];
