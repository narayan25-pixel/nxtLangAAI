// Generates a JSON array of all 700 Bhagavad Gita slokas with
// placeholder text, matching the current `sloka.model.js` fields.
// Output: public/slokas.seed.json

const fs = require('fs');
const path = require('path');

const chapters = [
  { number: 1, name: 'Arjuna Vishada Yoga', verses: 47 },
  { number: 2, name: 'Sankhya Yoga', verses: 72 },
  { number: 3, name: 'Karma Yoga', verses: 43 },
  { number: 4, name: 'Jnana Yoga', verses: 42 },
  { number: 5, name: 'Karma Sannyasa Yoga', verses: 29 },
  { number: 6, name: 'Dhyana Yoga', verses: 47 },
  { number: 7, name: 'Jnana Vijnana Yoga', verses: 30 },
  { number: 8, name: 'Akshara Brahma Yoga', verses: 28 },
  { number: 9, name: 'Raja Vidya Raja Guhya Yoga', verses: 34 },
  { number: 10, name: 'Vibhuti Yoga', verses: 42 },
  { number: 11, name: 'Vishvarupa Darshana Yoga', verses: 55 },
  { number: 12, name: 'Bhakti Yoga', verses: 20 },
  { number: 13, name: 'Kshetra Kshetrajna Vibhaga Yoga', verses: 34 },
  { number: 14, name: 'Gunatraya Vibhaga Yoga', verses: 27 },
  { number: 15, name: 'Purushottama Yoga', verses: 20 },
  { number: 16, name: 'Daivasura Sampad Vibhaga Yoga', verses: 24 },
  { number: 17, name: 'Shraddhatraya Vibhaga Yoga', verses: 28 },
  { number: 18, name: 'Moksha Sannyasa Yoga', verses: 78 },
];

const slokas = [];
for (const ch of chapters) {
  for (let i = 1; i <= ch.verses; i++) {
    slokas.push({
      chapterNumber: String(ch.number),
      chapterName: ch.name,
      slokaNumber: String(i),
      sloka: ``,
      ctreatedBy: 'admin', // matches current model field spelling
    });
  }
}

const outPath = path.join(process.cwd(), 'public', 'slokas.seed.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(slokas, null, 2));

console.log(`Wrote ${slokas.length} slokas to ${outPath}`);