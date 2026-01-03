const message = [
    {
        "role": "user",
        "content": "what does chapter 5 teaches us"
    },
    {
        "role": "assistant",
        "content": "Chapter 5 of the Bhagavad Gita, Karma Sannyasa Yoga, teaches us the importance of performing our prescribed duties (karma) without attachment to the outcome, and offering them to the Lord. It emphasizes that renunciation of worldly pleasures (sanyasa) is not just about giving up actions, but also about giving up the ego and attachment to the fruits of those actions.\n\nThe key takeaways from this chapter are:\n\n1. **Performing actions without expectation**: Do your duty without being attached to the outcome.\n2. **Offering actions to the Lord**: Dedicate your actions to a higher purpose, recognizing that the Lord is the ultimate cause of all activities.\n3. **Balance between renunciation and action**: Both renunciation and action are necessary for liberation, but performing prescribed actions is considered better than merely renouncing worldly pleasures.\n\nUltimately, Chapter 5 teaches us to cultivate a sense of detachment, selflessness, and devotion while performing our duties, leading to a more peaceful and liberated state of being.",
        "sources": [
            {
                "chapter": "5",
                "verse": "10",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/10"
            },
            {
                "chapter": "5",
                "verse": "1",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/1"
            },
            {
                "chapter": "5",
                "verse": "2",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/2"
            }
        ]
    },
    {
        "role": "user",
        "content": "what does chapter 9 teaches us"
    },
    {
        "role": "assistant",
        "content": "Chapter 9 of the Bhagavad Gita, Raja Vidya Raja Guhya Yoga, teaches us several key lessons:\n\n1. **Importance of Faith**: It emphasizes the need for faith in the divine and the knowledge that leads to the Lord (Verse 3).\n2. **Sincerity and Devotion**: The chapter highlights the value of sincere devotion, regardless of the simplicity of the offering (Verse 26).\n3. **Dedication and Surrender**: It instructs us to offer all our actions, consumption, and efforts to the Lord, promoting a sense of dedication and surrender (Verse 27).\n4. **Universal Acceptance**: The Lord accepts all offerings, big or small, made with devotion, indicating that it's the intention and devotion that matters, not the grandeur of the act.\n\nOverall, Chapter 9 teaches us to cultivate faith, devotion, and a sense of surrender in our daily lives, and to offer our actions and intentions to the divine, leading to a deeper connection with the Lord.",
        "sources": [
            {
                "chapter": "9",
                "verse": "3",
                "chapterName": "Raja Vidya Raja Guhya Yoga",
                "link": "/chapter/9/verse/3"
            },
            {
                "chapter": "9",
                "verse": "26",
                "chapterName": "Raja Vidya Raja Guhya Yoga",
                "link": "/chapter/9/verse/26"
            },
            {
                "chapter": "9",
                "verse": "27",
                "chapterName": "Raja Vidya Raja Guhya Yoga",
                "link": "/chapter/9/verse/27"
            }
        ]
    },
    {
        "role": "user",
        "content": "chapter 5 is about what"
    },
    {
        "role": "assistant",
        "content": "Chapter 5 of the Bhagavad Gita is about \"Karma Sannyasa Yoga\", which means the yoga of renouncing actions or the path of renunciation of actions while still performing them. It discusses the balance between action (karma) and renunciation (sannyasa), and how one can achieve spiritual growth and self-realization through a combination of both.",
        "sources": [
            {
                "chapter": "5",
                "verse": "16",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/16"
            },
            {
                "chapter": "5",
                "verse": "24",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/24"
            },
            {
                "chapter": "5",
                "verse": "1",
                "chapterName": "Karma Sannyasa Yoga",
                "link": "/chapter/5/verse/1"
            }
        ]
    },
    {
        "role": "user",
        "content": "chapter 8 is about what"
    },
    {
        "role": "assistant",
        "content": "Chapter 8 of the Bhagavad Gita is about \"Akshara Brahma Yoga\", which translates to the \"Yoga of the Imperishable Absolute\". This chapter focuses on the attainment of the Supreme Being and the importance of remembering Krishna at the time of death to achieve liberation. It explores the nature of the ultimate reality, the self, and the path to reaching the divine.",
        "sources": [
            {
                "chapter": "8",
                "verse": "1",
                "chapterName": "Akshara Brahma Yoga",
                "link": "/chapter/8/verse/1"
            },
            {
                "chapter": "8",
                "verse": "5",
                "chapterName": "Akshara Brahma Yoga",
                "link": "/chapter/8/verse/5"
            },
            {
                "chapter": "8",
                "verse": "6",
                "chapterName": "Akshara Brahma Yoga",
                "link": "/chapter/8/verse/6"
            }
        ]
    }
]

const sizeInBytes = new Blob([JSON.stringify(message)]).size;

console.log("Size in bytes:", sizeInBytes);