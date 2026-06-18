
import React from 'react';
import { LIBRARY_ITEMS } from '../constants.tsx';

interface ManuscriptViewerProps {
  itemId: string;
  navigate: (path: string) => void;
}

const ManuscriptViewer: React.FC<ManuscriptViewerProps> = ({ itemId, navigate }) => {
  const item = LIBRARY_ITEMS.find(i => i.id === itemId);

  if (!item) {
    return (
      <div className="p-8 text-center">
        <p>Conteúdo não encontrado.</p>
        <button onClick={() => navigate('biblioteca')} className="text-amber-500 font-bold mt-4">Voltar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] animate-in fade-in duration-500">
      <header className="h-16 flex items-center px-4 border-b border-[#EBE3D5] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => navigate('biblioteca')} className="p-2 text-neutral-600 active:scale-95 transition-transform flex items-center space-x-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span className="text-xs font-bold">Voltar</span>
        </button>
        <div className="flex-1 text-center pr-10">
          <h2 className="text-sm font-bold text-neutral-800 line-clamp-1">{item.title}</h2>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-8 space-y-8">
        <div className="bg-white p-8 md:p-12 rounded shadow-sm border border-[#EBE3D5] relative overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-2 border border-amber-100/50 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <span className="text-amber-500 text-3xl">⚜️</span>
            </div>
            
            <h1 className="text-3xl font-serif text-center text-neutral-800 leading-tight">
              {item.title}
            </h1>
            
            <div className="h-px w-24 bg-amber-200 mx-auto" />
            
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-amber-500 font-serif">
                {item.content}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pb-20">
          <button 
            onClick={() => navigate('biblioteca')}
            className="px-8 py-3 bg-neutral-800 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            Concluir Leitura
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptViewer;