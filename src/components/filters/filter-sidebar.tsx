'use client';

import { useState, useEffect } from 'react';
import FilterGroup from './filter-group';
import { FilterState } from '@/types/product';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  filterOptions: {
    especies: string[];
    marcas: string[];
    portes: string[];
    idades: string[];
    tipos: string[];
  };
  itemCounts: {
    especies: Record<string, number>;
    marcas: Record<string, number>;
    portes: Record<string, number>;
    idades: Record<string, number>;
    tipos: Record<string, number>;
  };
  activeFilters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ 
  filterOptions, 
  itemCounts, 
  activeFilters, 
  onChange 
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(activeFilters);

  // Atualizar o estado local quando as props mudarem
  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  const handleFilterChange = (group: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    
    if (checked && !newFilters[group].includes(value)) {
      newFilters[group] = [...newFilters[group], value];
    } else if (!checked && newFilters[group].includes(value)) {
      newFilters[group] = newFilters[group].filter(item => item !== value);
    }
    
    setFilters(newFilters);
    onChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      especies: [],
      marcas: [],
      portes: [],
      idades: [],
      tipos: []
    };
    setFilters(emptyFilters);
    onChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(group => group.length > 0);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filtros</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X size={14} />
            Limpar
          </Button>
        )}
      </div>
      
      <FilterGroup 
        title="Espécie" 
        items={filterOptions.especies}
        activeItems={filters.especies}
        itemCount={itemCounts.especies}
        onChange={(value, checked) => handleFilterChange('especies', value, checked)}
      />
      
      <FilterGroup 
        title="Marca" 
        items={filterOptions.marcas}
        activeItems={filters.marcas}
        itemCount={itemCounts.marcas}
        onChange={(value, checked) => handleFilterChange('marcas', value, checked)}
      />
      
      <FilterGroup 
        title="Porte" 
        items={filterOptions.portes}
        activeItems={filters.portes}
        itemCount={itemCounts.portes}
        onChange={(value, checked) => handleFilterChange('portes', value, checked)}
      />
      
      <FilterGroup 
        title="Idade" 
        items={filterOptions.idades}
        activeItems={filters.idades}
        itemCount={itemCounts.idades}
        onChange={(value, checked) => handleFilterChange('idades', value, checked)}
      />
      
      <FilterGroup 
        title="Tipo" 
        items={filterOptions.tipos}
        activeItems={filters.tipos}
        itemCount={itemCounts.tipos}
        onChange={(value, checked) => handleFilterChange('tipos', value, checked)}
      />
    </div>
  );
}
