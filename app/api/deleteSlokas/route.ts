import * as db from '@/config/db';
import * as slokaService from '@/services/sloka.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    await db.connectDB();
    const body = await req.json();
    
    // body can be:
    // Single: { chapterNumber: "1", slokaNumber: "3" }
    // Multiple: [{ chapterNumber: "1", slokaNumber: "3" }, { chapterNumber: "2", slokaNumber: "5" }]
    
    const result = await slokaService.deleteSlokasByFilter(body);
    
    return NextResponse.json(
      {
        success: true,
        message: `Deleted ${result.deletedCount} sloka(s)`,
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete slokas' },
      { status: 400 }
    );
  }
}
