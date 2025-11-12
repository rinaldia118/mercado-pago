import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    // Obtener parámetros de la URL
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const preferenceId = searchParams.get('preference_id');

    if (paymentId || preferenceId) {
      setPaymentInfo({
        paymentId: paymentId || 'N/A',
        status: status || 'approved',
        preferenceId: preferenceId || 'N/A',
      });
    }
  }, [searchParams]);

  return (
    <div className="App">
      <div className="container">
        <div className="result-container success">
          <div className="result-icon">✅</div>
          <h1>¡Pago Exitoso!</h1>
          <p className="subtitle">Tu pago ha sido procesado correctamente.</p>
          
          {paymentInfo && (
            <div className="payment-info">
              <p><strong>Estado:</strong> {paymentInfo.status}</p>
              {paymentInfo.paymentId && paymentInfo.paymentId !== 'N/A' && (
                <p><strong>ID de Pago:</strong> {paymentInfo.paymentId}</p>
              )}
              {paymentInfo.preferenceId && paymentInfo.preferenceId !== 'N/A' && (
                <p><strong>ID de Preferencia:</strong> {paymentInfo.preferenceId}</p>
              )}
            </div>
          )}

          <button 
            className="purchase-button" 
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;

