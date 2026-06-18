import React, { useState } from 'react';
import { UserSettings, UserProgress, Manifestation } from '../types';

interface ProfileProps {
  settings: UserSettings;
  setSettings: (s: UserSettings) => void;
  navigate: (path: string) => void;
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  manifestations: Manifestation[];
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  settings, 
  setSettings, 
  navigate, 
  progress, 
  setProgress, 
  manifestations,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userPhone,
  setUserPhone
}) => {
  const journeyPercentage = Math.round((progress.completedDays.length / 19) * 100);
  const streak = progress.completedDays.length > 0 ? progress.completedDays.length : 0;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempEmail, setTempEmail] = useState(userEmail);
  const [tempPhone, setTempPhone] = useState(userPhone);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getInitials = (name: string) => {
    if (!name || !name.trim()) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(tempName.trim());
    setUserEmail(tempEmail.trim());
    setUserPhone(tempPhone.trim());
    setIsEditingProfile(false);
  };



  const handleResetProgress = () => {
    setProgress({
      currentDay: 1,
      completedDays: [],
      completedTasks: []
    });
    setShowResetConfirm(false);
  };

  const handleSetCurrentDay = (day: number) => {
    setProgress(prev => ({
      ...prev,
      currentDay: day
    }));
  };

  const toggleDayCompletion = (day: number) => {
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

  return (
    <div className="space-y-6 pb-20 pt-4 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Header Block */}
      <section className="bg-white p-6 rounded-3xl border border-neutral-100 flex flex-col items-center text-center space-y-4 shadow-xs">
        {!isEditingProfile ? (
          <>
            <div className="relative">
              <div className="w-20 h-20 rounded-full gradient-gold p-[3px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-amber-500 font-extrabold text-2xl shadow-inner">
                  {getInitials(userName || "U")}
                </div>
              </div>
              <button 
                onClick={() => {
                  setTempName(userName);
                  setTempEmail(userEmail);
                  setTempPhone(userPhone);
                  setIsEditingProfile(true);
                }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-neutral-850 text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                title="Editar Informações"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-neutral-850">{userName || "Usuário sem nome"}</h2>
              <p className="text-xs text-neutral-450 font-semibold">{userEmail || "Sem @email"}</p>
              {userPhone && (
                <p className="inline-block px-3 py-1 bg-neutral-50 text-neutral-500 text-[10px] rounded-full font-bold">
                  {userPhone}
                </p>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveProfile} className="w-full space-y-4 text-left">
            <h4 className="font-extrabold text-neutral-800 text-sm border-b border-neutral-100 pb-2">Editar Dados</h4>
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest block mb-1 pl-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={e => setTempName(e.target.value)}
                  className="w-full px-4 py-3 text-base font-bold rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-amber-400 focus:bg-white text-neutral-800 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest block mb-1 pl-1">WhatsApp / Celular</label>
                <input 
                  type="tel" 
                  value={tempPhone} 
                  onChange={e => setTempPhone(e.target.value)}
                  className="w-full px-4 py-3 text-base font-bold rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-amber-400 focus:bg-white text-neutral-800 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest block mb-1 pl-1">E-mail</label>
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={e => setTempEmail(e.target.value)}
                  className="w-full px-4 py-3 text-base font-bold rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-amber-400 focus:bg-white text-neutral-800 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 py-3 text-center text-xs font-bold text-neutral-450 border border-neutral-200 rounded-xl"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 gradient-gold text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        <div className="flex space-x-6 pt-4 border-t border-neutral-50 w-full justify-center">
          <div className="text-center">
            <p className="text-base font-extrabold text-neutral-805">{manifestations.length}</p>
            <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Bênçãos</p>
          </div>
          <div className="text-center">
            <p className="text-base font-extrabold text-neutral-805">{streak}</p>
            <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Sequência</p>
          </div>
          <div className="text-center">
            <p className="text-base font-extrabold text-neutral-805">{journeyPercentage}%</p>
            <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Progresso</p>
          </div>
        </div>
      </section>



      {/* Progress & Journey Controls Area */}
      <section className="bg-white p-6 rounded-3xl border border-neutral-100 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 001.036 1.75l6 3.464a2 2 0 002-.002l6-3.464A2 2 0 0019 11.268V4a1 1 0 10-2 0v7.268L11 14.73l-6-3.463V4z" /></svg>
          <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest leading-none">Minha Jornada Espiritual</h3>
        </div>
        
        <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
          Ajuste as configurações ou marque manualmente os dias conforme você completa sua conexão diária.
        </p>

        {/* Current Active Day Selector */}
        <div className="space-y-2 pt-2 border-t border-neutral-50">
          <label className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">Selecionar Dia Ativo</label>
          <div className="flex items-center space-x-3">
            <select 
              value={progress.currentDay}
              onChange={e => handleSetCurrentDay(parseInt(e.target.value))}
              className="flex-1 px-4 py-3.5 text-xs font-bold text-neutral-700 bg-neutral-55 border border-neutral-150 rounded-2xl focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 19 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>Dia {day} da Jornada</option>
              ))}
            </select>
          </div>
        </div>

        {/* Manual Grid Toggle Completes */}
        <div className="space-y-2 pt-4 border-t border-neutral-50">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Marcar/Desmarcar Concluídos</label>
            <span className="text-[10px] font-bold text-amber-500">{progress.completedDays.length} de 19 concluídos</span>
          </div>
          
          <div className="grid grid-cols-5 gap-2 pt-1">
            {Array.from({ length: 19 }, (_, i) => i + 1).map(day => {
              const isCompleted = progress.completedDays.includes(day);
              const isCurrent = progress.currentDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDayCompletion(day)}
                  className={`py-2 px-1 text-center font-bold text-xs rounded-xl border transition-all active:scale-90 ${
                    isCompleted 
                      ? 'bg-amber-500 border-amber-650 text-white shadow-xs' 
                      : isCurrent 
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white border-neutral-150 text-neutral-400 hover:bg-neutral-55'
                  }`}
                  title={isCompleted ? `Dia ${day} concluído. Clique para desmarcar.` : `Dia ${day} em aberto. Clique para concluir.`}
                >
                  D{day}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support and FAQ Access Card */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-4">Ajuda & Configurações</h3>
        <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden divide-y divide-neutral-50 shadow-3xs">
          <button 
            onClick={() => navigate('tutorial')}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <span className="font-extrabold text-neutral-700 text-xs">Tutorial Completo do App</span>
            <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <button 
            onClick={() => navigate('suporte')}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <span className="font-extrabold text-neutral-700 text-xs">Falar de Graça com Suporte</span>
            <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Danger Zone: Reset Button */}
      <section className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex flex-col items-center space-y-3 shadow-3xs">
        <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider">Zona de Reinicialização</h4>
        {!showResetConfirm ? (
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-4 bg-white hover:bg-red-50 text-red-500 font-bold border border-red-205 rounded-2xl text-xs transition-transform active:scale-95"
          >
            Zerar Todo o Meu Progresso
          </button>
        ) : (
          <div className="w-full space-y-3">
            <p className="text-xs text-red-700 text-center font-bold">Isto apagará toda a sua sequência de dias. Tem certeza absoluta?</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-white text-neutral-600 text-xs font-bold rounded-xl border border-neutral-200"
              >
                Voltar atrás
              </button>
              <button 
                onClick={handleResetProgress}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Sim, Recomeçar do Dia 1
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="text-center pb-8">
        <p className="text-[9px] text-neutral-300 font-bold uppercase tracking-[4px]">Versão 1.2.0 • Conexão Automatizada</p>
      </div>
    </div>
  );
};

export default Profile;
