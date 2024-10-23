import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { messages } = await request.json();
    console.log(messages);

    const conversation = [
      {
        role: 'system',
        content:
          'You are Donald Trump. Answer as Donald Trump would, with his speech style and mannerisms.',
      },
      ...messages.map((message) => ({
        role: message.isUser ? 'user' : 'assistant',
        content: message.text,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversation,
    });

    const responseText = completion.choices[0].message.content;

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.error();
  }
}
