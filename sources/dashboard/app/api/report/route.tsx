import Report from '@/services/report';
import { EXAMPLE_CHAT_ENTRIES, EXAMPLE_TRANSACTION_DATA, EXAMPLE_DASHBOARD_DATA, EXAMPLE_INSIGHTS } from '@/services/fake';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const report = new Report(EXAMPLE_CHAT_ENTRIES, EXAMPLE_TRANSACTION_DATA, EXAMPLE_DASHBOARD_DATA);
		const insights = await report.build(EXAMPLE_INSIGHTS);

		return NextResponse.json({ ...insights });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to retrieve intents' }, { status: 500 });
	}
}
