"use client";

import { useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  Check,
  Star,
  Sparkles,
  Camera,
  X,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ImagePlus,
  Loader2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   FLUXO DE VENDA — 4 STEPS
   Step 1: Escolha do plano
   Step 2: Informacoes do cliente
   Step 3: Upload de fotos (abre galeria do celular)
   Step 4: Revisao → POST /api/orders + WhatsApp
   ══════════════════════════════════════════════════════════════ */

type Plan = "essencial" | "especial" | "premium";

const plans: {
  id: Plan;
  name: string;
  price: number;
  photos: number;
  features: string[];
  popular: boolean;
}[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: 149,
    photos: 20,
    features: [
      "20 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 com folhas pretas",
      "Caneta branca + cola bastao",
      "Cartela de adesivos tematicos",
      "Embalagem padrao",
      "Envio em ate 7 dias uteis",
    ],
    popular: false,
  },
  {
    id: "especial",
    name: "Especial",
    price: 199,
    photos: 40,
    features: [
      "40 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 com folhas pretas",
      "Caneta branca + cola bastao",
      "2 cartelas de adesivos premium",
      "Embalagem presente com laco",
      "Envio em ate 7 dias uteis",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 250,
    photos: 60,
    features: [
      "60 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 premium com folhas pretas",
      "Caneta branca + cola bastao",
      "3 cartelas de adesivos exclusivos",
      "Recortes decorativos",
      "Cartinha escrita a mao inclusa",
      "Embalagem premium de presente",
      "Envio em ate 7 dias uteis",
    ],
    popular: false,
  },
];

const categories = [
  { value: "casal", label: "Casal" },
  { value: "pet", label: "Pet" },
  { value: "familia", label: "Familia" },
  { value: "momentos", label: "Momentos" },
];

function OrderFlow() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "";
  const initialPlan = searchParams.get("plano") as Plan | null;

  const [step, setStep] = useState(initialPlan ? 2 : 1);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    initialPlan || null
  );
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    category: initialCategory,
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPlan = plans.find((p) => p.id === selectedPlan);
  const maxPhotos = currentPlan?.photos || 20;

  const handlePlanSelect = (planId: Plan) => {
    setSelectedPlan(planId);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      const remaining = maxPhotos - photos.length;
      const toAdd = files.slice(0, remaining);

      setPhotos((prev) => [...prev, ...toAdd]);
      const newPreviews = toAdd.map((f) => URL.createObjectURL(f));
      setPreviews((prev) => [...prev, ...newPreviews]);

      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [photos, maxPhotos]
  );

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceedStep2 =
    formData.name.trim() && formData.whatsapp.trim() && formData.category;
  const canProceedStep3 = photos.length > 0;

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FINALIZE: POST to API + WhatsApp ---
  const handleFinalize = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const categoryLabel =
        categories.find((c) => c.value === formData.category)?.label || "";

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          name: formData.name,
          whatsapp: formData.whatsapp.replace(/\D/g, ""),
          category: formData.category,
          message: formData.message,
          photoCount: photos.length,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Erro ao criar pedido. Tente novamente.");
        setIsSubmitting(false);
        return;
      }

      // TODO: Upload images to S3 using presigned URLs

      const msg = [
        `*Novo Pedido Mimoobook*`,
        `*Pedido:* #${data.orderNumber}`,
        ``,
        `*Plano:* ${currentPlan?.name} (R$ ${currentPlan?.price})`,
        `*Nome:* ${formData.name}`,
        `*Categoria:* ${categoryLabel}`,
        formData.message ? `*Dedicatoria:* "${formData.message}"` : "",
        `*Fotos:* ${photos.length} enviadas`,
        ``,
        `_Pedido registrado com sucesso!_`,
      ]
        .filter(Boolean)
        .join("\n");

      /* ═══════════════════════════════════════════
         Substitua SEUNUMERO pelo WhatsApp da loja
         Formato: 55 + DDD + numero (sem espacos)
         ═══════════════════════════════════════════ */
      const url = `https://wa.me/5521982077479?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    } catch {
      alert("Erro de conexao. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {["Plano", "Informacoes", "Fotos", "Revisao"].map((label, i) => (
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

        {/* STEP 1: Plano */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Escolha seu <span className="text-rose italic">plano</span>
              </h1>
              <p className="text-text-light">
                Todos feitos a mao com o mesmo carinho. Voce recebe o scrapbook
                com folhas pretas, fotos impressas em Polaroid, caneta branca e
                adesivos pra montar do seu jeito.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`relative rounded-3xl p-6 text-left transition-all hover:scale-105 ${
                    plan.popular
                      ? "bg-dark text-white shadow-2xl ring-2 ring-rose"
                      : "bg-white shadow-lg border border-rose-light/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose text-white text-xs font-bold px-4 py-1 rounded-full">
                      Mais escolhido
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-dark"}`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span
                      className={`text-sm ${plan.popular ? "text-white/60" : "text-text-light"}`}
                    >
                      R$
                    </span>
                    <span
                      className={`text-4xl font-bold ${plan.popular ? "text-rose-light" : "text-rose"}`}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-4 font-medium ${plan.popular ? "text-rose-light" : "text-rose"}`}
                  >
                    {plan.photos} fotos Polaroid
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${plan.popular ? "text-rose-light" : "text-rose"}`}
                        />
                        <span
                          className={`text-xs ${plan.popular ? "text-white/80" : "text-text-light"}`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Informacoes */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Suas <span className="text-rose italic">informacoes</span>
              </h1>
              <p className="text-text-light">
                Plano{" "}
                <span className="font-bold text-dark">
                  {currentPlan?.name}
                </span>{" "}
                selecionado · R$ {currentPlan?.price}
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
                  Proximo: Fotos
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Upload de fotos */}
        {step === 3 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                Escolha suas <span className="text-rose italic">fotos</span>
              </h1>
              <p className="text-text-light">
                Selecione ate{" "}
                <span className="font-bold text-dark">{maxPhotos} fotos</span>.
                Elas serao impressas em Polaroid com gramatura de 180g.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
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
                  {photos.length < maxPhotos ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center">
                        <Camera size={28} className="text-rose" />
                      </div>
                      <p className="font-bold text-dark">
                        Toque para abrir a galeria
                      </p>
                      <p className="text-sm text-text-light">
                        {photos.length} de {maxPhotos} fotos selecionadas
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center">
                        <Check size={28} className="text-rose" />
                      </div>
                      <p className="font-bold text-rose">
                        Todas as {maxPhotos} fotos selecionadas!
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-dark">
                  {photos.length} de {maxPhotos} fotos
                </span>
                {photos.length > 0 && photos.length < maxPhotos && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-sm font-medium text-rose hover:text-rose-dark"
                  >
                    <ImagePlus size={16} />
                    Adicionar mais
                  </button>
                )}
              </div>

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
                  disabled={!canProceedStep3}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proximo: Revisao
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Revisao + Finalizar */}
        {step === 4 && (
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
                  <span className="text-text-light text-sm">Plano</span>
                  <span className="font-bold text-dark">
                    {currentPlan?.name} — R$ {currentPlan?.price}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Nome</span>
                  <span className="font-bold text-dark">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">WhatsApp</span>
                  <span className="font-bold text-dark">
                    {formData.whatsapp}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-cream">
                  <span className="text-text-light text-sm">Categoria</span>
                  <span className="font-bold text-dark">
                    {categories.find((c) => c.value === formData.category)
                      ?.label || "—"}
                  </span>
                </div>
                {formData.message && (
                  <div className="pb-4 border-b border-cream">
                    <span className="text-text-light text-sm block mb-1">
                      Dedicatoria
                    </span>
                    <p className="text-dark italic">
                      &ldquo;{formData.message}&rdquo;
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-text-light text-sm">Fotos</span>
                  <span className="font-bold text-dark">
                    {photos.length} selecionadas
                  </span>
                </div>
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

              <div className="bg-rose/5 rounded-2xl p-4 mb-8 border border-rose/20">
                <p className="text-sm text-text leading-relaxed">
                  Ao clicar em{" "}
                  <strong>&ldquo;Finalizar Pedido&rdquo;</strong>, seu pedido
                  sera registrado e voce sera redirecionado para o WhatsApp com
                  o resumo e numero do pedido.
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
                  onClick={handleFinalize}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-lg shadow-green-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={22} fill="currentColor" />
                      Finalizar Pedido
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link voltar */}
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
