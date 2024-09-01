import { ChatEntry } from './google';
import { DashboardData, TransactionData, InsightInput } from './report';

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

export const EXAMPLE_DASHBOARD_DATA: DashboardData = {
	requestsToday: 847,
	teamTimeSaved: 56,
	averageRequestsPerIssue: 3.4,
	averageIntegrationTime: 45.2,
	retentionRate: 92.5,
	mostSearchedSections: [
		{ section: 'API Authentication', count: 128 },
		{ section: 'Webhook Setup', count: 95 },
		{ section: 'Error Handling', count: 74 },
		{ section: 'Payment Methods', count: 63 },
		{ section: 'Integration Guidelines', count: 59 },
	],
	problemResolutionByProduct: [
		{ product: 'Payment Gateway', requests: 320, resolutionRate: 87 },
		{ product: 'Virtual Cards', requests: 215, resolutionRate: 78 },
		{ product: 'Account Services', requests: 400, resolutionRate: 92 },
		{ product: 'Loan Services', requests: 185, resolutionRate: 85 },
		{ product: 'Fraud Detection', requests: 145, resolutionRate: 90 },
	],
};

export const EXAMPLE_INSIGHTS: InsightInput[] = [
	{
		insight: 'credit_card',
		context: 'Implement a real-time transaction tracking feature for credit card users.',
		weight: 0.85,
	},
	{
		insight: 'transaction_monitor',
		context: 'Enhance transaction monitoring with AI-based fraud detection.',
		weight: 0.92,
	},
	{
		insight: 'customer_support',
		context: 'Implement a chatbot for customer inquiries and support.',
		weight: 0.78,
	},
	{
		insight: 'loyalty_program',
		context: 'Launch a loyalty program to reward frequent users.',
		weight: 0.89,
	},
	{
		insight: 'mobile_app',
		context: 'Develop a mobile app for easy access to services and transactions.',
		weight: 0.91,
	},
];
