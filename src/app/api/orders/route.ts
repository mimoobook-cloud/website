import { NextResponse } from "next/server";

/**
 * POST /api/orders
 *
 * Cria um novo pedido.
 * TODO: Integrar com banco de dados real
 * TODO: Integrar upload de imagens para S3
 *       - Usar @aws-sdk/client-s3 + @aws-sdk/s3-request-presigner
 *       - Gerar presigned URLs para upload direto do browser
 *       - Salvar as URLs das imagens no pedido
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { plan, name, whatsapp, category, message, photoCount, pages } = body;

    // Validacao basica
    if (!plan || !name || !whatsapp || !category) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatorios faltando" },
        { status: 400 }
      );
    }

    // Gerar numero do pedido
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `MMB-${timestamp}-${random}`;

    // TODO: Salvar pedido no banco de dados
    // await db.orders.create({
    //   orderNumber,
    //   plan,
    //   name,
    //   whatsapp,
    //   category,
    //   message,
    //   photoCount,
    //   pages, // layout das fotos no scrapbook
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    // TODO: Gerar presigned URLs para upload das fotos ao S3
    // const uploadUrls = await generatePresignedUrls(orderNumber, photoCount);

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Pedido criado com sucesso!",
      // uploadUrls, // TODO: retornar URLs para upload
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
