import Image from 'next/image';

interface Message {
  question: string;
  response: string;
}

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start mb-2">
        <div className="flex-1 flex flex-col items-end">
          <p className="text-lg text-black bg-[#D5CCC9] p-3 px-5 rounded-2xl">{message.question}</p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Image src="/people.png" alt="Ícone do Usuário" width={50} height={50} />
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2">
          <Image src="/boi.png" alt="Ícone do Bot" width={100} height={100} />
        </div>
        <div className="flex-1 flex flex-col items-start">
          <p className="text-xl font-semibold">{message.response}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
