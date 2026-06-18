import React, { useEffect } from 'react';

interface VideoLessonProps {
  navigate: (path: string) => void;
}

const VideoLesson: React.FC<VideoLessonProps> = ({ navigate }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="space-y-6 pb-28 pt-2 animate-in slide-in-from-bottom-4 duration-500">
      {/* Back button and Header */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => navigate('inicio')}
          className="p-2 rounded-full bg-white border border-neutral-150 text-neutral-600 hover:bg-neutral-50 active:scale-90 transition-transform"
          id="back-to-home-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest pl-0.5">Módulo Exclusivo</span>
          <h2 className="text-xl font-bold text-neutral-800 leading-tight">Como me relacionar com meu anjo</h2>
        </div>
      </div>

      {/* Video Player Section */}
      <section className="space-y-3">
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-neutral-150 shadow-md relative">
          <video 
            src="https://novidadesdeagora.site/jma/app/video/Como%20me%20relacionar%20com%20o%20meu%20anjo%20da%20guarda.mp4"
            controls
            preload="metadata"
            className="w-full h-full object-contain"
            playsInline
          />
        </div>
        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider text-center">Video aula explicativa • 8:08 min</p>
      </section>

      {/* Text Narrative reading panel */}
      <section className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-xs space-y-5">
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 space-y-1.5">
          <h3 className="font-bold text-amber-800 text-sm">Aprenda a Sintonizar Diariamente</h3>
          <p className="text-neutral-600 text-xs font-semibold leading-relaxed text-justify">
            A missão dos santos anjos da guarda, como se sabe, é conduzir-nos ao Céu e à salvação eterna. Mas como nos relacionarmos concretamente com eles, no dia a dia?
          </p>
        </div>

        <div className="space-y-4 text-justify font-sans text-xs leading-relaxed text-neutral-650">
          <p className="font-semibold">
            Antes de tudo, os nossos anjos são nossos amigos. Não existem segredos entre nós. Eles sabem tudo o que fazemos e – ao contrário dos demônios, que não veem Deus face a face – sabem também o que pensamos, quando Deus lhes comunica.
          </p>
          
          <p className="font-semibold">
            O mínimo a fazer em relação a eles é saudá-los e invocá-los constantemente durante o dia, lembrando também dos anjos das outras pessoas. Ao cumprimentar alguma pessoa, é interessante criar o hábito de saudar também o seu santo anjo. Isso, além de ajudar no relacionamento com ela, faz-nos honrar uma pessoa santa, que está ao lado dela e, ao mesmo tempo, ao lado de Deus.
          </p>
          
          <p className="font-semibold">
            Nas Sagradas Escrituras, o anjo Rafael oferece-se para acompanhar o jovem Tobias em viagem: "Perguntou-lhe Tobias: 'Conheces a estrada que vai para a Média?' Ele respondeu: 'Sem dúvida. Pois estive lá algumas vezes e tenho experiência e conheço todos os caminhos" [1]. Os anjos conhecem as coisas muito melhor do que nós. Por isso, também podemos pedir conselhos a eles, sempre que passarmos por qualquer dificuldade ou perigo. Seu auxílio é importante especialmente diante das tentações, afinal, eles foram colocados ao nosso lado para livrar-nos do inferno e levar-nos ao Céu.
          </p>
          
          <p className="font-semibold">
            Dos santos, também aprendemos lições valiosas para agir com os nossos anjos da guarda. O Papa São João XXIII, por exemplo, quando tinha que resolver algum problema difícil durante o seu trabalho na nunciatura de Paris, apostava na "diplomacia dos anjos": mandava o seu santo anjo conversar com os anjos de seus interlocutores, para que eles ajudassem a solucionar qualquer questão.
          </p>
          
          <p className="font-semibold">
            O Padre Pio de Pietrelcina insistia bastante com seus dirigidos espirituais, para que enviassem a ele os seus anjos da guarda, diante de qualquer necessidade. Era frequente o santo não dormir à noite, atendendo aos pedidos que seus filhos espirituais lhe apresentavam por meio de seus anjos.
          </p>
          
          <div className="font-semibold font-mono bg-neutral-50 px-4 py-5 rounded-2xl border border-neutral-100 text-[11px] leading-normal italic text-justify my-4">
            Santa Teresinha do Menino Jesus, em sua poesia "A meu Anjo da Guarda", escrevia:<br/><br/>
            "O toi! qui traverses l'espace<br/>
            Plus promptement que les éclairs<br/>
            Je t'en supplie, vole à ma place<br/>
            Auprès de ceux qui me sont chers<br/>
            De ton aile sèche leurs larmes<br/>
            Cante combien Jésus est bon<br/>
            Chante que souffrir a des charmes<br/>
            Et tout bas, murmure mon nome...<br/><br/>
            Ó tu que cruzas o espaço<br/>
            Mais veloz do que os relâmpagos,<br/>
            Peço-te, em meu lugar,<br/>
            Voa até aqueles que amo!<br/>
            Com as asas seca seu pranto,<br/>
            Canta que Jesus é bom<br/>
            E que a dor tem seus encantos<br/>
            E sussurra-lhes meu nome..." [2]
          </div>

          <p className="font-semibold">
            Vale lembrar também que não apenas pessoas possuem anjos da guarda, como também instituições: paróquias, dioceses, cidades e países. Quando São João Maria Vianney entrou em Ars, impregnado da consciência do sobrenatural, não deixou de saudar o anjo daquela paróquia, juntamente com os anjos de todos os seus paroquianos. São Francisco de Sales, em carta a um bispo, recomendou que ele invocasse o anjo de sua diocese. E em Portugal, há uma festa para o anjo do país, o mesmo que apareceu para os pastorinhos de Fátima.
          </p>

          <p className="font-semibold">
            Importa, por fim, principalmente, imitar os anjos da guarda, buscando ser como anjos para as outras pessoas e fazendo de tudo para que elas cheguem ao Céu, onde, um dia, contemplaremos, todos juntos, a face de Deus.
          </p>
        </div>

        <button 
          onClick={() => navigate('inicio')}
          className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm"
          id="finish-study-page-btn"
        >
          Concluir Estudo & Voltar ao Início
        </button>
      </section>
    </div>
  );
};

export default VideoLesson;
