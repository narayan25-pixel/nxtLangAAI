import * as db from '@/config/db';
import * as slokaService from '@/services/sloka.service';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    await db.connectDB();
    const body = await req.json();
    const result = await slokaService.addSlokas(body);
    return NextResponse.json(
      {
        success: true,
        message: Array.isArray(body)
          ? `Slokas added successfully (count: ${Array.isArray(result) ? result.length : 1})`
          : 'Sloka added successfully',
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to add slokas' },
      { status: 400 }
    );
  }
}