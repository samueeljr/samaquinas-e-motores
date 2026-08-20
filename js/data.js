/* ==========================================================================
   SA MÁQUINAS E MOTORES — DADOS DO CATÁLOGO
   Revenda autorizada Husqvarna — roçadeiras e motosserras.
   Fonte única de dados dos produtos, usada por home, produtos, produto e carrinho.
   ========================================================================== */

const SA_ICONS = {
  rocadeira: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 50 L40 14"/><circle cx="40" cy="14" r="6"/><path d="M14 46 L22 54"/><path d="M46 12 L54 8 L58 12 L52 18 Z"/><path d="M8 52 L14 46"/><path d="M4 56 L10 50"/></svg>`,
  motosserra: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="30" width="20" height="18" rx="4"/><path d="M28 34 L52 26 L52 42 L28 42 Z"/><path d="M28 26 L52 26 M28 42 L52 42" stroke-dasharray="3 3"/><circle cx="16" cy="39" r="3"/><path d="M14 30 L14 22 L22 22 L22 30"/></svg>`,
  peca: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 8 L36 16 L44 14 L44 22 L52 26 L46 32 L52 38 L44 42 L44 50 L36 48 L32 56 L28 48 L20 50 L20 42 L12 38 L18 32 L12 26 L20 22 L20 14 L28 16 Z"/><circle cx="32" cy="32" r="8"/></svg>`,
  outros: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 6 L56 18 L56 46 L32 58 L8 46 L8 18 Z"/><path d="M8 18 L32 30 L56 18 M32 30 L32 58"/></svg>`
};

const SA_CATEGORIES = [
  { slug: 'rocadeiras',          name: 'Roçadeiras',            icon: 'rocadeira' },
  { slug: 'motosserras',         name: 'Motosserras',           icon: 'motosserra' },
  { slug: 'pecas-equipamentos',  name: 'Peças / Equipamentos',  icon: 'peca' },
  { slug: 'outros',              name: 'Outros',                icon: 'outros' }
];

