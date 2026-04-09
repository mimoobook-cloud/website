import { Check, Star, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    price: 149,
    description: "Pra quem quer surpreender de um jeito simples e lindo.",
    features: [
      "20 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 com folhas pretas",
      "Caneta branca + cola bastao",
      "Cartela de adesivos tematicos",
      "Embalagem padrao",
      "Entrega em ate 7 dias",
    ],
    cta: "Escolher Essencial",
    popular: false,
    icon: null,
  },
  {
    name: "Especial",
    price: 199,
    description: "Nosso favorito. Mais fotos, mais detalhes, mais emocao.",
    features: [
      "40 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 com folhas pretas",
      "Caneta branca + cola bastao",
      "2 cartelas de adesivos premium",
      "Embalagem presente com laco",
      "Entrega em ate 7 dias",
    ],
    cta: "Escolher Especial",
    popular: true,
    icon: Star,
  },
  {
    name: "Premium",
    price: 250,
    description: "A experiencia completa. O presente dos sonhos.",
    features: [
      "60 fotos impressas em Polaroid (180g)",
      "Scrapbook A5 premium com folhas pretas",
      "Caneta branca + cola bastao",
      "3 cartelas de adesivos exclusivos",
      "Recortes decorativos",
      "Cartinha escrita a mao inclusa",
      "Embalagem premium de presente",
      "Entrega em ate 7 dias",
    ],
    cta: "Escolher Premium",
    popular: false,
    icon: Sparkles,
  },
];

export default function Pricing() {
  return (
    <section id="planos" className="py-20 sm:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            Escolha o seu
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Quanto mais amor, mais{" "}
            <span className="text-rose italic">paginas</span>
          </h2>
          <p className="text-lg text-text-light">
            Todos os planos sao feitos a mao com o mesmo carinho. A diferenca?
            Mais fotos, mais detalhes, mais emocao.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all hover:scale-105 ${
                plan.popular
                  ? "bg-dark text-white shadow-2xl shadow-dark/20 ring-2 ring-rose scale-105"
                  : "bg-white shadow-lg border border-rose-light/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                  Mais escolhido
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? "text-white" : "text-dark"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? "text-white/70" : "text-text-light"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/60" : "text-text-light"
                    }`}
                  >
                    R$
                  </span>
                  <span
                    className={`text-5xl font-bold ${
                      plan.popular ? "text-rose-light" : "text-rose"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-rose-light" : "text-rose"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-white/90" : "text-text"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* ════════════════════════════════════════════════════
                  Link do WhatsApp: Substitua o NUMERO pelo seu
                  Formato: 55 + DDD + numero (sem espacos)
                  Exemplo: 5511999999999
                  ════════════════════════════════════════════════════ */}
              <a
                href={`https://wa.me/5521982077479?text=Oi!%20Quero%20o%20plano%20${plan.name}%20do%20Mimoobook!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-4 rounded-full font-bold text-base transition-all hover:scale-105 ${
                  plan.popular
                    ? "bg-rose text-white hover:bg-rose-dark shadow-lg shadow-rose/30"
                    : "bg-rose/10 text-rose hover:bg-rose hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-text-light mt-8">
          Parcele em ate 3x sem juros no cartao
        </p>
      </div>
    </section>
  );
}
