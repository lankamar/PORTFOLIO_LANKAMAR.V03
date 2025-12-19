import { Link } from 'react-router-dom';

export function SimuladorECGPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-black">
      {/* Header con botón volver */}
      <header className="bg-gradient-to-r from-purple-900 to-red-900 p-4 shadow-lg">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white hover:text-red-300 transition-colors font-mono text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Portafolio
        </Link>
      </header>
      
      {/* Simulador ECG embebido - pantalla completa */}
      <iframe 
        src="https://ecg-simulator2.vercel.app/"
        className="flex-1 w-full border-0"
        title="Simulador ECG - Marcelo Lancry"
        allow="fullscreen"
      />
    </div>
  );
}
