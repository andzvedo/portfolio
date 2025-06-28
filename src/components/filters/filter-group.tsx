'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  items: string[];
  activeItems: string[];
  onChange: (value: string, checked: boolean) => void;
  itemCount?: Record<string, number>;
}

export default function FilterGroup({ 
  title, 
  items, 
  activeItems, 
  onChange,
  itemCount 
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  // Mostrar apenas os primeiros 5 itens, a menos que showAll seja true
  const visibleItems = showAll ? items : items.slice(0, 5);
  const hasMore = items.length > 5;

  return (
    <div className="mb-4 border-b pb-4">
      <button 
        className="flex items-center justify-between w-full text-left font-medium mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className="space-y-2">
          {visibleItems.map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={`${title}-${item}`}
                checked={activeItems.includes(item)}
                onChange={(e) => onChange(item, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`${title}-${item}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                <span>{item}</span>
                {itemCount && <span className="text-gray-500 text-xs">({itemCount[item] || 0})</span>}
              </label>
            </div>
          ))}
          
          {hasMore && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-primary hover:underline mt-2"
            >
              {showAll ? "Mostrar menos" : `Mostrar mais (${items.length - 5})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
