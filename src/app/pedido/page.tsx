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
  Loader2,
  MapPin,
  Truck,
} from "lucide-react";
import Checkout from "@/components/Checkout";

/* ══════════════════════════════════════════════════════════════
   FLUXO DE VENDA — 5 STEPS
   Step 1: Info do cliente
   Step 2: Upload de fotos (plano auto-detectado)
   Step 3: Endereco + Frete (CEP → cotacao → selecionar)
   Step 4: Revisao (produto + frete)
   Step 5: Pagamento (Mercado Pago)
   ══════════════════════════════════════════════════════════════ */

function getPlanFromPhotos(count: number) {
  if (count <= 20)
    return { id: "essencial" as const, name: "Essencial", basePrice: 149, includedPhotos: 20, extras: 0, extraCost: 0, total: 149 };
  if (count <= 40)
    return { id: "especial" as const, name: "Especial", basePrice: 199, includedPhotos: 40, extras: 0, extraCost: 0, total: 199 };
  const extras = Math.max(0, count - 60);
  const extraCost = extras * 3.5;
  return { id: "premium" as const, name: "Premium", basePrice: 250, includedPhotos: 60, extras, extraCost, total: 250 + extraCost };
}

const categories = [
  { value: "casal", label: "Casal" },
  { value: "pet", label: "Pet" },
  { value: "familia", label: "Familia" },
  { value: "momentos", label: "Momentos" },
];

const UF_LIST = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

interface ShippingOption {
  carrier: string;
  service: string;
  price: number;
  days: string;
  id: string;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const STEP_LABELS = ["Info", "Fotos", "Endereco", "Revisao", "Pagamento"];

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

