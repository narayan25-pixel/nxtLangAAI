import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import slokasData from '@/slokas.seed.json';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Simple keyword search to find relevant slokas
function searchSlokas(query: string, limit = 5) {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(' ').filter(w => w.length > 2);
  
  const scored = slokasData.map((sloka: any) => {
    let score = 0;
    const searchText = `${sloka.chapterName} ${sloka.sloka}`.toLowerCase();
    
    // Check for chapter number match
    if (lowerQuery.includes(`chapter ${sloka.chapterNumber}`) || 
        lowerQuery.includes(`ch ${sloka.chapterNumber}`)) {
      score += 10;
    }
    
    // Check for sloka/verse number match
    if (lowerQuery.includes(`verse ${sloka.slokaNumber}`) ||
        lowerQuery.includes(`sloka ${sloka.slokaNumber}`)) {
      score += 10;
    }
    
    // Keyword matching
    keywords.forEach(keyword => {
      if (searchText.includes(keyword)) {
        score += 1;
      }
    });
    
    return { sloka, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.sloka);
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }
    
    // Search for relevant slokas
    const relevantSlokas = searchSlokas(question, 3);
    
    // Build context from relevant slokas
    const context = relevantSlokas.length > 0
      ? relevantSlokas.map((s: any) => 
          `Chapter ${s.chapterNumber} (${s.chapterName}), Verse ${s.slokaNumber}:\n${s.sloka}`
        ).join('\n\n')
      : 'No specific verses found. Please provide general guidance from the Bhagavad Gita.';
    
    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a knowledgeable guide on the Bhagavad Gita. Answer questions based on the provided verses with wisdom and clarity. If no specific verses are provided, share general wisdom from the Gita. Keep responses concise and meaningful.`,
        },
        {
          role: 'user',
          content: `Context from Bhagavad Gita:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const answer = completion.choices[0]?.message?.content || 'No response generated.';
    
    return NextResponse.json({
      success: true,
      answer,
      sources: relevantSlokas.map((s: any) => ({
        chapter: s.chapterNumber,
        verse: s.slokaNumber,
        chapterName: s.chapterName,
      })),
    });
    
  } catch (error: any) {
    console.error('Groq API error:', error);
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
