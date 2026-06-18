import React, { useState, useEffect } from 'react';
import { extractProductsFromResponse } from '../services/n8n';

export interface PremiumProduct {
  id: string;
  title: string;
  checkoutUrl: string;
  imageUrl: string;
  description: string;
  category: 'Cura' | 'Amor' | 'Finanças' | 'Proteção' | 'Sagrado' | 'Causas Urgentes';
  pdfFilename?: string;
}

export const PRAYERS_PRODUCTS: PremiumProduct[] = [
  {
    id: 'cura-divina',
    title: 'Guia da Cura Divina de São Rafael Arcanjo',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOEU',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2Q2/pppbd2q2dc6c9cb6c77e48d18111b9808bfef2adpngdc6c9cb.png',
    category: 'Cura',
    description: 'Um e-book e guia de orações dedicado ao Arcanjo da Cura física, mental e espiritual. Ideal para quem busca restabelecimento e cura corporal sob a intercessão divina de São Rafael.',
    pdfFilename: 'cadeadas/O-Poder-da-Cura-Divina-Uma-Jornada-com-Sao-Rafael-Arcanjo.pdf'
  },
  {
    id: 'amor-verdadeiro',
    title: 'Guia de Amor Verdadeiro',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOGN',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2Q6/pppbd2q6imagepath17d71bd8_1a1a_48f9_b731_b56ad2cff.png',
    category: 'Amor',
    description: 'Encontre harmonia afetiva, perdoe o passado e sintonize seu coração para atrair ou selar um relacionamento sagrado, saudável e abençoado com as energias celestes.',
    pdfFilename: 'cadeadas/Santo-Antonio-de-Padua-O-Guia-para-o-Amor-Verdadeiro.pdf'
  },
  {
    id: 'financeiro-biblico',
    title: 'Guia Financeiro Bíblico',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOFM',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2Q8/pppbd2q869f917c09bf44c2fbb328d8c6f221b8bpng69f917c.png',
    category: 'Finanças',
    description: 'Aprenda os princípios e ensinamentos financeiros milenares guardados dentro das Escrituras Sagradas para restabelecer sua saúde patrimonial e destravar a prosperidade ética.',
    pdfFilename: 'cadeadas/GUIA-FINANCEIRO-BIBLICO.pdf'
  },
  {
    id: 'sao-francisco',
    title: 'Jornada - São Francisco de Assis',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOGG',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2QD/pppbd2qdfb389c72aa4f431e8f3702316f1cedabpngfb389c7.png',
    category: 'Sagrado',
    description: 'Conecte-se com a profunda humildade cristã, desapego material, amor à criação e paz interior seguindo os ensinamentos diários de São Francisco de Assis, o padroeiro da simplicidade.',
    pdfFilename: 'cadeadas/caminhos de aceita%C3%A7%C3%A3o, jornada com s%C3%A3o francisco de assis.pdf'
  },
  {
    id: 'reconciliacao',
    title: 'Jornada da Reconciliação',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOGS',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2QJ/pppbd2qjchatgptimage30dejulde2025151301pngchatgpt_.png',
    category: 'Amor',
    description: 'Um caminho devocional de perdão e restauração para curar desavenças familiares, restabelecer pontes desfeitas com pessoas queridas e apaziguar o coração magoado.',
    pdfFilename: 'cadeadas/O-Poder-da-Reconciliacao.pdf'
  },
  {
    id: 'nossa-senhora-saude',
    title: 'Nossa Senhora - Proteção de saúde',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOFQ',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2R1/pppbd2r1abbe8573a2334839a589a31ecbb0a8fapngabbe857.png',
    category: 'Cura',
    description: 'Preces e súplicas especiais dirigidas à Mãe Santíssima do Céu para pedir amparo, cura de moléstias graves e proteção integral sobre a saúde das pessoas que você mais ama.',
    pdfFilename: 'cadeadas/Nossa-Senhora-da-Saude.pdf'
  },
  {
    id: 'santa-rita',
    title: 'Oração de Santa Rita de Cássia - Causas Urgentes',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOG4',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2R0/pppbd2r081e855bb20e1411fbe060f62ce79b8abpng81e855b.png',
    category: 'Causas Urgentes',
    description: 'Rogue à advogada das causas impossíveis. Ideal para momentos de profunda aflição em que você necessita de um socorro celestial imediato perante as maiores tribulações.',
    pdfFilename: 'cadeadas/Santa-Rita-de-Cassia-Esperanca-nas-Causas-Impossiveis.pdf'
  },
  {
    id: 'santo-expedito',
    title: 'Oração de Santo Expedito - Causas Urgentes',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOFU',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2QS/pppbd2qs529f91f4d2ff497ebd8450a2e81233f9png529f91f.png',
    category: 'Causas Urgentes',
    description: 'Clame a intercessão rápida e firme do Santo que não adia sua fé. Excelente para negócios rápidos, causas judiciais, exames ou resoluções financeiras de extrema pressa.',
    pdfFilename: 'cadeadas/Santo-Expedito-A-Forca-na-Urgencia.pdf'
  },
  {
    id: 'sao-jorge',
    title: 'Oração de São Jorge - Proteção Divina',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOGB',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2R6/pppbd2r6capturadetela20250730151451pngcaptura_de_t.png',
    category: 'Proteção',
    description: 'Ande revestido e guardado com a poderosa couraça de São Jorge Guerreiro. Afaste inimigos ocultos, infortúnios diários, negatividade, perigos públicos e demandas malignas.',
    pdfFilename: 'cadeadas/Sao-Jorge-O-Poder-da-Fe-e-da-Protecao.pdf'
  },
  {
    id: 'silvio-santos',
    title: 'Oração de Silvio Santos',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOFD',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2R2/pppbd2r2sadjpgsad.jpg',
    category: 'Proteção',
    description: 'A prece de fé inspiradora que acompanhava o mestre da comunicação em seus dias mais desafiadores, buscando luz mental, magnetismo pessoal, comunhão social e dedicação.',
    pdfFilename: 'cadeadas/O-Caminho-da-Prosperidade-de-Silvio-Santos.pdf'
  },
  {
    id: 'protecao-filhos',
    title: 'Oração para Proteção dos Filhos',
    checkoutUrl: 'https://go.perfectpay.com.br/PPU38CPTOFH',
    imageUrl: 'https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/product/PPPBD2R3/pppbd2r3d9147f2dbc814dd5bf2360c43329d007pngd9147f2.png',
    category: 'Proteção',
    description: 'Erga um escudo impenetrável de oração e amor maternal/paternal sobre seus filhos. Livre-os das más amizades, vícios, caminhos tortuosos e ampare suas escolhas de vida.',
    pdfFilename: 'cadeadas/Um-Legado-de-Amor-e-Fe-Protegendo-Nossos-Filhos.pdf'
  }
];

