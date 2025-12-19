import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import SimuladorECGPage from './pages/SimuladorECGPage';

function App() {
  return (
    <Routes>
      {/* Página principal - Portafolio */}
      <Route path="/" element={<PortfolioPage />} />
      
      {/* Simulador ECG - Pantalla completa integrada */}
      <Route path="/simulador-ecg" element={<SimuladorECGPage />} />
    </Routes>
  );
}

export default App;
