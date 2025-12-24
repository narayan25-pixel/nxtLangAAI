import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/config/db';
import * as slokaService from '@/services/sloka.service';

export async function PUT(request: NextRequest) {
  try {
    await db.connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Sloka ID is required' },
        { status: 400 }
      );
    }

    const updatedSloka = await slokaService.updateSloka(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'Sloka updated successfully',
      data: updatedSloka,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to update sloka' },
      { status: 500 }
    );
  }
}
