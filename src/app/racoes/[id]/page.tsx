'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Product } from '@/types/product';
import NutritionChart from '@/components/analysis/nutrition-chart';
import QualityScore from '@/components/analysis/quality-score';
import productsData from '@/data/products.json';

// Converter os dados importados para o tipo Product[]
const realProducts: Product[] = productsData as Product[];

// Criar um mapa de produtos por ID para facilitar a busca
const productsMap: Record<string, Product> = realProducts.reduce<Record<string, Product>>((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {} as Record<string, Product>);

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Carregar o produto real
    setTimeout(() => {
      const foundProduct = productsMap[params.id];
      setProduct(foundProduct || null);
      
      // Encontrar produtos similares (mesma espécie e marca)
      if (foundProduct) {
        const similar = realProducts.filter(p => 
          p.id !== foundProduct.id && 
          (p.especie === foundProduct.especie || p.marca === foundProduct.marca)
        ).slice(0, 4);
        setSimilarProducts(similar);
      }
      
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/racoes">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Voltar para a lista
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/racoes">
        <Button variant="outline" className="flex items-center gap-2 mb-6">
          <ChevronLeft size={16} />
          Voltar para a lista
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do produto */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="relative h-96 w-full">
            {product.imagem ? (
              <Image
                src={product.imagem}
                alt={product.nome}
                fill
                className="object-contain"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do produto */}
        <div>
          <div className="text-sm text-primary font-medium mb-2">
            {product.marca || 'Marca não especificada'}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
          
          <div className="text-2xl font-bold text-primary mb-6">
            {product.preco}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {product.especie && (
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full">
                {product.especie === 'cachorro' ? 'Cachorro' : 'Gato'}
              </span>
            )}
            
            {product.porte && (
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full">
                {product.porte}
              </span>
            )}
            
            {product.idade && (
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full">
                {product.idade}
              </span>
            )}
            
            {product.tipo && (
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full">
                {product.tipo}
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {product.peso && (
              <div>
                <h3 className="font-semibold">Peso:</h3>
                <p>{product.peso}</p>
              </div>
            )}
            
            {product.corante && (
              <div>
                <h3 className="font-semibold">Corante:</h3>
                <p>{product.corante}</p>
              </div>
            )}
            
            {product.transgenico && (
              <div>
                <h3 className="font-semibold">Transgênico:</h3>
                <p>{product.transgenico}</p>
              </div>
            )}
            
            {product.raca && (
              <div>
                <h3 className="font-semibold">Raça:</h3>
                <p>{product.raca}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <a href={product.link_origem} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2">
                Ver na Cobasi
                <ExternalLink size={16} />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Avaliação de qualidade */}
      <div className="mt-12">
        <QualityScore product={product} />
      </div>
      
      {/* Análise nutricional */}
      <div className="mt-12">
        <NutritionChart product={product} />
      </div>
      
      {/* Descrição e ingredientes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {product.descricao && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Descrição</h2>
            <p className="text-gray-700">{product.descricao}</p>
          </div>
        )}
        
        {product.ingredientes && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredientes</h2>
            <p className="text-gray-700">{product.ingredientes}</p>
          </div>
        )}
      </div>
      
      {/* Análise detalhada */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Análise Detalhada</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Composição Nutricional</h3>
            <div className="space-y-2">
              {Object.entries(product.especificacoes).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Avaliação Técnica</h3>
            <p className="text-gray-700 mb-4">
              Esta ração apresenta uma composição {product.analise?.qualidade && product.analise.qualidade > 80 ? 'excelente' : product.analise?.qualidade && product.analise.qualidade > 70 ? 'boa' : 'regular'}, 
              com níveis de proteína {product.analise?.proteina && product.analise.proteina > 30 ? 'elevados' : 'adequados'} e 
              teor de gordura {product.analise?.gordura && product.analise.gordura > 15 ? 'elevado' : 'adequado'}.
            </p>
            
            <p className="text-gray-700">
              {product.analise?.qualidade && product.analise.qualidade > 80 
                ? 'Recomendada para pets com necessidades nutricionais específicas e donos que buscam o melhor em nutrição.' 
                : product.analise?.qualidade && product.analise.qualidade > 70 
                ? 'Boa opção para a maioria dos pets, com boa relação custo-benefício.' 
                : 'Adequada para pets sem necessidades especiais, com foco em economia.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Produtos similares */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Produtos Similares</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((similar) => (
              <Link key={similar.id} href={`/racoes/${similar.id}`}>
                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full bg-gray-50">
                    {similar.imagem ? (
                      <Image
                        src={similar.imagem}
                        alt={similar.nome}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="text-sm text-primary font-medium mb-1">
                      {similar.marca || 'Marca não especificada'}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                      {similar.nome}
                    </h3>
                    
                    <div className="text-lg font-bold text-gray-900 mb-3">
                      {similar.preco}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
