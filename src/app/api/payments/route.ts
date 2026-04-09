import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "MP_ACCESS_TOKEN nao configurado" },
        { status: 500 }
      );
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);
    const body = await request.json();

    if (body.type === "pix") {
      const result = await payment.create({
        body: {
          transaction_amount: Number(body.amount),
          payment_method_id: "pix",
          payer: {
            email: body.payer.email,
            first_name: body.payer.firstName,
            last_name: body.payer.lastName,
          },
          description: `Mimoobook ${body.orderData?.plan || ""} - ${body.orderData?.photoCount || 0} fotos`,
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
      });
    }

    if (body.type === "card") {
      const result = await payment.create({
        body: {
          transaction_amount: Number(body.amount),
          token: body.token,
          installments: Number(body.installments),
          issuer_id: body.issuerId,
          payment_method_id: body.paymentMethodId,
          payer: {
            email: body.payer.email,
            first_name: body.payer.firstName,
            last_name: body.payer.lastName,
            identification: body.payer.identification,
          },
          description: `Mimoobook ${body.orderData?.plan || ""} - ${body.orderData?.photoCount || 0} fotos`,
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
    console.error("Payment error:", JSON.stringify(err, null, 2));

    let message = "Erro ao processar pagamento";
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "object" && err !== null) {
      const e = err as Record<string, unknown>;
      message =
        (e.message as string) ||
        (e.cause as string) ||
        JSON.stringify(e);
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
