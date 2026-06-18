import React, { useEffect, useState } from 'react';

interface VideoSantoAntonioProps {
  navigate: (path: string) => void;
}

const VideoSantoAntonio: React.FC<VideoSantoAntonioProps> = ({ navigate }) => {
  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem('completed_santo_antonio') === 'true';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleComplete = () => {
    const isDone = !completed;
    setCompleted(isDone);
    localStorage.setItem('completed_santo_antonio', String(isDone));
  };

  return (
    <div className="space-y-6 pb-28 pt-2 animate-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Back button and Header */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('inicio')}
          className="p-2 rounded-full bg-white border border-neutral-150 text-neutral-600 hover:bg-neutral-50 active:scale-90 transition-transform"
          id="back-btn-santo-antonio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest pl-0.5">Módulo Devocional</span>
          <h2 className="text-xl font-bold text-neutral-800 leading-tight">Oração de Santo Antônio</h2>
        </div>
      </div>

      {/* Vertical Video Player Frame (Standard Portrait aspect-[9/16]) */}
      <section className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-xs aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-neutral-200 shadow-xl relative group">
          <video 
            src="https://novidadesdeagora.site/jma/app/video/ora%C3%A7%C3%A3o%20de%20santo%20antonio.mp4"
            controls
            preload="metadata"
            className="w-full h-full object-cover"
            playsInline
          />
          {/* Subtle overlay header */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[8.5px] font-extrabold uppercase text-white tracking-wider border border-white/10">
              Vídeo Vertical
            </span>
            <span className="bg-amber-500 text-white font-extrabold text-[8.5px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Santo Antônio
            </span>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Toque acima para iniciar a oração silenciosa</p>
      </section>

      {/* Premium Content & Prayer Details */}
      <section className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-xs space-y-5">
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 space-y-1.5">
          <h3 className="font-bold text-amber-800 text-sm">Responso de Santo Antônio</h3>
          <p className="text-neutral-650 text-xs font-semibold leading-relaxed text-justify">
            Santo Antônio de Pádua é conhecido universalmente como o santo das causas impossíveis, dos namorados, do reencontro de bens perdidos e das necessidades mais urgentes do lar e da família. Sintonize seu coração nesta poderosa oração audiovisual gravada com exclusividade.
          </p>
        </div>

        <div className="space-y-4 text-justify text-xs leading-relaxed text-neutral-650 font-medium">
          <p className="font-bold text-center text-amber-600 uppercase tracking-widest text-xs pt-1">A Oração do Milagre</p>
          <p className="italic text-center bg-neutral-50 p-5 rounded-2xl border border-neutral-100 font-semibold text-neutral-800">
            "Se milagres desejais,<br/>
            Recorrei a Santo Antônio;<br/>
            Vereis fugir o demônio<br/>
            E as tentações infernais.<br/>
            Recupera-se o perdido,<br/>
            Rompe-se a dura prisão,<br/>
            E no auge do furacão<br/>
            Cede o mar embravecido.<br/>
            Pela sua intercessão,<br/>
            Fugem pestes, erro, morte,<br/>
            O fraco torna-se forte<br/>
            E o enfermo com saúde.<br/>
            Glória ao Pai, ao Filho e ao Espírito Santo.<br/>
            Amém."
          </p>
        </div>

        <div className="flex flex-col space-y-3 pt-2">
          <button 
            onClick={handleComplete}
            className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              completed 
                ? 'bg-green-50 border border-green-200 text-green-600' 
                : 'gradient-gold text-white shadow-md active:scale-98'
            }`}
          >
            {completed ? '✓ Sessão Concluída' : 'Marcar como Conclída & Pronticada'}
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

export default VideoSantoAntonio;
