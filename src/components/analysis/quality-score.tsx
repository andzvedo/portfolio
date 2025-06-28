'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Product } from '@/types/product';

// Registrar componentes do Chart.js
Chart.register(...registerables);

interface QualityScoreProps {
  product: Product;
}

export default function QualityScore({ product }: QualityScoreProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  // Valores de qualidade (reais ou simulados)
  const qualidade = product.analise?.qualidade || Math.floor(Math.random() * 40) + 60; // 60-100
  const custobeneficio = product.analise?.custobeneficio || Math.floor(Math.random() * 40) + 60; // 60-100
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Criar o gráfico
    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Qualidade', 'Restante'],
        datasets: [{
          data: [qualidade, 100 - qualidade],
          backgroundColor: [
            `hsl(${qualidade}, 70%, 50%)`, // Cor dinâmica baseada na qualidade
            'rgba(220, 220, 220, 0.3)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '75%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [qualidade]);

  // Determinar a classificação baseada na pontuação
  const getQualityLabel = (score: number) => {
    if (score >= 90) return 'Excelente';
    if (score >= 80) return 'Ótima';
    if (score >= 70) return 'Boa';
    if (score >= 60) return 'Regular';
    return 'Baixa';
  };
  
  // Determinar a cor baseada na pontuação
  const getScoreColor = (score: number) => {
    return `hsl(${score}, 70%, 50%)`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-center">Avaliação de Qualidade</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de qualidade */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto">
            <canvas ref={chartRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: getScoreColor(qualidade) }}>
                {qualidade}
              </span>
              <span className="text-sm text-gray-500">de 100</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="font-semibold" style={{ color: getScoreColor(qualidade) }}>
              {getQualityLabel(qualidade)}
            </span>
          </div>
        </div>
        
        {/* Detalhes da avaliação */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Qualidade Nutricional</span>
              <span className="text-sm font-medium">{qualidade}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${qualidade}%`,
                  backgroundColor: getScoreColor(qualidade)
                }}
              ></div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Custo-Benefício</span>
              <span className="text-sm font-medium">{custobeneficio}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${custobeneficio}%`,
                  backgroundColor: getScoreColor(custobeneficio)
                }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            Esta avaliação considera a composição nutricional, qualidade dos ingredientes e relação custo-benefício.
          </p>
        </div>
      </div>
    </div>
  );
}
