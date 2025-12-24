import * as db from '@/config/db';
import * as slokaService from '@/services/sloka.service';
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    await db.connectDB();
    const slokas = await slokaService.getAllSlokas();
    return NextResponse.json({ success: true, data: slokas });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch slokas' },
      { status: 500 }
    );
  }
}