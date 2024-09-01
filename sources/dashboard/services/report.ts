import { ChatEntry } from './google';
import OpenAIService from './openai';

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
	name: string;
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

export interface DashboardData {
	requestsToday: number;
	teamTimeSaved: number;
	averageRequestsPerIssue: number;
	averageIntegrationTime: number;
	retentionRate: number;
	mostSearchedSections: { section: string; count: number }[];
	problemResolutionByProduct: { product: string; requests: number; resolutionRate: number }[];
}

class Report {
	private chatEntries: ChatEntry[];
	private transactionData: TransactionData;
	private dashboardData: DashboardData;

	PROMPT = `You are an AI assistant for StarkBank. Your task is to analyze the provided transaction data and chat history to generate specific, actionable business insights for the user. These insights should include new services, features, or other recommendations that could benefit StarkBank clients. You should also create a unique name for each insight using the format "<insight_name>(<description>)" and assign a priority level based on its importance, considering both the weight of the insight and your AI intuition.

	Format the output as:
	<insight_name>(<description>): <percentage>% "<detailed description>"
	Where:
	- <insight_name> is the name of the insight.
	- <description> is a brief description of the insight.
	- <percentage> is how much you agree with the insight.
	- <detailed description> is a brief explanation of the insight.

	Example:
	credit_card(Offer credit card service): 85% "Implement a real-time transaction tracking feature for credit card users."
	transaction_monitor(Enhance transaction monitoring): 92% "Enhance transaction monitoring with AI-based fraud detection."

	Write raw text insights line by line, without any additional formatting.
	Feel free to create new insights based on the context and history provided, and prioritize them intelligently.
	`;

	constructor(chatEntries: ChatEntry[], transactionData: TransactionData, dashboardData: DashboardData) {
		this.chatEntries = chatEntries;
		this.transactionData = transactionData;
		this.dashboardData = dashboardData;
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

	private calculateAIIntuition(insight: { name: string; percentage: number }): number {
		return Math.random() * 0.3 + 0.7;
	}

	private calculatePriority(percentage: number, weight: number, aiIntuition: number): Priority {
		const priorityScore = percentage * weight * aiIntuition;

		if (priorityScore < 50) {
			return Priority.LOW;
		} else if (priorityScore < 75) {
			return Priority.MEDIUM;
		} else if (priorityScore < 90) {
			return Priority.HIGH;
		} else {
			return Priority.REQUIRED;
		}
	}

	async build(possibleInsights: InsightInput[]): Promise<{ insights: InsightOutput[]; data: DashboardData }> {
		const transactionDataText = this.formatTransactionData();
		const chatHistoryText = this.formatChatHistory();

		const inputText = `Transaction Data:\n${transactionDataText}\n\nChat History:\n${chatHistoryText}`;

		const response = await OpenAIService.getOutput(inputText, this.PROMPT);

		const predictions = this.parseResponse(response);

		const insights: InsightOutput[] = predictions.map((insight, index) => {
			const [percentage, description] = [insight.percentage, insight.description];
			const matchingInsight = possibleInsights.find((i) => i.insight === insight.name);
			const weight = matchingInsight ? matchingInsight.weight : 1;
			const aiIntuition = this.calculateAIIntuition(insight);
			const priority = this.calculatePriority(percentage, weight, aiIntuition);

			return {
				name: insight.name_short,
				insight: insight.name,
				percentage,
				priority: Priority[priority] as unknown as Priority,
				description,
			};
		});

		return {
			insights,
			data: this.dashboardData,
		};
	}
	private parseResponse(response: string) {
		console.log(response);

		const lines = response.split('\n');
		let insightList = [];
		for (const line of lines) {
			if (!line) {
				continue;
			}
			let insight = {
				name: '',
				name_short: '',
				percentage: 0,
				description: '',
			};

			const matches = line.match(/(.*)\((.*)\): (\d+)% "(.*)"/);

			if (matches) {
				insight.name = matches[1].trim();
				insight.name_short = matches[2].trim();
				insight.percentage = Number(matches[3].trim());
				insight.description = matches[4].trim();
			} else {
				console.error(`Failed to parse insight: ${line}`);
			}

			insightList.push(insight);
		}

		return insightList;
	}
}

export default Report;
