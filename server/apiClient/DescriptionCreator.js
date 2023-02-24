import OpenAi from "./OpenAi.js";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAi(apiKey)

class DescriptionCreator {
  static async attachDescription(eventName) {
    try {
      const basePrompt = "Write a description for this concert: "
      const prompt = basePrompt + eventName
      const description = await OpenAi.generateText(prompt)
      return description
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default DescriptionCreator