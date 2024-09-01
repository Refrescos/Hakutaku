// Home.tsx
'use client';

import React from 'react';
import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar'
import { HiOutlineClipboardList } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";import { FiPieChart, FiHome } from "react-icons/fi";
import { GoGitPullRequest } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import BasicBars from '@/components/BarChart';
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

const Home: React.FC = () => {
    return (
        <section className="flex flex-col items-center min-w-screen justify-center h-full bg-[#EDE9E2]">
            <div className="flex flex-row min-w-full text-center min-h-full">
                {/* Sidebar */}
                <div className="w-1/8 bg-[#E25F2B] p-4 flex flex-col items-center">
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
                <div className="flex-grow bg-white min-w-0">
                    <h1 className="text-2xl"></h1>

                    {/* Cards */}
                    <div className="flex flex-row justify-center mt-4 w-full px-2 overflow-x-auto">
                        <Card value="1.500" description="Descrição do Card 1" icon={<GoGitPullRequest />} />
                        <Card value="900" description="Descrição do Card 2" icon={<FiPieChart />} />
                        <Card value="Card 3" description="Descrição do Card 3" icon={<FaCalendar />} />
                        <Card value="Card 4" description="Descrição do Card 4" icon={<IoMdAlert />} />
                    </div>

                    <div className='w-full flex flex-row mt-4'>
                        <div className='w-1/2'>
                            {/* Gráfico */}
                            <div className="mt-8">
                                <LineChart
                                    width={700}
                                    height={300}
                                    series={[{ data: pData, label: 'pv', color:'#E25F2B' }]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                />
                            </div>
                        </div>

                        {/* Nova Div ao lado do gráfico */}
                        <div className='w-1/2 p-4'>
                            <div className="bg-white rounded-lg p-4 shadow-md flex flex-col">
                                <div className='flex flex-row justify-between border-b-1 py-1'>
                                    <div className='flex flex-col'>
                                        <h2 className="font-semibold text-[#A0AEC0]">PROBLEM SOLVING</h2>
                                        <h2 className="font-semibold">Índice de resolução de problema por produto</h2>
                                    </div>
                                    <button className='bg-black p-2 text-white rounded-xl'> Text</button>
                                </div>

                                {/* Tabela abaixo dos textos */}
                                <table className="mt-4 w-full">
                                    <thead>
                                        <tr className="bg-white">
                                            <th className="p-2 text-left">PRODUTO</th>
                                            <th className="p-2 text-left">REQ. PARA RESOLUÇÃO</th>
                                            <th className="p-2 text-left">Progresso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2 border-b">Cartão</td>
                                            <td className="p-2 border-b">1</td>
                                            <td className="p-2 border-b"><ProgressBar value={70} /></td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border-b">API</td>
                                            <td className="p-2 border-b">Dados 5</td>
                                            <td className="p-2 border-b"><ProgressBar value={50} /></td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border-b">PIX</td>
                                            <td className="p-2 border-b">Dados 8</td>
                                            <td className="p-2 border-b"><ProgressBar value={30} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className='w-full flex flex-col '>
                        <div className='w-1/2'>
                  
        
                        </div>
                        <div className='w-1/2'>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
