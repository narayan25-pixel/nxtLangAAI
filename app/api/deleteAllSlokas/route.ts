import * as db from '@/config/db';
import * as slokaService from '@/services/sloka.service';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    await db.connectDB();
    const result = await slokaService.deleteAllSlokas();
    
    return NextResponse.json(
      {
        success: true,
        message: `Deleted all slokas (count: ${result.deletedCount})`,
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete all slokas' },
      { status: 500 }
    );
  }
}
