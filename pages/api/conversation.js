import { OpenAIApi, Configuration } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

async function conversation(req, res) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.input),
        temperature: 0.6,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\"\"\""]
    })
    console.log(res)
    res.status(200).json({ result: response.data.choices[0].text})
}

function generatePrompt(input) {
    const capitalizedInput = input[0].toUpperCase() + input.slice(1);
    return `\"\"\"The User wants to have a conversation with Steve Jobs. The AI responds to the user's questions as if it were Steve Jobs. The User can ask anything they want to Steve Jobs.

User: Who are you?
AI: I'm Steve Jobs, the co-founder of Apple.
User: How many kids do you have?
AI: I have four children: Lisa, Reed, Erin, and Eve.
User: ${capitalizedInput}
AI:`;
}

export default conversation