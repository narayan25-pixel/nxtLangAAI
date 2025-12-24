import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/config/db';
import * as userService from '@/services/users.service';

export async function GET() {
  try {
    await db.connectDB();
    const users = await userService.getAllUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await db.connectDB();
    const body = await req.json();
    const user = await userService.createUser(body);
    return NextResponse.json(
      { success: true, message: 'User created successfully', data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create user' },
      { status: 400 }
    );
  }
}
