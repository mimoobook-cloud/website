import Link from "next/link";
import { Heart, Dog, Users, Plane } from "lucide-react";

const categories = [
  {
    icon: Heart,
    name: "Casal",
    emoji: "💑",
    slug: "casal",
    description:
      "Para pedidos de namoro, aniversarios, Dia dos Namorados ou so porque sim.",
    highlight: true,
    tag: "Mais vendido",
  },
  {
    icon: Dog,
    name: "Pet",
    emoji: "🐶",
    slug: "pet",
    description:
      "Porque seu bichinho tambem merece um album cheio de momentos fofos.",
    highlight: false,
    tag: null,
  },
  {
    icon: Users,
    name: "Familia",
    emoji: "👨‍👩‍👧",
    slug: "familia",
    description:
      "Para eternizar reunioes, viagens em familia e momentos que passam rapido.",
    highlight: false,
    tag: null,
  },
  {
    icon: Plane,
    name: "Momentos",
    emoji: "✈️",
    slug: "momentos",
    description:
      "Viagens, formaturas, amizades — qualquer momento que mereca ser lembrado.",
    highlight: false,
    tag: null,
  },
];

export default function Categories() {
  return (
    <section id="categorias" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            Para cada tipo de amor
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Escolha a categoria do{" "}
            <span className="text-rose italic">seu</span> Mimoobook
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${cat.slug}`}
              className={`relative group rounded-3xl overflow-hidden transition-all hover:scale-105 cursor-pointer block ${
                cat.highlight
                  ? "ring-2 ring-rose shadow-xl shadow-rose/10"
                  : "shadow-md"
              }`}
            >
              {cat.tag && (
                <div className="absolute top-4 right-4 z-10 bg-rose text-white text-xs font-bold px-3 py-1 rounded-full">
                  {cat.tag}
                </div>
              )}

              {/* ════════════════════════════════════════════════════════
                  📸 FOTO DE CATEGORIA: Imagem do scrapbook desta categoria
                  - Tamanho: 600x800px (vertical)
                  - Substitua o div abaixo por <Image> com fill
                  ════════════════════════════════════════════════════════ */}
              <div className="aspect-[3/4] bg-gradient-to-br from-rose-light/60 to-nude-light flex flex-col items-center justify-center p-6">
                <span className="text-5xl mb-4">{cat.emoji}</span>
                <cat.icon
                  size={32}
                  className="text-rose/40 mb-2 group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-dark mb-2">{cat.name}</h3>
                <p className="text-sm text-text-light leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
