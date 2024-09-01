import React from 'react';
import Link from 'next/link';
import { FaPlusCircle } from "react-icons/fa";

interface Intent {
  id: string;  // Identificador da intenção
}

interface MessageListProps {
  chats: Intent[];  // Aceitando a lista de intents como uma prop
}

const MessageList: React.FC<MessageListProps> = ({ chats }) => {
  
  // Função para criar uma nova conversa
  const createNewConversation = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "Hello" }), // Enviando "Hello" no corpo da requisição
      });

      if (!response.ok) {
        throw new Error('Erro ao criar nova conversa');
      }

      const data = await response.json();
      const sessionId = data.sessionId; // Captura o sessionId retornado
      window.location.href = `/Chat/${sessionId}`; // Redireciona para a nova conversa
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <aside className="w-1/5 bg-[#EDE9E2] text-black px-4 h-full shadow-md rounded-md">
      <div className='flex flex-row w-full py-4 items-center justify-between px-10'>
        <h2 className="text-lg w-1/2">Conversas</h2>
        
        {/* Botão para criar uma nova conversa */}
        <button 
          onClick={createNewConversation}
          className="text-4xl text-[#E25F2B] hover:text-[#D24C2B] transition-colors focus:outline-none"
        >
          <FaPlusCircle className='w-full' />
        </button>
      </div>
      
      <nav className="flex flex-col overflow-y-auto overflow-x-hidden" style={{ maxHeight: '500px' }}>
        {chats.map((chat, index) => (
          <Link
            key={index}
            href={`/Chat/${chat.id}`}  // Direto para a URL desejada
            className="rounded-xl shadow-xl p-2 bg-[#E25F2B] opacity-85 whitespace-nowrap overflow-ellipsis mb-2" // Remover maxWidth
          >
            {chat.id} {/* Aqui você pode formatar a exibição conforme necessário */}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default MessageList;
