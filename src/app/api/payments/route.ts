import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

/**
 * POST /api/payments
 * Processa pagamento via Mercado Pago (checkout transparente)
 *
 * Body para CARTAO:
 *   { type: "card", token, installments, issuerId, paymentMethodId, amount, payer, orderData }
 *
 * Body para PIX:
 *   { type: "pix", amount, payer, orderData }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payment = new Payment(client);

    if (body.type === "pix") {
      const result = await payment.create({
        body: {
          transaction_amount: body.amount,
          payment_method_id: "pix",
          payer: {
            email: body.payer.email,
            first_name: body.payer.firstName,
            last_name: body.payer.lastName,
          },
          description: `Mimoobook ${body.orderData?.plan || ""} - ${body.orderData?.photoCount || 0} fotos`,
          metadata: {
            order_name: body.orderData?.name,
            order_whatsapp: body.orderData?.whatsapp,
            order_category: body.orderData?.category,
            order_photo_count: body.orderData?.photoCount,
          },
        },
      });

      return NextResponse.json({
        success: true,
        paymentId: result.id,
        status: result.status,
        qrCode: result.point_of_interaction?.transaction_data?.qr_code,
        qrCodeBase64:
          result.point_of_interaction?.transaction_data?.qr_code_base64,
        ticketUrl:
          result.point_of_interaction?.transaction_data?.ticket_url,
        expirationDate: result.date_of_expiration,
      });
    }

    if (body.type === "card") {
      const result = await payment.create({
        body: {
          transaction_amount: body.amount,
          token: body.token,
          installments: body.installments,
          issuer_id: body.issuerId,
          payment_method_id: body.paymentMethodId,
          payer: {
            email: body.payer.email,
            first_name: body.payer.firstName,
            last_name: body.payer.lastName,
            identification: body.payer.identification,
          },
          description: `Mimoobook ${body.orderData?.plan || ""} - ${body.orderData?.photoCount || 0} fotos`,
          metadata: {
            order_name: body.orderData?.name,
            order_whatsapp: body.orderData?.whatsapp,
            order_category: body.orderData?.category,
            order_photo_count: body.orderData?.photoCount,
          },
        },
      });

      return NextResponse.json({
        success: true,
        paymentId: result.id,
        status: result.status,
        statusDetail: result.status_detail,
      });
    }

    return NextResponse.json(
      { success: false, error: "Tipo de pagamento invalido" },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Payment error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
