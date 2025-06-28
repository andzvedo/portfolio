'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Product } from '@/types/product';

// Registrar componentes do Chart.js
Chart.register(...registerables);

interface NutritionChartProps {
  product: Product;
  compareProducts?: Product[];
}

export default function NutritionChart({ product, compareProducts = [] }: NutritionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Dados nutricionais do produto principal
    const mainProductData = {
      proteina: product.analise?.proteina || 25,
      gordura: product.analise?.gordura || 12,
      fibra: product.analise?.fibra || 3,
      umidade: product.analise?.umidade || 10,
      calcio: product.analise?.calcio || 1.2,
      fosforo: product.analise?.fosforo || 0.8
    };
    
    // Preparar dados para o gráfico
    const labels = ['Proteína', 'Gordura', 'Fibra', 'Umidade', 'Cálcio', 'Fósforo'];
    const datasets = [
      {
        label: product.nome,
        data: [
          mainProductData.proteina,
          mainProductData.gordura,
          mainProductData.fibra,
          mainProductData.umidade,
          mainProductData.calcio,
          mainProductData.fosforo
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1
      }
    ];
    
    // Adicionar produtos para comparação
    if (compareProducts.length > 0) {
      const colors = [
        { bg: 'rgba(255, 99, 132, 0.5)', border: 'rgb(255, 99, 132)' },
        { bg: 'rgba(75, 192, 192, 0.5)', border: 'rgb(75, 192, 192)' },
        { bg: 'rgba(255, 206, 86, 0.5)', border: 'rgb(255, 206, 86)' }
      ];
      
      compareProducts.forEach((compareProduct, index) => {
        if (index < colors.length) {
          const compareData = {
            proteina: compareProduct.analise?.proteina || 25,
            gordura: compareProduct.analise?.gordura || 12,
            fibra: compareProduct.analise?.fibra || 3,
            umidade: compareProduct.analise?.umidade || 10,
            calcio: compareProduct.analise?.calcio || 1.2,
            fosforo: compareProduct.analise?.fosforo || 0.8
          };
          
          datasets.push({
            label: compareProduct.nome,
            data: [
              compareData.proteina,
              compareData.gordura,
              compareData.fibra,
              compareData.umidade,
              compareData.calcio,
              compareData.fosforo
            ],
            backgroundColor: colors[index].bg,
            borderColor: colors[index].border,
            borderWidth: 1
          });
        }
      });
    }
    
    // Criar o gráfico
    chartInstance.current = new Chart(chartRef.current, {
      type: 'radar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        scales: {
          r: {
            min: 0,
            ticks: {
              stepSize: 5
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Análise Nutricional'
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed + '%';
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [product, compareProducts]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <canvas ref={chartRef} />
    </div>
  );
}
