import React, { useEffect, useState } from 'react';

interface PadrePioProps {
  navigate: (path: string) => void;
}

const PadrePio: React.FC<PadrePioProps> = ({ navigate }) => {
  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem('completed_padre_pio') === 'true';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleComplete = () => {
    const isDone = !completed;
    setCompleted(isDone);
    localStorage.setItem('completed_padre_pio', String(isDone));
  };

  return (
    <div className="space-y-6 pb-28 pt-2 animate-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Back button and Header */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('inicio')}
          className="p-2 rounded-full bg-white border border-neutral-150 text-neutral-600 hover:bg-neutral-50 active:scale-90 transition-transform"
          id="back-btn-padre-pio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest pl-0.5">Módulo Sagrado</span>
          <h2 className="text-xl font-bold text-neutral-800 leading-tight">Padre Pio - Quaresma Sagrada</h2>
        </div>
      </div>

      {/* Hero Banner with clean spacing */}
      <div className="w-full aspect-[4/3] xs:aspect-video rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-150 shadow-md relative">
        <img 
          src="https://novidadesdeagora.site/jma/app/imagens/quaresmapadrepio_converted.webp" 
          alt="Padre Pio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/10" />
        <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
          <p className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">Estudo Devocional</p>
          <h3 className="text-sm font-bold leading-snug">Quaresma de São Miguel por Padre Pio</h3>
        </div>
      </div>

      {/* Devotion Content */}
      <section className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-xs space-y-5">
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 space-y-1.5 text-justify">
          <h3 className="font-bold text-amber-800 text-sm">O Poder da Quaresma de São Miguel</h3>
          <p className="text-neutral-650 text-xs font-semibold leading-relaxed">
            Padre Pio de Pietrelcina tinha um relacionamento místico íntimo com São Miguel Arcanjo. Ele costumava enviar peregrinos ao Monte Gargano para render graças ao Arcanjo e repetia incansavelmente: <strong>"Vá saudar São Miguel, faça a quaresma com fé e perseverança"</strong>. 
          </p>
        </div>

        <div className="space-y-4 text-justify text-xs leading-relaxed text-neutral-650 font-medium">
          <h4 className="font-extrabold text-neutral-800 uppercase tracking-widest text-[10px] pl-1">Como Praticar a Quaresma no Aplicativo:</h4>
          
          <div className="grid grid-cols-1 gap-3.5">
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-bold text-neutral-800 text-xs">Preparação Diária</p>
                <p className="text-[11px] text-neutral-500 mt-1">Reserve 15 minutos em silêncio absoluto. Se possível, faça a oração em frente à uma imagem ou ícone de São Miguel e acenda uma vela benta.</p>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-bold text-neutral-800 text-xs">A Sintonização Cósmica</p>
                <p className="text-[11px] text-neutral-500 mt-1">Recite o Canto Sagrado de São Miguel de 963 Hz (disponível em sua Biblioteca) para acalmar a mente e purificar a aura de todas as resistências financeiras e de saúde.</p>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-bold text-neutral-800 text-xs">Consagração Fiel</p>
                <p className="text-[11px] text-neutral-500 mt-1">Repita o ato de humildade ensinado por Padre Pio: entregue todas as suas ansiedades nas mãos de Deus e peça perdão total pelas dores e pecados.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/25 p-5 rounded-3xl border border-amber-100/40 text-center space-y-2 mt-4">
            <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest block">Oração do Padre Pio a São Miguel</span>
            <p className="italic text-neutral-800 text-xs font-bold leading-relaxed whitespace-pre-line px-1">
              "Glorioso São Miguel Arcanjo, príncipe das milícias celestes, defendei-me contra as ciladas do inimigo invisível. Com vossa espada de luz purificai meu lar, as minhas finanças, a minha saúde e a minha família de qualquer impureza. Amparai-me com vossa couraça protetora por amor a Jesus Cristo e à Virgem Santíssima. Amém."
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col space-y-3 pt-4">
          <button 
            onClick={handleComplete}
            className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              completed 
                ? 'bg-green-50 border border-green-200 text-green-600' 
                : 'gradient-gold text-white shadow-md active:scale-98'
            }`}
          >
            {completed ? '✓ Quaresma Praticada Hoje' : 'Marcar Quaresma Praticada'}
          </button>
          
          <button 
            onClick={() => navigate('inicio')}
            className="w-full py-3 bg-neutral-100 hover:bg-neutral-150 text-neutral-600 font-bold rounded-xl text-xs transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </section>
    </div>
  );
};

export default PadrePio;
