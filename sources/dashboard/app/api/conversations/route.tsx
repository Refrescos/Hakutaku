import GoogleService from '@/services/google';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const intents = await GoogleService.listSessions();

		return NextResponse.json({ intents });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to retrieve intents' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { query } = await request.json();

		const { result, sessionId, sessionName } = await GoogleService.detectIntent(query);

		return NextResponse.json({
			result,
			sessionId,
			sessionName,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
	}
}
