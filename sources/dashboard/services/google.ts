import { SessionsClient } from '@google-cloud/dialogflow-cx';
import { v4 as uuidv4 } from 'uuid';
import { VertexAI, HarmBlockThreshold, HarmCategory, GenerativeModel } from '@google-cloud/vertexai';

export interface ChatEntry {
	bot: string;
	user: string;
	datetime: string;
}

class GoogleService {
	private client: SessionsClient;
	private vertexClient: VertexAI;
	private projectId: string;
	private location: string;
	private agentId: string;
	private sessionStore: Map<string, ChatEntry[]>;

	constructor() {
		if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || !process.env.GCP_PROJECT_ID || !process.env.GCP_AGENT_ID) {
			throw new Error('Missing GCP credentials');
		}

		this.client = new SessionsClient({
			apiEndpoint: 'us-central1-dialogflow.googleapis.com',
		});

		this.vertexClient = new VertexAI({
			project: process.env.GCP_PROJECT_ID,
			location: 'us-central1',
		});

		this.projectId = process.env.GCP_PROJECT_ID;
		this.location = 'us-central1';
		this.agentId = process.env.GCP_AGENT_ID;
		this.sessionStore = new Map<string, ChatEntry[]>();
	}

	async detectIntent(query: string, id: string | null = null): Promise<any> {
		if (id && !this.sessionStore.has(id)) {
			throw new Error('Session not found');
		}
		const sessionId = id || uuidv4();
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

		const [response] = await this.client.detectIntent(request);
		if (!response.queryResult?.responseMessages || !response.queryResult.responseMessages[0].text?.text) {
			throw new Error('No response from Dialogflow');
		}

		const resultText = response.queryResult.responseMessages[0].text.text[0];

		this.storeSessionChat(sessionId, query, resultText);

		return {
			result: resultText,
			sessionId,
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

		this.storeSessionChat(sessionId, query, messageBuffer.join(' '));

		for (const message of messageBuffer) {
			yield message;
		}
	}

	async getGeminiOutput(input: string, promp: string, text_model = 'gemini-1.0-pro'): Promise<string> {
		try {
			const request = {
				contents: [{ role: 'user', parts: [{ text: input }] }],
			};
			const model = this.vertexClient.getGenerativeModel({
				model: text_model,
				safetySettings: [{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }],
				generationConfig: { maxOutputTokens: 2056 },
				systemInstruction: {
					role: 'system',
					parts: [{ text: promp }],
				},
			});
			const streamingResult = await model.generateContentStream(request);
			const response = (await streamingResult.response)?.candidates?.[0]?.content?.parts?.[0]?.text || '';
			return response;
		} catch (error) {
			throw new Error(`Failed to get Gemini output: ${error}`);
		}
	}

	private storeSessionChat(sessionId: string, query: string, response: string) {
		const timestamp = new Date().toISOString();

		const chatEntry: ChatEntry = {
			user: query,
			bot: response,
			datetime: timestamp,
		};

		if (!this.sessionStore.has(sessionId)) {
			this.sessionStore.set(sessionId, []);
		}

		this.sessionStore.get(sessionId)?.push(chatEntry);
	}

	public async getSessionChat(sessionId: string): Promise<ChatEntry[]> {
		if (!this.sessionStore.has(sessionId)) {
			throw new Error('Session not found');
		}
		return this.sessionStore.get(sessionId) || [];
	}

	public async listSessions(): Promise<string[]> {
		return Array.from(this.sessionStore.keys());
	}
}

export default new GoogleService();
