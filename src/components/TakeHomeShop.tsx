import React, { useState } from 'react';
import { Package, Plus, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { CONTACT_LINES } from '../data/plans';

interface ShopProduct {
  id: string;
  name: string;
  category: 'cafe' | 'cacao' | 'kit';
  price: number;
  weight: string;
  image: string;
  description: string;
}

const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'pico-250',
    name: 'Café Pico Diamante (Cucutilla)',
    category: 'cafe',
    price: 30000,
    weight: '250g',
    image: 'IMG-20260425-WA0000.jpg',
    description: 'Notas a jazmín silvestre, miel virgen y chocolate cítrico. En grano o molido.',
  },
  {
    id: 'koko-500',
    name: 'Koko Cafeto — La Eunice',
    category: 'cafe',
    price: 40000,
    weight: '500g',
    image: 'Gemini_Generated_Image_ (6).png',
    description: '100% Caturro sin pasilla. Caicedonia, Valle. Miel de caña y chocolate.',
  },
  {
    id: 'cacao-samana-libra',
    name: 'Cacao Ancestral Samaná 100% Puro',
    category: 'cacao',
    price: 35000,
    weight: 'Libra 500g',
    image: 'cacaosancris.png',
    description: 'Molido fino artesanal listo para diluir. Rico en teobromina y magnesio.',
  },
  {
    id: 'kit-barista-casa',
    name: 'Kit Barista en Casa (Chemex + Prensa)',
    category: 'kit',
    price: 240000,
    weight: 'Set Completo',
    image: 'kitmetodosy cafes.png',
    description: 'Chemex con filtro, Prensa Francesa de vidrio térmico y 2 cafés de origen.',
  },
  {
    id: 'kit-origenes-repisa',
    name: 'Kit Orígenes & Repisa en Madera',
    category: 'kit',
    price: 295000,
    weight: 'Repisa + 4 Cafés',
    image: 'Kit de Orígenes y repisa.png',
    description: 'Exhibidor artesanal de cedro con frascos de aroma y 4 cordilleras cafeteras.',
  },
  {
    id: 'kit-master-station',
    name: 'Kit Master Barista Station',
    category: 'kit',
    price: 690000,
    weight: 'Estación Master',
    image: 'Kit Master Barista Station.png',
    description: 'Repisa noble, 3 métodos (Chemex, Prensa, Moka), 4 cafés y Cacao San Cristóbal.',
  },
];

export const TakeHomeShop: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cafe' | 'cacao' | 'kit'>('all');
  const [orderedProduct, setOrderedProduct] = useState<string | null>(null);

  const filtered = SHOP_PRODUCTS.filter(p => filter === 'all' || p.category === filter);

  const handleOrderWhatsApp = (product: ShopProduct) => {
    setOrderedProduct(product.id);
    const message = `¡Hola! Quiero ordenar para llevar en Nutrishark:
📦 Producto: ${product.name} (${product.weight})
💰 Precio: $${product.price.toLocaleString('es-CO')} COP
¿Tienen stock disponible para entrega hoy en la barra?`;
    
    const url = `https://wa.me/${CONTACT_LINES[0].phone}?text=${encodeURIComponent(message)}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.href = url;
    }
    setTimeout(() => setOrderedProduct(null), 2500);
  };

  return (
    <section id="tienda" className="py-12 sm:py-20 relative scroll-mt-20 border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
              <Package className="w-3.5 h-3.5 text-[#C59B27]" />
              Take-Home Bar
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
              Lleva el Café & Cacao a tu Casa
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#D5CCB9] max-w-xl">
              Libras selladas al vacío, molienda personalizada para tu cafetera y kits de barista con madera de cedro.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === 'all' ? 'bg-[#D4AF37] text-[#0a0908]' : 'bg-[#1A1715] text-[#D5CCB9] border border-[#C59B27]/20'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('cafe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === 'cafe' ? 'bg-[#D4AF37] text-[#0a0908]' : 'bg-[#1A1715] text-[#D5CCB9] border border-[#C59B27]/20'
              }`}
            >
              Cafés
            </button>
            <button
              onClick={() => setFilter('cacao')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === 'cacao' ? 'bg-[#8C3B2B] text-white' : 'bg-[#1A1715] text-[#D5CCB9] border border-[#C59B27]/20'
              }`}
            >
              Cacao 100%
            </button>
            <button
              onClick={() => setFilter('kit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === 'kit' ? 'bg-[#D4AF37] text-[#0a0908]' : 'bg-[#1A1715] text-[#D5CCB9] border border-[#C59B27]/20'
              }`}
            >
              Kits & Repisas
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => {
            const isJustOrdered = orderedProduct === product.id;

            return (
              <div
                key={product.id}
                className="rounded-2xl p-5 bg-[#1A1715] border border-[#C59B27]/20 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="h-52 rounded-xl overflow-hidden mb-4 bg-[#0a0908] relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'reserva de la granja.jpeg';
                      }}
                    />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#0a0908]/85 text-[#D4AF37] text-[11px] font-mono font-bold border border-[#D4AF37]/30">
                      {product.weight}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#C59B27] font-bold">
                      {product.category === 'kit' ? 'Equipamiento' : 'Micro-Lote'}
                    </span>
                    <span className="font-serif text-base font-bold text-[#D4AF37]">
                      ${product.price.toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#D5CCB9] mt-1.5 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D4AF37]/15">
                  <button
                    type="button"
                    onClick={() => handleOrderWhatsApp(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#24201D] hover:bg-[#D4AF37] text-[#F5F2EB] hover:text-[#0a0908] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-[#C59B27]/30 shadow"
                  >
                    {isJustOrdered ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Abriendo WhatsApp...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        Pedir para Llevar en Barra
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
