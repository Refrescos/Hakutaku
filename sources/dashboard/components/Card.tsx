// Card.tsx
'use client';

import React from 'react';
import { GoGitPullRequest } from "react-icons/go";
import { FiPieChart } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";

// Definindo a interface para as props do Card
interface CardProps {
    value: string;
    description: string;
    icon: JSX.Element; // O ícone é um elemento JSX
}

const Card: React.FC<CardProps> = ({ value, description, icon }) => (
    <div className="bg-white rounded-lg shadow-md m-2 flex flex-col p-2 w-full sm:w-1/4 md:w-1/4 lg:w-1/4 min-w-[200px]">
        <div className="text-xl mb-2 flex flex-row gap-3">
            <p>Requisições hoje</p>
            <div className='bg-black text-white px-2 rounded-xl pt-1'>
                {icon}
            </div>
        </div>
        <h2 className="text-lg text-left font-semibold">{value}</h2>
        <div className='flex flex-row gap-2'>
            <h2 className="text-[#48BB78] text-left font-semibold">+{value}</h2>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    </div>
);

export default Card;
