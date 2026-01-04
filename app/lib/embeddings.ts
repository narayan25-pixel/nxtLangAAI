import { pipeline } from '@xenova/transformers';

let embedder:any;

export async function getEmbedder() {
  if (!embedder) {
    // Load BGE-M3 model from Hugging Face
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}
