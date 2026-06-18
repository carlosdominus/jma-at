
import React from 'react';

interface SupportProps {
  navigate: (path: string) => void;
}

const Support: React.FC<SupportProps> = ({ navigate }) => {
  return (
    <div className="space-y-6 pb-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800">Suporte</h2>
        <p className="text-sm text-neutral-400 font-medium">Estamos aqui para te ajudar na sua jornada</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-neutral-100 flex flex-col items-center text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.32 0-4.591.398-6.758 1.171-.326.117-.539.428-.539.776v9.397c0 .456.403.811.851.731a25.269 25.269 0 0113.315 0c.448.08.851-.275.851-.731V8.119c0-.348-.213-.659-.539-.776a20.135 20.135 0 00-6.758-1.171z" /><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.438 5.168L2.05 22l4.897-1.288A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.963 7.963 0 01-4.14-1.157l-.297-.175-3.078.81.824-3.001-.191-.305A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" clipRule="evenodd" /></svg>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-neutral-800">Falar no WhatsApp</h3>
          <p className="text-neutral-500 leading-relaxed">Resposta rápida em até 5 minutos. Clique no botão abaixo para abrir o chat.</p>
        </div>

        <button 
          onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
          className="w-full py-5 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg shadow-green-100 active:scale-95 transition-transform"
        >
          Abrir WhatsApp
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-neutral-100 space-y-4 shadow-sm">
        <h3 className="font-bold text-neutral-800">Perguntas Frequentes</h3>
        <div className="divide-y divide-neutral-50">
          <button className="w-full py-4 flex justify-between items-center text-left text-sm text-neutral-600 font-medium">
            <span>Como resetar meu progresso?</span>
            <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <button className="w-full py-4 flex justify-between items-center text-left text-sm text-neutral-600 font-medium">
            <span>Problemas com pagamento</span>
            <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
