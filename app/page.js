// app/home/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/chatgpt', { message: input });
      const gptMessage = { role: 'assistant', content: response.data.message };
      setMessages([...messages, userMessage, gptMessage]);
      setInput(''); // input temizle
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>ChatGPT ile Sohbet</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === 'user' ? 'user-message' : 'gpt-message'}>
            <strong>{msg.role === 'user' ? 'Sen: ' : 'ChatGPT: '}</strong>
            {msg.content}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Bir mesaj yazın..."
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
}
