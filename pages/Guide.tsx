
import React, { useState } from 'react';
import { UserProgress } from '../types';
import { TOTAL_DAYS } from '../constants.tsx';

interface GuideProps {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  navigate: (path: string) => void;
}

const Guide: React.FC<GuideProps> = ({ progress, setProgress, navigate }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleSetCurrentDay = (day: number) => {
    setProgress(prev => {
      // If setting to a day, reset currentDay to it
      return {
        ...prev,
        currentDay: day
      };
    });
    setSelectedDay(null);
  };

  const handleToggleCompleted = (day: number) => {
    setProgress(prev => {
      const isCompleted = prev.completedDays.includes(day);
      let newCompleted = [...prev.completedDays];
      if (isCompleted) {
        newCompleted = newCompleted.filter(d => d !== day);
      } else {
        newCompleted.push(day);
      }
      return {
        ...prev,
        completedDays: newCompleted
      };
    });
  };

  const handleGoToPlayer = () => {
    setSelectedDay(null);
    navigate('player/canto-1');
  };

  return (
    <div className="space-y-6 pb-20 pt-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800">Guia de 19 Dias</h2>
        <p className="text-sm text-neutral-400 font-medium tracking-tight">Um passo de cada vez em direção à abundância</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200 z-0"></div>

        <div className="space-y-6 relative z-10">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => {
            const isCompleted = progress.completedDays.includes(day);
            const isCurrent = progress.currentDay === day;
            const isLocked = day > progress.currentDay;

            return (
              <div key={day} className={`flex items-start space-x-6 transition-all duration-300 ${isLocked ? 'opacity-50 hover:opacity-80' : 'opacity-100'}`}>
                {/* Status Indicator */}
                <button 
                  onClick={() => setSelectedDay(day)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-neutral-50 shadow-sm transition-transform active:scale-90 ${
                    isCompleted ? 'bg-amber-500 text-white' : 
                    isCurrent ? 'bg-amber-100 text-amber-500 border-amber-300 animate-pulse' : 
                    'bg-white text-neutral-300 border-neutral-200'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ) : (
                    <span className="font-bold text-sm">{day}</span>
                  )}
                </button>

                {/* Content Card */}
                <div 
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 p-5 rounded-3xl border transition-all cursor-pointer ${
                    isCurrent ? 'bg-white border-amber-200 shadow-xl shadow-amber-50 ring-2 ring-amber-100' : 
                    isCompleted ? 'bg-white border-neutral-100 shadow-sm' : 
                    'bg-neutral-50/50 border-neutral-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold ${isCurrent ? 'text-neutral-800' : 'text-neutral-600'}`}>Dia {day}</h3>
                    {isCompleted && <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Concluído</span>}
                    {isLocked && (
                      <svg className="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    )}
                  </div>
                  
                  {isCurrent && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></div>
                        <span>Canto do Dia (Obrigatório)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                        <span>Oração da Prosperidade</span>
                      </div>
                      <button className="w-full mt-2 py-2.5 gradient-gold text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-transform">Continuar Jornada</button>
                    </div>
                  )}
                  
                  {!isCurrent && !isLocked && (
                    <p className="text-xs text-neutral-400 font-medium">Você completou e ouviu as tarefas deste dia. Clique para opções.</p>
                  )}

                  {isLocked && (
                    <p className="text-xs text-neutral-450 font-medium text-neutral-400">Bloqueado. Toque para gerenciar ou definir como dia atual.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern bottom sheet options modal */}
      {selectedDay !== null && (() => {
        const isCompleted = progress.completedDays.includes(selectedDay);
        const isCurrent = progress.currentDay === selectedDay;
        
        return (
          <div 
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs z-[100] flex items-end justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedDay(null)}
          >
            <div 
              className="bg-white rounded-3xl w-full max-w-md p-6 pb-8 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300"
              onClick={e => e.stopPropagation()}
            >
              {/* Sheet Handle Indicator */}
              <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto mb-2" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest leading-none">Opções Rápidas</span>
                  <h4 className="text-xl font-bold text-neutral-850 mt-1">Dia {selectedDay} da Jornada</h4>
                </div>
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="p-1.5 rounded-full bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-3">
                {/* Play Audio Button */}
                <button 
                  onClick={handleGoToPlayer}
                  className="w-full p-4 flex items-center space-x-4 bg-amber-50 hover:bg-amber-100 rounded-2xl text-left border border-amber-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-amber-900">Ouvir Canto de São Miguel</p>
                    <p className="text-xs text-amber-700">Ouvir e meditar a canção espiritual de 1 min.</p>
                  </div>
                </button>

                {/* Set as Active Day Button */}
                {!isCurrent && (
                  <button 
                    onClick={() => handleSetCurrentDay(selectedDay)}
                    className="w-full p-4 flex items-center space-x-4 bg-white hover:bg-neutral-50 rounded-2xl text-left border border-neutral-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-neutral-800 font-bold">Definir como Dia Atual</p>
                      <p className="text-xs text-neutral-400">Ir para este dia na tela inicial e continuar a partir daqui.</p>
                    </div>
                  </button>
                )}

                {/* Toggle Completion Status Button */}
                <button 
                  onClick={() => {
                    handleToggleCompleted(selectedDay);
                    setSelectedDay(null);
                  }}
                  className="w-full p-4 flex items-center space-x-4 bg-white hover:bg-neutral-50 rounded-2xl text-left border border-neutral-100 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isCompleted ? 'text-red-700' : 'text-green-700'}`}>
                      {isCompleted ? 'Não Concluído (Desmarcar)' : 'Marcar como Concluído'}
                    </p>
                    <p className="text-xs text-neutral-450">
                      {isCompleted ? 'Desmarcar conclusão e desbloquear este dia novamente.' : 'Marcar como concluído sem ter que rodar o áudio.'}
                    </p>
                  </div>
                </button>
              </div>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="text-xs font-bold text-neutral-400 uppercase tracking-widest hover:text-neutral-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Guide;
