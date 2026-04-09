import { Gift, Frown, ShoppingBag } from "lucide-react";

const painPoints = [
  {
    icon: Gift,
    title: "Presentes genericos",
    description:
      "Perfumes, chocolates, flores... bonitos, mas esquecidos em uma semana.",
  },
  {
    icon: Frown,
    title: "Sem significado",
    description:
      "Voce quer dar algo que faca a pessoa SENTIR o quanto ela e especial pra voce.",
  },
  {
    icon: ShoppingBag,
    title: "Tudo igual",
    description:
      "Tudo que voce encontra na internet e industrializado, sem alma, sem historia.",
  },
];

export default function Problem() {
  return (
    <section className="py-20 sm:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PAS - Problem (Dan Kennedy) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Cansada de presentes que{" "}
            <span className="text-rose italic">nao dizem nada</span>?
          </h2>
          <p className="text-lg text-text-light leading-relaxed">
            Voce passa horas procurando o presente perfeito, mas tudo parece
            igual. Generico. Sem emocao. Sem aquele{" "}
            <strong className="text-dark">toque pessoal</strong> que so voce
            poderia dar.
          </p>
        </div>

        {/* Agitation */}
        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="text-center p-8 rounded-2xl bg-cream/50 border border-rose-light/30"
            >
              <div className="w-14 h-14 rounded-full bg-rose-light/50 flex items-center justify-center mx-auto mb-5">
                <point.icon size={24} className="text-rose" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {point.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution bridge */}
        <div className="text-center mt-16">
          <p className="text-xl sm:text-2xl text-dark font-medium">
            E se voce pudesse dar um presente que{" "}
            <span className="text-rose font-bold">
              conta a historia de voces
            </span>
            ?
          </p>
        </div>
      </div>
    </section>
  );
}
