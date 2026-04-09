-- ══════════════════════════════════════════════════════════════
-- MIMOOBOOK — Setup do banco de dados
-- Executar no SQL Editor do Supabase Dashboard
-- URL: https://supabase.com/dashboard/project/vuabcogpcfqlnvncocbs/sql
-- ══════════════════════════════════════════════════════════════

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('essencial', 'especial', 'premium')),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL CHECK (category IN ('casal', 'pet', 'familia', 'momentos')),
  message TEXT,
  photo_count INTEGER NOT NULL DEFAULT 0,
  extras INTEGER NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_id TEXT,
  payment_method TEXT CHECK (payment_method IN ('pix', 'card')),
  payment_status TEXT DEFAULT 'pending',
  installments INTEGER,
  status TEXT NOT NULL DEFAULT 'pending_payment'
    CHECK (status IN ('pending_payment', 'paid', 'producing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de fotos do pedido
CREATE TABLE IF NOT EXISTS order_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indice para busca por order_number
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Indice para busca por status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Indice para busca de fotos por pedido
CREATE INDEX IF NOT EXISTS idx_order_photos_order_id ON order_photos(order_id);

-- Funcao para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de updated_at na tabela orders
DROP TRIGGER IF EXISTS trigger_orders_updated_at ON orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Storage bucket para fotos (executar via API ou dashboard)
-- No dashboard: Storage > New Bucket > "order-photos" > Public: OFF
