import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/**
 * POST /api/orders
 * Cria um novo pedido no Supabase
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      plan,
      name,
      whatsapp,
      email,
      category,
      message,
      photoCount,
      total,
      extras,
      paymentId,
      paymentMethod,
      paymentStatus,
      installments,
    } = body;

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

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        plan,
        name,
        whatsapp,
        email: email || null,
        category,
        message: message || null,
        photo_count: photoCount || 0,
        extras: extras || 0,
        total: total || 0,
        payment_id: paymentId || null,
        payment_method: paymentMethod || null,
        payment_status: paymentStatus || "pending",
        installments: installments || null,
        status: paymentStatus === "approved" ? "paid" : "pending_payment",
      })
      .select("id, order_number")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderNumber: data.order_number,
      orderId: data.id,
      message: "Pedido criado com sucesso!",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Order creation error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders
 * Atualiza status do pedido (ex: apos pagamento)
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, paymentMethod, paymentStatus, installments } =
      body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "orderId obrigatorio" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const updateData: Record<string, unknown> = {};
    if (paymentId) updateData.payment_id = paymentId;
    if (paymentMethod) updateData.payment_method = paymentMethod;
    if (paymentStatus) updateData.payment_status = paymentStatus;
    if (installments) updateData.installments = installments;
    if (paymentStatus === "approved") updateData.status = "paid";

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
