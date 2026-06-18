
import React, { useState } from 'react';
import { Manifestation } from '../types';

interface JournalProps {
  manifestations: Manifestation[];
  onAdd: (m: Manifestation) => void;
  navigate: (path: string) => void;
}

const Journal: React.FC<JournalProps> = ({ manifestations, onAdd, navigate }) => {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Dinheiro');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAdd({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description,
      category,
      value: value ? parseFloat(value) : undefined
    });

    setDescription('');
    setValue('');
    setShowForm(false);
  };

  const totalValue = manifestations.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="space-y-6 pb-8 pt-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Minhas Bênçãos</h2>
          <p className="text-sm text-neutral-400 font-medium tracking-tight">Registre cada milagre da sua jornada</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-12 h-12 gradient-gold text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
      </div>

      {/* Stats Dashboard */}
      <section className="bg-white p-6 rounded-3xl border border-neutral-100 grid grid-cols-2 gap-4">
        <div className="text-center space-y-1">
          <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest text-[10px]">Total</p>
          <p className="text-2xl font-bold text-neutral-800">{manifestations.length}</p>
        </div>
        <div className="text-center space-y-1 border-l border-neutral-50">
          <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest text-[10px]">Recebido</p>
          <p className="text-2xl font-bold text-amber-500">R$ {totalValue.toLocaleString('pt-BR')}</p>
        </div>
      </section>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xl shadow-amber-50 space-y-4 animate-in zoom-in-95 duration-200">
          <h3 className="font-bold text-neutral-800">Nova Manifestação</h3>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase">O que aconteceu?</label>
            <textarea 
              autoFocus
              className="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Ex: Recebi um bônus inesperado no trabalho..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase">Categoria</label>
              <select 
                className="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Dinheiro</option>
                <option>Saúde</option>
                <option>Amor</option>
                <option>Trabalho</option>
                <option>Família</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase">Valor (Opcional)</label>
              <input 
                type="number"
                className="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none"
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button 
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 py-4 text-neutral-400 font-bold"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 gradient-gold text-white rounded-2xl font-bold shadow-lg"
            >
              Salvar Bênção
            </button>
          </div>
        </form>
      )}

      {/* Manifestations List */}
      <div className="space-y-4">
        {manifestations.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <p className="text-neutral-400 font-medium">Sua primeira manifestação está próxima.<br/>Confie no plano divino.</p>
          </div>
        ) : (
          manifestations.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-3xl border border-neutral-100 flex space-x-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L9.03 9.069a2.003 2.003 0 001.94 0L17.834 4.9a1 1 0 00-1.001-1.733L10 7.234 3.167 3.167a1 1 0 00-1.001 1.733zM18 8V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8l7.03 4.261a4.002 4.002 0 003.94 0L18 8z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{m.category}</span>
                  <span className="text-xs text-neutral-300 font-medium">{new Date(m.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed">{m.description}</p>
                {m.value && (
                  <p className="text-sm font-bold text-amber-500">+ R$ {m.value.toLocaleString('pt-BR')}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
