# Origen & Alquimia × Nutrishark ☕🦈

Aplicación web React + TypeScript + Tailwind CSS para la experiencia atlética de café de especialidad y cacao ancestral 100% puro en barra activa del gimnasio **Nutrishark**.

## Características Principales

### 1. Planes de Membresía
- **Esencial (8 días / 8 tazas)**: $27.000 COP (~$3.375/taza) — Para 2 días por semana.
- **Constante (12 días / 12 tazas)**: $39.000 COP (~$3.250/taza) — Para 3 días por semana.
- **Pro (20 días / 20 tazas)**: $62.000 COP (~$3.100/taza) — 5 días por semana. ¡Desbloquea el Nivel 1 de Incentivos (Pack 125g café)!
- **Diario (30 días / 30 tazas)**: $89.000 COP (~$2.966/taza) — Mes ininterrumpido. Máximo ahorro.

### 2. Transparencia de Costos (Regla 60 / 20 / 20)
- Costo promedio servido ≈ $2.000 COP por taza (café $750 a $1.140 COP + $800 COP en insumos ecológicos, agua purificada, filtro y leche para cacao).
- Distribución pactada:
  - **60%**: Costo de insumo y barista.
  - **20%**: Gimnasio Nutrishark (alianza e infraestructura).
  - **20%**: Origen & Alquimia (tostión artesanal y trazabilidad directa).

### 3. Orígenes & Cacao Ancestral
- **Base incluidos**:
  - Café Pico Diamante (Cucutilla, N. Santander — 1.700 msnm)
  - Koko Cafeto La Eunice (Caicedonia, Valle — 1.650 msnm)
  - Reserva de la Granja (Valle de Tenza, Boyacá — 1.400 - 2.100 msnm)
  - Verde & Tostao (Manizales, Caldas)
  - Cacao Ancestral San Cristóbal (Samaná, Caldas — 100% puro, rico en teobromina para vasodilatación sin taquicardia)
- **Selección Premium (+ $2.000 COP)**:
  - Wush Wush Virgilio (Exótico)
  - Bourbon Rosado (Fermentación anaeróbica)
  - Geisha Alta Montaña
  - Carrera Especial

### 4. Recargos & Suplementación
- **Cold Brew con infusión ("Falso Vino" con Flor de Jamaica)**: +$2.000 COP (baja acidez gástrica, diurético y antioxidante con antocianinas).
- **Scoop de Proteína Nutrishark**: +$7.000 COP (Whey Isolate o Vegana Plant-Based).
- **Selección Premium**: +$2.000 COP.

### 5. Pase Digital QR Interactivo
- Generación dinámica de código QR escaneable en barra con la biblioteca `qrcode`.
- Contador en tiempo real de tazas consumidas y restantes.
- Botón interactivo de check-in: *"Consumir 1 Taza en Barra Nutrishark"* con animación de confeti al alcanzar metas.

### 6. Sistema de Incentivos & Programa de Referidos
- **20 tazas**: Pack de 125 g de café de especialidad para llevar a casa.
- **60 tazas**: Termo Deportivo Térmico Inox Origen & Alquimia × Nutrishark.
- **120 tazas**: Método Personal de Extracción (Prensa Francesa borosilicato o Dripper cónico personal).
- **Referidos**:
  - Tu amigo prueba **1 taza gratis de cortesía** en barra con tu código.
  - Si se suscribe, **ambos reciben +4 tazas extras** de café de especialidad añadidas al pase.

### 7. Barra Inferior Fija (Sticky Bottom Bar)
- Resumen en tiempo real del plan, origen, extras y total en COP.
- Botón directo que abre WhatsApp con el mensaje prediseñado para la barra de Nutrishark / Steven / Barista.

## Desarrollo & Build

```bash
# Servidor de desarrollo (puerto 3000)
npm run dev

# Compilar para producción
npm run build
```
