import { OpenAIApi, Configuration } from "openai";

export class ChatGPTService {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 100,
      n: 1,
      stop: "\n",
    });

    const { choices } = response.data;
    // @ts-expect-error
    const completion = choices[0]?.text.trim();

    return completion || "";
  }
}
