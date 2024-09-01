import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { FiPieChart } from "react-icons/fi";
import { FiHome } from "react-icons/fi";


import { FaHome, FaUser, FaCog, FaEnvelope } from 'react-icons/fa'; // Importando ícones

export default function Home() {
    return (
        <section className="flex flex-col items-center min-w-screen justify-center h-full bg-[#EDE9E2]">
            <div className="flex flex-row min-w-full text-center min-h-full">
                {/* Sidebar */}
                <div className="w-1/8 bg-[#E25F2B] p-4 flex flex-col items-center"> {/* Ajuste a largura conforme necessário */}
                    {/* Conteúdo da Sidebar */}
                    <Image src="/hakutaku.png" alt='logo' width={70} height={70} />
                    <ul className="mt-4 space-y-10"> {/* Espaçamento entre os ícones */}
                        <li className="flex flex-col items-center">
                            <Link href="/" className="flex items-center">
                                <FiPieChart className="text-2xl mr-2" />
                                
                            </Link>
                        </li>
                        <li className="flex flex-col items-center">
                            <Link href="/" className="flex items-center">
                                <FiHome className="text-2xl mr-2" />
                                
                            </Link>
                        </li>
                        <li className="flex flex-col items-center">
                            <Link href="/" className="flex items-center">
                                <FiHome className="text-2xl mr-2" />
                            </Link>
                        </li>
                        <li className="flex flex-col items-center">
                            <Link href="/" className="flex items-center">
                                <FaEnvelope className="text-2xl mr-2" />
                                
                            </Link>
                        </li>
					</ul>
		
                </div>

                {/* Conteúdo principal */}
                <div className="flex-grow bg-white p-4">
                    {/* Aqui você pode adicionar o conteúdo principal da sua página */}
                    <h1 className="text-2xl">Conteúdo Principal</h1>
                </div>
            </div>
        </section>
    );
}
