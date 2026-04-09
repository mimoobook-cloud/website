import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client para uso no BROWSER (anon key)
 * Usado para upload de fotos no Storage
 */
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Supabase client para uso no SERVER (service_role)
 * Usado nas API routes para CRUD de pedidos
 * NUNCA expor no frontend
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
