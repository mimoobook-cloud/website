"use client";

import { useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  Check,
  Camera,
  X,
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Info,
} from "lucide-react";
import Checkout from "@/components/Checkout";

/* ══════════════════════════════════════════════════════════════
   FLUXO DE VENDA — 3 STEPS (sem escolha de plano)
   Step 1: Informacoes do cliente
   Step 2: Upload de fotos (sem limite — plano auto-detectado)
   Step 3: Revisao com plano calculado → POST + WhatsApp

   Regras de plano:
   - Ate 20 fotos → Essencial (R$ 149)
   - 21-40 fotos  → Especial (R$ 199)
   - 41-60 fotos  → Premium (R$ 250)
   - Acima de 60  → Premium + R$ 3,50 por foto extra
   ══════════════════════════════════════════════════════════════ */

function getPlanFromPhotos(count: number) {
  if (count <= 20) {
    return {
      id: "essencial",
      name: "Essencial",
      basePrice: 149,
      includedPhotos: 20,
      extras: 0,
      extraCost: 0,
      total: 149,
    };
  }
  if (count <= 40) {
    return {
      id: "especial",
      name: "Especial",
      basePrice: 199,
      includedPhotos: 40,
      extras: 0,
      extraCost: 0,
      total: 199,
    };
  }
  const extras = Math.max(0, count - 60);
  const extraCost = extras * 3.5;
  return {
    id: "premium",
    name: "Premium",
    basePrice: 250,
    includedPhotos: 60,
    extras,
    extraCost,
    total: 250 + extraCost,
  };
}

const categories = [
  { value: "casal", label: "Casal" },
  { value: "pet", label: "Pet" },
  { value: "familia", label: "Familia" },
  { value: "momentos", label: "Momentos" },
];

const STEP_LABELS = ["Info", "Fotos", "Revisao", "Pagamento"];