const SA_PRODUCTS = [
  { id:'p01', image:'p01.jpg', name:'Roçadeira ZH-415', brand:'Rossel', category:'rocadeiras', price:1850.00, oldPrice:2299.00, installments:12, rating:4.9, reviews:34, stock:5, power:'41.5cc / 2.1kW', weight:'7.2kg', tag:'promo', desc:'Roçadeira florestal profissional para desbaste pesado, alta durabilidade para jornadas longas de trabalho, equivalente a roçadeira 143 R II.' },
  { id:'p02', image:'p02.jpg', name:'Roçadeira 143R II', brand:'Husqvarna', category:'rocadeiras', price:3149.00, oldPrice:null, installments:10, rating:4.6, reviews:76, stock:11, power:'40.9cc / 1.5kW', weight:'7.2kg', tag:'new', desc:'Roçadeira de maior cilindrada para capinação pesada e manejo de pastagens, com empunhadura em U.' },
  { id:'p03', image:'p03.jpg', name:'Roçadeira 236', brand:'Husqvarna', category:'rocadeiras', price:2849.00, oldPrice:null, installments:8, rating:4.7, reviews:143, stock:19, power:'28cc / 0.8kW', weight:'5.5kg', tag:'promo', desc:'Um dos modelos mais vendidos da Husqvarna. Equilíbrio entre potência e leveza para uso doméstico e semiprofissional.' },
  { id:'p05', image:'p05.jpg', name:'Roçadeira 331', brand:'Husqvarna', category:'rocadeiras', price:1749.00, oldPrice:null, installments:12, rating:4.9, reviews:34, stock:5, power:'45.7cc / 2.1kW', weight:'7.9kg', tag:'promo', desc:'Roçadeira florestal para desbaste pesado, alta durabilidade para jornadas longas de trabalho.' },
   
  { id:'p07', image:'p07.webp', name:'Motosserra 61', brand:'Husqvarna', category:'motosserras', price:1699.00, oldPrice:null, installments:8, rating:4.6, reviews:112, stock:21, power:'38.2cc / sabre 14"', weight:'4.5kg', tag:'', desc:'Motosserra de entrada, leve e fácil de operar, indicada para podas e cortes ocasionais em propriedades rurais.'}, 
  { id:'p08', image:'p08.jpg', name:'Motosserra 272 XP', brand:'Husqvarna', category:'motosserras', price:2399.00, oldPrice:2699.00, installments:10, rating:4.7, reviews:98, stock:14, power:'40.9cc / sabre 16"', weight:'4.9kg', tag:'promo', desc:'Equilíbrio entre potência e peso reduzido, com partida facilitada e freio de corrente automático.' },
  { id:'p09', image:'p09.jpg', name:'Motosserra 353', brand:'Husqvarna', category:'motosserras', price:2999.00, oldPrice:null, installments:10, rating:4.8, reviews:187, stock:16, power:'50.2cc / sabre 18"', weight:'5.9kg', tag:'', desc:'Uma das motosserras mais conhecidas do mercado, robusta o suficiente para desdobro de toras e árvores de grande porte.' },
  { id:'p10', image:'p10.jpg', name:'Motosserra 372 XP', brand:'Husqvarna', category:'motosserras', price:3799.00, oldPrice:null, installments:12, rating:4.8, reviews:41, stock:6, power:'50.1cc / sabre 18"', weight:'5.6kg', tag:'new', desc:'Linha profissional X-Torq com sistema anti-vibração avançado, para uso intensivo diário em campo.' },

  { id:'p17', image:'p17.jpg', name:'Óleo 2T 500ml', brand:'Husqvarna', category:'pecas-equipamentos', price:40.00, oldPrice:null, installments:1, rating:4.9, reviews:128, stock:74, power:'—', weight:'500ml', tag:'', desc:'Óleo 2 tempos original Husqvarna, desenvolvido para máxima proteção do motor, reduzindo desgaste e formação de resíduos.' },
  { id:'p18', image:'p18.jpg', name:'Lima para Motosserra Pequena', brand:'Husqvarna', category:'pecas-equipamentos', price:14.00, oldPrice:null, installments:1, rating:4.7, reviews:42, stock:95, power:'—', weight:'0.1kg', tag:'', desc:'Lima redonda para afiação de correntes de motosserras de pequeno porte, proporcionando corte preciso e maior durabilidade da corrente.' },
  { id:'p19', image:'p19.jpg', name:'Lima para Motosserra Grande', brand:'Husqvarna', category:'pecas-equipamentos', price:14.00, oldPrice:null, installments:1, rating:4.8, reviews:37, stock:83, power:'—', weight:'0.1kg', tag:'', desc:'Lima redonda indicada para correntes de motosserras de médio e grande porte, garantindo afiação uniforme e eficiente.' },
  { id:'p20', image:'p20.jpg', name:'Cinto para Roçadeira', brand:'Husqvarna', category:'pecas-equipamentos', price:80.00, oldPrice:null, installments:3, rating:4.9, reviews:56, stock:28, power:'—', weight:'0.8kg', tag:'', desc:'Cinto ergonômico para roçadeiras Husqvarna, oferecendo maior conforto e distribuição do peso durante o trabalho.' },
  { id:'p21', image:'p21.jpg', name:'Prato Giratório para Roçadeira', brand:'Husqvarna', category:'pecas-equipamentos', price:10.00, oldPrice:null, installments:1, rating:4.6, reviews:31, stock:112, power:'—', weight:'0.15kg', tag:'', desc:'Prato giratório de reposição para cabeçotes de roçadeiras, fabricado com material resistente ao desgaste.' },
  { id:'p22', image:'p22.jpg', name:'Carretel Automático T25', brand:'Husqvarna', category:'pecas-equipamentos', price:80.00, oldPrice:null, installments:2, rating:4.8, reviews:84, stock:37, power:'—', weight:'0.45kg', tag:'', desc:'Cabeçote automático T25 original Husqvarna, com sistema Tapn Go para liberação rápida do fio de nylon.'},
  { id:'p23', image:'p23.jpg', name:'Carretel Automático T35', brand:'Husqvarna', category:'pecas-equipamentos', price:135.00, oldPrice:null, installments:3, rating:4.9, reviews:65, stock:24, power:'—', weight:'0.55kg', tag:'new', desc:'Cabeçote automático T35 Husqvarna, indicado para roçadeiras de maior potência, com excelente resistência e facilidade na troca do fio.' },
  { id:'p24', image:'p24.jpg', name:'Carretel Automático T45X', brand:'Husqvarna', category:'pecas-equipamentos', price:140.00, oldPrice:null, installments:3, rating:4.9, reviews:49, stock:19, power:'—', weight:'0.62kg', tag:'new', desc:'Cabeçote automático T45X Husqvarna para uso profissional, construído em alumínio reforçado e polímero de alta resistência.' },
  { id:'p25', image:'p25.jpg', name:'Carretel Manual', brand:'Husqvarna', category:'pecas-equipamentos', price:35.00, oldPrice:null, installments:1, rating:4.6, reviews:53, stock:68, power:'—', weight:'0.35kg', tag:'', desc:'Carretel manual para roçadeiras Husqvarna, de fácil montagem e excelente custo-benefício para uso residencial e profissional.' },
  { id:'p26', image:'p26.jpg', name:'Lâmina 2mm', brand:'Husqvarna', category:'pecas-equipamentos', price:33.00, oldPrice:null, installments:1, rating:4.8, reviews:39, stock:56, power:'—', weight:'0.45kg', tag:'', desc:'Lâmina de aço 2mm para roçadeiras, indicada para capim alto, vegetação densa e serviços de limpeza pesada.' },
  { id:'p27', image:'p27.jpg', name:'Lâmina 1,5mm', brand:'Husqvarna', category:'pecas-equipamentos', price:30.00, oldPrice:null, installments:1, rating:4.7, reviews:34, stock:61, power:'—', weight:'0.40kg', tag:'', desc:'Lâmina de aço 1,5mm para roçadeiras, ideal para capins, mato baixo e manutenção de áreas verdes.' },
  { id:'p28', image:'p28.jpg', name:'Bisnaga de Graxa', brand:'Husqvarna', category:'pecas-equipamentos', price:15.00, oldPrice:null, installments:1, rating:4.8, reviews:51, stock:98, power:'—', weight:'80g', tag:'', desc:'Graxa lubrificante para caixa de transmissão de roçadeiras, proporcionando maior vida útil aos componentes.' },
  { id:'p29', image:'p29.jpg', name:'Rolo de Fio de Nylon 3.0mm 220m', brand:'Husqvarna', category:'pecas-equipamentos', price:190.00, oldPrice:null, installments:4, rating:4.9, reviews:72, stock:17, power:'—', weight:'220m', tag:'', desc:'Rolo de fio de nylon 3.0mm original Husqvarna com 220 metros, indicado para uso profissional e alta resistência ao desgaste.' },
  { id:'p30', image:'p30.jpg', name:'Rolo de Fio de Nylon 2.7mm Quadrado 260m', brand:'Husqvarna', category:'pecas-equipamentos', price:190.00, oldPrice:null, installments:4, rating:4.9, reviews:64, stock:15, power:'—', weight:'260m', tag:'new', desc:'Rolo de fio de nylon quadrado 2.7mm com 260 metros, excelente desempenho em cortes de vegetação densa.' },
  { id:'p31', image:'p31.jpg', name:'Fio de Nylon por Metro', brand:'Husqvarna', category:'pecas-equipamentos', price:1.00, oldPrice:null, installments:1, rating:4.7, reviews:26, stock:500, power:'—', weight:'1m', tag:'', desc:'Venda de fio de nylon original por metro, ideal para reposição conforme a necessidade do cliente.' },
  { id:'p32', image:'p32.jpg', name:'Caneleira de Proteção', brand:'Husqvarna', category:'pecas-equipamentos', price:30.00, oldPrice:null, installments:1, rating:4.8, reviews:29, stock:46, power:'—', weight:'0.35kg', tag:'', desc:'Caneleira de proteção para operadores de roçadeiras, oferecendo maior segurança contra impactos e detritos.' },
  { id:'p33', image:'p33.jpg', name:'Caneleira com Velcro', brand:'Husqvarna', category:'pecas-equipamentos', price:30.00, oldPrice:null, installments:1, rating:4.8, reviews:24, stock:41, power:'—', weight:'0.35kg', tag:'', desc:'Caneleira ajustável com fechamento em velcro, proporcionando conforto e firmeza durante o trabalho.' },
  { id:'p34', image:'p34.jpg', name:'Avental de Proteção', brand:'Husqvarna', category:'pecas-equipamentos', price:65.00, oldPrice:null, installments:2, rating:4.9, reviews:37, stock:23, power:'—', weight:'0.75kg', tag:'', desc:'Avental de proteção resistente para operadores de roçadeiras, reduzindo o impacto de pedras e detritos.' },
  { id:'p35', image:'p35.jpg', name:'Viseira Acrílica', brand:'Husqvarna', category:'pecas-equipamentos', price:45.00, oldPrice:null, installments:2, rating:4.8, reviews:42, stock:33, power:'—', weight:'0.28kg', tag:'', desc:'Viseira acrílica transparente para proteção facial durante operações com roçadeiras e motosserras.' },
  { id:'p36', image:'p36.jpg', name:'Viseira Tipo Peneira', brand:'Husqvarna', category:'pecas-equipamentos', price:45.00, oldPrice:null, installments:2, rating:4.8, reviews:39, stock:35, power:'—', weight:'0.28kg', tag:'', desc:'Viseira em tela metálica (peneira), proporcionando proteção facial com excelente ventilação e visibilidade.' },
  { id:'p37', image:'p37.jpg', name:'Disco para Roçadeira', brand:'Husqvarna', category:'pecas-equipamentos', price:65.00, oldPrice:null, installments:2, rating:4.9, reviews:58, stock:31, power:'—', weight:'0.55kg', tag:'', desc:'Disco de corte em aço para roçadeiras, indicado para vegetação pesada, arbustos e pequenos galhos.' },
  { id:'p38', image:'p38.jpg', name:'Protetor para Óculos', brand:'Husqvarna', category:'pecas-equipamentos', price:5.00, oldPrice:null, installments:1, rating:4.6, reviews:18, stock:112, power:'—', weight:'0.05kg', tag:'', desc:'Protetor para óculos de segurança, aumentando a proteção contra poeira e pequenos detritos.' },
  { id:'p39', image:'p39.jpg', name:'Óculos de Proteção', brand:'Husqvarna', category:'pecas-equipamentos', price:8.00, oldPrice:null, installments:1, rating:4.7, reviews:47, stock:86, power:'—', weight:'0.08kg', tag:'', desc:'Óculos de proteção em policarbonato com lentes transparentes, ideais para trabalhos com equipamentos agrícolas e jardinagem.' },
];

const SA_TESTIMONIALS = [
  { name:'Carlos Bittencourt', role:'Produtor rural — Jambeiro/SP', text:'Comprei uma motosserra Husqvarna com a equipe e o pós-venda foi excelente. Assistência rápida quando precisei trocar a corrente.', stars:5 },
  { name:'Marli Ferraz', role:'Sítio Boa Vista — SJC/SP', text:'Atendimento direto e sem enrolação. A roçadeira que comprei aguenta o serviço pesado sem reclamar.', stars:5 },
  { name:'Roberto Aguiar', role:'Paisagismo Aguiar', text:'Uso as roçadeiras Husqvarna da loja há anos na minha empresa de paisagismo. Preço justo e equipamentos duram muito.', stars:4 }
];

function saFormatPrice(v){
  return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}

function saGetProduct(id){
  return SA_PRODUCTS.find(p => p.id === id);
}

function saCategoryName(slug){
  const c = SA_CATEGORIES.find(c => c.slug === slug);
  return c ? c.name : slug;
}

/* ---- Caminho da foto do produto (funciona tanto na raiz quanto em /pages/) ---- */
function saProductImagePath(product, basePath){
  const imgPrefix = basePath === '' ? '../' : '';
  return `${imgPrefix}img/products/${product.image}`;
}
