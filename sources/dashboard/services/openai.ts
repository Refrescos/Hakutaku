import { OpenAI } from 'openai';

class OpenAIService {
	private openai: OpenAI;

	constructor() {
		if (!process.env.OPENAI_API_KEY) {
			throw new Error('Missing OpenAI API key');
		}

		this.openai = new OpenAI();
	}

	async getOutput(input: string, promp: string, model = 'gpt-4o'): Promise<string> {
		try {
			const response = await this.openai.chat.completions.create({
				model,
				messages: [
					{
						role: 'system',
						content: promp,
					},
					{
						role: 'user',
						content: input,
					},
				],
				temperature: 0.66,
			});
			if (!response.choices || !response.choices[0].message || !response.choices[0].message.content) {
				throw new Error('No response from OpenAI');
			}

			return response.choices[0].message.content;
		} catch (error) {
			throw new Error(`Failed to get OpenAI output: ${error}`);
		}
	}
}

export default new OpenAIService();
