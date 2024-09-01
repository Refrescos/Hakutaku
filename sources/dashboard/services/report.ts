import GoogleService, { ChatEntry } from './google';

export interface InsightInput {
	insight: string;
	context: string;
	weight: number;
}

enum Priority {
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
	REQUIRED = 4,
}

export interface InsightOutput {
	insight: string;
	percentage: number;
	priority: Priority;
	description: string;
}

export interface TransactionData {
	minTransaction: number;
	maxTransaction: number;
	averageTransaction: number;
	totalTransactions: number;
	valuePercentage: {
		positive: number;
		zero: number;
		negative: number;
	};
	statusPercentage: {
		confirmed: number;
		canceled: number;
		denied: number;
		voided: number;
		approved: number;
	};
	transactionTypeStatusPercentage: {
		[key: string]: {
			confirmed: number;
			canceled: number;
			denied: number;
			voided: number;
			approved: number;
		};
	};
	totalByStatus: {
		confirmed: number;
		canceled: number;
		denied: number;
		voided: number;
		approved: number;
	};
	totalByCategory: {
		airlines: number;
		carRental: number;
		financial: number;
		food: number;
		hotels: number;
		organizations: number;
		retail: number;
		services: number;
	};
}

export const EXAMPLE_TRANSACTION_DATA: TransactionData = {
	minTransaction: -5003,
	maxTransaction: 15300,
	averageTransaction: 3695.42,
	totalTransactions: 4849,
	valuePercentage: {
		positive: 60.8,
		zero: 39.1,
		negative: 0.1,
	},
	statusPercentage: {
		confirmed: 59.1,
		canceled: 37.5,
		denied: 1.9,
		voided: 1.5,
		approved: 0.0,
	},
	transactionTypeStatusPercentage: {
		airlines: {
			confirmed: 77.8,
			canceled: 22.2,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		carRental: {
			confirmed: 58.9,
			canceled: 37.6,
			denied: 1.9,
			voided: 1.5,
			approved: 0.0,
		},
		financial: {
			confirmed: 100.0,
			canceled: 0,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		food: {
			canceled: 100.0,
			confirmed: 0,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		hotels: {
			confirmed: 87.5,
			canceled: 12.5,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		organizations: {
			confirmed: 100.0,
			canceled: 0,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		retail: {
			canceled: 50.0,
			confirmed: 50.0,
			denied: 0,
			voided: 0,
			approved: 0,
		},
		services: {
			confirmed: 66.7,
			canceled: 33.3,
			denied: 0,
			voided: 0,
			approved: 0,
		},
	},
	totalByStatus: {
		approved: 1000,
		canceled: 0,
		confirmed: 17493896,
		denied: 424200,
		voided: 0,
	},
	totalByCategory: {
		airlines: 14000,
		carRental: 17901337,
		financial: 2000,
		food: 0,
		hotels: 13000,
		organizations: 2000,
		retail: 4000,
		services: 3000,
	},
};

export const EXAMPLE_CHAT_ENTRIES: ChatEntry[] = [
	{
		bot: 'Welcome to StarkBank! How can I assist you today?',
		user: 'I need help integrating the payment API.',
		datetime: '2024-09-01T10:00:00Z',
	},
	{
		bot: 'Sure! Do you need documentation or a step-by-step guide?',
		user: 'A step-by-step guide would be great.',
		datetime: '2024-09-01T10:02:00Z',
	},
	{
		bot: 'Heres a guide on integrating the payment API: [link]. Let me know if you need further assistance.',
		user: 'Thanks, this is very helpful!',
		datetime: '2024-09-01T10:05:00Z',
	},
	{
		bot: 'Youre welcome! If you have any more questions, feel free to ask.',
		user: 'Actually, could you explain how to handle webhook events?',
		datetime: '2024-09-01T10:07:00Z',
	},
	{
		bot: 'Certainly! Webhook events allow you to receive real-time notifications about transactions. Heres how to set it up: [link].',
		user: 'Got it! Thanks again.',
		datetime: '2024-09-01T10:10:00Z',
	},
];
class Report {
	private chatEntries: ChatEntry[];
	private transactionData: TransactionData;
	PROMPT = `Based on your transactions and chat history, here are some insights(new services, features, etc.) that could be beneficial to your business, give me the percentage of how much you agree with each one and why, example of output:
	credit_card: 71% "You should implement a new feature that allows users to track their transactions in real-time.".
	transaction_monitor: 92% "You should implement a new feature that allows users to track their transactions in real-time.
	Now you can add your insights based on the analysis:`;

	constructor(chatEntries: ChatEntry[], transactionData: TransactionData) {
		this.chatEntries = chatEntries;
		this.transactionData = transactionData;
	}

	private formatTransactionData(): string {
		return `
		Min Transaction: ${this.transactionData.minTransaction} R$
		Max Transaction: ${this.transactionData.maxTransaction} R$
		Average Transaction: ${this.transactionData.averageTransaction.toFixed(2)} R$
		Total Transactions: ${this.transactionData.totalTransactions}
		Positive Value Percentage: ${this.transactionData.valuePercentage.positive}%
		Zero Value Percentage: ${this.transactionData.valuePercentage.zero}%
		Negative Value Percentage: ${this.transactionData.valuePercentage.negative}%
		Status Percentage:
			- Confirmed: ${this.transactionData.statusPercentage.confirmed}%
			- Canceled: ${this.transactionData.statusPercentage.canceled}%
			- Denied: ${this.transactionData.statusPercentage.denied}%
			- Voided: ${this.transactionData.statusPercentage.voided}%
			- Approved: ${this.transactionData.statusPercentage.approved}%
		`;
	}

	private formatChatHistory(): string {
		return this.chatEntries
			.map(
				(entry) => `
			User: ${entry.user}
			Bot: ${entry.bot}
			DateTime: ${entry.datetime}
		`
			)
			.join('\n');
	}

	calculatePriority(percentage: number, weight: number): Priority {
		const priority = percentage * weight;

		if (priority < 30) {
			return Priority.LOW;
		} else if (priority < 60) {
			return Priority.MEDIUM;
		} else if (priority < 90) {
			return Priority.HIGH;
		} else {
			return Priority.REQUIRED;
		}
	}

	async build(possibleInsights: InsightInput[]): Promise<InsightOutput[]> {
		const transactionDataText = this.formatTransactionData();
		const chatHistoryText = this.formatChatHistory();

		const inputText = `Transaction Data:\n${transactionDataText}\n\nChat History:\n${chatHistoryText}`;

		const geminiResponse = await GoogleService.getGeminiOutput(inputText, this.PROMPT);

		const percentagePredictions = this.parseGeminiResponse(geminiResponse);

		const insights: InsightOutput[] = possibleInsights.map((insight, index) => {
			const percentage = percentagePredictions.find((prediction) => prediction.name === insight.insight)?.percentage || 0;
			const priority = this.calculatePriority(percentage, insight.weight);

			return {
				insight: insight.insight,
				percentage,
				priority,
				description: insight.context,
			};
		});

		return insights;
	}

	private parseGeminiResponse(geminiResponse: string) {
		const lines = geminiResponse.split('\n');
		const percentagePredictions: number[] = [];
		let insightList = [];
		for (const line of lines) {
			let insight = {
				name: '',
				percentage: 0,
				description: '',
			};

			const matches = line.match(/(.*): (\d+)% "(.*)"/);

			if (matches) {
				insight.name = matches[1];
				insight.percentage = Number(matches[2]);
				insight.description = matches[3];

				percentagePredictions.push(insight.percentage);
			} else {
				console.error(`Failed to parse insight: ${line}`);
			}

			insightList.push(insight);
		}

		return insightList;
	}
}

export default Report;
