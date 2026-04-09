import { NextResponse } from "next/server";

/* ══════════════════════════════════════════════════════════════
   POST /api/shipping
   Cotacao de frete via Envia.com
   Tenta carriers brasileiros; se falhar, usa tabela de fallback
   ══════════════════════════════════════════════════════════════ */

// Endereco de origem (Mimoobook) — ATUALIZAR com endereco real
const ORIGIN = {
  name: "Mimoobook",
  phone: "+5521982077479",
  street: "Rua a definir",
  city: "Rio de Janeiro",
  state: "RJ",
  country: "BR",
  postalCode: "20000000", // ATUALIZAR com CEP real
};

// Dimensoes do pacote por plano (caixa Printi Hot Stamping)
function getPackageDimensions(photoCount: number) {
  if (photoCount <= 20) return { weight: 0.6, height: 5 };
  if (photoCount <= 40) return { weight: 0.9, height: 7 };
  return { weight: 1.3, height: 9 };
}

// Carriers brasileiros para tentar na Envia
const BR_CARRIERS = ["correios", "jadlog", "loggi", "azul"];

// Tabela de frete fallback por regiao (caso Envia nao retorne)
function getFallbackShipping(destState: string) {
  const same = ["RJ"];
  const sudeste = ["SP", "MG", "ES"];
  const sul = ["PR", "SC", "RS"];
  const nordeste = ["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"];
  const norte = ["AM", "PA", "AP", "RR", "RO", "AC", "TO"];
  const centroOeste = ["GO", "MT", "MS", "DF"];

  const uf = destState.toUpperCase();

  const options = [];

  if (same.includes(uf)) {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 18.9, days: "10-15 dias uteis", id: "padrao" },
      { carrier: "Envio Expresso", service: "Expresso", price: 29.9, days: "5-8 dias uteis", id: "expresso" }
    );
  } else if (sudeste.includes(uf)) {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 22.9, days: "12-18 dias uteis", id: "padrao" },
      { carrier: "Envio Expresso", service: "Expresso", price: 34.9, days: "7-10 dias uteis", id: "expresso" }
    );
  } else if (sul.includes(uf)) {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 25.9, days: "15-20 dias uteis", id: "padrao" },
      { carrier: "Envio Expresso", service: "Expresso", price: 39.9, days: "8-12 dias uteis", id: "expresso" }
    );
  } else if (nordeste.includes(uf)) {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 28.9, days: "15-25 dias uteis", id: "padrao" },
      { carrier: "Envio Expresso", service: "Expresso", price: 44.9, days: "10-15 dias uteis", id: "expresso" }
    );
  } else if (norte.includes(uf) || centroOeste.includes(uf)) {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 32.9, days: "18-28 dias uteis", id: "padrao" },
      { carrier: "Envio Expresso", service: "Expresso", price: 49.9, days: "12-18 dias uteis", id: "expresso" }
    );
  } else {
    options.push(
      { carrier: "Envio Padrao", service: "Padrao", price: 29.9, days: "15-25 dias uteis", id: "padrao" }
    );
  }

  return options;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cep, state, photoCount } = body;

    if (!cep) {
      return NextResponse.json(
        { success: false, error: "CEP obrigatorio" },
        { status: 400 }
      );
    }

    const pkg = getPackageDimensions(photoCount || 20);
    const enviaKey = process.env.ENVIA_API_KEY;
    const enviaBase = process.env.ENVIA_BASE_URL || "https://api.envia.com";

    // Tentar Envia.com para cada carrier
    const enviaOptions: { carrier: string; service: string; price: number; days: string; id: string }[] = [];

    if (enviaKey) {
      const ratePromises = BR_CARRIERS.map(async (carrier) => {
        try {
          const res = await fetch(`${enviaBase}/ship/rate/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${enviaKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin: {
                name: ORIGIN.name,
                phone: ORIGIN.phone,
                street: ORIGIN.street,
                city: ORIGIN.city,
                state: ORIGIN.state,
                country: ORIGIN.country,
                postalCode: ORIGIN.postalCode.replace(/\D/g, ""),
              },
              destination: {
                name: "Cliente",
                phone: "+5500000000000",
                street: "A definir",
                city: "A definir",
                state: state || "SP",
                country: "BR",
                postalCode: cep.replace(/\D/g, ""),
              },
              packages: [
                {
                  type: "box",
                  content: "Scrapbook personalizado",
                  amount: 1,
                  declaredValue: 200,
                  lengthUnit: "CM",
                  weightUnit: "KG",
                  weight: pkg.weight,
                  dimensions: {
                    length: 25,
                    width: 20,
                    height: pkg.height,
                  },
                },
              ],
              shipment: {
                type: 1,
                carrier,
              },
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.data) {
              const rates = Array.isArray(data.data) ? data.data : [data.data];
              for (const rate of rates) {
                if (rate.totalPrice || rate.total_price) {
                  enviaOptions.push({
                    carrier: rate.carrier || carrier,
                    service: rate.service || rate.serviceDescription || "Padrao",
                    price: Number(rate.totalPrice || rate.total_price),
                    days: rate.deliveryEstimate || rate.delivery_estimate || "15-25 dias",
                    id: `envia-${carrier}-${rate.service || "std"}`,
                  });
                }
              }
            }
          }
        } catch {
          // Carrier nao disponivel, ignorar
        }
      });

      await Promise.all(ratePromises);
    }

    // Se Envia retornou opcoes, usar; senao, fallback
    const options =
      enviaOptions.length > 0
        ? enviaOptions.sort((a, b) => a.price - b.price)
        : getFallbackShipping(state || "SP");

    return NextResponse.json({
      success: true,
      options,
      source: enviaOptions.length > 0 ? "envia" : "fallback",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao calcular frete";
    console.error("Shipping error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
