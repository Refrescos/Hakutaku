import { SessionsClient } from '@google-cloud/dialogflow-cx';
import { v4 as uuidv4 } from 'uuid';
import OpenAIService from './openai';

export interface ChatEntry {
	bot: string;
	user: string;
	datetime: string;
}

export interface SessionInfo {
	chatEntries: ChatEntry[];
	sessionName: string;
}

class GoogleService {
	private client: SessionsClient;
	private projectId: string;
	private location: string;
	private agentId: string;
	private sessionStore: Map<string, SessionInfo>;
	PROMPT_CHAT_NAME_GENERATOR = 'Based on the conversation, give a short name to the chat, e.g. "Customer Support". Maximum 40 characters.';

	constructor() {
		if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || !process.env.GCP_PROJECT_ID || !process.env.GCP_AGENT_ID) {
			throw new Error('Missing GCP credentials');
		}

		this.client = new SessionsClient({
			apiEndpoint: 'us-central1-dialogflow.googleapis.com',
		});

		this.projectId = process.env.GCP_PROJECT_ID;
		this.location = 'us-central1';
		this.agentId = process.env.GCP_AGENT_ID;
		this.sessionStore = new Map<string, SessionInfo>();
	}

	async detectIntent(query: string, id: string | null = null): Promise<{ result: string; sessionId: string; sessionName: string }> {
		if (id && !this.sessionStore.has(id)) {
			throw new Error('Session not found');
		}
		const sessionId = id || uuidv4();
		const sessionPath = this.client.projectLocationAgentSessionPath(this.projectId, this.location, this.agentId, sessionId);

		const sessionName = await OpenAIService.getOutput(query, this.PROMPT_CHAT_NAME_GENERATOR);

		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: query,
				},
				languageCode: 'en',
			},
		};

		const [response] = await this.client.detectIntent(request);
		if (!response.queryResult?.responseMessages || !response.queryResult.responseMessages[0].text?.text) {
			throw new Error('No response from Dialogflow');
		}

		const resultText = response.queryResult.responseMessages[0].text.text[0];

		this.storeSessionChat(sessionId, query, resultText, sessionName);

		return {
			result: resultText,
			sessionId,
			sessionName,
		};
	}

	async *detectIntentStream(query: string): AsyncGenerator<any> {
		const sessionId = uuidv4();
		const sessionPath = this.client.projectLocationAgentSessionPath(this.projectId, this.location, this.agentId, sessionId);

		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: query,
				},
				languageCode: 'en',
			},
		};

		const stream = this.client.streamingDetectIntent();

		stream.write(request);
		stream.end();

		const messageBuffer: string[] = [];

		const dataPromise = new Promise<void>((resolve, reject) => {
			stream.on('data', (response: any) => {
				if (response.queryResult?.responseMessages) {
					for (const message of response.queryResult.responseMessages) {
						if (message.text?.text) {
							messageBuffer.push(message.text.text);
						}
					}
				}
			});

			stream.on('end', () => {
				resolve();
			});

			stream.on('error', (error: any) => {
				reject(error);
			});
		});

		await dataPromise;

		this.storeSessionChat(sessionId, query, messageBuffer.join(' '), 'Streamed Chat');

		for (const message of messageBuffer) {
			yield message;
		}
	}

	private storeSessionChat(sessionId: string, query: string, response: string, sessionName: string) {
		const timestamp = new Date().toISOString();

		const chatEntry: ChatEntry = {
			user: query,
			bot: response,
			datetime: timestamp,
		};

		if (!this.sessionStore.has(sessionId)) {
			this.sessionStore.set(sessionId, { chatEntries: [], sessionName });
		}

		this.sessionStore.get(sessionId)?.chatEntries.push(chatEntry);
	}

	async getSessionChat(sessionId: string): Promise<SessionInfo> {
		if (!this.sessionStore.has(sessionId)) {
			throw new Error('Session not found');
		}
		return this.sessionStore.get(sessionId) || { chatEntries: [], sessionName: '' };
	}

	async listSessions(): Promise<{ sessionId: string; sessionName: string }[]> {
		return Array.from(this.sessionStore.entries()).map(([sessionId, { sessionName }]) => ({ sessionId, sessionName }));
	}
}

export default new GoogleService();
