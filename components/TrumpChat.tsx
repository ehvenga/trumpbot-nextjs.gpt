'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';

type Message = {
  text: string;
  isUser: boolean;
};

export default function TrumpChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, isUser: true };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, newMessage] }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prev) => [
            ...prev,
            { text: data.response, isUser: false },
          ]);
        } else {
          console.error('Error generating response:', response.statusText);
        }
      } catch (error) {
        console.error('Error generating response:', error);
      }
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <ScrollArea className='h-[500px] p-4'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className='p-4 border-t flex'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
          className='flex-grow mr-2'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend}>
          <Send className='h-4 w-4 mr-2' />
          Send
        </Button>
      </div>
    </Card>
  );
}
