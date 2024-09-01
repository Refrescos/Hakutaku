import Image from 'next/image';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange, onSearch }) => {
  return (
    <div className="flex items-center justify-center w-full justify-self-end max-w-3xl bg-[#F9F9F9]  rounded-2xl">
      <div className="flex items-center w-full rounded-xl overflow-hidden">
        <div className="flex-shrink-0 mr-2">
          <Image src='/boi.png' alt='Logo Boi' width={60} height={60} />
        </div>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-grow text-xl border-none bg-[#F9F9F9]"
          value={searchTerm}
          onChange={onChange}
        />
        <button
          className="text-white text-xl px-4 ml-2"
          onClick={onSearch}
        >
          <Image src="/Vector.png" alt="Send" width={30} height={30}></Image>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
