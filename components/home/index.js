// app/home/page.js
'use client';

import { useState, useEffect } from 'react';
import { postAPI } from "@/services/fetchAPI";


const HomeComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);
  }, [messages])
  

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await postAPI("/chatgpt", { message: input });
      
      if (response.message) {
        const gptMessage = { role: 'assistant', content: response.message };
        
        setMessages((prevMessages) => [...prevMessages, gptMessage]);
      } else {
        console.error(response.error);
      }

      setInput(''); // input temizle
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
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

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
        {/* Ana Kart */}
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Mesajlar Gösterim Alanı */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-slideInRight`}
              >
                <div
                  className={`${
                    msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'
                  } p-4 rounded-xl max-w-xs shadow-md transform transition-all hover:scale-105`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mesaj Gönderme Alanı (Alt Bölüm Yeniden Tasarlandı) */}
          <div className="flex items-center p-4 bg-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-white text-gray-800 placeholder-gray-500 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-full shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
