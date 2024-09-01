'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import MessageComponent from '@/components/MessageComponent';
import MessageList from '@/components/MessageList';
import SearchBar from '@/components/SearchBar';

interface Message {
  question: string;
  response: string;
}

interface Intent {
  id: string;
  text: string;
}

export default function Chat() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLastConversation = async () => {
      try {
        const response = await fetch('/api/conversations');
        if (!response.ok) throw new Error('Failed to fetch conver sations');

        const data = await response.json();
        const fetchedIntents = data.intents.map((intent: { sessionId: string; sessionName: string }) => ({
          id: intent.sessionId,
          text: intent.sessionName,
        }));
        setIntents(fetchedIntents);

        if (fetchedIntents.length > 0) {
          const lastIntentId = fetchedIntents[fetchedIntents.length - 1].id;
          const lastConversationResponse = await fetch(`/api/conversations/${lastIntentId}`);
          if (!lastConversationResponse.ok) throw new Error('Failed to fetch the last conversation');

          const lastConversationData = await lastConversationResponse.json();
          if (Array.isArray(lastConversationData.chat?.chatEntries)) {
            const chatMessages = lastConversationData.chat.chatEntries.map((chat: { user: string, bot: string }) => ({
              question: chat.user,
              response: chat.bot,
            }));
            setMessages(chatMessages);
          } else {
            console.error('Unexpected API response structure');
          }
        }
      } catch (error) {
        console.error('Error fetching last conversation:', error);
      }
    };

    fetchLastConversation();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const newMessage: Message = {
        question: searchTerm,
        response: `Simulated response for: ${searchTerm}`,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setSearchTerm('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  return (
    <section className="flex flex-col h-full bg-[#EDE9E2]">
      <div className="flex flex-row gap-4 py-8 md:py-0 flex-1">
        <MessageList chats={intents} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 w-full overflow-y-auto px-40" style={{ maxHeight: '500px' }}>
            {messages.map((message, index) => (
              <MessageComponent key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <SearchBar searchTerm={searchTerm} onChange={handleInputChange} onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
