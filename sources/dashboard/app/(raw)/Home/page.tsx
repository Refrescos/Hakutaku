'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import { HiOutlineClipboardList } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { FiPieChart, FiHome } from "react-icons/fi";
import { GoGitPullRequest } from "react-icons/go";
import { Carousel } from 'flowbite-react';
import { FaCalendar } from "react-icons/fa";
import ProblemSolvingPanel from '@/components/ProblemSavingPanel';
import BarChart from '@/components/BarChart';
import InsightsCards from '@/components/InsightCards';
import { IoMdAlert } from "react-icons/io";
import Sidebar from '@/components/SideBar';
import InsightsCarousel from '@/components/Carousel';


const Home: React.FC = () => {
    const [mostSearchedSections, setMostSearchedSections] = useState<{ section: string; count: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/report');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMostSearchedSections(data.data.mostSearchedSections);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const barData = mostSearchedSections.map(item => item.count);
    const barLabels = mostSearchedSections.map(item => item.section);
    const barColor = '#ED8936';
    const barThickness = 15;

    return (
        <section className="flex flex-col items-center min-w-screen justify-center h-full bg-[#EDE9E2]">
            <div className="flex flex-row min-w-full text-center min-h-full">
                <Sidebar />
                {/* Conteúdo principal */}
                <div className="flex-grow bg-white min-w-0 w-full">
                    <h1 className="text-2xl"></h1>
                    {/* Cards */}
                    <div className="flex flex-row justify-center mt-4 w-full px-2 overflow-x-auto">
                        <InsightsCards />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl font-bold py-5 tex">Insights</h1>
            <InsightsCarousel />
        </div>

                    <div className='w-full flex flex-row justify-center items-center'>
                        <div className='w-full flex flex-row py-10 px-20 justify-center items-center'>
                        <div className='w-full h-[500px] flex justify-center items-center'>
                            {/* Gráfico de Barras */}
                            {loading ? ( // Mostra o spinner enquanto carrega os dados
                                <div className="flex justify-center items-center h-full">
                                </div>
                            ) : (
                                <BarChart data={barData} labels={barLabels} barColor={barColor} barThickness={barThickness} />
                            )}
                            </div>
                    </div>

                        {/* <ProblemSolvingPanel /> */}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Home;
