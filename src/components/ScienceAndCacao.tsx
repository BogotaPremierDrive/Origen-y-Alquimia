import React, { useState } from 'react';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Download, FlaskConical, Snowflake, Flame } from 'lucide-react';

const CACAO_SLIDES = [
  {
    image: 'verdadcacao.png',
    title: 'Slide 1: La Verdad Oculta en el Fondo de tu Taza',
    description: 'Entendiendo el comportamiento del Cacao 100% Puro y el arte de su preparación. De la cordillera de Samaná, Caldas a tu barra de entrenamiento.',
  },
  {
    image: 'laverdadcacao2.png',
    title: 'Slide 2: Grano Puro No Alcalinizado',
    description: 'A diferencia del chocolate comercial procesado con sales alcalinas que destruyen los flavonoides, el cacao virgen conserva intacta su teobromina.',
  },
  {
    image: 'laverdadcacao3.png',
    title: 'Slide 3: Manteca de Cacao Natural',
    description: 'Grasa saludable vegetal rica en ácido esteárico que no eleva el colesterol LDL y aporta energía celular prolongada para entrenamientos de fuerza.',
  },
  {
    image: 'laverdadcacao4.png',
    title: 'Slide 4: El Arte de la Emulsión Artesanal',
    description: 'La suspensión del cacao en agua o leche caliente requiere batido mecánico o vapor para ligar las partículas puras sin aditivos químicos.',
  },
  {
    image: 'laverdadcacao5.png',
    title: 'Slide 5: Sedimento Natural en el Fondo',
    description: 'Encontrar sedimento fino al terminar tu taza no es un defecto: es la firma botánica de que estás bebiendo cacao puro, vivo e íntegro.',
  },
  {
    image: 'laverdadcacao6.png',
    title: 'Slide 6: Protocolo de Consumo Deportivo',
    description: 'Vasodilatación coronaria y muscular sostenida gracias a la teobromina. 0% azúcar añadida y alto contenido de magnesio bioasimilable.',
  },
];

export const ScienceAndCacao: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? CACAO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === CACAO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = CACAO_SLIDES[currentSlideIndex];

  return (
    <section id="ciencia" className="py-12 sm:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C3B2B]/15 border border-[#8C3B2B]/40 text-xs font-semibold text-[#B25340] uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#B25340]" />
            Dossier de Rendimiento & Bioquímica
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F2EB]">
            La Verdad del Cacao & Alquimia Botánica
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CCB9] leading-relaxed">
            Descubre por qué los atletas en Nutrishark reemplazan los pre-entrenos químicos por cacao ancestral puro y Cold Brew infusionado con Flor de Jamaica.
          </p>
        </div>

        {/* 2 Feature Cards: Teobromina vs Falso Vino */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Cacao & Teobromina */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1A1715] border border-[#8C3B2B]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase font-bold text-[#B25340] px-2.5 py-1 rounded-full bg-[#8C3B2B]/20 border border-[#8C3B2B]/30">
                  Superalimento Samaná, Caldas
                </span>
                <span className="text-xs text-[#D4AF37] font-semibold">100% Puro</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F5F2EB]">
                Teobromina vs Cafeína Tradicional
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#D5CCB9] leading-relaxed">
                A diferencia de los suplementos sintéticos que provocan picos de cortisol y taquicardia rápida, la <strong>teobromina</strong> del cacao puro actúa como un dilatador de vasos sanguíneos suave y prolongado.
              </p>

              <div className="mt-5 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#0a0908]/60 border border-[#8C3B2B]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <div>
                    <strong className="text-white">Oxigenación Muscular:</strong>
                    <span className="text-[#D5CCB9] block">Estimula la producción de óxido nítrico endógeno facilitando el bombeo en repeticiones pesadas.</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0a0908]/60 border border-[#8C3B2B]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <div>
                    <strong className="text-white">Magnesio Natural Anti-Calambres:</strong>
                    <span className="text-[#D5CCB9] block">Relaja la musculatura después de la contracción isométrica reduciendo contracturas.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#8C3B2B]/20 flex items-center justify-between text-xs text-[#9E978C]">
              <span>Cero azúcar añadida</span>
              <span className="text-[#D4AF37] font-bold">Disponible en barra Nutrishark</span>
            </div>
          </div>

          {/* Card 2: Falso Vino (Cold Brew + Hibiscus) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1A1715] border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                  Co-Extracción en Frío (&lt;10°C)
                </span>
                <span className="text-xs text-emerald-400 font-semibold">Tono Rubí de Autor</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F5F2EB]">
                Alquimia Botánica: El ‘Falso Vino’
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#D5CCB9] leading-relaxed">
                Co-extraemos café de especialidad con cálices enteros de flor de Jamaica (Hibiscus). Al macerar a menos de 10°C por 18 horas, <strong>bloqueamos la liberación de taninos ásperos</strong>.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0a0908]/60 border border-[#D4AF37]/20">
                  <span className="font-bold text-[#D4AF37] block mb-1">Baja Acidez Gástrica</span>
                  <p className="text-[11px] text-[#D5CCB9]">
                    No irrita la mucosa digestiva al entrenar en ayunas o con cargas pesadas.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0a0908]/60 border border-[#D4AF37]/20">
                  <span className="font-bold text-[#D4AF37] block mb-1">Antocianinas Puras</span>
                  <p className="text-[11px] text-[#D5CCB9]">
                    Potentes antioxidantes botánicos que mitigan el estrés oxidativo articular.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <a
                href="Botanical_Coffee_Alchemy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D4AF37] font-bold hover:underline flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar Guía Botánica (PDF)
              </a>
              <span className="text-[11px] text-[#9E978C] font-mono">Ratio 1:10 en Barra</span>
            </div>
          </div>

        </div>

        {/* Interactive Dossier Carousel */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#1A1715] border-2 border-[#D4AF37]/35 p-5 sm:p-8 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D4AF37]/20 mb-5">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15">
                Lámina {currentSlideIndex + 1} de {CACAO_SLIDES.length}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F2EB] mt-1.5">
                {slide.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-[#24201D] hover:bg-[#C59B27] text-[#F5F2EB] hover:text-[#0a0908] border border-[#C59B27]/30 flex items-center justify-center transition-all"
                aria-label="Lámina anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-[#24201D] hover:bg-[#C59B27] text-[#F5F2EB] hover:text-[#0a0908] border border-[#C59B27]/30 flex items-center justify-center transition-all"
                aria-label="Lámina siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Frame */}
          <div className="relative w-full aspect-[16/9] bg-[#0a0908] rounded-2xl overflow-hidden border border-[#C59B27]/20 flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'verdadcacao.png';
              }}
            />
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#E8E1D3] leading-relaxed bg-[#121110]/80 p-4 rounded-xl border border-[#D4AF37]/15">
            {slide.description}
          </p>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3 mt-4 pt-4 border-t border-[#D4AF37]/15">
            {CACAO_SLIDES.map((s, idx) => (
              <button
                key={s.image}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-[4/3] ${
                  currentSlideIndex === idx
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] opacity-100'
                    : 'border-[#2D2723] opacity-50 hover:opacity-90'
                }`}
              >
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
