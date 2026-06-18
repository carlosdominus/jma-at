
import React from 'react';
import { FAQS } from '../constants.tsx';

interface TutorialProps {
  navigate: (path: string) => void;
}

const Tutorial: React.FC<TutorialProps> = ({ navigate }) => {
  return (
    <div className="space-y-6 pb-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800">Como Usar o App</h2>
        <p className="text-sm text-neutral-400 font-medium">Aprenda a aproveitar sua jornada ao máximo</p>
      </div>

      {/* Video Placeholder */}
      <section className="bg-neutral-900 aspect-video rounded-3xl overflow-hidden relative shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Vídeo de Boas-Vindas</p>
          <p className="text-neutral-400 text-[10px]">5:30 minutos</p>
        </div>
      </section>

      <div className="space-y-4">
        <h3 className="font-bold text-neutral-800">Guia Rápido</h3>
        <div className="space-y-3">
          {[
            { n: 1, t: "Ouça o Canto Diariamente", d: "Acesse o Canto do Dia e ouça por pelo menos 1 minuto todas as manhãs." },
            { n: 2, t: "Acompanhe seu Progresso", d: "Use o Guia de 19 Dias para marcar suas tarefas e ver sua evolução." },
            { n: 3, t: "Registre suas Manifestações", d: "Sempre que algo bom acontecer, anote no seu diário de bênçãos." }
          ].map(step => (
            <div key={step.n} className="bg-white p-5 rounded-3xl border border-neutral-100 flex space-x-4">
              <div className="w-8 h-8 gradient-gold rounded-full flex items-center justify-center text-white font-bold shrink-0">
                {step.n}
              </div>
              <div>
                <h4 className="font-bold text-neutral-800 text-sm">{step.t}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed mt-1">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-neutral-800">Dúvidas Frequentes</h3>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white rounded-3xl border border-neutral-100 p-5 cursor-pointer">
              <summary className="list-none flex justify-between items-center font-bold text-neutral-700 text-sm">
                {faq.q}
                <svg className="w-4 h-4 text-neutral-300 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="mt-4 text-neutral-500 text-xs leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <button 
        onClick={() => navigate('suporte')}
        className="w-full py-4 text-amber-500 font-bold active:scale-95 transition-transform"
      >
        Ainda precisa de ajuda? Fale conosco
      </button>
    </div>
  );
};

export default Tutorial;