export const PRAYERS_TEXTS: Record<string, { steps: string[]; prayer: string }> = {
  'cura-divina': {
    steps: [
      "1. Silencie sua mente e faça o sinal da cruz, invocando São Rafael Arcanjo.",
      "2. Acenda uma vela verde (física ou mentalmente) simbolizando a cura divina.",
      "3. Recite a oração abaixo por 3 dias consecutivos focando na cura necessária."
    ],
    prayer: "Glorioso Arcanjo São Rafael, cuja missão é curar as enfermidades e guiar os caminhantes, eu clamo hoje a tua intercessão celestial. Derrama sobre meu corpo, mente e alma as luzes verdes da restauração divina. Afasta de mim e de quem amo qualquer sombra de fraqueza, dor ou enfermidade, e guie-nos seguros ao pleno restabelecimento sob a graça de Deus Criador. Amém."
  },
  'amor-verdadeiro': {
    steps: [
      "1. Agradeça pelas lições do passado e liberte qualquer mágoa pendente.",
      "2. Visualize uma aura rosa e dourada ao seu redor.",
      "3. Faça a oração abaixo mentalizando a paz no seu relacionamento ou família."
    ],
    prayer: "Senhor Deus, fonte de todo amor e caridade pura, sintonizo meu coração na frequência das tuas bênçãos. Peço que purifiques meus sentimentos, afastes o medo da solidão e guies os meus passos para se harmonizarem com aqueles que compartilham do bem. Abençoa meu lar e atrai relações saudáveis baseadas no respeito recíproco e na fé viva. Amém."
  },
  'financeiro-biblico': {
    steps: [
      "1. Declare sua gratidão sincera por todos os recursos que já possui.",
      "2. Faça um breve exame de consciência sobre a generosidade e sabedoria.",
      "3. Reze a oração com convicção e firmeza na providência."
    ],
    prayer: "Pai Celestial, dono do ouro e da prata e provedor de toda a criação, limpa meus caminhos e pensamentos de qualquer espírito de escassez. Ensina-me a sabedoria contida nas tuas Escrituras para administrar recursos com justiça, ética e prosperidade. Que as janelas do céu se abram e que a abundância lícita transborde em minha vida financeira para glorificar Teu nome. Amém."
  },
  'sao-francisco': {
    steps: [
      "1. Sente-se confortavelmente e respire profundamente, buscando a simplicidade.",
      "2. Contemple a natureza ao seu redor com olhos de gratidão.",
      "3. Recite a tradicional prece de paz de Assis."
    ],
    prayer: "Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor; onde houver ofensa, que eu leve o perdão; onde houver discórdia, que eu leve a união; onde houver dúvida, que eu leve a foi; onde houver erro, que eu leve a verdade; onde houver desespero, que eu leve a esperança; onde houver tristeza, que eu leve a alegria; onde houver trevas, que eu leve a luz. Amém."
  },
  'reconciliacao': {
    steps: [
      "1. Perdoe silenciosamente a pessoa com quem você busca restaurar a paz.",
      "2. Medite sobre a importância da humildade na reparação de laços.",
      "3. Faça esta prece pedindo ao anjo da guarda dela que interceda."
    ],
    prayer: "Deus da paz e da mútua reconciliação, envia teus anjos para que derramem suavidade sobre os corações desavindos. Cura as feridas do orgulho, amacia as palavras rígidas e devolve a doçura e a harmonia onde antes havia distância. Que a luz do Teu amor dissipe qualquer desarmonia de nosso convívio, em nome da paz divina. Amém."
  },
  'nossa-senhora-saude': {
    steps: [
      "1. Ore uma Ave-Maria com o coração recolhido.",
      "2. Imagine o manto protetor azul-celeste cobrindo você e sua família.",
      "3. Rogue pela intercessão da Rainha da Saúde."
    ],
    prayer: "Maria, nossa Mãe de Ternura e Saúde dos Enfermos, estende teu manto de proteção amorosa sobre nossas fragilidades físicas. Sob as bênçãos do teu divino Filho, ampara os que sofrem, concede conforto e devolve a força de viver àqueles que enfrentam tratamentos ou dores corporais. Intercede por nossa plena regeneração física e espiritual. Amém."
  },
  'santa-rita': {
    steps: [
      "1. Em momentos de extrema angústia, recolha-se e acenda uma vela branca.",
      "2. Mentalize a graça urgente que você necessita com confiança e fé absoluta.",
      "3. Faça a súplica com firmeza à Santa do Impossível."
    ],
    prayer: "Sob o peso da minha dor, recorro a ti, Santa Rita de Cássia, advogada nas causas impossíveis e desesperadas. Com o coração aflito, clamo para que ponhas sob teus olhos a minha urgente necessidade. Tu que suportaste com paciência imensa as maiores tribulações, roga a Deus por mim para que a sua divina misericórdia acolha meu apelo urgente. Amém."
  },
  'santo-expedito': {
    steps: [
      "1. Reze a oração com vigor espiritual e determinação.",
      "2. Encoraje-se a realizar suas tarefas hoje sem postergar.",
      "3. Ofereça sua oração para obter agilidade nas suas demandas."
    ],
    prayer: "Meu Santo Expedito das causas justas e urgentes, socorre-me nesta hora de aflição e desespero. Intercede por mim junto a Nosso Senhor Jesus Cristo. Tu que és o Santo dos aflitos, o Santo das causas urgentes, protege-me, ajuda-me, dai-me força, coragem e serenidade. Atende ao meu pedido urgente. Serei grato por tua celestial e rápida ajuda. Amém."
  },
  'sao-jorge': {
    steps: [
      "1. Sinta sua coluna reta e sintonize-se com a coragem do guerreiro da fé.",
      "2. Mentalize que você está revestido de um escudo impenetrável de luz branca.",
      "3. Pronuncie os tradicionais versos protetores abaixo com autoridade espiritual."
    ],
    prayer: "Andarei vestido e armado com as armas de São Jorge para que meus inimigos, tendo pés não me alcancem, tendo mãos não me peguem, tendo olhos não me vejam, e nem em pensamentos eles possam me fazer mal. Armas de fogo o meu corpo não alcançarão, facas e lanças se quebrarão sem o meu corpo tocar, cordas e correntes se arrebentarão sem o meu corpo amarrar. Sob a graça protetora do guerreiro da luz, sigo firme. Amém."
  },
  'silvio-santos': {
    steps: [
      "1. Concentre-se no seu carisma interior e mantém uma postura alegre.",
      "2. Mentalize as palavras-chave: alegria, superação dos dias difíceis e fé no futuro.",
      "3. Recite a oração buscando leveza mental e paz infinita."
    ],
    prayer: "Deus benevolente e criador de todo o entusiasmo humano, agradeço pelo dom da vida e pela alegria de poder comunicar o bem. Concede-me serenidade mental para superar os desafios cotidianos, magnetismo puro para levar otimismo às pessoas e um coração humilde para sempre celebrar as vitórias com simplicidade. Sob vossa luz, que o meu trabalho e dedicação tragam sempre paz e felicidade. Amém."
  },
  'protecao-filhos': {
    steps: [
      "1. Coloque a mão no coração e mentalize o rosto de cada um de seus filhos.",
      "2. Peça ao anjo da guarda deles que os guie e ilumine os caminhos.",
      "3. Faça a prece com amor paternal/maternal devoto."
    ],
    prayer: "Pai das Infinitas Graças, coloco meus filhos sob Teu amparo absoluto. Protege-os contra as influências do mundo enganador, afasta deles as más companhias, perigos ocultos, acidentes e enfermidades. Que Teus santos anjos os escoltem em cada saída e entrada, inspirando-lhes sempre pensamentos de bem, verdade e amor. Guardia-os hoje e sempre. Amém."
  }
};

