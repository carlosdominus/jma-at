import React, { useState, useEffect, useRef } from 'react';
import { LIBRARY_ITEMS } from '../constants.tsx';
import { ContentType, UserProgress } from '../types';

interface PlayerProps {
  itemId: string;
  onComplete: () => void;
  navigate: (path: string) => void;
  progress?: UserProgress;
  setProgress?: React.Dispatch<React.SetStateAction<UserProgress>>;
}

const Player: React.FC<PlayerProps> = ({ itemId, onComplete, navigate, progress, setProgress }) => {
  const item = LIBRARY_ITEMS.find(i => i.id === itemId) || LIBRARY_ITEMS[0];
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<'primary' | 'backup'>('primary');
  const [showHelper, setShowHelper] = useState(false);
  const [useEmbedForce, setUseEmbedForce] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Artwork image (use special Jornada Com Meu Anjo image for canto-1, otherwise default)
  const artworkUrl = itemId === 'canto-1' 
    ? "https://novidadesdeagora.site/jma/app/imagens/jornadacommeuanjo_converted.webp"
    : `https://picsum.photos/seed/${item.id}/600/600`;

  // Backup link
  const backupAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const activeAudioUrl = audioSource === 'primary' ? item.audioUrl : backupAudioUrl;

  useEffect(() => {
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioError(null);
  }, [itemId, audioSource]);

  useEffect(() => {
    if (useEmbedForce) return;

    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        const duration = audioRef.current.duration || 1273; // ~21 min fallback or standard duration for progress calculations
        const current = audioRef.current.currentTime || 0;
        const p = (current / duration) * 100;
        setAudioProgress(p);
        if (p >= 100 || audioRef.current.ended) {
          setIsPlaying(false);
          setAudioProgress(100);
          clearInterval(interval);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, useEmbedForce]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setAudioError(null);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Playback error:", err);
          setIsPlaying(false);
          setAudioError("Seu navegador bloqueou o áudio automático. Toque no play novamente.");
        });
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
    setTimeout(() => {
      navigate('inicio');
    }, 2200);
  };

  const handleOpenDirect = () => {
    window.open(activeAudioUrl, '_blank');
  };

  const toggleDayComplete = (dayNum: number) => {
    if (setProgress) {
      setProgress(prev => {
        const isCompleted = prev.completedDays.includes(dayNum);
        let newCompleted = [...prev.completedDays];
        if (isCompleted) {
          newCompleted = newCompleted.filter(d => d !== dayNum);
        } else {
          newCompleted.push(dayNum);
        }
        return {
          ...prev,
          completedDays: newCompleted
        };
      });
    }
  };

  const lines = item.content?.split('\n') || [];
  const activeLineIndex = Math.floor((audioProgress / 100) * lines.length);

  return (
    <div className="fixed inset-0 bg-neutral-950 text-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden font-sans">
      
      {/* Header (Spotify Style) */}
      <header className="h-16 flex items-center justify-between px-5 shrink-0 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
        <button 
          onClick={() => navigate('inicio')} 
          className="p-2 -ml-2 rounded-full text-neutral-450 hover:bg-neutral-900 active:scale-95 transition-all text-neutral-400 hover:text-white flex items-center space-x-1"
          id="player-back-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-[11px] font-extrabold uppercase tracking-wider">Início</span>
        </button>
        
        <div className="text-center flex-1 max-w-[60%]">
          <p className="text-[8px] font-extrabold text-amber-500 uppercase tracking-widest leading-none">REPRODUTOR CELESTE</p>
          <p className="text-xs font-bold text-neutral-200 truncate mt-1">{item.title}</p>
        </div>

        <button 
          onClick={() => setShowHelper(!showHelper)}
          className="p-2 -mr-2 text-neutral-400 hover:text-amber-400 transition-colors"
          title="Ajuda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {/* Main Music Control & Information viewport */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scrollbar-thin scrollbar-track-neutral-950 scrollbar-thumb-neutral-800 pb-28">
        
        {/* Glow halo & Album Artwork */}
        <div className="relative flex justify-center py-2">
          {/* Blurred Glow Backdrop */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-48 h-48 mx-auto bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className={`relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 border border-white/15 hover:border-white/25 active:scale-98 ${isPlaying ? 'scale-105 ring-4 ring-amber-500/20' : 'scale-100'}`}>
            <img 
              src={artworkUrl} 
              alt="Artwork da Jornada" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Track Title Panel */}
        <div className="text-center space-y-1.5 max-w-sm mx-auto">
          <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">{item.title}</h2>
          <p className="text-[11px] font-bold text-amber-500 tracking-widest uppercase">{item.subtitle}</p>
          {audioSource === 'backup' && (
            <span className="inline-block px-2 py-0.5 bg-amber-500/15 text-[8px] font-extrabold text-amber-400 rounded-full tracking-wider uppercase border border-amber-500/10">Servidor Espelho</span>
          )}
        </div>

        {/* Error Warning Card if playback halts */}
        {audioError && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-500/10 border border-red-550 border-red-500/20 text-left space-y-2 animate-in fade-in duration-300">
            <p className="text-[11px] text-red-400 font-bold leading-relaxed">{audioError}</p>
            <button 
              onClick={handleOpenDirect}
              className="px-3.5 py-1.5 bg-red-500 hover:bg-red-650 text-[10px] font-extrabold text-white rounded-xl shadow-xs"
            >
              Abrir Link Direto de Áudio
            </button>
          </div>
        )}

        {/* Optional embed alternative */}
        {useEmbedForce && item.embedUrl ? (
          <div className="max-w-md mx-auto bg-neutral-900 rounded-2xl p-2 border border-white/5 shadow-inner text-center">
            <span className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest">Player Externo do Google</span>
            <iframe 
              src={item.embedUrl}
              width="100%" 
              height="80" 
              style={{ border: 'none' }}
              allowFullScreen
              className="block rounded-lg mt-1.5"
            />
          </div>
        ) : null}

        {/* Synchronized Prayer Text Panel */}
        {item.type === ContentType.PRAYER && (
          <div className="max-w-md mx-auto space-y-2 bg-neutral-900/40 p-5 rounded-2xl border border-white/5">
            <p className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest text-center">Acompanhe a Oração</p>
            <div className="space-y-3 text-center">
              {lines.map((line, i) => (
                <p 
                  key={i} 
                  className={`text-sm transition-all duration-500 leading-relaxed ${i === activeLineIndex ? 'text-amber-400 font-bold scale-102' : 'text-neutral-500 font-medium'}`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* MEDITATION INSTRUCTION PANEL (Requested) */}
        <div className="max-w-md mx-auto rounded-3xl bg-neutral-900/65 border border-white/5 p-5 space-y-3.5 shadow-sm">
          <div className="flex items-center space-x-2.5 text-amber-400">
            <span className="text-lg">🧘‍♀️</span>
            <h3 className="text-xs font-bold uppercase tracking-wider">Manual de Meditação Diária</h3>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-300 font-medium text-justify">
            Encontre um espaço calmo e silencioso. Sente-se de forma confortável, com as costas eretas e apoie suas mãos sobre os joelhos. Clique no play, feche os olhos e respire profundamente, esvaziando a sua mente de tensões cotidianas.
          </p>
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] leading-relaxed text-neutral-300 font-semibold italic text-justify">
            "Sinta a presença gloriosa do seu Santo Anjo da Guarda radiando luz azul e dourada ao seu redor, purificando seus caminhos financeiros e abrindo novas pontes de fartura celestial. Faça esse ritual diariamente de forma focada."
          </div>
        </div>

        {/* 19-DAY INTERACTIVE CALENDAR CHECKLIST (Requested) */}
        <div className="max-w-md mx-auto rounded-3xl bg-neutral-900/65 border border-white/5 p-5 space-y-4">
          <div className="flex flex-col text-left space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-amber-400">
                <span className="text-lg">📅</span>
                <h3 className="text-xs font-bold uppercase tracking-wider">Calendário da Jornada</h3>
              </div>
              {progress && (
                <span className="text-[10px] font-extrabold text-neutral-400 uppercase">
                  {progress.completedDays.length}/19 DIAS
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-400 font-medium leading-none">
              Toque no círculo do dia para registrar ou alternar sua audição/conclusão.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2.5 pt-1">
            {Array.from({ length: 19 }, (_, i) => i + 1).map(dayNum => {
              const isDone = progress?.completedDays.includes(dayNum);
              const isActive = progress?.currentDay === dayNum;

              return (
                <button
                  key={dayNum}
                  onClick={() => toggleDayComplete(dayNum)}
                  className={`aspect-square rounded-full flex flex-col items-center justify-center relative transition-all duration-300 active:scale-90 border font-bold text-xs ${
                    isDone 
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-500/10' 
                      : isActive
                        ? 'bg-neutral-800 border-amber-400 text-amber-400 animate-pulse ring-2 ring-amber-500/10'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <span className="leading-tight">{dayNum}</span>
                  {isDone && (
                    <span className="text-[7px] font-extrabold absolute bottom-1 uppercase scale-90 text-amber-100">✔</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Troubleshooter collapsable drawer */}
        {showHelper && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-neutral-900 border border-white/5 text-xs text-neutral-400 space-y-4 animate-in fade-in duration-200">
            <h4 className="font-extrabold uppercase tracking-widest text-[9px] text-amber-500">Manual de Emergência Geral</h4>
            <p className="leading-relaxed font-medium">
              Seu dispositivo impede reproduções espontâneas em conexões móveis, ou o canal web padrão está congestionado. Escolha um dos canais diretos abaixo.
            </p>
            <div className="space-y-2 pt-1">
              <button 
                onClick={handleOpenDirect}
                className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-extrabold rounded-xl border border-amber-500/15 transition-all text-[11px]"
              >
                Canal de Mídia Direto Nativo ↗
              </button>
              <button 
                onClick={() => setAudioSource(prev => prev === 'primary' ? 'backup' : 'primary')}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-extrabold rounded-xl transition-all text-[11px]"
              >
                {audioSource === 'primary' ? 'Alternar para Servidor Espelho (Rápido)' : 'Ir para Servidor Original'}
              </button>
              <button 
                onClick={() => setUseEmbedForce(!useEmbedForce)}
                className="w-full py-2.5 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 font-semibold rounded-xl transition-all text-[11px]"
              >
                {useEmbedForce ? 'Voltar para player Spotify' : 'Acionar Iframe Incorporado'}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Spotify Premium controls footer bottom docking bar */}
      <div className="absolute bottom-0 inset-x-0 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-900 px-5 py-4 pb-6 shrink-0 z-30">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Progress Slider track */}
          {!useEmbedForce && (
            <div className="space-y-1">
              <div 
                className="h-1 w-full bg-neutral-850 rounded-full relative cursor-pointer group"
                onClick={(e) => {
                  if (audioRef.current && audioRef.current.duration) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    audioRef.current.currentTime = percent * audioRef.current.duration;
                    setAudioProgress(percent * 100);
                  }
                }}
              >
                <div 
                  className="h-full bg-amber-500 group-hover:bg-amber-400 transition-all rounded-full relative" 
                  style={{ width: `${audioProgress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 scale-90 transition-all shadow-md" />
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                <span>{audioRef.current ? `${Math.floor(audioRef.current.currentTime / 60)}:${String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0')}` : '0:00'}</span>
                <span>{item.duration || '21:13'}</span>
              </div>
            </div>
          )}

          {/* Controls button center line */}
          <div className="flex items-center justify-between">
            
            {/* Quick manual audio helper */}
            <button 
              onClick={() => setShowHelper(!showHelper)}
              className={`p-2.5 text-neutral-500 hover:text-white transition-colors ${showHelper ? 'text-amber-500' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
            </button>

            {/* Core Playbacks */}
            <div className="flex items-center space-x-6">
              {/* Skip backward button */}
              <button 
                onClick={() => { if(audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); }}
                className="p-1 px-2 text-neutral-450 hover:text-white transition-colors"
                title="Voltar 10s"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" /></svg>
              </button>

              {/* Main Circular Gold Playhead (Spotify Style) */}
              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 duration-100"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 text-neutral-950" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5 text-neutral-950" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                )}
              </button>

              {/* Skip forward button */}
              <button 
                onClick={() => { if(audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration || 1273, audioRef.current.currentTime + 10); }}
                className="p-1 px-2 text-neutral-450 hover:text-white transition-colors"
                title="Avançar 10s"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" /></svg>
              </button>
            </div>

            {/* Checkmark mark as complete */}
            <button 
              onClick={handleComplete}
              disabled={isCompleted}
              className={`p-2.5 text-neutral-500 rounded-full transition-colors ${isCompleted ? 'text-green-500' : 'hover:text-white hover:bg-neutral-900'}`}
              title="Marcar como Concluído"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>

          </div>

          {/* Big action bar */}
          <button 
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider transition-all duration-200 shadow-md ${isCompleted ? 'bg-green-500 text-white shadow-green-950/20' : 'bg-amber-500 hover:bg-gold-600 text-neutral-950 font-extrabold shadow-amber-500/10 active:scale-98'}`}
          >
            {isCompleted ? '✔ Canto Concluído e Gravado!' : 'Salvar e Concluir Hoje'}
          </button>

        </div>
      </div>

      {/* HTML5 Player hidden frame tag */}
      {!useEmbedForce && (
        <audio 
          ref={audioRef} 
          src={activeAudioUrl} 
          preload="metadata"
          onEnded={() => { setIsPlaying(false); setAudioProgress(100); }} 
          onError={(e) => {
            console.error("Audio failed:", e);
            setAudioError("Servidor principal bloqueado pelo navegador. Por favor clique no botão de interrogação acima para usar o Servidor Espelho.");
          }}
        />
      )}

      {/* Full layout completed confirmation overlay */}
      {isCompleted && (
        <div className="absolute inset-0 bg-neutral-950/98 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 text-center space-y-5 animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-amber-500/15 text-amber-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-amber-500/10 text-2xl border border-amber-500/25">
            ✔
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Canto Registrado!</h2>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-xs font-medium">A energia de abundância e proteção envolve sua jornada divina financeira.</p>
        </div>
      )}

    </div>
  );
};

export default Player;
