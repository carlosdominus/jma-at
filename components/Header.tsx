
import React from 'react';

interface HeaderProps {
  navigate: (path: string) => void;
  currentRoute: string;
  onOpenSidebar: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ navigate, currentRoute, onOpenSidebar, userName = 'Usuário' }) => {
  const isHome = currentRoute === 'inicio' || currentRoute === '';

  const getInitials = (name: string) => {
    if (!name || !name.trim()) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-effect z-40 flex items-center px-4 border-b border-neutral-100 shadow-sm">
      <div className="max-w-lg mx-auto w-full flex items-center justify-between">
        {isHome ? (
          <button onClick={onOpenSidebar} className="p-2 text-neutral-600 active:scale-95 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        ) : (
          <button onClick={() => navigate('inicio')} className="p-2 text-neutral-600 active:scale-95 transition-transform flex items-center space-x-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span className="text-xs font-bold hidden sm:inline">Voltar</span>
          </button>
        )}
        
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('inicio')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cross"><path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"/></svg>
          <h1 className="text-lg font-bold text-neutral-800 tracking-tight">Jornada com Meu Anjo</h1>
        </div>
        
        <button onClick={() => navigate('perfil')} className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center active:scale-95 transition-transform">
          <span className="text-xs font-bold text-amber-700">{getInitials(userName)}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;