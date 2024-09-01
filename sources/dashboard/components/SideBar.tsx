import Image from 'next/image';
import Link from 'next/link';
import { FiHome, FiPieChart } from 'react-icons/fi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { CiSettings } from 'react-icons/ci';

const Sidebar = () => {
  return (
    <div className="w-1/8 bg-[#E25F2B] p-4 flex flex-col items-center">
      <Image src="/hakutaku.png" alt="logo" width={70} height={70} />
      <ul className="mt-4 space-y-10">
        <li className="flex flex-col items-center">
          <Link href="/" className="flex items-center p-2 bg-[#3A3736] justify-center rounded-xl">
            <FiHome className="text-2xl text-white" />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/" className="flex items-center p-2 justify-center rounded-xl">
            <FiPieChart className="text-2xl text-white" />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/" className="flex items-center p-2 justify-center rounded-xl">
            <HiOutlineClipboardList className="text-2xl text-white" />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/" className="flex items-center p-2 justify-center rounded-xl">
            <CiSettings className="text-2xl text-white" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
