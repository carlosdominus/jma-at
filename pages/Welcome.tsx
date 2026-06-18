import React, { useState } from 'react';

interface WelcomeProps {
  onStart: () => void;
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ 
  onStart, 
  userName, 
  setUserName, 
  userEmail, 
  setUserEmail,
  userPhone,
  setUserPhone
}) => {
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      title: "✨ Bem-vindo à Jornada Divina",
      description: "Você foi escolhido para restaurar sua conexão com o divino e manifestar a prosperidade em sua vida.",
      image: "https://picsum.photos/seed/angel/600/600"
    },
    {
      title: "🙏 Simplicidade e Fé",
      description: "Apenas alguns minutos por dia. Ouça o Canto Sagrado, faça sua oração e veja os milagres acontecerem.",
      image: "https://picsum.photos/seed/faith/600/600"
    },
    {
      title: "💰 Prosperidade Real",
      description: "Ao longo de 19 dias, limparemos bloqueios financeiros e espirituais sob a proteção de São Miguel Arcanjo.",
      image: "https://picsum.photos/seed/gold/600/600"
    },
    {
      title: "👼 Inicie Sua Conexão",
      description: "Por favor, informe seus dados para que possamos iniciar sua jornada personalizada de forma única.",
      image: "https://picsum.photos/seed/heaven/600/600"
    }
  ];

  const triggerOnboardingWebhook = async (name: string, email: string, phone: string) => {
    const webhookUrl = 'https://nen.auto-jornada.space/webhook/dados-iniciais-jma';
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: "onboarding",
          nome_completo: name,
          email: email,
          whatsapp: phone,
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) {
      console.error('Falha ao chamar n8n webhook:', e);
    }
  };

  const next = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      if (!userName.trim()) {
        setErrorMsg('Por favor, informe seu Nome Completo.');
        return;
      }
      if (!userPhone.trim() || userPhone.trim().length < 8) {
        setErrorMsg('Por favor, informe um WhatsApp/Celular válido.');
        return;
      }
      if (!userEmail.trim() || !userEmail.includes('@')) {
        setErrorMsg('Por favor, informe um e-mail válido.');
        return;
      }
      
      setErrorMsg('');
      setIsLoading(true);
      
      // Post to n8n webhook
      await triggerOnboardingWebhook(userName, userEmail, userPhone);
      
      setIsLoading(false);
      onStart();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col p-8 animate-in fade-in duration-700 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto w-full">
        {step === 3 ? (
          <div className="w-full space-y-4 pt-1 animate-in fade-in duration-500">
            <h2 className="text-xl font-extrabold text-neutral-800 text-center leading-snug">👼 Preencha seus Dados</h2>
            <p className="text-xs text-neutral-450 font-bold uppercase tracking-wider text-center">Para personalizar sua experiência diária</p>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest pl-1">Nome Completo</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (e.target.value.trim()) setErrorMsg('');
                }}
                placeholder="Ex Carlos Mendes Silva"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-base font-bold focus:outline-none focus:border-amber-400 focus:bg-white shadow-xs transition-all text-neutral-800"
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest pl-1 font-mono">WhatsApp / Celular</label>
              <input 
                type="tel" 
                value={userPhone}
                onChange={(e) => {
                  setUserPhone(e.target.value);
                  if (e.target.value.trim()) setErrorMsg('');
                }}
                placeholder="Ex (11) 99999-9999"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-base font-bold focus:outline-none focus:border-amber-400 focus:bg-white shadow-xs transition-all text-neutral-800"
                required
              />
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest pl-1">E-mail</label>
              <input 
                type="email" 
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  if (e.target.value.trim().includes('@')) setErrorMsg('');
                }}
                placeholder="Ex seu-email@exemplo.com"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-base font-bold focus:outline-none focus:border-amber-400 focus:bg-white shadow-xs transition-all text-neutral-800"
                required
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-bold text-red-500 text-center animate-shake leading-snug">{errorMsg}</p>
            )}
          </div>
        ) : (
          <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl rotate-3 shrink-0">
            <img src={steps[step].image} alt="Step" className="w-full h-full object-cover" />
          </div>
        )}
        
        {step < 3 && (
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight leading-snug">{steps[step].title}</h1>
            <p className="text-neutral-500 leading-relaxed text-sm font-semibold">{steps[step].description}</p>
          </div>
        )}
      </div>

      <div className="pb-4 pt-4 space-y-5 max-w-sm mx-auto w-full">
        <div className="flex justify-center space-x-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-amber-500' : 'w-2 bg-neutral-200'}`} />
          ))}
        </div>
        
        <button 
          onClick={next}
          disabled={isLoading}
          className="w-full py-4.5 rounded-2xl gradient-gold text-white font-bold text-base shadow-lg shadow-amber-200 active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>{step === steps.length - 1 ? 'Começar Minha Jornada ➔' : 'Continuar'}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Welcome;
