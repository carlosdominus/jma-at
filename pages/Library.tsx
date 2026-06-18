
import React, { useState } from 'react';
import { LIBRARY_ITEMS, CATEGORIES } from '../constants.tsx';
import { ContentType } from '../types';

interface LibraryProps {
  navigate: (path: string) => void;
}

const Library: React.FC<LibraryProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState(() => {
    const stored = localStorage.getItem('library_filter_category');
    if (stored) {
      localStorage.removeItem('library_filter_category'); // clean so refresh is fresh
      if (stored.toLowerCase() === 'chant' || stored.toLowerCase() === 'audio') {
        return 'audio';
      }
      if (stored.toLowerCase() === 'prayer' || stored.toLowerCase() === 'pdf') {
        return 'pdf';
      }
      return stored;
    }
    return 'all';
  });
  const [search, setSearch] = useState('');

  const filteredItems = LIBRARY_ITEMS.filter(item => {
    let matchesCategory = false;
    if (activeCategory === 'all') {
      matchesCategory = true;
    } else if (activeCategory === 'audio') {
      matchesCategory = item.type === ContentType.CHANT || item.type === ContentType.AUDIO;
    } else if (activeCategory === 'pdf') {
      matchesCategory = item.type === ContentType.PRAYER || item.type === ContentType.MANUSCRIPT || item.type === ContentType.RITUAL || item.type === ContentType.PDF;
    } else if (activeCategory === 'video') {
      matchesCategory = item.type === ContentType.VIDEO;
    }
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: ContentType) => {
    switch (type) {
      case ContentType.CHANT:
      case ContentType.AUDIO:
        return (
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case ContentType.PRAYER:
      case ContentType.MANUSCRIPT:
      case ContentType.RITUAL:
      case ContentType.PDF:
        return (
          <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case ContentType.VIDEO:
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-8 pt-4 animate-in slide-in-from-bottom-4 duration-505">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-800">Biblioteca Sagrada</h2>
        
        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar conteúdo..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-shadow bg-white text-base font-semibold shadow-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-4 top-4.5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'gradient-gold text-white shadow-lg shadow-amber-100' 
                  : 'bg-white text-neutral-400 border border-neutral-100 hover:bg-neutral-51'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map(item => (
          <button 
            key={item.id}
            onClick={() => {
              if (item.type === ContentType.PDF) {
                navigate(`pdf/${item.embedUrl || item.id}`);
              } else if (item.type === ContentType.VIDEO) {
                if (item.id === 'video-santo-antonio') {
                  navigate('santo-antonio');
                } else if (item.id.startsWith('aula-')) {
                  navigate('aulas-sagradas');
                } else {
                  navigate('video-aula');
                }
              } else {
                navigate(`player/${item.id}`);
              }
            }}
            className="w-full bg-white p-4 rounded-3xl border border-neutral-100 flex items-center justify-between text-left active:scale-[0.99] transition-all shadow-xs hover:border-neutral-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                item.type === ContentType.CHANT || item.type === ContentType.AUDIO 
                  ? 'bg-amber-50' 
                  : item.type === ContentType.VIDEO 
                    ? 'bg-red-50' 
                    : 'bg-neutral-50'
              }`}>
                {getIcon(item.type)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-neutral-850 text-xs leading-snug truncate pr-2">{item.title}</h4>
                <p className="text-[10px] text-neutral-450 font-semibold line-clamp-1 mt-0.5">{item.subtitle}</p>
                <div className="flex items-center space-x-2.5 mt-1.5">
                  <span className="text-[8.5px] bg-neutral-100 px-2 py-0.5 rounded-md text-neutral-550 font-extrabold uppercase tracking-wide">
                    {item.type === ContentType.CHANT || item.type === ContentType.AUDIO ? 'Áudio' : item.type === ContentType.VIDEO ? 'Vídeo' : 'E-Book / PDF'}
                  </span>
                  {item.duration && <span className="text-[9px] text-neutral-400 font-bold tracking-tight">⏱ {item.duration}</span>}
                </div>
              </div>
            </div>
            <div className="text-neutral-300 shrink-0 pr-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-neutral-100 rounded-3xl">
            <p className="text-neutral-400 text-xs font-bold">Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
