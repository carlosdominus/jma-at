import React, { useEffect, useState } from 'react';

interface PdfViewerProps {
  pdfUrl: string;
  navigate: (path: string) => void;
}

const PDF_TITLES: { [key: string]: string } = {
  'Guia-Completo-para-a-Transformacao-dos-Relacionamentos.pdf': 'Guia de Transformação dos Relacionamentos',
  'O-Escudo-de-Protecao-Divina.pdf': 'O Escudo de Proteção Divina',
  'O-Codigo-de-Lourdes.pdf': 'O Código de Lourdes',
  'Guia-de-Oracoes.pdf': 'Guia de Orações',
  'cadeadas/O-Poder-da-Cura-Divina-Uma-Jornada-com-Sao-Rafael-Arcanjo.pdf': 'Cura Divina - São Rafael Arcanjo',
  'cadeadas/Santo-Antonio-de-Padua-O-Guia-para-o-Amor-Verdadeiro.pdf': 'Amor Verdadeiro - Santo Antônio',
  'cadeadas/GUIA-FINANCEIRO-BIBLICO.pdf': 'Guia Financeiro Bíblico',
  'cadeadas/caminhos de aceita%C3%A7%C3%A3o, jornada com s%C3%A3o francisco de assis.pdf': 'Jornada com São Francisco de Assis',
  'cadeadas/caminhos de aceitação, jornada com são francisco de assis.pdf': 'Jornada com São Francisco de Assis',
  'cadeadas/O-Poder-da-Reconciliacao.pdf': 'Jornada da Reconciliação',
  'cadeadas/Nossa-Senhora-da-Saude.pdf': 'Nossa Senhora da Saúde e Proteção',
  'cadeadas/Santa-Rita-de-Cassia-Esperanca-nas-Causas-Impossiveis.pdf': 'Santa Rita de Cássia',
  'cadeadas/Santo-Expedito-A-Forca-na-Urgencia.pdf': 'Santo Expedito',
  'cadeadas/Sao-Jorge-O-Poder-da-Fe-e-da-Protecao.pdf': 'São Jorge Guerreiro',
  'cadeadas/O-Caminho-da-Prosperidade-de-Silvio-Santos.pdf': 'O Caminho da Prosperidade',
  'cadeadas/Um-Legado-de-Amor-e-Fe-Protegendo-Nossos-Filhos.pdf': 'Legado de Amor e Fé - Proteção dos Filhos'
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, navigate }) => {
  const [loading, setLoading] = useState(true);
  const title = PDF_TITLES[pdfUrl] || 'Visualizador de PDF';
  const fullUrl = `https://novidadesdeagora.site/jma/app/pdf/${pdfUrl}`;

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pdfUrl]);

  return (
    <div className="fixed inset-0 bg-neutral-900 z-50 flex flex-col h-screen w-screen overflow-hidden animate-in fade-in duration-300">
      {/* Premium Header */}
      <header className="h-16 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('inicio')}
            className="p-2 rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white active:scale-90 transition-all"
            id="pdf-back-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-widest block leading-3">Estudo Exclusivo</span>
            <h2 className="text-sm font-bold text-white leading-tight truncate max-w-[200px] xs:max-w-xs">{title}</h2>
          </div>
        </div>

        {/* Action Button */}
        <a 
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 font-extrabold text-[10px] text-white tracking-tight transition-colors shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <span>Abrir</span>
        </a>
      </header>

      {/* Main Content Pane */}
      <div className="flex-1 bg-neutral-950 relative w-full h-full">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-neutral-400 space-y-3 z-10">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-[11px] font-bold tracking-widest uppercase">Carregando PDF...</p>
          </div>
        )}

        {/* Native PDF integration frame */}
        <iframe 
          src={`https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`} 
          className="w-full h-full border-none bg-neutral-950"
          title={title}
          onLoad={() => setLoading(false)}
        />

        {/* Mobile/Direct Link bottom banner bar in case iframe has rendering issue on some devices */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-[10px] font-extrabold text-white">Prefere ler offline?</h4>
            <p className="text-[9px] text-neutral-400">Você pode baixar e salvar no seu celular.</p>
          </div>
          <a 
            href={fullUrl} 
            download 
            className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-extrabold rounded-xl transition-all"
          >
            Baixar PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
