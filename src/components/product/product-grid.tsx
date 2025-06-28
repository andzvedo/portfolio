'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from './product-card';
import { Product, FilterState } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
}

type SortOption = 'price-asc' | 'price-desc' | 'quality-desc' | 'value-desc';

export default function ProductGrid({ products, filters }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [comparingProducts, setComparingProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('quality-desc');
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Aplicar filtros quando os produtos ou filtros mudarem
  useEffect(() => {
    let result = [...products];
    
    // Filtrar por espécie
    if (filters.especies.length > 0) {
      result = result.filter(p => p.especie && filters.especies.includes(p.especie));
    }
    
    // Filtrar por marca
    if (filters.marcas.length > 0) {
      result = result.filter(p => p.marca && filters.marcas.includes(p.marca));
    }
    
    // Filtrar por porte
    if (filters.portes.length > 0) {
      result = result.filter(p => p.porte && filters.portes.includes(p.porte));
    }
    
    // Filtrar por idade
    if (filters.idades.length > 0) {
      result = result.filter(p => p.idade && filters.idades.includes(p.idade));
    }
    
    // Filtrar por tipo
    if (filters.tipos.length > 0) {
      result = result.filter(p => p.tipo && filters.tipos.includes(p.tipo));
    }
    
    // Ordenar os produtos
    result = sortProducts(result, sortBy);
    
    setFilteredProducts(result);
  }, [products, filters, sortBy]);

  // Função para ordenar os produtos
  const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
    const productsToSort = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        return productsToSort.sort((a, b) => {
          const priceA = parseFloat(a.preco?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
          const priceB = parseFloat(b.preco?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
          return priceA - priceB;
        });
      case 'price-desc':
        return productsToSort.sort((a, b) => {
          const priceA = parseFloat(a.preco?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
          const priceB = parseFloat(b.preco?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
          return priceB - priceA;
        });
      case 'quality-desc':
        return productsToSort.sort((a, b) => 
          (b.analise?.qualidade || 0) - (a.analise?.qualidade || 0)
        );
      case 'value-desc':
        return productsToSort.sort((a, b) => 
          (b.analise?.custobeneficio || 0) - (a.analise?.custobeneficio || 0)
        );
      default:
        return productsToSort;
    }
  };

  // Função para adicionar/remover produtos da comparação
  const toggleCompare = (product: Product) => {
    if (comparingProducts.some(p => p.link_origem === product.link_origem)) {
      setComparingProducts(comparingProducts.filter(p => p.link_origem !== product.link_origem));
    } else {
      if (comparingProducts.length < 3) {
        setComparingProducts([...comparingProducts, product]);
      } else {
        alert('Você pode comparar no máximo 3 produtos ao mesmo tempo.');
      }
    }
  };

  // Opções de ordenação
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'quality-desc', label: 'Melhor qualidade' },
    { value: 'value-desc', label: 'Melhor custo-benefício' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' }
  ];

  return (
    <div>
      {/* Cabeçalho com contagem e ordenação */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700">
          {filteredProducts.length} produtos encontrados
        </div>
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSortOptions(!showSortOptions)}
            className="flex items-center gap-1"
          >
            <ArrowUpDown size={14} />
            <span>Ordenar por: </span>
            <span className="font-medium">
              {sortOptions.find(opt => opt.value === sortBy)?.label}
            </span>
          </Button>
          
          {showSortOptions && (
            <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md z-10 w-56">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    sortBy === option.value ? 'bg-accent text-accent-foreground' : ''
                  }`}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortOptions(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Área de comparação */}
      {comparingProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Comparando {comparingProducts.length} produtos</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setComparingProducts([])}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={14} />
              Limpar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparingProducts.map(product => (
              <div key={product.link_origem} className="flex items-center gap-3 p-2 border rounded">
                <div className="relative h-16 w-16 flex-shrink-0 bg-gray-50">
                  {product.imagem ? (
                    <Image
                      src={product.imagem}
                      alt={product.nome}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-xs">Sem imagem</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-primary font-medium">{product.marca}</div>
                  <div className="text-sm font-semibold truncate">{product.nome}</div>
                  <div className="text-sm font-bold">{product.preco}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleCompare(product)}
                  className="flex-shrink-0"
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
            
            {comparingProducts.length > 1 && (
              <div className="col-span-full mt-2">
                <Button className="w-full">
                  Ver comparação detalhada
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Grid de produtos */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros para ver mais produtos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.link_origem} 
              product={product} 
              onCompare={toggleCompare}
              isComparing={comparingProducts.some(p => p.link_origem === product.link_origem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
