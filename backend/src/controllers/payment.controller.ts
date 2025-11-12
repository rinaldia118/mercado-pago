import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { AppDataSource } from '../data-source';
import { Payment } from '../entities/Payment';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

export const createPreference = async (req: Request, res: Response) => {
  try {
    const { amount, description } = req.body;

    console.log('=== DEBUG: createPreference ===');
    console.log('Request body:', { amount, description });
    console.log('Environment variables:');
    console.log('  FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('  BACKEND_URL:', process.env.BACKEND_URL);
    
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
    
    // Variable de entorno para forzar modo prueba (opcional)
    // Si MERCADOPAGO_TEST_MODE=true, se asume que es modo prueba
    const forceTestMode = process.env.MERCADOPAGO_TEST_MODE === 'true';
    
    // Variable de entorno para forzar modo producción (opcional)
    // Si MERCADOPAGO_FORCE_PRODUCTION=true, ignora sandbox_init_point y usa solo init_point
    const forceProduction = process.env.MERCADOPAGO_FORCE_PRODUCTION === 'true';
    
    // Nota: Los tokens de prueba de Mercado Pago NO siempre tienen "test" en el nombre
    // La forma real de saber si es sandbox es verificar si la respuesta tiene sandbox_init_point
    // Por ahora solo mostramos el token, la detección real se hace después de crear la preferencia
    console.log('  MERCADOPAGO_ACCESS_TOKEN:', accessToken ? 'Definido' : 'NO DEFINIDO');
    console.log('  MERCADOPAGO_TEST_MODE:', forceTestMode ? 'Forzado a PRUEBA' : 'Auto-detectado');
    console.log('  MERCADOPAGO_FORCE_PRODUCTION:', forceProduction ? 'Forzado a PRODUCCIÓN' : 'Auto-detectado');
    if (accessToken) {
      console.log('  Token preview:', accessToken.substring(0, 30) + '...');
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Amount is required and must be greater than 0' });
    }

    // Validar que FRONTEND_URL esté definido
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

    console.log('URLs después de valores por defecto:');
    console.log('  frontendUrl:', frontendUrl);
    console.log('  backendUrl:', backendUrl);

    // Asegurar que las URLs no terminen con /
    const cleanFrontendUrl = frontendUrl.replace(/\/$/, '');
    const cleanBackendUrl = backendUrl.replace(/\/$/, '');

    console.log('URLs limpias:');
    console.log('  cleanFrontendUrl:', cleanFrontendUrl);
    console.log('  cleanBackendUrl:', cleanBackendUrl);

    const preference = new Preference(client);

    const backUrls = {
      success: `${cleanFrontendUrl}/success`,
      failure: `${cleanFrontendUrl}/failure`,
      pending: `${cleanFrontendUrl}/pending`,
    };

    console.log('back_urls construidas:', backUrls);

    // Construir el objeto de preferencia
    // Nota: Si usas localhost, auto_return puede causar problemas
    // En desarrollo, podemos omitir auto_return o usar 'all'
    const preferenceData: any = {
      items: [
        {
          id: 'item-1',
          title: description || 'Producto',
          quantity: 1,
          unit_price: parseFloat(amount),
          currency_id: 'ARS',
        },
      ],
      back_urls: backUrls,
      notification_url: `${cleanBackendUrl}/api/payments/webhook`,
    };

    // Solo agregar statement_descriptor en modo sandbox/prueba
    if (forceTestMode) {
      preferenceData.statement_descriptor = 'PRODUCTO PRUEBA';
      console.log('Agregando statement_descriptor (modo prueba forzado)');
    }

    // Solo agregar auto_return si no es localhost (para producción)
    // En sandbox/desarrollo, localhost puede causar problemas con auto_return
    if (!cleanFrontendUrl.includes('localhost') && !cleanFrontendUrl.includes('127.0.0.1')) {
      preferenceData.auto_return = 'approved';
      console.log('Agregando auto_return (URL no es localhost)');
    } else {
      console.log('Omitiendo auto_return (URL es localhost - modo desarrollo)');
    }

    console.log('preferenceData completo:', JSON.stringify(preferenceData, null, 2));
    console.log('Enviando a Mercado Pago...');

    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferencia creada exitosamente');
    console.log('Response ID:', response.id);
    console.log('init_point:', response.init_point);
    console.log('sandbox_init_point:', response.sandbox_init_point);
    
    // Verificar si la preferencia fue creada en modo producción o prueba
    // La forma REAL de saber si es sandbox es verificar si tiene sandbox_init_point
    // PERO si forceProduction está activo, ignoramos sandbox_init_point
    const isSandboxPreference = forceProduction ? false : !!response.sandbox_init_point;
    const isTestMode = forceTestMode || (isSandboxPreference && !forceProduction);
    
    console.log('Modo de la preferencia detectado:');
    console.log('  - Tiene sandbox_init_point:', isSandboxPreference ? 'SÍ ✅ (Es SANDBOX)' : 'NO ⚠️ (Es PRODUCCIÓN)');
    console.log('  - Modo final:', isTestMode ? 'SANDBOX/PRUEBA ✅' : 'PRODUCCIÓN ⚠️');
    
    if (!isSandboxPreference && !forceTestMode && !forceProduction) {
      console.log('  ⚠️ ADVERTENCIA: La preferencia se creó en modo PRODUCCIÓN');
      console.log('  ⚠️ Si estás usando tarjetas de prueba, esto causará el error:');
      console.log('  ⚠️ "Una de las partes con la que intentás hacer el pago es de prueba"');
      console.log('  ⚠️ SOLUCIÓN: Asegúrate de usar el Access Token de PRUEBA desde:');
      console.log('  ⚠️ https://www.mercadopago.com.ar/developers/panel/credentials');
      console.log('  ⚠️ Debe estar en la sección "Credenciales de prueba"');
      console.log('  ⚠️ O puedes forzar modo prueba agregando MERCADOPAGO_TEST_MODE=true al .env');
    }
    
    if (forceProduction && response.sandbox_init_point) {
      console.log('  ℹ️ INFO: Se detectó sandbox_init_point pero MERCADOPAGO_FORCE_PRODUCTION está activo');
      console.log('  ℹ️ Se usará init_point (producción) en lugar de sandbox_init_point');
    }

    // Save payment to database
    const paymentRepository = AppDataSource.getRepository(Payment);
    const payment = paymentRepository.create({
      preferenceId: response.id!,
      status: 'pending',
      amount: parseFloat(amount),
      currency: 'ARS',
    });
    await paymentRepository.save(payment);

    console.log('✅ Pago guardado en base de datos');
    console.log('=== FIN DEBUG ===\n');

    // Seleccionar la URL correcta según el modo detectado
    // Si forceProduction está activo, SIEMPRE usar init_point (ignorar sandbox_init_point)
    // Si es sandbox y no se fuerza producción, usar sandbox_init_point
    // Si es producción, usar init_point
    const initPoint = forceProduction 
      ? response.init_point  // Forzar producción: SIEMPRE usar init_point
      : (isSandboxPreference 
        ? (response.sandbox_init_point || response.init_point)  // Sandbox: preferir sandbox_init_point
        : response.init_point);  // Producción: usar init_point

    console.log('URL de redirección seleccionada:', initPoint);
    console.log('  - init_point (producción):', response.init_point);
    console.log('  - sandbox_init_point (prueba):', response.sandbox_init_point || 'NO DISPONIBLE');
    console.log('  - Modo detectado:', isSandboxPreference ? 'SANDBOX' : 'PRODUCCIÓN');
    console.log('  - Force Production activo:', forceProduction ? 'SÍ ✅ (Ignorando sandbox_init_point)' : 'NO');
    console.log('  - URL usada:', forceProduction ? 'PRODUCCIÓN (forzado) ✅' : (isSandboxPreference ? 'SANDBOX ✅' : 'PRODUCCIÓN ✅'));

    res.json({
      preferenceId: response.id,
      initPoint: initPoint,
      sandboxInitPoint: response.sandbox_init_point,
      isTestMode: isTestMode,
      isSandboxPreference: isSandboxPreference,
    });
  } catch (error: any) {
    console.error('❌ Error creating preference:', error);
    console.error('Error details:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    });
    if (error.response) {
      console.error('Mercado Pago API response:', error.response);
    }
    console.log('=== FIN DEBUG (ERROR) ===\n');
    res.status(500).json({ error: 'Error creating payment preference', details: error.message });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentRepository = AppDataSource.getRepository(Payment);
      const payment = await paymentRepository.findOne({
        where: { preferenceId: data.id },
      });

      if (payment) {
        payment.status = data.status;
        payment.paymentId = data.id;
        await paymentRepository.save(payment);
      }
    }

    res.status(200).send('OK');
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Error handling webhook' });
  }
};

