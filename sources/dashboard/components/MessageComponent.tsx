import Image from 'next/image';

export interface Message {
  question: string;
  response: string;
  loading: boolean;
}

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mb-4 w-full"> {/* Aumentar a largura do contêiner */}
      {/* Mensagem do usuário */}
      <div className="flex items-start mb-2">
        <div className="flex-1 flex flex-col items-end">
          <p className="text-lg text-black bg-[#D5CCC9] p-3 px-5 rounded-2xl max-w-full">{message.question}</p> {/* Ajuste de largura máxima */}
        </div>
        <div className="flex-shrink-0 ml-2">
          <Image src="/people.png" alt="User Icon" width={50} height={50} />
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2 flex items-center">
          <Image src="/boi.png" alt="Bot Icon" width={80} height={80} />
        </div>
        <div className="flex-1 flex flex-col items-start">
          {message.loading ? (
            <div className="text-lg text-black bg-[#E6E1DC] p-3 px-5 rounded-2xl max-w-full">
              <span className="dot-flashing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          ) : (
            <p className="text-lg text-black bg-[#E6E1DC] p-3 px-5 rounded-2xl max-w-full">{message.response}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
