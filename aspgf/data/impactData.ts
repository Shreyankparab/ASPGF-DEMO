export interface ImpactStory {
    id: number;
    image: string;
    title: string;
    location: string;
    year: string;
    description: string;
}


export interface ImpactVideoStory {
    id: number;
    thumbnail: string;
    title: string;
    location: string;
    year: string;
    duration: string;
    videoUrl: string;
    isFeatured?: boolean;
}

export const videoStories: ImpactVideoStory[] = [
    {
        id: 1,
        thumbnail: "/images/impact-main.png",
        title: "How this initiative change my kids life",
        location: "PUNE",
        year: "2023",
        duration: "0:31 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isFeatured: true
    },
    {
        id: 2,
        thumbnail: "/images/impact-1.png",
        title: "Relief and happiness felt by me and my family",
        location: "PUNE",
        year: "2023",
        duration: "0:16 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 3,
        thumbnail: "/images/impact-2.png",
        title: "How the fee support changed my life",
        location: "PUNE",
        year: "2023",
        duration: "0:31 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 4,
        thumbnail: "/images/impact-3.png",
        title: "Renewed my confidence to study without worry",
        location: "PUNE",
        year: "2023",
        duration: "0:12 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 5,
        thumbnail: "/images/impact-4.png",
        title: "How this initiative change my life",
        location: "PUNE",
        year: "2023",
        duration: "0:34 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 6,
        thumbnail: "/images/impact-5.png",
        title: "How Fee Assistance Changed My Future",
        location: "PUNE",
        year: "2023",
        duration: "0:12 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 7,
        thumbnail: "/images/impact-6.png",
        title: "How timely educational assistance helps students stay focused and motivated",
        location: "PUNE",
        year: "2023",
        duration: "1:10 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 8,
        thumbnail: "/images/impact-7.png",
        title: "How empathy-driven programs empower both teachers and learners",
        location: "PUNE",
        year: "2023",
        duration: "0:46 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 9,
        thumbnail: "/images/impact-4.png",
        title: "Renewed my confidence to study without worry",
        location: "PUNE",
        year: "2023",
        duration: "0:12 min",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
];
