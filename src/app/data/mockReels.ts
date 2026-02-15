export interface Reel {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    videoUrl: string;
    thumbnailUrl?: string;
    caption: string;
    likes: number;
    comments: number;
    shares: number;
    views: number;
    category?: string;
    createdAt: string;
    hasLiked?: boolean;
    hasSaved?: boolean;
}

export const mockReels: Reel[] = [
    {
        id: 'reel-1',
        userId: 'David 2027',
        userName: 'David 2027',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ambode',
        videoUrl: '/david_hospital.mp4',
        thumbnailUrl: '/david_campaign_flag.jpg', // Using placeholder until specific asset provided
        caption: `🚀 David 2027: A Vision for Progress

Secure the future with leadership that counts.

✅ Proven Track Record
✅ Economic Empowerment
✅ Infrastructure Development

"Together, we can build a future where every citizen has access to quality education, healthcare, and opportunities for growth."

Join the movement for a greater Nigeria! 🇳🇬

#Davide2027 #Leadership #Progress #Nigeria #Vision2027`,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        category: 'politics',
        createdAt: '2026-02-15T09:00:00Z',
        hasLiked: false,
        hasSaved: false,
    },
    {
        id: 'reel-2',
        userId: '5',
        userName: 'David Emmanuel Ombugadu',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidOmbugadu',
        videoUrl: '/david_hospital.mp4',
        thumbnailUrl: '/david_campaign_flag.jpg',
        caption: `🎯 OFFICIAL DECLARATION OF RESOLVE

I am running for the Office of the Executive Governor of Nasarawa State.

My focus is singular. My resolve is absolute
✅ We won in 2023
✅ We will win together again in 2027

This time, the process will be different. We will ensure the sanctity of the ballot box from polling units to the final collation center.

Nasarawa deserves a leader who emerges from the collective will of the people, persuaded by a shared vision for all.

It is still possible to win together. 💪

—David Emmanuel Ombugadu

#Nasarawa2027 #Leadership #Politics #Nigeria #Democracy #Justice #OmbugaduIsComing`,
        likes: 0,
        comments: 892,
        shares: 3456,
        views: 45678,
        category: 'politics',
        createdAt: '2026-02-15T00:00:00Z',
        hasLiked: false,
        hasSaved: false,
    },
];

export const getReelById = (id: string): Reel | undefined => {
    return mockReels.find(reel => reel.id === id);
};

export const getMockReels = (): Reel[] => {
    return mockReels;
};
