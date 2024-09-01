import GoogleService from '@/services/google';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to retrieve intents' }, { status: 500 });
	}
}
