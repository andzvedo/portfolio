const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de dados da Cobasi
const INPUT_PATH = '/Users/andreazevedo/Documents/GitHub/HEROIS SRD/Comparador-racao/data/raw/cobasi_products_detalhados.jsonl';
// Caminho para salvar os dados processados
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.json');

// Função para extrair números de uma string de preço
function extractPrice(priceStr) {
  if (!priceStr) return null;
  const match = priceStr.match(/[\d,.]+/);
  if (match) {
    return parseFloat(match[0].replace('.', '').replace(',', '.'));
  }
  return null;
}

// Função para extrair números de uma string de peso
function extractWeight(weightStr) {
  if (!weightStr) return null;
  const match = weightStr.match(/(\d+[,.]?\d*)\s*(kg|g|Kg|KG)/i);
  if (match) {
    let value = parseFloat(match[1].replace(',', '.'));
    const unit = match[2].toLowerCase();
    // Converter para kg se estiver em g
    if (unit === 'g') {
      value = value / 1000;
    }
    return value;
  }
  return null;
}

// Função para calcular a qualidade do produto baseado em seus atributos
function calculateQuality(product) {
  let quality = 50; // Valor base

  // Ajustar com base na marca
  const premiumBrands = ['royal canin', 'hills', 'premier', 'n&d', 'farmina', 'pro plan', 'formula natural'];
  const midBrands = ['golden', 'equilibrio', 'biofresh', 'guabi natural'];
  const basicBrands = ['pedigree', 'whiskas', 'special cat', 'special dog', 'gran plus', 'origens'];

  if (product.marca) {
    const marca = product.marca.toLowerCase();
    if (premiumBrands.some(b => marca.includes(b))) {
      quality += 25;
    } else if (midBrands.some(b => marca.includes(b))) {
      quality += 15;
    } else if (basicBrands.some(b => marca.includes(b))) {
      quality += 5;
    }
  }

  // Ajustar com base nos ingredientes (se disponíveis)
  if (product.ingredientes) {
    const ingredientes = product.ingredientes.toLowerCase();
    
    // Ingredientes de qualidade
    if (ingredientes.includes('carne') && !ingredientes.includes('subproduto')) quality += 10;
    if (ingredientes.includes('frango') && !ingredientes.includes('subproduto')) quality += 10;
    if (ingredientes.includes('salmão') || ingredientes.includes('salmao')) quality += 15;
    if (ingredientes.includes('cordeiro')) quality += 15;
    
    // Ingredientes de menor qualidade
    if (ingredientes.includes('subproduto')) quality -= 15;
    if (ingredientes.includes('farinha de carne')) quality -= 5;
    if (ingredientes.includes('corante')) quality -= 10;
    if (ingredientes.includes('transgênico') || ingredientes.includes('transgenico')) quality -= 10;
  }

  // Se tem corantes (campo específico)
  if (product.corante && product.corante.toLowerCase().includes('sim')) {
    quality -= 10;
  }

  // Se tem transgênicos (campo específico)
  if (product.transgenico && product.transgenico.toLowerCase().includes('sim')) {
    quality -= 10;
  }

  // Limitar entre 0 e 100
  return Math.max(0, Math.min(100, quality));
}

// Função para calcular o custo-benefício
function calculateCostBenefit(product, quality) {
  if (!product.preco || !quality) return 50;

  const price = extractPrice(product.preco);
  const weight = extractWeight(product.peso);
  
  if (!price || !weight) return 50;
  
  // Calcular preço por kg
  const pricePerKg = price / weight;
  
  // Faixas de preço por kg (ajustar conforme necessário)
  let costBenefit = 50;
  
  if (pricePerKg < 30) {
    costBenefit = 80;
  } else if (pricePerKg < 50) {
    costBenefit = 70;
  } else if (pricePerKg < 80) {
    costBenefit = 60;
  } else if (pricePerKg < 120) {
    costBenefit = 50;
  } else if (pricePerKg < 180) {
    costBenefit = 40;
  } else {
    costBenefit = 30;
  }
  
  // Ajustar com base na qualidade
  costBenefit = costBenefit * (quality / 50);
  
  // Limitar entre 0 e 100
  return Math.max(0, Math.min(100, costBenefit));
}

