'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { Check, X } from 'lucide-react';
import NutritionChart from './nutrition-chart';

interface ProductComparisonProps {
  products: Product[];
}

export default function ProductComparison({ products }: ProductComparisonProps) {
  if (products.length === 0) {
    return <div>Selecione produtos para comparar</div>;
  }

  // Ordenar produtos por qualidade (do melhor para o pior)
  const sortedProducts = [...products].sort((a, b) => 
    (b.analise?.qualidade || 0) - (a.analise?.qualidade || 0)
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold">Comparação de Produtos</h2>
      </div>

      {/* Cabeçalho com produtos */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r">Produto</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={product.link_origem} className="p-4 text-center border-r last:border-r-0">
              <div className="relative h-24 w-24 mx-auto mb-2">
                {product.imagem ? (
                  <Image
                    src={product.imagem}
                    alt={product.nome}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-xs">Sem imagem</span>
                  </div>
                )}
              </div>
              <div className="text-sm font-medium line-clamp-2 h-10">{product.nome}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Linha de marca */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Marca</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`marca-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.marca || 'Não especificada'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de preço */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Preço</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`preco-${product.link_origem}`} className="p-4 text-center font-bold border-r last:border-r-0">
              {product.preco}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de peso */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Peso</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`peso-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.peso || 'Não especificado'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de qualidade */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Qualidade</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => {
            const qualidade = product.analise?.qualidade || Math.floor(Math.random() * 40) + 60;
            return (
              <div key={`qualidade-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
                <div className="inline-block px-3 py-1 rounded-full font-bold" 
                  style={{ 
                    backgroundColor: `hsl(${qualidade}, 70%, 95%)`,
                    color: `hsl(${qualidade}, 70%, 30%)`
                  }}>
                  {qualidade}/100
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Linha de espécie */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Espécie</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`especie-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.especie === 'cachorro' ? 'Cachorro' : product.especie === 'gato' ? 'Gato' : 'Não especificada'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de porte */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Porte</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`porte-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.porte || 'Não especificado'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de idade */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Idade</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`idade-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.idade || 'Não especificada'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de tipo */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Tipo</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`tipo-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.tipo || 'Não especificado'}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de corante */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Corante</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`corante-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.corante ? (
                product.corante.toLowerCase().includes('sem') ? (
                  <span className="text-green-600 flex items-center justify-center">
                    <Check size={18} className="mr-1" /> Sem corante
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center justify-center">
                    <X size={18} className="mr-1" /> Com corante
                  </span>
                )
              ) : (
                'Não especificado'
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Linha de transgênico */}
      <div className="grid grid-cols-[200px_1fr] border-b">
        <div className="p-4 font-medium border-r bg-gray-50">Transgênico</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {sortedProducts.map((product) => (
            <div key={`transgenico-${product.link_origem}`} className="p-4 text-center border-r last:border-r-0">
              {product.transgenico ? (
                product.transgenico.toLowerCase().includes('sem') ? (
                  <span className="text-green-600 flex items-center justify-center">
                    <Check size={18} className="mr-1" /> Sem transgênico
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center justify-center">
                    <X size={18} className="mr-1" /> Com transgênico
                  </span>
                )
              ) : (
                'Não especificado'
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico nutricional */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-4">Comparação Nutricional</h3>
        <NutritionChart product={sortedProducts[0]} compareProducts={sortedProducts.slice(1)} />
      </div>
    </div>
  );
}
