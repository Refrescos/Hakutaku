// components/InsightsCarousel.js
import { useState, useEffect } from 'react';

// Definindo a interface para o insight
interface Insight {
    name: string;
    description: string;
    priority: string;
    percentage: number;
}

const InsightsCarousel = () => {
    const [insights, setInsights] = useState<Insight[]>([]); // Usando a interface no estado
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4; // Número de cards a serem exibidos por vez

    // Função para buscar dados da API
    const fetchInsights = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/report');
            const data = await response.json();
            setInsights(data.insights); // Assume que data.insights é um array de Insight
        } catch (error) {
            console.error('Error fetching insights:', error);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(insights.length / itemsPerPage));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(insights.length / itemsPerPage)) % Math.ceil(insights.length / itemsPerPage));
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-r rounded-lg shadow-lg">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
                {insights.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((insight, index) => (
                    <div key={index} className="bg-white p-6 border border-orange-500 rounded-lg shadow-md flex flex-col justify-between transition-transform duration-500 transform hover:scale-105">
                        <div>
                            <h3 className="text-xl font-semibold text-orange-600">{insight.name}</h3>
                            <p className="text-gray-700 mt-2">{insight.description}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <span className="inline-block bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Priority: {insight.priority}
                            </span>
                            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                                {insight.percentage}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-200 transition">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-200 transition">
                &#10095;
            </button>
        </div>
    );
};

export default InsightsCarousel;
