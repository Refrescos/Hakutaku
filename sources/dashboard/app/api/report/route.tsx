import Report, { EXAMPLE_CHAT_ENTRIES, EXAMPLE_TRANSACTION_DATA } from '@/services/report';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const report = new Report(EXAMPLE_CHAT_ENTRIES, EXAMPLE_TRANSACTION_DATA);
		const insights = await report.build([
			{
				insight: 'credit_card',
				weight: 1,
				context: 'The user neeed a credit card',
			},
			{
				insight: 'institution_bank',
				weight: 1,
				context: 'The user needs new bank account',
			},
		]);

		return NextResponse.json({ insights });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to retrieve intents' }, { status: 500 });
	}
}
