import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { getEmbedder } from '@/app/lib/embeddings';
import rawSlokas from '@/slokas.embedded.json';

interface Sloka {
  chapterNumber: string;
  slokaNumber: string;
  chapterName: string;
  sloka: string;
  embedding?: number[];
}

const slokasEmbedded: Sloka[] = rawSlokas as Sloka[];

let lastRequestTime = 0;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}



export async function searchSlokasSemantic(
  query: string,
  limit: number = 5
): Promise<Sloka[]> {
  const embedder = await getEmbedder();

  // The embedder returns nested arrays, so flatten to number[]
  const queryEmbeddingRaw = (await embedder(query, {
    pooling: 'mean',
    normalize: true,
  }));

  const queryEmbedding = queryEmbeddingRaw?.data as Float32Array;

  // Convert to plain number[]
  const queryEmbeddingArray = Array.from(queryEmbedding);

  const scored = slokasEmbedded?.map((sloka: Sloka) => ({
    sloka,
    score: cosineSimilarity(queryEmbeddingArray, sloka.embedding ?? []),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.sloka);
}

function extractVerseReference(query: string): { chapter: number; verse: number } | null {
  // Match patterns like "chapter 1 verse 1", "ch 1 v 1", "1:1", etc.
  const patterns = [
    /chapter\s*(\d+)\s*(?:verse|sloka|shloka)?\s*(\d+)/i,
    /ch\s*(\d+)\s*(?:v|verse|sloka)?\s*(\d+)/i,
    /(\d+)[:\-.](\d+)/,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      return { chapter: parseInt(match[1]), verse: parseInt(match[2]) };
    }
  }
  return null;
}

function extractChapterReference(query: string): number | null {
  // Match patterns like "chapter 1", "ch 1", but NOT when followed by a verse number
  const patterns = [
    /chapter\s*(\d+)(?!\s*(?:verse|sloka|shloka|v|\d|[:\-.]))/i,
    /ch\s*(\d+)(?!\s*(?:verse|sloka|v|\d|[:\-.]))/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const now = Date.now();
    if (now - lastRequestTime < 1500) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }
    lastRequestTime = now;

    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Check if user is asking for a specific verse or chapter
    // IMPORTANT: Check chapter first to avoid false matches
    const chapterRef = extractChapterReference(question);
    const verseRef = !chapterRef ? extractVerseReference(question) : null;
    let relevantSlokas: Sloka[];

    if (verseRef) {
      // Direct lookup for specific verse
      const specificSloka = slokasEmbedded.find(
        s => Number(s.chapterNumber) === verseRef.chapter && Number(s.slokaNumber) === verseRef.verse
      );
      relevantSlokas = specificSloka ? [specificSloka] : [];
    } else if (chapterRef) {
      // Get all verses from the specified chapter
      const chapterVerses = slokasEmbedded
        .filter(s => Number(s.chapterNumber) === chapterRef)
        .sort((a, b) => Number(a.slokaNumber) - Number(b.slokaNumber));

      if (chapterVerses.length > 0) {
        // Get diverse verses from the chapter (beginning, middle, end)
        const totalVerses = chapterVerses.length;
        const selectedIndices = [
          0, // First verse
          Math.floor(totalVerses * 0.25),
          Math.floor(totalVerses * 0.5),
          Math.floor(totalVerses * 0.75),
          Math.max(0, totalVerses - 1), // Last verse
        ];

        // Remove duplicates and get unique verses
        const uniqueIndices = [...new Set(selectedIndices)];
        relevantSlokas = uniqueIndices.map(idx => chapterVerses[idx]).filter(Boolean);

      } else {
        relevantSlokas = [];
      }
    } else {
      relevantSlokas = await searchSlokasSemantic(question, 3);
    }

    // Build context from relevant slokas
    const context = relevantSlokas.length > 0
      ? relevantSlokas.map((s: Sloka) =>
        `Chapter ${s.chapterNumber} (${s.chapterName}), Verse ${s.slokaNumber}:\n${s.sloka}`
      ).join('\n\n')
      : 'No specific verses found. Please provide general guidance from the Bhagavad Gita.';

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a knowledgeable guide on the Bhagavad Gita.

IMPORTANT: Answer the question using ONLY the verses provided below. Do not reference verses that are not listed. When explaining what a chapter teaches, base your explanation on the provided verses from that chapter.`
        },
        {
          role: 'user',
          content: `Here are the relevant verses:

${context}

Question: ${question}

Provide an answer based only on the verses above.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 500,
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated.';

    const sources = relevantSlokas.map((s: Sloka) => ({
      chapter: s.chapterNumber,
      verse: s.slokaNumber,
      chapterName: s.chapterName,
      link: `/chapter/${s.chapterNumber}/verse/${s.slokaNumber}`,
    }));

    return NextResponse.json({
      success: true,
      answer,
      sources: sources,
    });

  } catch (error: unknown) {
    console.error('Groq API error:', error);

    if (error && typeof error === 'object' && 'status' in error && error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    const errorMessage = error && typeof error === 'object' && 'message' in error 
      ? String(error.message) 
      : 'Failed to get response from AI';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
