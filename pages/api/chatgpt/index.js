// pages/api/chatgpt.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("test 1");
    const { message } = req.body;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // GPT model
          messages: [{ role: 'user', content: message }]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const gptResponse = response.data.choices[0].message.content;
      res.status(200).json({ message: gptResponse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'GPT API request failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
