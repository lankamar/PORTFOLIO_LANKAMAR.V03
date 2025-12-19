import React from 'react';

export default function SimuladorECGPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-black">
      {/* Header con botón volver */}
      <header className="bg-gradient-to-r from-gray-900 to-red-950 p-4 shadow-lg border-b border-red-900/30">
        <a 
          href="/" 
          className="text-white hover:text-red-400 transition-colors duration-300 font-mono flex items-center gap-2"
        >
          <span className="text-xl">←</span>
          <span>Volver al Portafolio</span>
        </a>
      </header>
      
      {/* Simulador embebido - pantalla completa */}
      <iframe 
        src="https://ecg-simulator2.vercel.app/"
        className="flex-1 w-full border-0"
        title="Simulador ECG - Arritmias Cardíacas"
        allow="fullscreen"
        loading="eager"
      />
    </div>
  );
}
