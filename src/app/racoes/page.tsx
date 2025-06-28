'use client';

import { useState, useEffect } from 'react';
import FilterSidebar from '@/components/filters/filter-sidebar';
import ProductGrid from '@/components/product/product-grid';
import { Product, FilterState } from '@/types/product';
import productsData from '@/data/products.json';
import filterOptionsData from '@/data/filter-options.json';

// Converter os dados importados para o tipo Product[]
const realProducts: Product[] = productsData as Product[];

// Extrair opções de filtro únicas dos produtos
const extractFilterOptions = (products: Product[]) => {
  const especies = Array.from(new Set(products.map(p => p.especie).filter(Boolean))) as string[];
  const marcas = Array.from(new Set(products.map(p => p.marca).filter(Boolean))) as string[];
  const portes = Array.from(new Set(products.map(p => p.porte).filter(Boolean))) as string[];
  const idades = Array.from(new Set(products.map(p => p.idade).filter(Boolean))) as string[];
  const tipos = Array.from(new Set(products.map(p => p.tipo).filter(Boolean))) as string[];
  
  return { especies, marcas, portes, idades, tipos };
};

// Contar quantos produtos existem para cada valor de filtro
const countItemsByFilter = (products: Product[]) => {
  const especies: Record<string, number> = {};
  const marcas: Record<string, number> = {};
  const portes: Record<string, number> = {};
  const idades: Record<string, number> = {};
  const tipos: Record<string, number> = {};
  
  products.forEach(product => {
    if (product.especie) {
      especies[product.especie] = (especies[product.especie] || 0) + 1;
    }
    if (product.marca) {
      marcas[product.marca] = (marcas[product.marca] || 0) + 1;
    }
    if (product.porte) {
      portes[product.porte] = (portes[product.porte] || 0) + 1;
    }
    if (product.idade) {
      idades[product.idade] = (idades[product.idade] || 0) + 1;
    }
    if (product.tipo) {
      tipos[product.tipo] = (tipos[product.tipo] || 0) + 1;
    }
  });
  
  return { especies, marcas, portes, idades, tipos };
};

export default function RacoesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    especies: [],
    marcas: [],
    portes: [],
    idades: [],
    tipos: []
  });
  
  // Carregar dados reais
  useEffect(() => {
    // Carregar os dados reais do arquivo JSON
    setTimeout(() => {
      setProducts(realProducts);
      setLoading(false);
    }, 500);
  }, []);
  
  const filterOptions = extractFilterOptions(products);
  const itemCounts = countItemsByFilter(products);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Comparador de Rações</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar com filtros */}
          <div className="w-full md:w-1/4">
            <FilterSidebar 
              filterOptions={filterOptions}
              itemCounts={itemCounts}
              activeFilters={filters}
              onChange={setFilters}
            />
          </div>
          
          {/* Grid de produtos */}
          <div className="w-full md:w-3/4">
            <ProductGrid products={products} filters={filters} />
          </div>
        </div>
      )}
    </div>
  );
}
