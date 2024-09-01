import React from 'react';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';

interface Intent {
  id: string;
  text: string;
}

interface MessageListProps {
  chats: Intent[];
}

const MessageList: React.FC<MessageListProps> = ({ chats }) => {
  const createNewConversation = () => {
    window.location.href = `/Chat/new`;
  };

  return (
    <aside className="w-1/5 bg-gradient-to-b from-[#E25F2B] to-[#D24C2B] text-white px-4 h-full shadow-lg rounded-md border border-[#D24C2B]">
      <div className="flex flex-row w-full py-4 items-center justify-between px-10">
        <h2 className="text-lg w-1/2 font-semibold">Chats history</h2>
        <button
          onClick={createNewConversation}
          className="text-4xl text-[#F9F9F9] hover:text-[#FFB585] transition-colors focus:outline-none"
        >
          <FaPlusCircle className="w-full" />
        </button>
      </div>
      <nav className="flex flex-col overflow-y-auto overflow-x-hidden h-full" style={{ maxHeight: '500px' }}>
        {chats.map((chat, index) => (
          <Link
            key={index}
            href={`/Chat/${chat.id}`}
            className="rounded-lg shadow-md p-3 bg-[#F9F9F9] text-[#E25F2B] font-medium hover:bg-[#FFB585] hover:text-[#F9F9F9] transition-all duration-200 ease-in-out mb-2"
          >
            {chat.text.length > 40 ? `${chat.text.substring(0, 40)}...` : chat.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default MessageList;