  // Address & shipping
  const [address, setAddress] = useState<Address>({
    cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "",
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);

  const plan = getPlanFromPhotos(photos.length);
  const shippingPrice = selectedShipping?.price || 0;
  const grandTotal = plan.total + shippingPrice;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      if (value.length > 6) value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      else if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: value }));
  };

  const handlePhotos = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // CEP auto-fill via ViaCEP
  const handleCepChange = async (value: string) => {
    const clean = value.replace(/\D/g, "");
    let formatted = clean;
    if (clean.length > 5) formatted = `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
    setAddress((prev) => ({ ...prev, cep: formatted }));

    if (clean.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
          }));
          // Auto-fetch shipping quotes
          fetchShipping(clean, data.uf);
        }
      } catch { /* ViaCEP offline */ }
      setLoadingCep(false);
    }
  };

  // Fetch shipping quotes
  const fetchShipping = async (cep: string, state: string) => {
    setLoadingShipping(true);
    setShippingOptions([]);
    setSelectedShipping(null);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep, state, photoCount: photos.length }),
      });
      const data = await res.json();
      if (data.success && data.options?.length > 0) {
        setShippingOptions(data.options);
        setSelectedShipping(data.options[0]); // Pre-select cheapest
      }
    } catch { /* API offline */ }
    setLoadingShipping(false);
  };

  const handleAddressChange = (field: keyof Address, value: string) =>
    setAddress((prev) => ({ ...prev, [field]: value }));

  const canProceedStep1 = formData.name.trim() && formData.whatsapp.trim() && formData.category;
  const canProceedStep2 = photos.length > 0;
  const canProceedStep3 =
    address.cep.replace(/\D/g, "").length === 8 &&
    address.street.trim() &&
    address.number.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    selectedShipping !== null;

  const goBack = () => { setStep((s) => Math.max(1, s - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goNext = () => { setStep((s) => Math.min(5, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handlePaymentSuccess = (paymentId: string, orderNumber: string) => {
    const categoryLabel = categories.find((c) => c.value === formData.category)?.label || "";
    const fullAddress = `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ""}, ${address.neighborhood}, ${address.city}-${address.state}, ${address.cep}`;
    const msg = [
      `*Pedido Pago — Mimoobook*`,
      `*Pedido:* #${orderNumber}`,
      `*Pagamento:* #${paymentId}`,
      ``,
      `*Plano:* ${plan.name}${plan.extras > 0 ? ` + ${plan.extras} extras` : ""}`,
      `*Produto:* R$ ${plan.total.toFixed(2)}`,
      `*Frete:* R$ ${shippingPrice.toFixed(2)} (${selectedShipping?.carrier} - ${selectedShipping?.days})`,
      `*Total pago:* R$ ${grandTotal.toFixed(2)}`,
      ``,
      `*Nome:* ${formData.name}`,
      `*Categoria:* ${categoryLabel}`,
      `*Fotos:* ${photos.length}`,
      `*Endereco:* ${fullAddress}`,
      formData.message ? `*Dedicatoria:* "${formData.message}"` : "",
      ``,
      `_Pagamento confirmado!_`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/5521982077479?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Plan badge for step 2
  const PlanBadge = () => {
    if (photos.length === 0) return null;
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md border border-rose-light/20 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light">Seu plano atual</p>
            <p className="text-lg font-bold text-dark">{plan.name} <span className="text-rose">R$ {plan.total.toFixed(2)}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-light">{photos.length} fotos</p>
            {photos.length <= 20 && <p className="text-xs text-rose">+{20 - photos.length} = ainda Essencial</p>}
            {photos.length > 20 && photos.length <= 40 && <p className="text-xs text-rose">+{40 - photos.length} = ainda Especial</p>}
            {photos.length > 40 && photos.length <= 60 && <p className="text-xs text-rose">+{60 - photos.length} = ainda Premium</p>}
            {photos.length > 60 && <p className="text-xs text-amber-600">{plan.extras} extras × R$ 3,50 = +R$ {plan.extraCost.toFixed(2)}</p>}
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          <div className="flex-1"><div className={`h-1.5 rounded-full ${photos.length >= 1 ? "bg-rose" : "bg-nude-light"}`} /><p className="text-[10px] text-text-light mt-1">Essencial (ate 20)</p></div>
          <div className="flex-1"><div className={`h-1.5 rounded-full ${photos.length > 20 ? "bg-rose" : "bg-nude-light"}`} /><p className="text-[10px] text-text-light mt-1">Especial (21-40)</p></div>
          <div className="flex-1"><div className={`h-1.5 rounded-full ${photos.length > 40 ? "bg-rose" : "bg-nude-light"}`} /><p className="text-[10px] text-text-light mt-1">Premium (41-60)</p></div>
          <div className="flex-1"><div className={`h-1.5 rounded-full ${photos.length > 60 ? "bg-amber-400" : "bg-nude-light"}`} /><p className="text-[10px] text-text-light mt-1">Extra (+R$3,50)</p></div>
        </div>
      </div>
    );
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-nude bg-white text-dark placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent";

  return (
    <main className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${step > i + 1 ? "bg-rose text-white" : step === i + 1 ? "bg-rose text-white" : "bg-nude-light text-text-light"}`}>
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span className={`hidden sm:block text-sm font-medium ${step >= i + 1 ? "text-dark" : "text-text-light"}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-nude-light rounded-full overflow-hidden">
            <div className="h-full bg-rose rounded-full transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
          </div>
        </div>

        {/* STEP 1: Info */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Crie seu <span className="text-rose italic">Mimoobook</span></h1>
              <p className="text-text-light">Preencha seus dados e depois selecione suas fotos.</p>
            </div>
            <div className="max-w-lg mx-auto space-y-6">
              <div><label className="block text-sm font-bold text-dark mb-2">Seu nome</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Como podemos te chamar?" className={inputClass} /></div>
              <div><label className="block text-sm font-bold text-dark mb-2">WhatsApp</label><input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleWhatsappChange} placeholder="(00) 00000-0000" className={inputClass} /></div>
              <div><label className="block text-sm font-bold text-dark mb-2">Categoria</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className={inputClass}>
                  <option value="">Selecione...</option>
                  {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-bold text-dark mb-2">Dedicatoria <span className="font-normal text-text-light">(opcional)</span></label><textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Ex: 'Pra voce, que e o amor da minha vida...'" rows={3} className={`${inputClass} resize-none`} /></div>
              <div className="bg-rose/5 rounded-2xl p-4 border border-rose/20">
                <div className="flex items-start gap-2"><Info size={16} className="text-rose mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-text">
                    <p className="font-bold text-dark mb-1">Como funciona o preco?</p>
                    <p>Ate 20 fotos = <strong>Essencial R$ 149</strong></p>
                    <p>21 a 40 fotos = <strong>Especial R$ 199</strong></p>
                    <p>41 a 60 fotos = <strong>Premium R$ 250</strong></p>
                    <p>Acima de 60 = Premium + <strong>R$ 3,50 por foto extra</strong></p>
                    <p className="mt-1 text-text-light">+ frete calculado pelo CEP</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="/" className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"><ArrowLeft size={18} />Voltar</Link>
                <button onClick={goNext} disabled={!canProceedStep1} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Proximo: Fotos<ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Fotos */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Selecione suas <span className="text-rose italic">fotos</span></h1>
              <p className="text-text-light">Escolha quantas fotos quiser. O plano se ajusta automaticamente.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <PlanBadge />
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-rose/40 rounded-2xl p-8 text-center cursor-pointer hover:border-rose hover:bg-rose/5 transition-all mb-6">
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center"><Camera size={28} className="text-rose" /></div>
                  <p className="font-bold text-dark">Toque para abrir a galeria</p>
                  <p className="text-sm text-text-light">{photos.length === 0 ? "Nenhuma foto selecionada ainda" : `${photos.length} foto${photos.length > 1 ? "s" : ""} selecionada${photos.length > 1 ? "s" : ""}`}</p>
                </div>
              </div>
              {photos.length > 0 && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-dark">{photos.length} foto{photos.length > 1 ? "s" : ""}</span>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1 text-sm font-medium text-rose hover:text-rose-dark"><ImagePlus size={16} />Adicionar mais</button>
                </div>
              )}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img src={src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                      <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-6 h-6 bg-dark/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                      <span className="absolute bottom-1 left-1 bg-dark/70 text-white text-xs px-2 py-0.5 rounded-full">{i + 1}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button onClick={goBack} className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"><ArrowLeft size={18} />Voltar</button>
                <button onClick={goNext} disabled={!canProceedStep2} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Proximo: Endereco<ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Endereco + Frete */}
        {step === 3 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Endereco de <span className="text-rose italic">entrega</span></h1>
              <p className="text-text-light">Digite seu CEP para calcular o frete automaticamente.</p>
            </div>
            <div className="max-w-lg mx-auto space-y-6">
              {/* CEP */}
              <div>
                <label className="block text-sm font-bold text-dark mb-2">CEP</label>
                <div className="relative">
                  <input type="text" value={address.cep} onChange={(e) => handleCepChange(e.target.value)} placeholder="00000-000" maxLength={9} className={inputClass} />
                  {loadingCep && <Loader2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-rose" />}
                </div>
              </div>

              {/* Address fields */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2"><label className="block text-sm font-bold text-dark mb-2">Rua</label><input type="text" value={address.street} onChange={(e) => handleAddressChange("street", e.target.value)} placeholder="Rua / Avenida" className={inputClass} /></div>
                <div><label className="block text-sm font-bold text-dark mb-2">Numero</label><input type="text" value={address.number} onChange={(e) => handleAddressChange("number", e.target.value)} placeholder="123" className={inputClass} /></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold text-dark mb-2">Complemento <span className="font-normal text-text-light">(opcional)</span></label><input type="text" value={address.complement} onChange={(e) => handleAddressChange("complement", e.target.value)} placeholder="Apto, bloco..." className={inputClass} /></div>
                <div><label className="block text-sm font-bold text-dark mb-2">Bairro</label><input type="text" value={address.neighborhood} onChange={(e) => handleAddressChange("neighborhood", e.target.value)} placeholder="Bairro" className={inputClass} /></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold text-dark mb-2">Cidade</label><input type="text" value={address.city} onChange={(e) => handleAddressChange("city", e.target.value)} placeholder="Cidade" className={inputClass} /></div>
                <div><label className="block text-sm font-bold text-dark mb-2">Estado</label>
                  <select value={address.state} onChange={(e) => handleAddressChange("state", e.target.value)} className={inputClass}>
                    <option value="">UF</option>
                    {UF_LIST.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
              </div>

              {/* Shipping options */}
              {loadingShipping && (
                <div className="flex items-center justify-center gap-2 py-6">
                  <Loader2 size={20} className="animate-spin text-rose" />
                  <span className="text-text-light text-sm">Calculando frete...</span>
                </div>
              )}

              {shippingOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-dark mb-3 flex items-center gap-2">
                    <Truck size={16} className="text-rose" />
                    Escolha o frete
                  </label>
                  <div className="space-y-3">
                    {shippingOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedShipping(opt)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                          selectedShipping?.id === opt.id
                            ? "border-rose bg-rose/5"
                            : "border-nude bg-white hover:border-rose/50"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-dark text-sm">{opt.carrier}</p>
                          <p className="text-xs text-text-light">{opt.service} · {opt.days}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-rose text-lg">R$ {opt.price.toFixed(2)}</p>
                          {selectedShipping?.id === opt.id && <Check size={16} className="text-rose ml-auto" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Total preview */}
              {selectedShipping && (
                <div className="bg-white rounded-2xl p-4 shadow-md border border-rose-light/20">
                  <div className="flex justify-between text-sm mb-1"><span className="text-text-light">Produto ({plan.name})</span><span className="text-dark">R$ {plan.total.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-text-light">Frete ({selectedShipping.carrier})</span><span className="text-dark">R$ {shippingPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-lg border-t border-cream pt-2"><span className="text-dark">Total</span><span className="text-rose">R$ {grandTotal.toFixed(2)}</span></div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button onClick={goBack} className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"><ArrowLeft size={18} />Voltar</button>
                <button onClick={goNext} disabled={!canProceedStep3} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose text-white rounded-full font-bold hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Proximo: Revisao<ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Revisao */}
        {step === 4 && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Revise seu <span className="text-rose italic">pedido</span></h1>
              <p className="text-text-light">Confira tudo antes de ir para o pagamento.</p>
            </div>
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-light/20 space-y-4 mb-8">
                <ReviewRow label="Plano" value={plan.name} />
                <ReviewRow label="Fotos" value={String(photos.length)} />
                {plan.extras > 0 && <ReviewRow label={`Extras (${plan.extras} × R$ 3,50)`} value={`+ R$ ${plan.extraCost.toFixed(2)}`} highlight />}
                <ReviewRow label="Produto" value={`R$ ${plan.total.toFixed(2)}`} />
                <ReviewRow label={`Frete (${selectedShipping?.carrier})`} value={`R$ ${shippingPrice.toFixed(2)}`} />
                <div className="flex justify-between items-center bg-rose/5 -mx-6 px-6 py-3">
                  <span className="font-bold text-dark text-lg">Total</span>
                  <span className="font-bold text-rose text-2xl">R$ {grandTotal.toFixed(2)}</span>
                </div>
                <ReviewRow label="Nome" value={formData.name} />
                <ReviewRow label="WhatsApp" value={formData.whatsapp} />
                <ReviewRow label="Categoria" value={categories.find((c) => c.value === formData.category)?.label || "—"} />
                <ReviewRow label="Endereco" value={`${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ""}`} />
                <ReviewRow label="Cidade" value={`${address.city} - ${address.state}`} />
                <ReviewRow label="CEP" value={address.cep} />
                {formData.message && <div className="pb-4 border-b border-cream"><span className="text-text-light text-sm block mb-1">Dedicatoria</span><p className="text-dark italic">&ldquo;{formData.message}&rdquo;</p></div>}
              </div>

              {previews.length > 0 && <div className="flex gap-2 overflow-x-auto pb-4 mb-8">{previews.map((src, i) => <img key={i} src={src} alt={`Foto ${i + 1}`} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />)}</div>}

              <div className="bg-rose/5 rounded-2xl p-4 mb-8 border border-rose/20">
                <p className="text-sm text-text leading-relaxed">
                  <strong>Voce vai receber em casa:</strong> scrapbook A5 com folhas pretas, {photos.length} fotos Polaroid (180g), caneta branca, cola bastao e adesivos. Envio em ate 7 dias uteis. Entrega em {selectedShipping?.days || "15-30 dias"}.
                </p>
              </div>

              <div className="flex gap-4">
                <button onClick={goBack} className="flex items-center gap-2 px-6 py-3 border-2 border-nude text-brown rounded-full font-medium hover:bg-nude-light transition-colors"><ArrowLeft size={18} />Voltar</button>
                <button onClick={goNext} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-rose text-white rounded-full font-bold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25">Ir para Pagamento — R$ {grandTotal.toFixed(2)}<ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Pagamento */}
        {step === 5 && (
          <div className="max-w-lg mx-auto">
            <Checkout
              amount={grandTotal}
              orderData={{
                plan: plan.id,
                name: formData.name,
                whatsapp: formData.whatsapp.replace(/\D/g, ""),
                category: formData.category,
                message: formData.message,
                photoCount: photos.length,
                total: grandTotal,
                extras: plan.extras,
              }}
              photos={photos}
              onSuccess={handlePaymentSuccess}
              onBack={goBack}
            />
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/" className="text-sm text-text-light hover:text-rose transition-colors">← Voltar para a pagina inicial</Link>
        </div>
      </div>
    </main>
  );
}

function ReviewRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-cream">
      <span className="text-text-light text-sm">{label}</span>
      <span className={`font-bold text-sm ${highlight ? "text-amber-600" : "text-dark"}`}>{value}</span>
    </div>
  );
}

export default function PedidoPage() {
  return (
    <Suspense fallback={<main className="min-h-screen pt-24 pb-16 bg-cream flex items-center justify-center"><p className="text-text-light">Carregando...</p></main>}>
      <OrderFlow />
    </Suspense>
  );
}
