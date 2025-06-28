'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCompare?: (product: Product) => void;
  isComparing?: boolean;
}

export default function ProductCard({ product, onCompare, isComparing }: ProductCardProps) {
  // Extrair o ID do produto da URL ou usar um hash do nome
  const productId = product.id || Buffer.from(product.link_origem).toString('base64');
  
  // Extrair peso do produto para exibição
  const peso = product.peso || (product.nome?.match(/\d+(\.\d+)?\s*(kg|g)/i)?.[0] || null);
  
  // Calcular a qualidade (ou usar um valor padrão)
  const qualidade = product.analise?.qualidade || Math.floor(Math.random() * 40) + 60; // Temporário: 60-100
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-50">
        {product.imagem ? (
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
        
        {/* Badge de qualidade */}
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Star size={12} className="mr-1" />
          <span>{qualidade}/100</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-primary font-medium mb-1">
          {product.marca || 'Marca não especificada'}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {product.nome}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {product.especie && (
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {product.especie === 'cachorro' ? 'Cachorro' : 'Gato'}
            </span>
          )}
          
          {product.porte && (
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {product.porte}
            </span>
          )}
          
          {peso && (
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {peso}
            </span>
          )}
        </div>
        
        <div className="text-lg font-bold text-gray-900 mb-3">
          {product.preco}
        </div>
        
        <div className="flex gap-2">
          <Link href={`/racoes/${productId}`} className="flex-1">
            <Button variant="default" className="w-full" size="sm">
              Ver detalhes
            </Button>
          </Link>
          
          {onCompare && (
            <Button 
              variant={isComparing ? "outline" : "secondary"}
              size="sm"
              onClick={() => onCompare(product)}
              className="whitespace-nowrap"
            >
              {isComparing ? "Remover" : "Comparar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
