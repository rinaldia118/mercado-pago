import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import PendingPage from './pages/PendingPage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Debug: Mostrar la URL de la API (solo en desarrollo o para debug)
console.log('🔍 API_URL configurada:', API_URL);
console.log('🔍 REACT_APP_API_URL desde env:', process.env.REACT_APP_API_URL);

// Configurar axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/payments/create-preference`, {
        amount: 1000, // Monto fijo de ejemplo
        description: 'Producto de prueba',
      });

      // Usar la URL proporcionada por el backend (ya prioriza sandbox si es modo prueba)
      const redirectUrl = response.data.initPoint || response.data.sandboxInitPoint;
      if (redirectUrl) {
        console.log('Redirigiendo a Mercado Pago:', redirectUrl);
        console.log('Modo prueba:', response.data.isTestMode ? 'Sí' : 'No');
        console.log('Es preferencia sandbox:', response.data.isSandboxPreference ? 'Sí' : 'No');
        
        if (response.data.isTestMode || response.data.isSandboxPreference) {
          console.log('⚠️ IMPORTANTE: Estás en modo prueba (SANDBOX)');
          console.log('⚠️ PASOS A SEGUIR:');
          console.log('   1. Verifica que la URL sea sandbox.mercadopago.com.ar');
          console.log('   2. Si estás logueado con tu cuenta real, CIERRA SESIÓN');
          console.log('   3. Inicia sesión con la cuenta de prueba del COMPRADOR');
          console.log('   4. Luego ingresa la tarjeta de prueba: 4509 9535 6623 3704');
          
          // Verificar que la URL sea de sandbox
          if (!redirectUrl.includes('sandbox.mercadopago')) {
            console.error('❌ ERROR: La URL NO es de sandbox! Debería contener "sandbox.mercadopago"');
            alert('⚠️ ADVERTENCIA: La URL no parece ser de sandbox. Verifica tu token de prueba.');
          } else {
            console.log('✅ URL de sandbox confirmada');
          }
        }
        window.location.href = redirectUrl;
      } else {
        throw new Error('No se recibió URL de redirección');
      }
    } catch (err) {
      console.error('Error al crear la preferencia:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Error al iniciar la compra. Por favor, intenta nuevamente.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Bienvenido</h1>
        <p className="subtitle">Haz clic en el botón para iniciar tu compra</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          className="purchase-button" 
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Iniciar Compra'}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/pending" element={<PendingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
