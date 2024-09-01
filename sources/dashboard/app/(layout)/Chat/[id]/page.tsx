'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import MessageComponent from '../../../../components/MessageComponent';
import MessageList from '../../../../components/MessageList';
import SearchBar from '../../../../components/SearchBar';

interface ChatMessage {
  user: string;
  bot: string;
  datetime: string;
}

interface Intent {
  id: string; // Identificador da intenção
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatId = params.id;

  // Função para buscar a conversa com base no ID
  const fetchConversation = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/conversations/${chatId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar mensagens');
      }
      const data = await response.json();
      const chatMessages = data.chat.map((chat: { user: string; bot: string; datetime: string }) => ({
        user: chat.user,
        bot: chat.bot,
        datetime: chat.datetime,
      }));
      setMessages(chatMessages); // Armazena as mensagens da conversa
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Função para buscar a lista de intenções
  const fetchIntents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/conversations');
      if (!response.ok) {
        throw new Error('Erro ao buscar intenções');
      }
      const data = await response.json();
      const intentsArray = data.intents.map((id: string) => ({ id }));
      setIntents(intentsArray); // Armazena as intenções na barra lateral
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  // Atualize a função sendMessage
  const sendMessage = async (query: string) => {
    const userMessage: ChatMessage = {
      user: query,
      bot: '', // Inicialmente, a mensagem do bot é vazia
      datetime: new Date().toISOString(),
    };
  
    // Adiciona a mensagem do usuário ao estado
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      console.log('Mensagens após envio do usuário:', updatedMessages); // Debugging
      return updatedMessages;
    });
  
    setLoading(true); // Começa o loading
  
    try {
      const response = await fetch(`http://localhost:3000/api/conversations/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar a mensagem');
      }
  
      const data = await response.json();
      const botMessage: ChatMessage = {
        user: '', // Mensagem do usuário não é necessária aqui
        bot: data.result, // Mensagem do bot recebida da API
        datetime: new Date().toISOString(),
      };
  
      // Atualiza a mensagem do bot na mesma posição da mensagem do usuário
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1], // Mantém a mensagem do usuário
          bot: botMessage.bot, // Atualiza a mensagem do bot
        };
        console.log('Mensagens após resposta do bot:', updatedMessages); // Debugging
        return updatedMessages;
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false); // Para o loading
    }
  };
  
  useEffect(() => {
    fetchIntents(); // Busca a lista de intenções ao montar o componente
    fetchConversation(); // Busca a conversa ao montar o componente
  }, [chatId]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    sendMessage(searchTerm); // Envia a nova pergunta
    setSearchTerm(''); // Limpa o campo de pesquisa
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="flex flex-col h-full bg-[#EDE9E2]">
      <div className="flex flex-row gap-4 py-8 md:py-0 flex-1">
        <MessageList chats={intents} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 w-full overflow-y-auto px-40" style={{ maxHeight: '500px' }}>
            {messages.map((msg, index) => (
              <MessageComponent key={index} message={{ question: msg.user, response: msg.bot }} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <SearchBar searchTerm={searchTerm} onChange={handleInputChange} onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
