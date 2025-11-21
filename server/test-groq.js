import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

try {
    console.log('Testing Groq API...');
    console.log('API Key length:', process.env.GROQ_API_KEY?.length);
    console.log('API Key first 10 chars:', process.env.GROQ_API_KEY?.substring(0, 10));

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: "Say hello!"
            }
        ],
        model: "llama3-8b-8192",
    });

    console.log('Success!');
    console.log('Response:', completion.choices[0].message.content);
} catch (error) {
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.error('Error response:', JSON.stringify(error.error || error.response?.data, null, 2));
}
