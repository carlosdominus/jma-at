import { ContentType, LibraryItem } from './types';

export const TOTAL_DAYS = 19;

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'audio', label: 'Áudios' },
  { id: 'pdf', label: 'Orações & PDFs' },
  { id: 'video', label: 'Vídeos' }
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'canto-1',
    title: 'Canto de São Miguel',
    subtitle: 'Jornada com Meu Anjo',
    type: ContentType.CHANT,
    duration: '21:13',
    plays: 2840,
    audioUrl: 'https://novidadesdeagora.site/jma/app/audios/canticos%C3%A3omiguel.mp3',
    embedUrl: 'https://novidadesdeagora.site/jma/app/audios/canticos%C3%A3omiguel.mp3'
  },
  {
    id: 'canto-divino',
    title: 'Canto Divino - 963 Hz',
    subtitle: 'Frequência dos Anjos e Vibração Divina',
    type: ContentType.AUDIO,
    duration: '12:04',
    plays: 1420,
    audioUrl: 'http://novidadesdeagora.site/jma/app/audios/Canto--Sagrado---963%20Hz.mp3',
    embedUrl: 'http://novidadesdeagora.site/jma/app/audios/Canto--Sagrado---963%20Hz.mp3'
  },
  {
    id: 'frequencia-abundancia',
    title: 'Frequência da Abundância (528 Hz)',
    subtitle: 'Atração da Prosperidade Cósmica',
    type: ContentType.AUDIO,
    duration: '10:30',
    plays: 912,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'frequencia-cura',
    title: 'Frequência da Cura Divina (432 Hz)',
    subtitle: 'Sintonização e Paz Espiritual',
    type: ContentType.AUDIO,
    duration: '08:45',
    plays: 1105,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'aula-1',
    title: 'Aula 1: Introdução à Conexão Divina',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '12:15'
  },
  {
    id: 'aula-2',
    title: 'Aula 2: Harmonia e Purificação Espiritual',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '14:40'
  },
  {
    id: 'aula-3',
    title: 'Aula 3: Despertar do Anjo da Guarda',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '16:20'
  },
  {
    id: 'aula-4',
    title: 'Aula 4: Selo e Proteção Divina',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '18:05'
  },
  {
    id: 'aula-5',
    title: 'Aula 5: Atração de Prosperidade Absoluta',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '20:12'
  },
  {
    id: 'aula-6',
    title: 'Aula 6: Finalização e Gratidão Elevada',
    subtitle: 'Aulas Sagradas',
    type: ContentType.VIDEO,
    duration: '15:30'
  },
  {
    id: 'video-santo-antonio',
    title: 'Oração Vertical de Santo Antônio',
    subtitle: 'Vídeo Vertical Devocional',
    type: ContentType.VIDEO,
    duration: '03:10'
  },
  {
    id: 'escudo-pdf',
    title: 'O Escudo de Proteção Divina',
    subtitle: 'Guia de Orações e Fortalecimento Espiritual',
    type: ContentType.PDF,
    embedUrl: 'O-Escudo-de-Protecao-Divina.pdf'
  },
  {
    id: 'codigos-amor-pdf',
    title: 'Guia Completo dos Códigos do Amor',
    subtitle: 'Transformação de Relacionamentos Afetivos e Familiares',
    type: ContentType.PDF,
    embedUrl: 'Guia-Completo-para-a-Transformacao-dos-Relacionamentos.pdf'
  },
  {
    id: 'guiadeoracoes-pdf',
    title: 'Guia de Orações Fundamentais',
    subtitle: 'Menu Completo de Súplicas Diárias',
    type: ContentType.PDF,
    embedUrl: 'Guia-de-Oracoes.pdf'
  },
  {
    id: 'lourdes-pdf',
    title: 'O Código de Lourdes',
    subtitle: 'Estudo Teológico sobre Milagres e Cura',
    type: ContentType.PDF,
    embedUrl: 'O-Codigo-de-Lourdes.pdf'
  }
];

export const DAILY_MESSAGES = [
  "Hoje, sinta a presença do seu anjo guiando cada passo.",
  "A abundância é seu estado natural. Abrace-a.",
  "Sua fé é a ponte para seus milagres.",
  "Manifeste com gratidão e receba com amor.",
  "São Miguel Arcanjo, defendei-nos no combate."
];

export const FAQS = [
  { q: "Como sei se está funcionando?", a: "Preste atenção aos pequenos sinais: um valor inesperado, um novo contato ou uma sensação de paz profunda." },
  { q: "Posso pular um dia?", a: "O ideal é manter a sequência de 19 dias para criar o hábito espiritual, mas se pular, recomece de onde parou." },
  { q: "Preciso seguir alguma religião?", a: "A jornada é baseada em tradições cristãs, mas a conexão com o anjo é universal." }
];
