import React, { useEffect, useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  duration: string;
  description: string;
  gradient: string;
}

interface SacredLessonsProps {
  navigate: (path: string) => void;
}

const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Aula 1: Introdução à Conexão Divina",
    subtitle: "Sintonizando com os Anjos",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula1.mp4",
    duration: "12:15",
    description: "Início da sua sintonização com os ensinamentos divinos ancestrais e o despertar do seu canal de luz espiritual.",
    gradient: "from-amber-550 to-orange-600 bg-linear-to-br"
  },
  {
    id: 2,
    title: "Aula 2: Harmonia e Purificação Espiritual",
    subtitle: "Limpando Bloqueios Invisíveis",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula2.mp4",
    duration: "14:40",
    description: "Como purificar os canais energéticos e limpar bloqueios materiais, financeiros e mentais que atrasam sua vida.",
    gradient: "from-amber-600 to-amber-800 bg-linear-to-br"
  },
  {
    id: 3,
    title: "Aula 3: Despertar do Anjo da Guarda",
    subtitle: "Conversando com seu Protetor",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula3.mp4",
    duration: "16:20",
    description: "Aprenda métodos diários seguros para saudar seu Anjo da Guarda, pedir conselhos e obter direcionamento concreto.",
    gradient: "from-amber-500 to-amber-700 bg-linear-to-br"
  },
  {
    id: 4,
    title: "Aula 4: Selo e Proteção Divina",
    subtitle: "Criação do Escudo Espiritual",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula4.mp4",
    duration: "18:05",
    description: "A sintonização e repetição milagrosa da oração mais forte de blindagem contra as tentações e perigos terrenos.",
    gradient: "from-yellow-600 to-amber-700 bg-linear-to-br"
  },
  {
    id: 5,
    title: "Aula 5: Atração de Prosperidade Absoluta",
    subtitle: "Alinhando a Fartura Material",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula5.mp4",
    duration: "20:12",
    description: "Instruções profundas sobre sintonia de graça e dinheiro para destravar conquistas abundantes no dia a dia.",
    gradient: "from-golden to-amber-900 bg-linear-to-br"
  },
  {
    id: 6,
    title: "Aula 6: Finalização e Gratidão Elevada",
    subtitle: "Consagração de Ciclo de Milagres",
    videoUrl: "https://novidadesdeagora.site/jma/app/video/aulassagradas/aula6.mp4",
    duration: "15:30",
    description: "Fechamento do estudo de aulas sagradas, agradecimento a Deus e Padre Pio, e as chaves espirituais do amanhã.",
    gradient: "from-orange-550 to-amber-900 bg-linear-to-br"
  }
];

const SacredLessons: React.FC<SacredLessonsProps> = ({ navigate }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS[0]);
  const [videoSrc, setVideoSrc] = useState(LESSONS[0].videoUrl);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  const [completedList, setCompletedList] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setVideoSrc(selectedLesson.videoUrl);
    setFallbackAttempt(0);
  }, [selectedLesson]);

  const handleVideoError = () => {
    if (fallbackAttempt === 0) {
      const altUrl = `https://novidadesdeagora.site/jma/app/video/aulassagradas/Aula%20${selectedLesson.id}.mp4`;
      setFallbackAttempt(1);
      setVideoSrc(altUrl);
    } else if (fallbackAttempt === 1) {
      const altUrl = `https://novidadesdeagora.site/jma/app/video/aulassagradas/aula%20${selectedLesson.id}.mp4`;
      setFallbackAttempt(2);
      setVideoSrc(altUrl);
    } else if (fallbackAttempt === 2) {
      const altUrl = `https://novidadesdeagora.site/jma/app/video/aulassagradas/Aula${selectedLesson.id}.mp4`;
      setFallbackAttempt(3);
      setVideoSrc(altUrl);
    } else if (fallbackAttempt === 3) {
      const altUrl = `https://novidadesdeagora.site/jma/app/video/aulassagradas/aula-${selectedLesson.id}.mp4`;
      setFallbackAttempt(4);
      setVideoSrc(altUrl);
    } else if (fallbackAttempt === 4) {
      const altUrl = `https://novidadesdeagora.site/jma/app/video/aulassagradas/Aula-${selectedLesson.id}.mp4`;
      setFallbackAttempt(5);
      setVideoSrc(altUrl);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    localStorage.setItem('completed_lessons', JSON.stringify(completedList));
  }, [completedList]);

  const toggleLessonComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedList(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-28 pt-2 animate-in slide-in-from-bottom-4 duration-500 font-sans">
      
      {/* Header section */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('inicio')}
          className="p-2 rounded-full bg-white border border-neutral-150 text-neutral-600 hover:bg-neutral-555 hover:text-white active:scale-90 transition-all font-bold"
          id="lessons-back-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest pl-0.5">Estudos e Teologia</span>
          <h2 className="text-xl font-black text-neutral-850 tracking-tight leading-tight">Aulas Sagradas</h2>
        </div>
      </div>

      {/* Video player view */}
      <section className="space-y-3.5">
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-neutral-150 shadow-md relative group">
          <video 
            key={videoSrc}
            src={videoSrc}
            controls
            preload="metadata"
            className="w-full h-full object-contain"
            playsInline
            autoPlay={false}
            onError={handleVideoError}
          />
          {/* Subtle logo/branding float on active view */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-extrabold uppercase text-white tracking-widest border border-white/10 pointer-events-none">
            Vídeo Aula Exclusiva
          </div>
        </div>
        
        {/* Active lesson content specs */}
        <div className="bg-white rounded-3xl border border-neutral-100 p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-wider">{selectedLesson.subtitle}</span>
              <h3 className="text-sm font-black text-neutral-850 leading-tight">{selectedLesson.title}</h3>
            </div>
            <button 
              onClick={(e) => toggleLessonComplete(selectedLesson.id, e)}
              className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border transition-all ${
                completedList.includes(selectedLesson.id) 
                  ? 'bg-green-50 border-green-200 text-green-600' 
                  : 'bg-neutral-50/50 border-neutral-200 text-neutral-450 hover:bg-neutral-100'
              }`}
            >
              {completedList.includes(selectedLesson.id) ? '✓ Conclída' : 'Marcar Concluída'}
            </button>
          </div>
          <p className="text-neutral-500 text-xs font-semibold leading-relaxed text-justify">
            {selectedLesson.description}
          </p>
        </div>
      </section>

      {/* Modern programmatic course modular playlist cards (Requested: 6 modules programmatically instead of image) */}
      <section className="space-y-3">
        <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest pl-1">Grade Curricular ({LESSONS.length} Módulos)</h3>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {LESSONS.map((lesson) => {
            const isSelected = selectedLesson.id === lesson.id;
            const isCompleted = completedList.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className={`flex flex-col rounded-3xl border text-left p-4 cursor-pointer relative overflow-hidden transition-all duration-350 active:scale-97 ${
                  isSelected 
                    ? 'bg-white border-amber-300 ring-4 ring-amber-50 shadow-xl' 
                    : 'bg-white border-neutral-100 hover:border-neutral-200 hover:shadow-xs'
                }`}
              >
                {/* Programmatic Gradient Thumbnail Header (Capa Genérica Programada) */}
                <div className={`w-full h-24 rounded-2xl ${lesson.gradient} relative overflow-hidden shrink-0 flex flex-col justify-between p-3 shadow-inner`}>
                  {/* Glassmorphic Play head */}
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 self-end">
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Info Row overlay */}
                  <div className="flex justify-between items-end w-full">
                    <span className="text-[10px] uppercase font-black text-amber-100/90 tracking-widest bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded-md leading-none">
                      Módulo {lesson.id}
                    </span>
                    <span className="text-[9px] font-extrabold text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {lesson.duration}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Title lines */}
                <div className="mt-3 space-y-1 select-none flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className={`text-xs font-black leading-tight line-clamp-2 ${
                      isSelected ? 'text-amber-500' : 'text-neutral-850'
                    }`}>
                      {lesson.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-extrabold uppercase mt-0.5 tracking-wide leading-none">
                      {lesson.subtitle}
                    </p>
                  </div>

                  {/* Completion badge bottom */}
                  <div className="pt-3 flex justify-between items-center mt-auto border-t border-dashed border-neutral-50">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Livre</span>
                    {isCompleted && (
                      <span className="flex items-center space-x-0.5 text-green-500 text-[9px] font-extrabold uppercase">
                        <span>✓</span>
                        <span>Pronto</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Back button full size */}
      <button 
        onClick={() => navigate('inicio')}
        className="w-full py-4 bg-neutral-850 hover:bg-neutral-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 active:scale-98 shadow-sm"
      >
        Voltar à Área Principal
      </button>

    </div>
  );
};

export default SacredLessons;
