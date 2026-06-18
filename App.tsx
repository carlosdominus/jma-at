
import React, { useState, useEffect, useCallback } from 'react';
import Welcome from './pages/Welcome.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Library from './pages/Library.tsx';
import Journal from './pages/Journal.tsx';
import Player from './pages/Player.tsx';
import ManuscriptViewer from './pages/ManuscriptViewer.tsx';
import Profile from './pages/Profile.tsx';
import Tutorial from './pages/Tutorial.tsx';
import Support from './pages/Support.tsx';
import ComingSoon from './pages/ComingSoon.tsx';
import Prayers from './pages/Prayers.tsx';
import VideoLesson from './pages/VideoLesson.tsx';
import PdfViewer from './pages/PdfViewer.tsx';
import SacredLessons from './pages/SacredLessons.tsx';
import PadrePio from './pages/PadrePio.tsx';
import VideoSantoAntonio from './pages/VideoSantoAntonio.tsx';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import { UserProgress, Manifestation, UserSettings, ContentType } from './types.ts';
import { LIBRARY_ITEMS } from './constants.tsx';
import { Home, Shield, BookOpen, BookMarked, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [route, setRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const onboarded = localStorage.getItem('onboarded') === 'true';
    const userNameSaved = localStorage.getItem('user_name');
    const cleanUserName = (userNameSaved === 'Juliana') ? '' : (userNameSaved || '');
    return hash || (onboarded && cleanUserName ? 'inicio' : 'bem-vindo');
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('user_progress');
    return saved ? JSON.parse(saved) : { currentDay: 1, completedDays: [], completedTasks: [] };
  });

  const [manifestations, setManifestations] = useState<Manifestation[]>(() => {
    const saved = localStorage.getItem('manifestations');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    theme: 'light',
    audioQuality: 'high'
  });

  const [userName, setUserName] = useState<string>(() => {
    const saved = localStorage.getItem('user_name');
    if (saved === 'Juliana' || !saved) {
      return '';
    }
    return saved;
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    const saved = localStorage.getItem('user_email');
    if (saved === 'juliana@jornada.com' || !saved) {
      return '';
    }
    return saved;
  });

  const [userPhone, setUserPhone] = useState<string>(() => {
    return localStorage.getItem('user_phone') || '';
  });

  useEffect(() => {
    localStorage.setItem('user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('user_email', userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem('user_phone', userPhone);
  }, [userPhone]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('user_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('manifestations', JSON.stringify(manifestations));
  }, [manifestations]);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    setRoute(path);
  }, []);

  const markDayComplete = (day: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: prev.completedDays.includes(day) ? prev.completedDays : [...prev.completedDays, day],
      currentDay: day === prev.currentDay ? Math.min(day + 1, 19) : prev.currentDay
    }));
  };

  const addManifestation = (m: Manifestation) => {
    setManifestations(prev => [m, ...prev]);
  };

  const renderPage = () => {
    const [path, id] = route.split('/');
    
    switch (path) {
      case 'bem-vindo':
        return (
          <Welcome 
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPhone={userPhone}
            setUserPhone={setUserPhone}
            onStart={() => {
              localStorage.setItem('onboarded', 'true');
              navigate('inicio');
            }} 
          />
        );
      case 'inicio':
        return <Dashboard progress={progress} manifestations={manifestations} navigate={navigate} />;
      case 'biblioteca':
        return <Library navigate={navigate} />;
      case 'oracoes':
        return <Prayers navigate={navigate} />;
      case 'manifestacoes':
        return <Journal manifestations={manifestations} onAdd={addManifestation} navigate={navigate} />;
      case 'perfil':
        return (
          <Profile 
            settings={settings} 
            setSettings={setSettings} 
            navigate={navigate} 
            progress={progress} 
            setProgress={setProgress} 
            manifestations={manifestations}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPhone={userPhone}
            setUserPhone={setUserPhone}
          />
        );
      case 'tutorial':
        return <Tutorial navigate={navigate} />;
      case 'suporte':
        return <Support navigate={navigate} />;
      case 'em-breve':
        return <ComingSoon navigate={navigate} />;
      case 'video-aula':
        return <VideoLesson navigate={navigate} />;
      case 'aulas-sagradas':
        return <SacredLessons navigate={navigate} />;
      case 'padre-pio':
        return <PadrePio navigate={navigate} />;
      case 'santo-antonio':
        return <VideoSantoAntonio navigate={navigate} />;
      case 'pdf':
        const pdfPath = route.substring(route.indexOf('/') + 1);
        return <PdfViewer pdfUrl={pdfPath} navigate={navigate} />;
      case 'player':
        const item = LIBRARY_ITEMS.find(i => i.id === id);
        if (item && (item.type === ContentType.MANUSCRIPT || item.type === ContentType.RITUAL)) {
          return <ManuscriptViewer itemId={id} navigate={navigate} />;
        }
        return <Player itemId={id} onComplete={() => markDayComplete(progress.currentDay)} progress={progress} setProgress={setProgress} navigate={navigate} />;
      default:
        return <Dashboard progress={progress} manifestations={manifestations} navigate={navigate} />;
    }
  };

  const isFullScreenPage = route === 'bem-vindo' || route.startsWith('player/') || route.startsWith('pdf/');
  const showHeader = !isFullScreenPage;

  return (
    <div className="min-h-screen bg-neutral-50 pb-32 md:pb-0">
      {showHeader && (
        <Header 
          navigate={navigate} 
          currentRoute={route} 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          userName={userName}
        />
      )}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        navigate={navigate} 
        currentDay={progress.currentDay} 
        userName={userName}
        userEmail={userEmail}
      />

      <main className={`${showHeader ? 'pt-16 max-w-lg mx-auto px-4 pb-12' : ''}`}>
        {renderPage()}
      </main>
      
      {showHeader && (
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-neutral-100 shadow-[0_12px_45px_rgba(0,0,0,0.1)] rounded-2xl flex py-2.5 px-3 md:hidden z-50 animate-in slide-in-from-bottom duration-700">
          <div className="flex-1 flex justify-between items-center space-x-2">
            {[
              { id: 'inicio', label: 'Início', icon: Home },
              { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen },
              { id: 'oracoes', label: 'Orações', icon: BookMarked }
            ].map(item => {
              const IconComponent = item.icon;
              const isActive = route === item.id || (route === '' && item.id === 'inicio');
              return (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.id)} 
                  className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'text-amber-500 bg-amber-50/80 font-extrabold scale-[1.05]' 
                      : 'text-neutral-400 hover:text-amber-500/80 active:scale-95'
                  }`}
                >
                  <IconComponent className="w-7 h-7 shrink-0 transition-transform duration-300" strokeWidth={2.2} />
                  <span className="text-[10px] sm:text-xs mt-1 font-extrabold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
