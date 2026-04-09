"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CreditCard,
  QrCode,
  Check,
  Loader2,
  Copy,
  AlertCircle,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   CHECKOUT TRANSPARENTE — MERCADO PAGO
   - Pix (QR code + copia e cola)
   - Cartao de credito em ate 12x (juros repassados ao cliente)
   ══════════════════════════════════════════════════════════════ */

declare global {
  interface Window {
    MercadoPago: new (publicKey: string, options?: { locale: string }) => MercadoPagoInstance;
  }
}

interface MercadoPagoInstance {
  createCardToken: (data: CardTokenData) => Promise<{ id: string }>;
  getInstallments: (data: { amount: string; bin: string }) => Promise<InstallmentResult[]>;
  getPaymentMethods: (data: { bin: string }) => Promise<{ results: PaymentMethodResult[] }>;
}

interface CardTokenData {
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

interface InstallmentResult {
  payment_method_id: string;
  payment_type_id: string;
  issuer: { id: string; name: string };
  payer_costs: PayerCost[];
}

interface PayerCost {
  installments: number;
  installment_rate: number;
  total_amount: number;
  installment_amount: number;
  recommended_message: string;
}

interface PaymentMethodResult {
  id: string;
  name: string;
  payment_type_id: string;
  thumbnail: string;
}

interface OrderData {
  plan: string;
  name: string;
  whatsapp: string;
  category: string;
  message: string;
  photoCount: number;
  total: number;
  extras: number;
}

interface Props {
  amount: number;
  orderData: OrderData;
  photos: File[];
  onSuccess: (paymentId: string, orderNumber: string) => void;
  onBack: () => void;
}

async function createOrder(orderData: OrderData, email: string) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...orderData, email }),
  });
  return res.json();
}

async function updateOrder(orderId: string, paymentData: Record<string, unknown>) {
  await fetch("/api/orders", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, ...paymentData }),
  });
}

async function uploadPhotos(orderId: string, photos: File[]) {
  const formData = new FormData();
  formData.append("orderId", orderId);
  photos.forEach((photo) => formData.append("files", photo));
  await fetch("/api/upload", { method: "POST", body: formData });
}

