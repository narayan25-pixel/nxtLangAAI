// scripts/precompute.js
const fs = require('fs');
const path = require('path');
const { pipeline } = require('@xenova/transformers');

async function main() {
  // Load slokas JSON
  const slokasPath = path.resolve(__dirname, '../slokas.seed.json');
  const slokasData = JSON.parse(fs.readFileSync(slokasPath, 'utf-8'));

  // Load BGE-M3 model
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  const enriched = [];
  for (const sloka of slokasData) {
    const text = `${sloka.chapterName} ${sloka.sloka}`;
    const embeddingRaw = await embedder(text, { pooling: 'mean', normalize: true });
    const embeddingArray = Array.from(embeddingRaw.data);
    enriched.push({ ...sloka, embedding: embeddingArray });

  }

  fs.writeFileSync(
    path.resolve(__dirname, '../slokas.embedded.json'),
    JSON.stringify(enriched, null, 2)
  );
  console.log('✅ Sloka embeddings saved to slokas.embedded.json');
}

main();