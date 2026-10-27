import React from 'react';
import { Coffee, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { CONTACT_LINES } from '../data/plans';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0908] border-t border-[#D4AF37]/20 pt-16 pb-28 text-xs text-[#9E978C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C59B27] to-[#D4AF37] p-0.5">
                <img 
                  src="logo.jpg" 
                  alt="Origen & Alquimia" 
                  className="w-full h-full object-cover rounded-full" 
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg'; }} 
                />
              </div>
              <span className="font-serif text-base font-bold text-[#F5F2EB] tracking-wider">
                ORIGEN & ALQUIMIA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#D5CCB9]">
              Café de especialidad de 4 cordilleras colombianas y cacao ancestral 100% puro en barra activa para la comunidad atlética de <strong>Nutrishark</strong>.
            </p>
            <span className="inline-block px-2.5 py-1 rounded bg-[#1A1715] text-[#D4AF37] font-mono text-[10px] border border-[#D4AF37]/30">
              Alianza Oficial Nutrishark
            </span>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F5F2EB] uppercase tracking-wider mb-3">
              Membresía & Experiencia
            </h4>
            <ul className="space-y-2">
              <li><a href="#planes" className="hover:text-[#D4AF37] transition-colors">Planes Gym (8, 12, 20 y 30 días)</a></li>
              <li><a href="#origenes" className="hover:text-[#D4AF37] transition-colors">Orígenes & Cacao Puro Samaná</a></li>
              <li><a href="#extras" className="hover:text-[#D4AF37] transition-colors">Extras & Scoop Proteína</a></li>
              <li><a href="#pase" className="hover:text-[#D4AF37] transition-colors">Pase Digital QR</a></li>
              <li><a href="#incentivos" className="hover:text-[#D4AF37] transition-colors">Incentivos (20, 60 y 120 Tazas)</a></li>
              <li><a href="#referidos" className="hover:text-emerald-400 transition-colors">Programa de Referidos (+4 Tazas)</a></li>
            </ul>
          </div>

          {/* Col 3: Science & Transparence */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F5F2EB] uppercase tracking-wider mb-3">
              Transparencia & Ciencia
            </h4>
            <ul className="space-y-2">
              <li><a href="#planes" className="hover:text-[#D4AF37] transition-colors">Regla Alianza: 60% Insumo / 20% Gym / 20% OA</a></li>
              <li><a href="#ciencia" className="hover:text-[#D4AF37] transition-colors">Teobromina vs Cafeína para Atletas</a></li>
              <li><a href="#ciencia" className="hover:text-[#D4AF37] transition-colors">Alquimia Botánica: Falso Vino (&lt;10°C)</a></li>
              <li><a href="Botanical_Coffee_Alchemy.pdf" target="_blank" rel="noopener" className="hover:text-[#D4AF37] transition-colors">Dossier PDF Descargable</a></li>
              <li><a href="#tienda" className="hover:text-[#D4AF37] transition-colors">Kits & Café en Grano para Casa</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#F5F2EB] uppercase tracking-wider mb-3">
              Barra Activa Nutrishark
            </h4>
            <div className="space-y-2 text-xs text-[#D5CCB9]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27] flex-shrink-0" />
                <span>Barra Nutrishark, Zona de Entrenamiento</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] flex-shrink-0" />
                <span>Steven: +57 301 464 4983</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] flex-shrink-0" />
                <span>Barista: +57 302 319 1311</span>
              </p>
              <p className="text-[11px] text-[#9E978C] pt-2">
                Horario: Lunes a Sábado desde las 06:00 AM para acompañar tus entrenamientos tempranos.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9E978C]">
          <span>&copy; {new Date().getFullYear()} Origen & Alquimia × Nutrishark. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1">
            Tostión artesanal colombiana y rendimiento físico sin compromisos.
          </span>
        </div>

      </div>
    </footer>
  );
};
