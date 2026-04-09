import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/**
 * POST /api/upload
 * Upload de fotos para o Supabase Storage
 * Recebe FormData com: orderId + files[]
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const orderId = formData.get("orderId") as string;
    const files = formData.getAll("files") as File[];

    if (!orderId || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "orderId e files obrigatorios" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const uploadedPhotos: { fileName: string; filePath: string; fileSize: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `foto-${String(i + 1).padStart(3, "0")}.${ext}`;
      const filePath = `${orderId}/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("order-photos")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error(`Upload error for ${fileName}:`, uploadError);
        continue;
      }

      uploadedPhotos.push({
        fileName,
        filePath,
        fileSize: file.size,
      });
    }

    // Salvar referencias no banco
    if (uploadedPhotos.length > 0) {
      const { error: dbError } = await supabase.from("order_photos").insert(
        uploadedPhotos.map((p) => ({
          order_id: orderId,
          file_name: p.fileName,
          file_path: p.filePath,
          file_size: p.fileSize,
        }))
      );

      if (dbError) {
        console.error("DB insert error:", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: uploadedPhotos.length,
      total: files.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
