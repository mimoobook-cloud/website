import { ImagePlus, Scissors, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ImagePlus,
    title: "Selecione suas fotos",
    description:
      "Escolha suas fotos favoritas direto pelo site. Quanto mais fotos, maior o kit que voce recebe.",
  },
  {
    number: "02",
    icon: Package,
    title: "Receba o kit completo",
    description:
      "Voce recebe em casa: fotos impressas em Polaroid, scrapbook com folhas pretas, caneta branca, cola e adesivos.",
  },
  {
    number: "03",
    icon: Scissors,
    title: "Monte do seu jeito",
    description:
      "Cole as fotos, decore com adesivos, escreva mensagens. O scrapbook e seu pra criar como quiser.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            Simples assim
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Em <span className="text-rose italic">3 passos</span>, seu presente
            esta pronto
          </h2>
          <p className="text-lg text-text-light">
            Voce escolhe as fotos, a gente imprime e envia o kit completo pra voce montar em casa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-rose-light/50" />
              )}

              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-light to-rose/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose/10">
                  <step.icon size={36} className="text-rose" />
                </div>

                <span className="text-5xl font-bold text-rose-light/60 font-[family-name:var(--font-heading)]">
                  {step.number}
                </span>

                <h3 className="text-xl font-bold text-dark mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-text-light leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/pedido"
            className="inline-flex items-center px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
          >
            Quero Comecar Agora
          </a>
        </div>
      </div>
    </section>
  );
}
