export interface Product {
  // Identificação
  id: string;
  nome: string;
  link_origem: string;
  
  // Informações Básicas
  preco: string;
  preco_normalizado?: number; // Preço por kg
  descricao: string | null;
  imagem: string | null;
  marca: string | null;
  fabricante?: string | null; // Fabricante real (pode ser diferente da marca)
  disponibilidade?: string | null; // Facilidade de encontrar no mercado
  reviews?: {
    pontuacao: number; // 0-5
    quantidade: number;
    comentarios?: string[];
  };
  
  // Categorização
  especie: 'cachorro' | 'gato' | null;
  porte: string | null; // Pequeno, Médio, Grande, Todas as raças
  idade: string | null; // Filhote, Adulto, Sênior, Todas as idades
  tipo: string | null; // Seca, Úmida, Natural, Medicamentosa
  categoria_especial?: string[] | null; // Castrados, Obesidade, Hipoalergênica, etc.
  raca: string | null; // Raças específicas
  
  // Apresentação
  peso: string | null;
  peso_normalizado?: number; // Em kg
  opcoes_peso?: string[]; // Tamanhos disponíveis (500g, 1kg, 3kg, etc.)
  
  // Composição
  ingredientes: string | null;
  ingredientes_principais?: string[];
  corante: string | null;
  transgenico: string | null;
  alergenos?: string[] | null;
  
  // Especificações técnicas
  especificacoes: Record<string, string>; // Dados brutos como apresentados pelo fabricante
  
  // Informações Nutricionais Normalizadas
  analise?: {
    // Níveis de garantia
    proteina?: number; // %
    proteina_base_seca?: number; // % em base seca
    gordura?: number; // %
    gordura_base_seca?: number; // % em base seca
    fibra?: number; // %
    umidade?: number; // %
    materia_mineral?: number; // %
    calcio?: number; // %
    fosforo?: number; // %
    potassio?: number; // %
    sodio?: number; // %
    magnesio?: number; // %
    omega3?: number; // %
    omega6?: number; // %
    
    // Informações energéticas
    calorias?: number; // kcal/kg
    energia_metabolizavel?: number; // kcal/kg
    
    // Avaliações
    qualidade?: number; // 0-100
    custobeneficio?: number; // 0-100
  };
  
  // Dados originais sem normalização
  dados_originais?: {
    niveis_garantia?: Record<string, string>;
    informacoes_nutricionais?: Record<string, string>;
  };
}

export interface FilterOptions {
  especies: string[];
  marcas: string[];
  fabricantes: string[];
  portes: string[];
  idades: string[];
  tipos: string[];
  categorias_especiais: string[];
  racas: string[];
  opcoes_peso: string[];
}

export interface FilterState {
  especies: string[];
  marcas: string[];
  portes: string[];
  idades: string[];
  tipos: string[];
}
