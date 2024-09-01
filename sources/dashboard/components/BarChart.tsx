// BarChart.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Registra os elementos do Chart.js
Chart.register(...registerables);

interface BarChartProps {
    data: number[];
    labels: string[];
    barColor?: string;
    barThickness?: number; // Nova prop para a largura das barras
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, barColor = 'rgba(75, 192, 192, 0.6)', barThickness = 15 }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'My Dataset',
                            data: data,
                            backgroundColor: barColor,
                            barThickness: barThickness, // Largura das barras
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });

                // Limpa o gráfico ao desmontar o componente
                return () => {
                    chart.destroy();
                };
            }
        }
    }, [data, labels, barColor, barThickness]);

    return (
        <canvas ref={chartRef} width={400} height={400}></canvas>
    );
};

export default BarChart;
