import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/config/db';
import * as userService from '@/services/users.service';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.connectDB();
    const data = await userService.getUserRole(params.id);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch user role' },
      { status: 500 }
    );
  }
}
