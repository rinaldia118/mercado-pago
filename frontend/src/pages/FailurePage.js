import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css';

function FailurePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Obtener parámetros de la URL
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const preferenceId = searchParams.get('preference_id');
    const statusDetail = searchParams.get('status_detail');

    if (paymentId || preferenceId) {
      setErrorInfo({
        paymentId: paymentId || 'N/A',
        status: status || 'rejected',
        preferenceId: preferenceId || 'N/A',
        statusDetail: statusDetail || 'N/A',
      });
    }
  }, [searchParams]);

  return (
    <div className="App">
      <div className="container">
        <div className="result-container failure">
          <div className="result-icon">❌</div>
          <h1>Pago Rechazado</h1>
          <p className="subtitle">No se pudo procesar tu pago. Por favor, intenta nuevamente.</p>
          
          {errorInfo && (
            <div className="payment-info">
              <p><strong>Estado:</strong> {errorInfo.status}</p>
              {errorInfo.statusDetail && errorInfo.statusDetail !== 'N/A' && (
                <p><strong>Detalle:</strong> {errorInfo.statusDetail}</p>
              )}
              {errorInfo.paymentId && errorInfo.paymentId !== 'N/A' && (
                <p><strong>ID de Pago:</strong> {errorInfo.paymentId}</p>
              )}
            </div>
          )}

          <div className="help-text">
            <p><strong>Posibles causas:</strong></p>
            <ul>
              <li>Fondos insuficientes</li>
              <li>Tarjeta rechazada</li>
              <li>Datos de la tarjeta incorrectos</li>
              <li>Problemas con el banco emisor</li>
            </ul>
            <p className="note">
              <strong>Nota importante sobre el error "Una de las partes con la que intentás hacer el pago es de prueba":</strong>
            </p>
            <p className="note">
              Este error aparece cuando hay un desajuste entre el entorno de prueba y producción. Para solucionarlo:
            </p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Si estás usando un <strong>token de prueba</strong>, debes iniciar sesión en Mercado Pago con una <strong>cuenta de prueba del comprador</strong>.</li>
              <li>Si estás usando un <strong>token de producción</strong>, debes usar una <strong>tarjeta real</strong> y estar logueado con tu cuenta real.</li>
            </ul>
            <p className="note" style={{ marginTop: '15px', fontStyle: 'italic' }}>
              💡 <strong>Tip:</strong> Puedes crear cuentas de prueba desde tu panel de desarrollador de Mercado Pago.
            </p>
          </div>

          <button 
            className="purchase-button" 
            onClick={() => navigate('/')}
          >
            Intentar Nuevamente
          </button>
        </div>
      </div>
    </div>
  );
}

export default FailurePage;

