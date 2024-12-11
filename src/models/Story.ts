export interface Story {
    id: Number;
    title: string;
    content: string;
    author: string;
    created_at: string;
  }
  
  // Mock data generation
  export const generateMockStories = (): Story[] => {
    return [
        {
            "id": 1,
            "title": "Whispers of the Night",
            "content": "In the quiet of the night, secrets linger and whispers travel through the air, revealing hidden desires.",
            "author": "Aditi Sharma",
            'created_at': "2023-09-15T12:34:56Z",
            },
            {
            "id": 2,
            "title": "The Dance of Shadows",
            "content": "As shadows danced on the walls, she found herself lost in a world of dreams and fantasies, yearning for more.",
            "author": "Raj Mehta",
            "created_at": "2023-09-16T14:21:00Z"
            },
            {
            "id": 3,
            "title": "A Taste of Forbidden Fruit",
            "content": "In a world where temptation lurks at every corner, one must navigate the fine line between desire and restraint.",
            "author": "Sneha Patel",
            "created_at": "2023-09-17T09:15:30Z"
            },
            {
            "id": 4,
            "title": "Beneath the Surface",
            "content": "Beneath the calm exterior lies a storm of emotions waiting to be unleashed, revealing the true self.",
            "author": "Karan Singh",
            "created_at": "2023-09-18T11:45:00Z"
            },
            {
            "id": 5,
            "title": "Echoes of Passion",
            "content": "Every heartbeat echoed with passion as two souls intertwined, creating a symphony of love and longing.",
            "author": "Priya Desai",
            "created_at": "2023-09-19T16:30:00Z"
            },
            {
            "id": 6,
            "title": "Unraveling Secrets",
            "content": "As layers were peeled away, hidden secrets came to light, unveiling a past that shaped the present.",
            "author": "Vikram Joshi",
            "created_at": "2023-09-20T08:10:00Z"
            },
            {
            "id": 7,
            "title": "A Journey Through Time",
            "content": "Time stood still as they ventured into a realm where past and present collided, crafting a tale of destiny.",
            "author": "Meera Gupta",
            "created_at": "2023-09-21T13:55:00Z"
            },
            {
            "id": 8,
            "title": "Embers of Desire",
            "content": "The flickering flames of desire ignited a passion that would change everything, leaving an indelible mark.",
            "author": "Siddharth Roy",
            "created_at": "2023-09-22T19:00:00Z"
            },
            {
            "id": 9,
            "title": "A Heart's Dilemma",
            "content": "Caught between love and duty, she faced a dilemma that would determine her fate and the lives of many.",
            "author": "Anjali Verma",
            "created_at": "2023-09-23T10:20:00Z"
            },
            {
            "id": 10,
            "title": "The Art of Seduction",
            "content": "With every glance and every touch, the art of seduction unfolded, creating a story of longing and allure.",
            "author": "Rahul Nair",
            "created_at": "2023-09-24T15:45:00Z"
            }
    ];
  }
  
  // In-memory storage of mock stories
  export const stories = generateMockStories();