interface PrayersProps {
  navigate: (path: string) => void;
}

const Prayers: React.FC<PrayersProps> = ({ navigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>(() => {
    const stored = localStorage.getItem('prayers_filter_category');
    if (stored) {
      localStorage.removeItem('prayers_filter_category'); // clean so refresh is fresh
      return stored;
    }
    return 'Todos';
  });

  const [unlockedProducts, setUnlockedProducts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('unlocked_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Automated background query on mount to fetch all certified purchases
  useEffect(() => {
    const syncPurchasesOnMount = async () => {
      const userEmail = localStorage.getItem('user_email') || '';
      const userPhone = localStorage.getItem('user_phone') || '';
      const userName = localStorage.getItem('user_name') || '';

      if (!userEmail) return;

      try {
        const response = await fetch('https://nen.auto-jornada.space/webhook/dados-iniciais-jma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: "verify_all_purchases",
            email: userEmail,
            whatsapp: userPhone,
            nome_completo: userName,
            timestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          const data = await response.json().catch(() => ({}));
          const products = extractProductsFromResponse(data);

          if (products.length > 0) {
            const merged = Array.from(new Set([...unlockedProducts, ...products]));
            setUnlockedProducts(merged);
            localStorage.setItem('unlocked_products', JSON.stringify(merged));
          }
        }
      } catch (err) {
        console.warn("Erro ao sincronizar compras com n8n no Prayers:", err);
      }
    };

    syncPurchasesOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = ['Todos', 'Cura', 'Amor', 'Finanças', 'Proteção', 'Sagrado', 'Causas Urgentes'];

  const filteredProducts = PRAYERS_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'Todos' || product.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-28 pt-4 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Orações e Guias Sagrados</h2>
        <p className="text-sm text-neutral-400 font-medium tracking-tight">Estenda sua jornada de bem-aventurança espiritual</p>
      </div>

      {/* Info Card explaining upcoming bridge and n8n lock */}
      <section className="bg-amber-50/50 p-5 rounded-3xl border border-amber-100 flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-amber-800">
          <svg className="w-5 h-5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18.3 5.71a1 1 0 00-1.42 0L10 12.59 7.12 9.71a1 1 0 10-1.42 1.42l3.5 3.5a1 1 0 001.42 0l7.5-7.5a1 1 0 000-1.42z" clipRule="evenodd" /></svg>
          <span className="font-bold text-xs uppercase tracking-wide">Área Devocional Direta</span>
        </div>
        <p className="text-neutral-600 text-xs leading-relaxed font-semibold">
          Sua sintonização é consultada automaticamente. Quando adquirir um guia, ele será liberado para leitura imediata em seu perfil!
        </p>
      </section>

      {/* Search Input field */}
      <div className="relative">
        <input 
          type="text"
          placeholder="Buscar oração, arcanjo ou santo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-100 rounded-2xl text-base font-semibold focus:outline-none focus:border-amber-400 shadow-xs"
        />
        <svg className="w-4 h-4 text-neutral-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {/* Categories Pills tab */}
      <div className="flex space-x-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              activeTab === cat 
                ? 'bg-neutral-800 text-white shadow-sm' 
                : 'bg-white border border-neutral-100 text-neutral-400 hover:bg-neutral-51'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid list */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((prod) => {
            const isUnlocked = unlockedProducts.includes(prod.id.toLowerCase());
            return (
              <div 
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex"
              >
                <div className="w-24 h-24 shrink-0 relative bg-neutral-100 border-r border-neutral-50">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.title} 
                    loading="lazy"
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${prod.id}/300/300`;
                    }}
                  />
                  <div className="absolute inset-0 bg-neutral-900/10" />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest leading-none">{prod.category}</span>
                      
                      {isUnlocked ? (
                        <span className="flex items-center space-x-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          <span>LIBERADO</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                          <span>BLOQUEADO</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-neutral-800 line-clamp-2 leading-snug">{prod.title}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[10px] text-neutral-400 font-medium truncate max-w-[160px]">{prod.description}</p>
                    <span className="text-[10px] font-bold text-amber-500 hover:text-amber-600 transition-colors uppercase shrink-0">
                      {isUnlocked ? 'Ler Guia ➔' : 'Ativar ➔'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-neutral-100">
          <p className="text-sm font-bold text-neutral-400">Nenhum guia encontrado para esta busca.</p>
          <button onClick={() => { setSearchTerm(''); setActiveTab('Todos'); }} className="text-xs font-bold text-amber-500 mt-2 hover:underline">Limpar filtros</button>
        </div>
      )}

      {/* Product Detail & Checkout bottom-sheet Modal */}
      {selectedProduct !== null && (() => {
        const isUnlocked = unlockedProducts.includes(selectedProduct.id.toLowerCase());
        const details = PRAYERS_TEXTS[selectedProduct.id];

        return (
          <div 
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs z-[100] flex items-end justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedProduct(null)}
          >
            <div 
              className="bg-white rounded-3xl w-full max-w-md p-6 pb-8 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[85vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Grabber line */}
              <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{selectedProduct.category}</span>
                  <h4 className="text-lg font-bold text-neutral-850 tracking-tight leading-snug">{selectedProduct.title}</h4>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-full bg-neutral-50 text-neutral-400 hover:bg-neutral-100 active:scale-90 transition-transform shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Premium visual banner mockup */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${selectedProduct.id}/300/300`;
                    }}
                  />
                  <div className={`absolute top-2 right-2 rounded-full p-1 shadow-sm text-white ${isUnlocked ? 'bg-green-600' : 'bg-amber-500'}`}>
                    {isUnlocked ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Conditionally reveal spiritual guides if unlocked */}
              {isUnlocked && details ? (
                <div className="space-y-4">
                  {selectedProduct.pdfFilename && (
                    <button 
                      onClick={() => navigate(`pdf/${selectedProduct.pdfFilename}`)}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white rounded-2xl shadow-md flex items-center justify-center space-x-2 active:scale-98 transition-all"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <span>Ler E-Book / PDF Completo 📖</span>
                    </button>
                  )}
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-150 space-y-2">
                    <span className="text-[9px] font-extrabold text-green-700 uppercase tracking-widest block">Instruções Devocionais</span>
                    <ul className="space-y-1.5 text-neutral-700 text-xs font-semibold">
                      {details.steps.map((st, idx) => (
                        <li key={idx} className="leading-snug">{st}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50/20 p-5 rounded-2xl border border-amber-100 space-y-2 text-center shadow-inner">
                    <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-widest block">Prece de Sintonia</span>
                    <p className="italic text-neutral-800 text-xs font-bold leading-relaxed whitespace-pre-line px-1">
                      "{details.prayer}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100/50">
                    <p className="text-xs text-neutral-650 leading-relaxed font-semibold text-justify">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-2">
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ativação Segura Integrada</h5>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">
                      Ao concluir a aquisição deste guia, o sistema processará o seu e-mail cadastrado automaticamente e liberará o canal de áudio e texto diretamente nesta mesma conta.
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                {isUnlocked ? (
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-sm shadow-md active:scale-98 transition-transform"
                  >
                    Estou Sintonizado ✓
                  </button>
                ) : (
                  <a 
                    href={selectedProduct.checkoutUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full block text-center py-4 gradient-gold text-white font-bold rounded-2xl text-sm shadow-md shadow-amber-100 active:scale-98 transition-transform"
                  >
                    Ativar & Adquirir Meu Guia ➔
                  </a>
                )}
                
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-3 bg-neutral-100 hover:bg-neutral-150 text-neutral-700 font-bold rounded-xl text-xs transition-colors"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Prayers;
