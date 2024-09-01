import GoogleService from '@/services/google';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const chat = await GoogleService.getSessionChat(params.id);

		return NextResponse.json({ chat });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to retrieve intents' }, { status: 500 });
	}
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
	try {
		const { query } = await request.json();
		const chat = await GoogleService.detectIntent(query, params.id);

		return NextResponse.json({ chat });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
	}
}
