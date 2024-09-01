import React from 'react';

interface ChatMessageProps {
  message: {
    question: string;
    response: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="message-component">
      <p><strong>User:</strong> {message.question}</p>
      <p><strong>Bot:</strong> {message.response}</p>
    </div>
  );
};

export default ChatMessage;
