import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/**
 * GET /api/setup
 * Roda uma vez para criar o storage bucket.
 * As tabelas devem ser criadas via SQL Editor no dashboard.
 */
export async function GET() {
  try {
    const supabase = createServerClient();

    // Criar bucket de fotos
    const { error: bucketError } = await supabase.storage.createBucket(
      "order-photos",
      {
        public: false,
        fileSizeLimit: 10485760, // 10MB por foto
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
      }
    );

    if (bucketError && !bucketError.message.includes("already exists")) {
      return NextResponse.json(
        { success: false, error: bucketError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Storage bucket 'order-photos' criado. Agora execute o SQL no dashboard.",
      sqlPath: "supabase/setup.sql",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
