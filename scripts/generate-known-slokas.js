// Generates a JSON array of known Bhagavad Gita verses in English
// Output: public/slokas-known.json

const fs = require('fs');
const path = require('path');

const knownSlokas = [
  // Chapter 1 - Arjuna Vishada Yoga
  {
    chapterNumber: "1",
    chapterName: "Arjuna Vishada Yoga",
    slokaNumber: "1",
    sloka: "Dhritarashtra said: O Sanjaya, assembled in the holy land of Kurukshetra and desiring to fight, what did my sons and the sons of Pandu do?",
    ctreatedBy: "admin"
  },
  
  // Chapter 2 - Sankhya Yoga
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "7",
    sloka: "My heart is overcome by the weakness of pity, and my mind is confused about duty. I am asking You to tell me decisively what is best for me. Now I am Your disciple, a soul surrendered unto You. Please instruct me.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "13",
    sloka: "As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "20",
    sloka: "For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "22",
    sloka: "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "47",
    sloka: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "55",
    sloka: "The Supreme Lord said: O Partha, when one gives up all varieties of desire for sense gratification which arise from mental concoction, and when the mind thus purified finds satisfaction in the self alone, then he is said to be in pure transcendental consciousness.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "56",
    sloka: "One who is not disturbed in mind even amidst the threefold miseries or elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "62",
    sloka: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "2",
    chapterName: "Sankhya Yoga",
    slokaNumber: "63",
    sloka: "From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.",
    ctreatedBy: "admin"
  },

  // Chapter 3 - Karma Yoga
  {
    chapterNumber: "3",
    chapterName: "Karma Yoga",
    slokaNumber: "8",
    sloka: "Perform your prescribed duty, for doing so is better than not working. One cannot even maintain one's physical body without work.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "3",
    chapterName: "Karma Yoga",
    slokaNumber: "19",
    sloka: "Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "3",
    chapterName: "Karma Yoga",
    slokaNumber: "27",
    sloka: "The spirit soul bewildered by the influence of false ego thinks himself the doer of activities that are in actuality carried out by the three modes of material nature.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "3",
    chapterName: "Karma Yoga",
    slokaNumber: "35",
    sloka: "It is far better to discharge one's prescribed duties, even though faultily, than another's duties perfectly. Destruction in the course of performing one's own duty is better than engaging in another's duties, for to follow another's path is dangerous.",
    ctreatedBy: "admin"
  },

  // Chapter 4 - Jnana Yoga
  {
    chapterNumber: "4",
    chapterName: "Jnana Yoga",
    slokaNumber: "7",
    sloka: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "4",
    chapterName: "Jnana Yoga",
    slokaNumber: "8",
    sloka: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, millennium after millennium.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "4",
    chapterName: "Jnana Yoga",
    slokaNumber: "11",
    sloka: "As all surrender unto Me, I reward them accordingly. Everyone follows My path in all respects, O son of Pritha.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "4",
    chapterName: "Jnana Yoga",
    slokaNumber: "18",
    sloka: "One who sees inaction in action, and action in inaction, is intelligent among men, and he is in the transcendental position, although engaged in all sorts of activities.",
    ctreatedBy: "admin"
  },

  // Chapter 5 - Karma Sannyasa Yoga
  {
    chapterNumber: "5",
    chapterName: "Karma Sannyasa Yoga",
    slokaNumber: "10",
    sloka: "One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.",
    ctreatedBy: "admin"
  },

  // Chapter 6 - Dhyana Yoga
  {
    chapterNumber: "6",
    chapterName: "Dhyana Yoga",
    slokaNumber: "5",
    sloka: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "6",
    chapterName: "Dhyana Yoga",
    slokaNumber: "23",
    sloka: "That which is known as yoga is freedom from contact with misery. This yoga should be practiced with determination and with an undisturbed mind.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "6",
    chapterName: "Dhyana Yoga",
    slokaNumber: "35",
    sloka: "Lord Krishna said: O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
    ctreatedBy: "admin"
  },

  // Chapter 7 - Jnana Vijnana Yoga
  {
    chapterNumber: "7",
    chapterName: "Jnana Vijnana Yoga",
    slokaNumber: "3",
    sloka: "Out of many thousands among men, one may endeavor for perfection, and of those who have achieved perfection, hardly one knows Me in truth.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "7",
    chapterName: "Jnana Vijnana Yoga",
    slokaNumber: "14",
    sloka: "This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.",
    ctreatedBy: "admin"
  },

  // Chapter 8 - Akshara Brahma Yoga
  {
    chapterNumber: "8",
    chapterName: "Akshara Brahma Yoga",
    slokaNumber: "5",
    sloka: "And whoever, at the end of his life, quits his body, remembering Me alone, at once attains My nature. Of this there is no doubt.",
    ctreatedBy: "admin"
  },

  // Chapter 9 - Raja Vidya Raja Guhya Yoga
  {
    chapterNumber: "9",
    chapterName: "Raja Vidya Raja Guhya Yoga",
    slokaNumber: "22",
    sloka: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "9",
    chapterName: "Raja Vidya Raja Guhya Yoga",
    slokaNumber: "26",
    sloka: "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "9",
    chapterName: "Raja Vidya Raja Guhya Yoga",
    slokaNumber: "27",
    sloka: "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kunti, as an offering to Me.",
    ctreatedBy: "admin"
  },

  // Chapter 10 - Vibhuti Yoga
  {
    chapterNumber: "10",
    chapterName: "Vibhuti Yoga",
    slokaNumber: "20",
    sloka: "I am the Supersoul, O Arjuna, seated in the hearts of all living entities. I am the beginning, the middle and the end of all beings.",
    ctreatedBy: "admin"
  },

  // Chapter 11 - Vishvarupa Darshana Yoga
  {
    chapterNumber: "11",
    chapterName: "Vishvarupa Darshana Yoga",
    slokaNumber: "33",
    sloka: "Therefore get up. Prepare to fight and win glory. Conquer your enemies and enjoy a flourishing kingdom. They are already put to death by My arrangement, and you, O Savyasachin, can be but an instrument in the fight.",
    ctreatedBy: "admin"
  },

  // Chapter 12 - Bhakti Yoga
  {
    chapterNumber: "12",
    chapterName: "Bhakti Yoga",
    slokaNumber: "13",
    sloka: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant, always satisfied, self-controlled, and engaged in devotional service with determination, his mind and intelligence fixed on Me—such a devotee of Mine is very dear to Me.",
    ctreatedBy: "admin"
  },

  // Chapter 13 - Kshetra Kshetrajna Vibhaga Yoga
  {
    chapterNumber: "13",
    chapterName: "Kshetra Kshetrajna Vibhaga Yoga",
    slokaNumber: "8",
    sloka: "Humility; pridelessness; nonviolence; tolerance; simplicity; approaching a bona fide spiritual master; cleanliness; steadiness; self-control; these are declared to be knowledge.",
    ctreatedBy: "admin"
  },

  // Chapter 14 - Gunatraya Vibhaga Yoga
  {
    chapterNumber: "14",
    chapterName: "Gunatraya Vibhaga Yoga",
    slokaNumber: "27",
    sloka: "And I am the basis of the impersonal Brahman, which is immortal, imperishable and eternal and is the constitutional position of ultimate happiness.",
    ctreatedBy: "admin"
  },

  // Chapter 15 - Purushottama Yoga
  {
    chapterNumber: "15",
    chapterName: "Purushottama Yoga",
    slokaNumber: "7",
    sloka: "The living entities in this conditioned world are My eternal fragmental parts. Due to conditioned life, they are struggling very hard with the six senses, which include the mind.",
    ctreatedBy: "admin"
  },

  // Chapter 16 - Daivasura Sampad Vibhaga Yoga
  {
    chapterNumber: "16",
    chapterName: "Daivasura Sampad Vibhaga Yoga",
    slokaNumber: "21",
    sloka: "There are three gates leading to the hell of self-destruction for the soul—lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
    ctreatedBy: "admin"
  },

  // Chapter 17 - Shraddhatraya Vibhaga Yoga
  {
    chapterNumber: "17",
    chapterName: "Shraddhatraya Vibhaga Yoga",
    slokaNumber: "15",
    sloka: "Austerity of speech consists in speaking words that are truthful, pleasing, beneficial, and not agitating to others, and also in regularly reciting Vedic literature.",
    ctreatedBy: "admin"
  },

  // Chapter 18 - Moksha Sannyasa Yoga
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "5",
    sloka: "Acts of sacrifice, charity and penance are not to be given up; they must be performed. Indeed, sacrifice, charity and penance purify even the great souls.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "41",
    sloka: "Brahmanas, kshatriyas, vaishyas and shudras are distinguished by the qualities born of their own natures in accordance with the material modes, O chastiser of the enemy.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "48",
    sloka: "Every endeavor is covered by some fault, just as fire is covered by smoke. Therefore one should not give up the work born of his nature, O son of Kunti, even if such work is full of fault.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "58",
    sloka: "If you become conscious of Me, you will pass over all the obstacles of conditioned life by My grace. If, however, you do not work in such consciousness but act through false ego, not hearing Me, you will be lost.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "66",
    sloka: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    ctreatedBy: "admin"
  },
  {
    chapterNumber: "18",
    chapterName: "Moksha Sannyasa Yoga",
    slokaNumber: "78",
    sloka: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion.",
    ctreatedBy: "admin"
  }
];

const outPath = path.join(process.cwd(), 'public', 'slokas-known.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(knownSlokas, null, 2));

console.log(`Wrote ${knownSlokas.length} known slokas (English) to ${outPath}`);
