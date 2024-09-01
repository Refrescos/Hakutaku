'use client';

import { useState, ChangeEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@nextui-org/link';

interface Message {
  question: string;
  response: string;
}

export default function Chat() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    const newMessage: Message = {
      question: searchTerm,
      response: `Resposta simulada para: ${searchTerm}`
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setSearchTerm('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Função para rolar para o final da lista de mensagens
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // useEffect para rolar para baixo sempre que as mensagens mudam
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="flex flex-col h-full bg-[#EDE9E2]">
      <div className="flex flex-row gap-4 py-8 md:py-0 flex-1">
        <aside className="w-1/5 bg-[#EDE9E2] text-black px-4 h-full shadow-md rounded-md">
          <h2 className="text-lg">Hoje</h2>
          <nav className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <Link
                key={index}
                href="#"
                className="rounded-xl shadow-xl p-2 bg-[#E25F2B] opacity-85 overflow-hidden whitespace-nowrap overflow-ellipsis"
                style={{ maxWidth: '350px' }}
              >
                {message.question}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 w-full overflow-y-auto px-40" style={{ maxHeight: '500px' }}>
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                {/* Pergunta do Usuário (direita) */}
                <div className="flex items-start mb-2">
                  <div className="flex-1 flex flex-col items-end">
                    <p className="text-lg text-black bg-[#D5CCC9] p-3 px-5 rounded-2xl">{message.question}</p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <Image src="/people.png" alt="Ícone do Usuário" width={50} height={50} />
                  </div>
                </div>
                {/* Resposta do Chat (esquerda) */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <Image src="/boi.png" alt="Ícone do Bot" width={100} height={100} />
                  </div>
                  <div className="flex-1 flex flex-col items-start">
                    <p className="text-xl font-semibold">{message.response}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Referência para rolar para o final */}
            <div ref={messagesEndRef} />
          </div>

          {/* Barra de Pesquisa */}
          <div className="flex items-center justify-center w-full justify-self-end max-w-3xl bg-[#F9F9F9]  rounded-2xl">
            <div className="flex items-center w-full rounded-xl overflow-hidden">
              {/* Logo do Boi */}
              <div className="flex-shrink-0 mr-2">
                <Image src='/boi.png' alt='Logo Boi' width={60} height={60} />
              </div>

              {/* Barra de Pesquisa */}
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-grow text-xl border-none bg-[#F9F9F9]"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className="text-white text-xl px-4 ml-2"
                onClick={handleSearch}
              >
                <Image src="/Vector.png" alt="Send" width={30} height={30}></Image>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
