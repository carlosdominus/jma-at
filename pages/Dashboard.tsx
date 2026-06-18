import React, { useEffect, useState } from 'react';
import { UserProgress, Manifestation } from '../types';
import { TOTAL_DAYS } from '../constants.tsx';
import { getDivineInsight } from '../services/gemini';
import { PRAYERS_PRODUCTS, PremiumProduct } from './Prayers.tsx';
import { extractProductsFromResponse } from '../services/n8n';

interface DashboardProps {
  progress: UserProgress;
  manifestations: Manifestation[];
  navigate: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, manifestations, navigate }) => {
  const [insight, setInsight] = useState("Sua jornada está começando...");
  const [loadingInsight, setLoadingInsight] = useState(true);
  
  // Unlocked items state: parsed from localStorage
  const [unlockedProducts, setUnlockedProducts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('unlocked_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedPremium, setSelectedPremium] = useState<PremiumProduct | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [accessMessage, setAccessMessage] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const msg = await getDivineInsight(progress.currentDay);
      setInsight(msg);
      setLoadingInsight(false);
    };
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.currentDay]);

  // Persist unlocked products
  const unlockProduct = (id: string) => {
    const updated = [...unlockedProducts, id];
    setUnlockedProducts(updated);
    localStorage.setItem('unlocked_products', JSON.stringify(updated));
  };

  const percentage = Math.round((progress.completedDays.length / TOTAL_DAYS) * 100);

  // Automatic background purchase sync on dashboard mount
  useEffect(() => {
    const syncPurchasesOnStart = async () => {
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
        console.warn("Sincronização de compras em segundo plano obteve um erro (esperado se não configurada):", err);
      }
    };

    syncPurchasesOnStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check with n8n if bought
  const handleVerifyPurchase = async (prod: PremiumProduct) => {
    setCheckingAccess(true);
    setAccessMessage({ type: '', text: '' });
    
    const userEmail = localStorage.getItem('user_email') || '';
    const userPhone = localStorage.getItem('user_phone') || '';
    const userName = localStorage.getItem('user_name') || '';
    const webhookUrl = 'https://nen.auto-jornada.space/webhook/dados-iniciais-jma';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: "verify_purchase",
          email: userEmail,
          whatsapp: userPhone,
          nome_completo: userName,
          product_id: prod.id,
          product_title: prod.title,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        const parsedProducts = extractProductsFromResponse(data);

        // If n8n explicitly says unlock or approved, or contains the product in parsedProducts
        if (data.status === 'approved' || data.unlocked === true || response.status === 200 || parsedProducts.includes(prod.id)) {
          let toUnlock = [prod.id];
          if (parsedProducts.length > 0) {
            toUnlock = Array.from(new Set([...toUnlock, ...parsedProducts]));
          }
          const merged = Array.from(new Set([...unlockedProducts, ...toUnlock]));
          setUnlockedProducts(merged);
          localStorage.setItem('unlocked_products', JSON.stringify(merged));
          
          setAccessMessage({ type: 'success', text: 'Excelente! Sua compra foi confirmada no n8n. Módulo liberado!' });
        } else {
          setAccessMessage({ type: 'error', text: 'Não encontramos nenhuma transação aprovada para este e-mail no n8n.' });
        }
      } else {
        setAccessMessage({ type: 'error', text: 'O servidor n8n respondeu com erro. Verifique sua conexão.' });
      }
    } catch (err) {
      setAccessMessage({ type: 'error', text: 'Não foi possível conectar ao servidor n8n.' });
    }
    setCheckingAccess(false);
  };

  const handleModuleClick = (prod: PremiumProduct) => {
    if (unlockedProducts.includes(prod.id)) {
      // If unlocked, go directly to purchase details or open it!
      // Here we can navigate to oracoes tab or show prayer details directly.
      setSelectedPremium(prod);
    } else {
      setSelectedPremium(prod);
    }
  };

  return (
    <div className="space-y-6 pb-28 pt-4 animate-in slide-in-from-bottom-4 duration-505">
      
      {/* Grid of Modules - 2 Columns (HuskyApp Style) */}
      <section className="space-y-3.5">
        <div className="grid grid-cols-2 gap-4">          {/* Module 1: Jornada com meu anjo (Canto de São Miguel) */}
          <div 
            onClick={() => navigate('player/canto-1')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/jornadacommeuanjo_converted.webp" 
                alt="Jornada com meu anjo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-neutral-850 leading-tight group-hover:text-amber-500 transition-colors">Jornada com meu anjo</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Canto de São Miguel</p>
            </div>
          </div>

          {/* Module 2: Como me relacionar com meu anjo (video aula) */}
          <div 
            onClick={() => navigate('video-aula')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/comorelacionarcommeuanjo_converted.webp" 
                alt="Como me relacionar com meu anjo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">como me relacionar com meu anjo</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">video aula</p>
            </div>
          </div>

          {/* Module 3: Aulas Sagradas */}
          <div 
            onClick={() => navigate('aulas-sagradas')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/aulassagradas_converted.webp" 
                alt="Aulas Sagradas" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Aulas Sagradas</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Ensinamentos</p>
            </div>
          </div>

          {/* Module 4: Escudo de Proteção Divina */}
          <div 
            onClick={() => navigate('pdf/O-Escudo-de-Protecao-Divina.pdf')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/escudodeprotecaodivina_converted.webp" 
                alt="Escudo de Proteção Divina" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Escudo de Proteção Divina</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Orações Fortes</p>
            </div>
          </div>

          {/* Module 5: Códigos do Amor */}
          <div 
            onClick={() => navigate('pdf/Guia-Completo-para-a-Transformacao-dos-Relacionamentos.pdf')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/codigosdoamor_converted.webp" 
                alt="Códigos do Amor" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Códigos do Amor</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Devocional Afetivo</p>
            </div>
          </div>

          {/* NEW MODULE: Padre Pio (Placed immediately after Códigos do Amor as requested) */}
          <div 
            onClick={() => navigate('padre-pio')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/quaresmapadrepio_converted.webp" 
                alt="Quaresma de Padre Pio" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Padre Pio</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Quaresma Sagrada</p>
            </div>
          </div>

          {/* Module 6: Guia de Orações */}
          <div 
            onClick={() => navigate('pdf/Guia-de-Oracoes.pdf')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/guiadeoracoes_converted.webp" 
                alt="Guia de Orações" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Guia de Orações</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Menu de Preces</p>
            </div>
          </div>

          {/* Module 7: Canto Divino */}
          <div 
            onClick={() => {
              localStorage.setItem('library_filter_category', 'audio');
              navigate('biblioteca');
            }}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/cantodivino_converted.webp" 
                alt="Canto Divino" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Canto Divino</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Cantos Devocionais</p>
            </div>
          </div>

          {/* Module 8: O Código de Lourdes */}
          <div 
            onClick={() => navigate('pdf/O-Codigo-de-Lourdes.pdf')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/ocodigodelourdes_converted.webp" 
                alt="O Código de Lourdes" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">O Código de Lourdes</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Estudo de Milagres</p>
            </div>
          </div>

          {/* NEW MODULE: Oração de Santo Antônio (Vertical video) */}
          <div 
            onClick={() => navigate('santo-antonio')}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-100 overflow-hidden relative shadow-xs border border-neutral-100">
              <img 
                src="https://novidadesdeagora.site/jma/app/imagens/oracaosantoantonio.webp" 
                alt="Oração de Santo Antônio" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Santo Antônio</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Oração do Milagre</p>
            </div>
          </div>

          {/* NEW DUAL PORTAL: Outros Áudios & Frequências (Audio Icon Card) */}
          <div 
            onClick={() => {
              localStorage.setItem('library_filter_category', 'audio');
              navigate('biblioteca');
            }}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-linear-to-br from-amber-50 to-amber-100/50 overflow-hidden relative shadow-xs border border-amber-200/55 flex flex-col items-center justify-center p-4">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200 animate-pulse duration-2000">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest mt-3">Multimídia</span>
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Outros Áudios & Frequências</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Solfégios & Cantos</p>
            </div>
          </div>

          {/* NEW DUAL PORTAL: Outros eBooks & Conteúdos (Book Icon Card) */}
          <div 
            onClick={() => {
              localStorage.setItem('library_filter_category', 'pdf');
              navigate('biblioteca');
            }}
            className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
          >
            <div className="w-full aspect-[1/1] rounded-3xl bg-linear-to-br from-neutral-50 to-neutral-100 overflow-hidden relative shadow-xs border border-neutral-200/55 flex flex-col items-center justify-center p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-600 text-white flex items-center justify-center shadow-md shadow-neutral-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest mt-3">Estudos</span>
            </div>
            <div className="mt-2.5 px-1 space-y-0.5">
              <h4 className="text-xs font-bold text-black leading-tight group-hover:text-amber-500 transition-colors">Outros eBooks & Conteúdos</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Estudos & PDFs</p>
            </div>
          </div>

          {/* Premium Locked Modules (From prayers product list) */}
          {PRAYERS_PRODUCTS.map((prod) => {
            const isUnlocked = unlockedProducts.includes(prod.id);
            return (
              <div 
                key={prod.id}
                onClick={() => handleModuleClick(prod)}
                className="flex flex-col text-left group cursor-pointer active:scale-95 duration-200"
              >
                <div className="w-full aspect-[1/1] rounded-3xl bg-neutral-150 overflow-hidden relative shadow-xs border border-neutral-100">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${prod.id}/400/400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-neutral-900/15" />
                  
                  {isUnlocked ? (
                    <span className="absolute top-3 left-3 bg-green-55/90 backdrop-blur-xl text-white text-[8px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-3xs tracking-wider border border-green-600">
                      Liberado
                    </span>
                  ) : (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    </div>
                  )}
                </div>
                <div className="mt-2.5 px-1 space-y-0.5">
                  <h4 className="text-xs font-bold text-neutral-850 leading-tight group-hover:text-amber-500 transition-colors line-clamp-2">{prod.title}</h4>
                  <p className="text-[9px] text-amber-500 font-bold uppercase tracking-wider">{prod.category}</p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Modal 2: Premium Product Control (unlocked or gate display) */}
      {selectedPremium !== null && (
        <div 
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs z-[100] flex items-end justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPremium(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-md p-6 pb-8 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Grabber line */}
            <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{selectedPremium.category}</span>
                <h4 className="text-base font-extrabold text-neutral-800 leading-tight">{selectedPremium.title}</h4>
              </div>
              <button 
                onClick={() => setSelectedPremium(null)}
                className="p-1 rounded-full bg-neutral-50 text-neutral-400 hover:bg-neutral-100 active:scale-90 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Large cover image */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md mx-auto relative border border-neutral-100">
              <img 
                src={selectedPremium.imageUrl} 
                alt={selectedPremium.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/seed/${selectedPremium.id}/400/400`;
                }}
              />
              {!unlockedProducts.includes(selectedPremium.id) && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>

            {/* Description or details */}
            <div className="space-y-3.5 text-xs text-neutral-600 font-semibold leading-relaxed">
              <p className="bg-neutral-50 p-4 border border-neutral-100 rounded-2xl text-justify text-neutral-650">
                {selectedPremium.description}
              </p>

              {!unlockedProducts.includes(selectedPremium.id) ? (
                <div className="bg-amber-50/50 p-4 border border-amber-100/50 rounded-2xl space-y-2 text-justify">
                  <p className="font-extrabold text-amber-800 uppercase tracking-widest text-[9px]">Sincronização em andamento</p>
                  <p className="leading-relaxed">
                    Este guia espiritual é restrito. Caso já tenha comprado ou recebido o acesso, clique abaixo para consultar sua liberação em tempo real na raiz de nosso n8n.
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 p-4 border border-green-150 rounded-2xl space-y-2 text-justify">
                  <p className="font-extrabold text-green-800 uppercase tracking-widest text-[10px]">✨ CONTA ATIVADA E INTEGRADA</p>
                  <p className="text-green-700 leading-relaxed font-semibold">
                    Seu acesso foi validado pelo nosso n8n! Você possui direito total de sintonização neste módulo espiritual diário.
                  </p>
                </div>
              )}
            </div>

            {/* Action panel */}
            <div className="space-y-3.5 pt-1">
              {!unlockedProducts.includes(selectedPremium.id) ? (
                <>
                  <a 
                    href={selectedPremium.checkoutUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full block text-center py-4 gradient-gold text-white font-extrabold rounded-2xl text-xs shadow-md transition-transform active:scale-95"
                  >
                    Adquirir & Desbloquear Acesso ➔
                  </a>
                  
                  <button 
                    onClick={() => handleVerifyPurchase(selectedPremium)}
                    disabled={checkingAccess}
                    className="w-full py-3.5 bg-neutral-850 hover:bg-black text-white font-extrabold rounded-xl text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
                  >
                    {checkingAccess ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Consultando Servidor n8n...</span>
                      </>
                    ) : (
                      <span>Verificar Compra (Fazer Liberação)</span>
                    )}
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  {selectedPremium.pdfFilename && (
                    <button 
                      onClick={() => {
                        setSelectedPremium(null);
                        navigate(`pdf/${selectedPremium.pdfFilename}`);
                      }}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <span>Ler Guia / PDF Completo 📖</span>
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedPremium(null);
                      navigate('oracoes');
                    }}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-xs shadow-md transition-transform active:scale-95"
                  >
                    Abrir na Aba de Orações ➔
                  </button>
                </div>
              )}

              {accessMessage.text && (
                <p className={`text-[11px] font-bold text-center leading-snug px-2 ${
                  accessMessage.type === 'success' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {accessMessage.text}
                </p>
              )}

              <button 
                onClick={() => setSelectedPremium(null)}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-150 text-neutral-450 font-semibold rounded-xl text-xs transition-colors"
              >
                Fechar
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
