
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
  currentDay: number;
  userName?: string;
  userEmail?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigate, currentDay, userName = 'Usuário', userEmail = '' }) => {
  if (!isOpen) return null;

  const getInitials = (name: string) => {
    if (!name || !name.trim()) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const menuItems = [
    { 
      id: 'inicio', 
      label: 'Início', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    { 
      id: 'biblioteca', 
      label: 'Biblioteca', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    { 
      id: 'oracoes', 
      label: 'Orações', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.176 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.773-.565-.374-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.52-4.674z" /></svg>
    },
    { 
      id: 'tutorial', 
      label: 'Tutorial', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    { 
      id: 'suporte', 
      label: 'Suporte', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col space-y-8 animate-in slide-in-from-left duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {getInitials(userName)}
          </div>
          <div>
            <h2 className="font-bold text-neutral-800">{userName}</h2>
            <p className="text-xs text-amber-500 font-bold uppercase tracking-tight">Dia {currentDay} de 19</p>
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { navigate(item.id); onClose(); }}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-neutral-50 transition-colors text-left font-bold text-neutral-700"
            >
              <span className="text-amber-500">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="h-px bg-neutral-100" />

        <button onClick={() => { navigate('perfil'); onClose(); }} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-neutral-50 transition-colors text-left font-bold text-neutral-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-sm">Meu Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