function OrderFlow() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    category: initialCategory,
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const plan = getPlanFromPhotos(photos.length);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
    }
    setFormData((prev) => ({ ...prev, whatsapp: value }));
  };

  const handlePhotos = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setPhotos((prev) => [...prev, ...files]);
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      setPreviews((prev) => [...prev, ...newPreviews]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    []
  );

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceedStep1 =
    formData.name.trim() && formData.whatsapp.trim() && formData.category;
  const canProceedStep2 = photos.length > 0;

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Callback apos pagamento aprovado
  const handlePaymentSuccess = (paymentId: string, orderNumber: string) => {
    const categoryLabel =
      categories.find((c) => c.value === formData.category)?.label || "";

    const msg = [
      `*Pedido Pago — Mimoobook*`,
      `*Pedido:* #${orderNumber}`,
      `*Pagamento:* #${paymentId}`,
      ``,
      `*Plano:* ${plan.name}${plan.extras > 0 ? ` + ${plan.extras} fotos extras` : ""}`,
      `*Valor:* R$ ${plan.total.toFixed(2)}`,
      `*Nome:* ${formData.name}`,
      `*Categoria:* ${categoryLabel}`,
      formData.message ? `*Dedicatoria:* "${formData.message}"` : "",
      `*Fotos:* ${photos.length}`,
      ``,
      `_Pagamento confirmado! Vamos preparar seu Mimoobook._`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/5521982077479?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // Plan indicator badge for step 2
  const PlanBadge = () => {
    if (photos.length === 0) return null;
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md border border-rose-light/20 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light">Seu plano atual</p>
            <p className="text-lg font-bold text-dark">
              {plan.name}{" "}
              <span className="text-rose">
                R$ {plan.total.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-light">{photos.length} fotos</p>
            {photos.length <= 20 && (
              <p className="text-xs text-rose">
                +{20 - photos.length} fotos = ainda Essencial
              </p>
            )}
            {photos.length > 20 && photos.length <= 40 && (
              <p className="text-xs text-rose">
                +{40 - photos.length} fotos = ainda Especial
              </p>
            )}
            {photos.length > 40 && photos.length <= 60 && (
              <p className="text-xs text-rose">
                +{60 - photos.length} fotos = ainda Premium
              </p>
            )}
            {photos.length > 60 && (
              <p className="text-xs text-amber-600">
                {plan.extras} extras × R$ 3,50 = +R$ {plan.extraCost.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar visual dos planos */}
        <div className="mt-3 flex gap-1">
          <div className="flex-1">
            <div className={`h-1.5 rounded-full ${photos.length >= 1 ? "bg-rose" : "bg-nude-light"}`} />
            <p className="text-[10px] text-text-light mt-1">Essencial (ate 20)</p>
          </div>
          <div className="flex-1">
            <div className={`h-1.5 rounded-full ${photos.length > 20 ? "bg-rose" : "bg-nude-light"}`} />
            <p className="text-[10px] text-text-light mt-1">Especial (21-40)</p>
          </div>
          <div className="flex-1">
            <div className={`h-1.5 rounded-full ${photos.length > 40 ? "bg-rose" : "bg-nude-light"}`} />
            <p className="text-[10px] text-text-light mt-1">Premium (41-60)</p>
          </div>
          <div className="flex-1">
            <div className={`h-1.5 rounded-full ${photos.length > 60 ? "bg-amber-400" : "bg-nude-light"}`} />
            <p className="text-[10px] text-text-light mt-1">Extra (+R$3,50/foto)</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step > i + 1
                      ? "bg-rose text-white"
                      : step === i + 1
                        ? "bg-rose text-white"
                        : "bg-nude-light text-text-light"
                  }`}
                >
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span
                  className={`hidden sm:block text-sm font-medium ${
                    step >= i + 1 ? "text-dark" : "text-text-light"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-nude-light rounded-full overflow-hidden">
            <div
              className="h-full bg-rose rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Informacoes */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Crie seu <span className="text-rose italic">Mimoobook</span>
              </h1>
              <p className="text-text-light">
                Preencha seus dados e depois selecione suas fotos.
                O plano e calculado automaticamente pela quantidade de fotos.
              </p>
            </div>

            <div className="max-w-lg mx-auto space-y-6">
              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  Seu nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Como podemos te chamar?"
                  className="w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  Categoria
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-2">
                  Dedicatoria / mensagem especial{" "}
                  <span className="font-normal text-text-light">(opcional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Ex: 'Pra voce, que e o amor da minha vida...'"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent resize-none"
                />
              </div>

              {/* Info planos */}
              <div className="bg-rose/5 rounded-2xl p-4 border border-rose/20">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-rose mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-text">
                    <p className="font-bold text-dark mb-1">Como funciona o preco?</p>
                    <p>Ate 20 fotos = <strong>Essencial R$ 149</strong></p>
                    <p>21 a 40 fotos = <strong>Especial R$ 199</strong></p>
                    <p>41 a 60 fotos = <strong>Premium R$ 250</strong></p>
                    <p>Acima de 60 = Premium + <strong>R$ 3,50 por foto extra</strong></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"
                >
                  <ArrowLeft size={18} />
                  Voltar
                </Link>
                <button
                  onClick={goNext}
                  disabled={!canProceedStep1}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proximo: Selecionar Fotos
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Upload de fotos (sem limite) */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Selecione suas <span className="text-rose italic">fotos</span>
              </h1>
              <p className="text-text-light">
                Escolha quantas fotos quiser. O plano se ajusta automaticamente.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <PlanBadge />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rose/40 rounded-2xl p-8 text-center cursor-pointer hover:border-rose hover:bg-rose/5 transition-all mb-6"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotos}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center">
                    <Camera size={28} className="text-rose" />
                  </div>
                  <p className="font-bold text-dark">
                    Toque para abrir a galeria
                  </p>
                  <p className="text-sm text-text-light">
                    {photos.length === 0
                      ? "Nenhuma foto selecionada ainda"
                      : `${photos.length} foto${photos.length > 1 ? "s" : ""} selecionada${photos.length > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-dark">
                    {photos.length} foto{photos.length > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-sm font-medium text-rose hover:text-rose-dark"
                  >
                    <ImagePlus size={16} />
                    Adicionar mais
                  </button>
                </div>
              )}

              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`Foto ${i + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-dark/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-dark/70 text-white text-xs px-2 py-0.5 rounded-full">
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"
                >
                  <ArrowLeft size={18} />
                  Voltar
                </button>
                <button
                  onClick={goNext}
                  disabled={!canProceedStep2}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proximo: Revisao
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Revisao + Finalizar */}
        {step === 3 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Revise seu <span className="text-rose italic">pedido</span>
              </h1>
              <p className="text-text-light">
                Confira tudo antes de finalizar.
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-light/20 space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Plano detectado</span>
                  <span className="font-bold text-dark">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Fotos</span>
                  <span className="font-bold text-dark">{photos.length}</span>
                </div>
                {plan.extras > 0 && (
                  <div className="flex justify-between items-center pb-4 border-b border-cream">
                    <span className="text-text-light text-sm">
                      Fotos extras ({plan.extras} × R$ 3,50)
                    </span>
                    <span className="font-bold text-amber-600">
                      + R$ {plan.extraCost.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-4 border-b border-cream bg-rose/5 -mx-6 px-6 py-3">
                  <span className="font-bold text-dark text-lg">Total</span>
                  <span className="font-bold text-rose text-2xl">
                    R$ {plan.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Nome</span>
                  <span className="font-bold text-dark">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">WhatsApp</span>
                  <span className="font-bold text-dark">{formData.whatsapp}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Categoria</span>
                  <span className="font-bold text-dark">
                    {categories.find((c) => c.value === formData.category)?.label || "—"}
                  </span>
                </div>
                {formData.message && (
                  <div className="pb-4 border-b border-cream">
                    <span className="text-text-light text-sm block mb-1">Dedicatoria</span>
                    <p className="text-dark italic">&ldquo;{formData.message}&rdquo;</p>
                  </div>
                )}
              </div>

              {previews.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Foto ${i + 1}`}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Kit info */}
              <div className="bg-rose/5 rounded-2xl p-4 mb-8 border border-rose/20">
                <p className="text-sm text-text leading-relaxed">
                  <strong>Voce vai receber em casa:</strong> scrapbook A5 com
                  folhas pretas, {photos.length} fotos impressas em Polaroid
                  (180g), caneta branca, cola bastao e
                  {plan.id === "essencial" && " 1 cartela de adesivos tematicos"}
                  {plan.id === "especial" && " 2 cartelas de adesivos premium"}
                  {plan.id === "premium" && " 3 cartelas de adesivos exclusivos + recortes decorativos"}
                  . Envio em ate 7 dias uteis.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"
                >
                  <ArrowLeft size={18} />
                  Voltar
                </button>
                <button
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-rose text-white rounded-full font-bold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
                >
                  Ir para Pagamento — R$ {plan.total.toFixed(2)}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Pagamento Mercado Pago */}
        {step === 4 && (
          <div className="max-w-lg mx-auto">
            <Checkout
              amount={plan.total}
              orderData={{
                plan: plan.id,
                name: formData.name,
                whatsapp: formData.whatsapp.replace(/\D/g, ""),
                category: formData.category,
                message: formData.message,
                photoCount: photos.length,
                total: plan.total,
                extras: plan.extras,
              }}
              photos={photos}
              onSuccess={handlePaymentSuccess}
              onBack={goBack}
            />
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-sm text-text-light hover:text-rose transition-colors"
          >
            ← Voltar para a pagina inicial
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PedidoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-24 pb-16 bg-cream flex items-center justify-center">
          <p className="text-text-light">Carregando...</p>
        </main>
      }
    >
      <OrderFlow />
    </Suspense>
  );
}
