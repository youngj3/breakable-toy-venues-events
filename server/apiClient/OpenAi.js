import { Configuration, OpenAIApi } from 'openai'
import dotenv from "dotenv"
dotenv.config()

class OpenAi {
  static async generateText(prompt){
    const configuration = new Configuration({
      organization: 'org-HhacMKod1QWl8Z7jD2ZagUss',
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 50,
      temperature: 0.7,
    });
   
    const text = response.data.choices[0].text 

    return text 
  }
}

export default OpenAi
