
import React from 'react';

interface ComingSoonProps {
  navigate: (path: string) => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ navigate }) => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center p-8 space-y-6 animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800 tracking-tight">Recurso em Breve</h2>
        <p className="text-neutral-500 leading-relaxed max-w-xs">Estamos preparando algo especial para você. Volte em alguns dias!</p>
      </div>
      <button 
        onClick={() => navigate('inicio')}
        className="px-8 py-3 gradient-gold text-white rounded-2xl font-bold shadow-lg shadow-amber-100 active:scale-95 transition-transform"
      >
        Voltar para o Início
      </button>
    </div>
  );
};

export default ComingSoon;