// Função para gerar valores de análise nutricional simulados com base na qualidade
function generateNutritionalAnalysis(product, quality) {
  // Valores base para análise nutricional
  const baseAnalysis = {
    proteina: 0,
    gordura: 0,
    fibra: 0,
    umidade: 0,
    calcio: 0,
    fosforo: 0
  };
  
  // Extrair informações nutricionais das especificações se disponíveis
  if (product.especificacoes) {
    const specs = product.especificacoes;
    
    // Tentar extrair valores das especificações
    for (const [key, value] of Object.entries(specs)) {
      if (key.includes('proteina') || key.includes('proteína')) {
        baseAnalysis.proteina = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
      if (key.includes('gordura') || key.includes('matéria gordurosa')) {
        baseAnalysis.gordura = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
      if (key.includes('fibra')) {
        baseAnalysis.fibra = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
      if (key.includes('umidade')) {
        baseAnalysis.umidade = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
      if (key.includes('cálcio') || key.includes('calcio')) {
        baseAnalysis.calcio = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
      if (key.includes('fósforo') || key.includes('fosforo')) {
        baseAnalysis.fosforo = parseFloat(value.replace('%', '').replace(',', '.')) || 0;
      }
    }
  }
  
  // Se não encontrou valores, gerar com base na qualidade e espécie
  if (baseAnalysis.proteina === 0) {
    if (product.especie === 'gato') {
      baseAnalysis.proteina = 30 + (quality / 10); // Gatos precisam de mais proteína
    } else {
      baseAnalysis.proteina = 22 + (quality / 10);
    }
  }
  
  if (baseAnalysis.gordura === 0) {
    baseAnalysis.gordura = 10 + (quality / 20);
  }
  
  if (baseAnalysis.fibra === 0) {
    baseAnalysis.fibra = 3 + (quality / 100);
  }
  
  if (baseAnalysis.umidade === 0) {
    baseAnalysis.umidade = 10;
  }
  
  if (baseAnalysis.calcio === 0) {
    baseAnalysis.calcio = 1.2 + (quality / 200);
  }
  
  if (baseAnalysis.fosforo === 0) {
    baseAnalysis.fosforo = 0.8 + (quality / 200);
  }
  
  return baseAnalysis;
}

// Processar os dados
async function processData() {
  try {
    // Verificar se o arquivo de entrada existe
    if (!fs.existsSync(INPUT_PATH)) {
      console.error(`Arquivo de entrada não encontrado: ${INPUT_PATH}`);
      return;
    }
    
    // Ler o arquivo de entrada
    const fileContent = fs.readFileSync(INPUT_PATH, 'utf8');
    const lines = fileContent.trim().split('\n');
    
    // Processar cada linha (produto)
    const products = lines.map((line, index) => {
      try {
        const product = JSON.parse(line);
        
        // Calcular qualidade
        const quality = calculateQuality(product);
        
        // Calcular custo-benefício
        const costBenefit = calculateCostBenefit(product, quality);
        
        // Gerar análise nutricional
        const nutritionalAnalysis = generateNutritionalAnalysis(product, quality);
        
        // Adicionar campos de análise
        return {
          ...product,
          id: product.link_origem.split('/p?')[0].split('/').pop() || `product-${index}`,
          analise: {
            ...nutritionalAnalysis,
            qualidade: quality,
            custobeneficio: costBenefit
          }
        };
      } catch (err) {
        console.error(`Erro ao processar produto na linha ${index + 1}:`, err);
        return null;
      }
    }).filter(Boolean); // Remover produtos nulos (que deram erro)
    
    // Criar diretório de saída se não existir
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Salvar os dados processados
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2));
    
    console.log(`Processamento concluído! ${products.length} produtos processados.`);
    console.log(`Dados salvos em: ${OUTPUT_PATH}`);
    
    // Extrair e salvar opções de filtro
    const filterOptions = {
      especies: [...new Set(products.filter(p => p.especie).map(p => p.especie))],
      marcas: [...new Set(products.filter(p => p.marca).map(p => p.marca))],
      portes: [...new Set(products.filter(p => p.porte).map(p => p.porte))],
      idades: [...new Set(products.filter(p => p.idade).map(p => p.idade))],
      tipos: [...new Set(products.filter(p => p.tipo).map(p => p.tipo))]
    };
    
    const filterOptionsPath = path.join(outputDir, 'filter-options.json');
    fs.writeFileSync(filterOptionsPath, JSON.stringify(filterOptions, null, 2));
    console.log(`Opções de filtro salvas em: ${filterOptionsPath}`);
    
  } catch (err) {
    console.error('Erro ao processar os dados:', err);
  }
}

// Executar o processamento
processData();
