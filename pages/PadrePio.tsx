import React, { useEffect, useState, useRef } from 'react';

interface PadrePioProps {
  navigate: (path: string) => void;
}

const PadrePio: React.FC<PadrePioProps> = ({ navigate }) => {
  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem('completed_padre_pio') === 'true';
  });

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('4:52');
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const cur = audio.currentTime;
      const dur = audio.duration || 292; // 4:52 = 292 seconds
      setProgressPercentage((cur / dur) * 100);

      const curM = Math.floor(cur / 60);
      const curS = String(Math.floor(cur % 60)).padStart(2, '0');
      setCurrentTime(`${curM}:${curS}`);
    };

    const handleLoadedMetadata = () => {
      setAudioLoaded(true);
      const dur = audio.duration;
      if (dur) {
        const durM = Math.floor(dur / 60);
        const durS = String(Math.floor(dur % 60)).padStart(2, '0');
        setTotalDuration(`${durM}:${durS}`);
      }
    };

    const handleEnded = () => {
      setAudioPlaying(false);
      setProgressPercentage(100);
    };

    const handleError = () => {
      setAudioError("Erro ao carregar o áudio. Toque para tentar novamente.");
      setAudioPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleAudioPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(null);

    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      audio.play()
        .then(() => setAudioPlaying(true))
        .catch(err => {
          console.error("Audio play failed:", err);
          setAudioPlaying(false);
          setAudioError("Navegador bloqueou reprodução automática. Toque no play.");
        });
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const dur = audio.duration || 292;
    audio.currentTime = percentage * dur;
    setProgressPercentage(percentage * 100);
  };

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

      {/* NEW: Interactive Audio Player for 'Canto do Padre Pio.mp3' */}
      <section className="bg-neutral-900 text-white rounded-3xl border border-neutral-800 p-5 shadow-lg relative overflow-hidden">
        {/* Glow halo behind playhead */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex items-center space-x-4">
          {/* Mini Album art */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 overflow-hidden shrink-0 border border-white/10 relative">
            <img 
              src="https://novidadesdeagora.site/jma/app/imagens/quaresmapadrepio_converted.webp" 
              alt="Canto Padre Pio" 
              className="w-full h-full object-cover scale-110"
            />
            {audioPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex space-x-1 items-end h-5">
                  <div className="w-1 bg-amber-400 h-3/4 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 bg-amber-400 h-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 bg-amber-400 h-1/2 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[8px] font-extrabold text-amber-400 uppercase tracking-widest block leading-3">Áudio Sagrado Conectado</span>
            <h3 className="text-sm font-bold leading-tight text-white truncate">Cântico Sagrado do Padre Pio</h3>
            <p className="text-[10px] text-neutral-400 font-semibold line-clamp-1 mt-0.5">Sintonização de Cura e Bênçãos de São Miguel</p>
          </div>

          {/* Circular Play Button */}
          <button 
            onClick={toggleAudioPlay}
            className="w-11 h-11 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-neutral-100 active:scale-95 duration-150 shrink-0 shadow-md"
            title="Tocar Áudio"
          >
            {audioPlaying ? (
              <svg className="w-4.5 h-4.5 text-neutral-950" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            ) : (
              <svg className="w-4.5 h-4.5 ml-0.5 text-neutral-950" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
            )}
          </button>
        </div>

        {/* Dynamic progress block */}
        <div className="mt-4 space-y-1 relative z-10">
          <div 
            onClick={handleProgressBarClick}
            className="h-1.5 w-full bg-neutral-800 rounded-full relative cursor-pointer group"
          >
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-100" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-bold text-neutral-500 uppercase tracking-tight">
            <span>{currentTime}</span>
            <span>{totalDuration}</span>
          </div>
        </div>

        {audioError && (
          <p className="text-[10px] font-bold text-red-400 mt-2 text-center">{audioError}</p>
        )}

        {/* HTML5 Audio Node */}
        <audio 
          ref={audioRef} 
          src="https://novidadesdeagora.site/jma/app/audios/Canto%20do%20Padre%20Pio.mp3" 
          preload="metadata"
        />
      </section>

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
                <p className="text-[11px] text-neutral-500 mt-1">Recite o Canto Sagrado de São Miguel de 963 Hz ou o magnífico <strong>Cântico do Padre Pio</strong> acima para acalmar a mente e purificar a aura de todas as resistências.</p>
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
              "Glorioso São Miguel Arcanjo, príncipe das milícias celestes, defendei-me contra as ciladas do inimigo invisível. Com vossa espada de luz purificai meu lar, as minhas finanças, a minha saúde e a minha família de qualquer impurity. Amparai-me com vossa couraça protetora por amor a Jesus Cristo e à Virgem Santíssima. Amém."
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
