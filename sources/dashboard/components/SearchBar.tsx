import Image from 'next/image';
import { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange, onSearch }) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center justify-center w-full max-w-3xl bg-white shadow-lg rounded-full p-2">
      <div className="flex items-center w-full rounded-full overflow-hidden bg-[#F9F9F9]">
        <div className="flex-shrink-0 ml-4 mr-3">
          <Image src='/boi.png' alt='Logo Boi' width={40} height={40} />
        </div>
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-grow text-lg border-none bg-transparent outline-none px-2 text-gray-700"
          value={searchTerm}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 mr-2 transition-all duration-200"
          onClick={onSearch}
        >
          <Image src="/Vector.png" alt="Send" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
