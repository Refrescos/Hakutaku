import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { FiPieChart } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";

// Definindo a interface para as props do Card
interface CardProps {
    value: string;
    description: string;
    icon: JSX.Element; // O ícone é um elemento JSX
}

const Card: React.FC<CardProps> = ({ value, description, icon }) => (
    <div className="bg-white rounded-lg shadow-md m-2 flex flex-col  p-2 w-full sm:w-1/4 md:w-1/4 lg:w-1/4"> {/* Ajustando as larguras */}
		<div className="text-xl mb-2 flex flex-row gap-3">
			<p>Requisições hoje</p>
			{icon}
		</div>
		<h2 className="text-lg text-left font-semibold">{value}</h2>
		<div className='flex flex-row gap-2'>
			<h2 className="text-[#48BB78] text-left font-semibold">+{value}</h2>
			<p className="text-gray-600 text-center">{description}</p>



		</div>

    </div>
);

const Home: React.FC = () => {
    return (
        <section className="flex flex-col items-center min-w-screen justify-center h-full bg-[#EDE9E2]">
            <div className="flex flex-row min-w-full text-center min-h-full">
                {/* Sidebar */}
                <div className="w-1/8 bg-[#E25F2B] p-4 flex flex-col items-center">
                    {/* Conteúdo da Sidebar */}
                    <Image src="/hakutaku.png" alt='logo' width={70} height={70} />
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

                {/* Conteúdo principal */}
                <div className="flex-grow bg-white">
                    <h1 className="text-2xl"></h1>

                    {/* Cards */}
                    <div className="flex flex-row justify-center mt-4 w-full px-2">
                        <Card 
                            value="1.500" 
                            description="Descrição do Card 1" 
                            icon={<FiHome />} 
                        />
                        <Card 
                            value="900" 
                            description="Descrição do Card 2" 
                            icon={<FiPieChart />} 
                        />
                        <Card 
                            value="Card 3" 
                            description="Descrição do Card 3" 
                            icon={<HiOutlineClipboardList />} 
                        />
                        <Card 
                            value="Card 4" 
                            description="Descrição do Card 4" 
                            icon={<CiSettings />} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
