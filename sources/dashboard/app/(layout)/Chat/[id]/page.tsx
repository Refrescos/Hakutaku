'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import MessageComponent, {Message} from '@/components/MessageComponent';
import MessageList from '@/components/MessageList';
import SearchBar from '@/components/SearchBar';
interface ChatMessage {
  user: string;
  bot: string;
  datetime: string;
  loading: boolean;
  isNewMessage?: boolean;
}

interface Intent {
  id: string;
  text: string;
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatId = params.id;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchIntents();
    fetchConversation();
  }, [chatId]);

  const fetchConversation = async () => {
    if (chatId === 'new') {
      setMessages([]);
      return;
    }

    try {
      const response = await fetch(`/api/conversations/${chatId}`);
      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      const chatMessages = data.chat.chatEntries.map((chat: ChatMessage) => ({
        user: chat.user,
        bot: chat.bot,
        datetime: chat.datetime,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const fetchIntents = async () => {
    try {
      const response = await fetch('/api/conversations');
      if (!response.ok) throw new Error('Failed to fetch intents');

      const data = await response.json();
      const intentsArray = data.intents.map((intent: { sessionId: string; sessionName: string }) => ({
        id: intent.sessionId,
        text: intent.sessionName.replaceAll('"', ''),
      }));

      setIntents(intentsArray);
    } catch (error) {
      console.error('Error fetching intents:', error);
    }
  };

  const sendMessage = async (query: string) => {
    const userMessage: ChatMessage = {
      user: query,
      bot: '',
      datetime: new Date().toISOString(),
      loading: true, // Set loading to true
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);
    try {
      const url = chatId === 'new' ? '/api/conversations/' : `/api/conversations/${chatId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      const botMessage = data.result;

      // Simulate streaming of message
      for (let i = 1; i <= botMessage.length; i++) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].bot = botMessage.slice(0, i);
          return updatedMessages;
        });
        await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust delay as needed
      }

      // After streaming, set loading to false
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].loading = false;
        return updatedMessages;
      });

      if (chatId === 'new') {
        const newURL = `/Chat/${data.sessionId}`;
        window.history.pushState({}, '', newURL);
        fetchIntents();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = () => {
    if (searchTerm.trim()) {
      sendMessage(searchTerm);
      setSearchTerm('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <section className="flex flex-col h-full bg-[#EDE9E2]">
      <div className="flex flex-row gap-4 py-8 md:py-0 flex-1">
        <MessageList chats={intents} />
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1 w-full overflow-y-auto px-40" style={{ maxHeight: '500px' }}>
            {messages.map((msg, index) => (
              <MessageComponent key={index} message={{ question: msg.user, response: msg.bot, loading: msg.loading}} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="w-full flex justify-center p-4">
            <SearchBar searchTerm={searchTerm} onChange={handleInputChange} onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}