export default function Checkout({ amount, orderData, photos, onSuccess, onBack }: Props) {
  const [method, setMethod] = useState<"pix" | "card">("pix");
  const [mpReady, setMpReady] = useState(false);
  const [mp, setMp] = useState<MercadoPagoInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [installments, setInstallments] = useState(1);
  const [availableInstallments, setAvailableInstallments] = useState<PayerCost[]>([]);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [issuerId, setIssuerId] = useState("");

  // Pix state
  const [pixQr, setPixQr] = useState("");
  const [pixQrBase64, setPixQrBase64] = useState("");
  const [pixCopied, setPixCopied] = useState(false);
  const [pixPaid, setPixPaid] = useState(false);

  // Load MP SDK
  useEffect(() => {
    if (window.MercadoPago) {
      const instance = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
        { locale: "pt-BR" }
      );
      setMp(instance);
      setMpReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const instance = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
        { locale: "pt-BR" }
      );
      setMp(instance);
      setMpReady(true);
    };
    document.head.appendChild(script);
  }, []);

  // Fetch installments when card BIN changes
  const fetchInstallments = useCallback(
    async (bin: string) => {
      if (!mp || bin.length < 6) return;
      try {
        const methods = await mp.getPaymentMethods({ bin });
        if (methods.results.length > 0) {
          setPaymentMethodId(methods.results[0].id);
        }

        const result = await mp.getInstallments({
          amount: amount.toFixed(2),
          bin,
        });
        if (result.length > 0) {
          setIssuerId(result[0].issuer.id);
          setAvailableInstallments(result[0].payer_costs);
        }
      } catch {
        setAvailableInstallments([]);
      }
    },
    [mp, amount]
  );

  useEffect(() => {
    const clean = cardNumber.replace(/\D/g, "");
    if (clean.length >= 6) {
      fetchInstallments(clean.substring(0, 6));
    }
  }, [cardNumber, fetchInstallments]);

  // Format card number
  const formatCardNumber = (v: string) => {
    const clean = v.replace(/\D/g, "").substring(0, 16);
    return clean.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // Format expiry
  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, "").substring(0, 4);
    if (clean.length > 2) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    return clean;
  };

  // Format CPF
  const formatCpf = (v: string) => {
    const clean = v.replace(/\D/g, "").substring(0, 11);
    if (clean.length > 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
    if (clean.length > 6) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
    if (clean.length > 3) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
    return clean;
  };

  // --- PIX ---
  const handlePix = async () => {
    if (!email.trim()) {
      setError("Preencha seu e-mail para gerar o Pix");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pix",
          amount,
          payer: {
            email,
            firstName: orderData.name.split(" ")[0],
            lastName: orderData.name.split(" ").slice(1).join(" ") || ".",
          },
          orderData,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Erro ao gerar Pix");
        setLoading(false);
        return;
      }

      setPixQr(data.qrCode || "");
      setPixQrBase64(data.qrCodeBase64 || "");

      // Create order in Supabase
      const orderResult = await createOrder(orderData, email);
      if (!orderResult.success) {
        setError("Erro ao registrar pedido");
        setLoading(false);
        return;
      }

      // Update order with payment info
      await updateOrder(orderResult.orderId, {
        paymentId: data.paymentId,
        paymentMethod: "pix",
        paymentStatus: data.status,
      });

      if (data.status === "approved") {
        // Upload photos to Supabase Storage
        await uploadPhotos(orderResult.orderId, photos);
        setPixPaid(true);
        onSuccess(data.paymentId, orderResult.orderNumber);
      }
      // For pending pix, show QR code (upload after confirmation)
    } catch {
      setError("Erro de conexao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyPix = () => {
    navigator.clipboard?.writeText(pixQr);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  // --- CARD ---
  const handleCard = async () => {
    if (!mp) return;
    if (!email.trim() || !cpf.trim() || !cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [expMonth, expYear] = cardExpiry.split("/");

      const tokenResult = await mp.createCardToken({
        cardNumber: cardNumber.replace(/\D/g, ""),
        cardholderName: cardName,
        cardExpirationMonth: expMonth,
        cardExpirationYear: `20${expYear}`,
        securityCode: cardCvv,
        identificationType: "CPF",
        identificationNumber: cpf.replace(/\D/g, ""),
      });

      // Calculate amount with installments (juros repassados)
      const selectedInstallment = availableInstallments.find(
        (i) => i.installments === installments
      );
      const finalAmount = selectedInstallment
        ? selectedInstallment.total_amount
        : amount;

      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "card",
          token: tokenResult.id,
          installments,
          issuerId,
          paymentMethodId,
          amount: finalAmount,
          payer: {
            email,
            firstName: orderData.name.split(" ")[0],
            lastName: orderData.name.split(" ").slice(1).join(" ") || ".",
            identification: {
              type: "CPF",
              number: cpf.replace(/\D/g, ""),
            },
          },
          orderData,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Pagamento recusado. Verifique os dados.");
        setLoading(false);
        return;
      }

      // Create order in Supabase
      const orderResult = await createOrder(orderData, email);

      // Update order with payment info
      await updateOrder(orderResult.orderId, {
        paymentId: data.paymentId,
        paymentMethod: "card",
        paymentStatus: data.status,
        installments,
      });

      if (data.status === "approved") {
        // Upload photos to Supabase Storage
        await uploadPhotos(orderResult.orderId, photos);
        onSuccess(data.paymentId, orderResult.orderNumber);
      } else if (data.status === "in_process") {
        setError("Pagamento em analise. Voce sera notificado por e-mail.");
      } else {
        setError(`Pagamento ${data.statusDetail || "recusado"}. Tente outro cartao.`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao processar";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent text-sm";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark text-center">
        Pagamento — <span className="text-rose">R$ {amount.toFixed(2)}</span>
      </h2>

      {/* Method selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setMethod("pix")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            method === "pix"
              ? "bg-rose text-white shadow-lg"
              : "bg-white border border-nude text-text hover:border-rose"
          }`}
        >
          <QrCode size={18} />
          Pix
        </button>
        <button
          onClick={() => setMethod("card")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            method === "card"
              ? "bg-rose text-white shadow-lg"
              : "bg-white border border-nude text-text hover:border-rose"
          }`}
        >
          <CreditCard size={18} />
          Cartao de Credito
        </button>
      </div>

      {/* Email (required for both) */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className={inputClass}
        />
      </div>

      {/* --- PIX --- */}
      {method === "pix" && (
        <div className="space-y-4">
          {!pixQr ? (
            <>
              <div className="bg-rose/5 rounded-xl p-4 border border-rose/20">
                <p className="text-sm text-text">
                  Ao clicar, um QR Code Pix sera gerado. Voce tera 30 minutos para pagar.
                  O pagamento e confirmado na hora.
                </p>
              </div>
              <button
                onClick={handlePix}
                disabled={loading || !email.trim()}
                className="w-full py-4 bg-rose text-white rounded-xl font-bold text-lg hover:bg-rose-dark transition-all disabled:opacity-40"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Gerando Pix...
                  </span>
                ) : (
                  `Pagar R$ ${amount.toFixed(2)} com Pix`
                )}
              </button>
            </>
          ) : (
            <div className="text-center space-y-4">
              {pixPaid ? (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <Check size={48} className="text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-green-700 text-lg">Pix confirmado!</p>
                </div>
              ) : (
                <>
                  {pixQrBase64 && (
                    <div className="bg-white rounded-xl p-6 shadow-md inline-block">
                      <img
                        src={`data:image/png;base64,${pixQrBase64}`}
                        alt="QR Code Pix"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                  )}
                  <p className="text-sm text-text-light">
                    Escaneie o QR Code ou copie o codigo abaixo
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={pixQr}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-nude rounded-lg text-xs text-text truncate"
                    />
                    <button
                      onClick={copyPix}
                      className="px-4 py-2 bg-rose text-white rounded-lg text-sm font-bold hover:bg-rose-dark flex items-center gap-1"
                    >
                      {pixCopied ? <Check size={14} /> : <Copy size={14} />}
                      {pixCopied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                  <p className="text-xs text-text-light">
                    Apos o pagamento, a confirmacao e automatica.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- CARTAO --- */}
      {method === "card" && (
        <div className="space-y-4">
          {!mpReady ? (
            <div className="text-center py-8">
              <Loader2 size={24} className="animate-spin text-rose mx-auto mb-2" />
              <p className="text-sm text-text-light">Carregando formulario...</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  Numero do cartao
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  Nome no cartao
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="NOME COMO ESTA NO CARTAO"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    maxLength={5}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark mb-2">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={inputClass}
                />
              </div>

              {/* Installments */}
              {availableInstallments.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Parcelas
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className={inputClass}
                  >
                    {availableInstallments.map((inst) => (
                      <option key={inst.installments} value={inst.installments}>
                        {inst.installments}x de R$ {inst.installment_amount.toFixed(2)}
                        {inst.installment_rate > 0
                          ? ` (total R$ ${inst.total_amount.toFixed(2)})`
                          : " sem juros"}
                      </option>
                    ))}
                  </select>
                  {installments > 1 && (
                    <p className="text-xs text-text-light mt-1">
                      {availableInstallments.find((i) => i.installments === installments)
                        ?.recommended_message}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleCard}
                disabled={loading}
                className="w-full py-4 bg-rose text-white rounded-xl font-bold text-lg hover:bg-rose-dark transition-all disabled:opacity-40"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Processando...
                  </span>
                ) : (
                  `Pagar R$ ${
                    installments > 1
                      ? (availableInstallments.find((i) => i.installments === installments)
                          ?.total_amount || amount
                        ).toFixed(2)
                      : amount.toFixed(2)
                  }`
                )}
              </button>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Back */}
      <button
        onClick={onBack}
        className="w-full text-center text-sm text-text-light hover:text-rose transition-colors"
      >
        ← Voltar para revisao
      </button>

      {/* MP badge */}
      <p className="text-center text-xs text-text-light/50">
        Pagamento processado com seguranca pelo Mercado Pago
      </p>
    </div>
  );
}
