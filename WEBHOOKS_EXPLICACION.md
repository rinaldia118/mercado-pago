# 🔔 Notificaciones de Pago y Webhooks - Explicación

## ¿Para qué sirven las notificaciones de pago?

Las notificaciones de pago (webhooks) son **mensajes automáticos** que Mercado Pago envía a tu servidor cuando ocurre un evento relacionado con un pago. Son esenciales para mantener tu sistema actualizado sin necesidad de consultar constantemente a Mercado Pago.

## 🔄 Flujo Completo de un Pago

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│  Frontend   │         │   Backend   │         │ Mercado Pago │
│   (React)   │         │  (Node.js)  │         │   (Servidor) │
└──────┬──────┘         └──────┬──────┘         └──────┬───────┘
       │                       │                       │
       │ 1. POST /create-      │                       │
       │    preference         │                       │
       ├──────────────────────>│                       │
       │                       │                       │
       │                       │ 2. Crea preferencia  │
       │                       │    (con webhook URL) │
       │                       ├──────────────────────>│
       │                       │                       │
       │                       │ 3. Recibe URL        │
       │                       │<──────────────────────┤
       │                       │                       │
       │ 4. Recibe URL         │                       │
       │<──────────────────────┤                       │
       │                       │                       │
       │ 5. Redirige usuario   │                       │
       ├──────────────────────────────────────────────>│
       │                       │                       │
       │                       │                       │ Usuario completa
       │                       │                       │ el pago aquí
       │                       │                       │
       │ 6. Usuario vuelve     │                       │
       │    (success/failure)  │                       │
       │<──────────────────────────────────────────────┤
       │                       │                       │
       │                       │ 7. WEBHOOK: Notifica │
       │                       │    cambio de estado │
       │                       │<──────────────────────┤
       │                       │                       │
       │                       │ 8. Actualiza BD      │
       │                       │    con nuevo estado  │
       │                       │                       │
```

## 🎯 ¿Por qué son importantes?

### 1. **Actualización Automática del Estado**

El usuario puede:
- Cerrar el navegador antes de volver a tu sitio
- No completar el flujo de retorno
- Tener problemas de conexión

**Sin webhook:** No sabrías si el pago fue aprobado o rechazado.  
**Con webhook:** Tu servidor recibe la notificación automáticamente y actualiza el estado.

### 2. **Pagos Pendientes**

Algunos métodos de pago (transferencias, efectivo) pueden tardar horas o días en procesarse. El webhook te notifica cuando cambian de estado.

### 3. **Reversiones y Reembolsos**

Si un pago es revertido o reembolsado, Mercado Pago te notifica automáticamente.

### 4. **Sincronización Confiable**

Aunque el usuario no vuelva a tu sitio, tu base de datos siempre estará actualizada.

## 📡 Cómo Funciona el Webhook en tu Código

### Configuración en la Preferencia

Cuando creas una preferencia, defines la URL del webhook:

```typescript
const preferenceData = {
  // ... otros datos ...
  notification_url: `${cleanBackendUrl}/api/payments/webhook`,
};
```

Esto le dice a Mercado Pago: *"Cuando algo cambie con este pago, envía una notificación a esta URL"*.

### Endpoint del Webhook

Tu backend tiene un endpoint que recibe las notificaciones:

```typescript
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      // Busca el pago en tu base de datos
      const payment = await paymentRepository.findOne({
        where: { preferenceId: data.id },
      });

      if (payment) {
        // Actualiza el estado del pago
        payment.status = data.status;
        payment.paymentId = data.id;
        await paymentRepository.save(payment);
      }
    }

    // Siempre responde 200 OK a Mercado Pago
    res.status(200).send('OK');
  } catch (error) {
    // Maneja errores pero siempre responde OK
    res.status(200).send('OK');
  }
};
```

## 🔔 Tipos de Notificaciones

Mercado Pago puede enviar diferentes tipos de notificaciones:

### 1. **payment** (Pago)
- Cuando se crea un pago
- Cuando cambia el estado de un pago (approved, rejected, pending, etc.)
- Cuando se cancela un pago

### 2. **merchant_order** (Orden)
- Cuando se actualiza una orden de compra

### 3. **preapproval** (Suscripciones)
- Para pagos recurrentes

## 📊 Estados de Pago

Los estados más comunes que recibirás:

- **pending:** Pago pendiente (esperando confirmación)
- **approved:** Pago aprobado ✅
- **rejected:** Pago rechazado ❌
- **cancelled:** Pago cancelado
- **refunded:** Pago reembolsado
- **charged_back:** Contracargo (el banco revirtió el pago)

## ⚠️ Consideraciones Importantes

### 1. **Siempre Responde 200 OK**

Mercado Pago espera una respuesta `200 OK` rápidamente. Si no la recibe, reintentará enviar la notificación.

```typescript
// ✅ CORRECTO
res.status(200).send('OK');

// ❌ INCORRECTO - No hagas esto
res.status(500).json({ error: 'Error' });
```

### 2. **Procesa de Forma Asíncrona**

Si necesitas hacer operaciones pesadas (enviar emails, generar facturas, etc.), hazlo después de responder:

```typescript
// Responde primero
res.status(200).send('OK');

// Luego procesa (en background)
setTimeout(async () => {
  await sendConfirmationEmail(payment);
  await generateInvoice(payment);
}, 0);
```

### 3. **Valida las Notificaciones (Producción)**

En producción, deberías validar que la notificación realmente viene de Mercado Pago:

```typescript
// Verificar headers de seguridad
const xSignature = req.headers['x-signature'];
const xRequestId = req.headers['x-request-id'];

// Validar con tu secret key
// (Implementación específica según la documentación de MP)
```

### 4. **Webhooks en Desarrollo Local**

En desarrollo local (`localhost`), Mercado Pago **NO puede enviar webhooks** porque no puede acceder a tu máquina local.

**Soluciones:**
- Usa un túnel como [ngrok](https://ngrok.com/) para exponer tu servidor local
- O simplemente actualiza el estado manualmente cuando el usuario vuelve a tu sitio

## 🛠️ Mejoras que Podrías Implementar

### 1. **Logging Detallado**

```typescript
console.log('Webhook recibido:', {
  type: req.body.type,
  data: req.body.data,
  timestamp: new Date().toISOString(),
});
```

### 2. **Manejo de Diferentes Tipos**

```typescript
switch (type) {
  case 'payment':
    await handlePaymentNotification(data);
    break;
  case 'merchant_order':
    await handleOrderNotification(data);
    break;
  default:
    console.log('Tipo de notificación desconocido:', type);
}
```

### 3. **Actualizar Estado del Pedido**

```typescript
if (payment.status === 'approved') {
  // Marcar pedido como pagado
  await orderService.markAsPaid(payment.orderId);
  
  // Enviar email de confirmación
  await emailService.sendConfirmation(payment.userEmail);
  
  // Actualizar inventario
  await inventoryService.updateStock(payment.items);
}
```

## 📚 Recursos

- [Documentación de Webhooks - Mercado Pago](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)
- [Tipos de Notificaciones](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)
- [Validación de Webhooks](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)

## 🎯 Resumen

**Webhooks = Notificaciones automáticas de Mercado Pago a tu servidor**

- ✅ Mantienen tu base de datos actualizada automáticamente
- ✅ Funcionan incluso si el usuario no vuelve a tu sitio
- ✅ Son esenciales para pagos pendientes y reversiones
- ✅ Debes responder rápidamente con `200 OK`
- ⚠️ No funcionan en `localhost` sin un túnel (ngrok)

