import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carolina M.",
    text: "Meu namorado chorou quando abriu. CHOROU. Melhor presente que ja dei na vida. Valeu cada centavo.",
    category: "Casal",
    rating: 5,
  },
  {
    name: "Beatriz S.",
    text: "Fiz um do meu cachorro pra dar pra minha mae. Ela amou tanto que quer um de cada neto agora kkkk",
    category: "Pet",
    rating: 5,
  },
  {
    name: "Amanda L.",
    text: "A qualidade e absurda. Cada detalhe feito com carinho. Ja e o terceiro que eu peco!",
    category: "Casal",
    rating: 5,
  },
  {
    name: "Juliana R.",
    text: "Dei de presente de aniversario de casamento dos meus pais. A emocao foi indescritivel.",
    category: "Familia",
    rating: 5,
  },
  {
    name: "Fernanda P.",
    text: "Pedi o Premium pro aniversario do meu namorado. A embalagem ja e um presente por si so. Perfeito.",
    category: "Casal",
    rating: 5,
  },
  {
    name: "Mariana C.",
    text: "Fiz um da nossa viagem pra Gramado. Agora ta na estante e todo mundo que visita quer ver.",
    category: "Momentos",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            Quem ja recebeu sabe
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Historias de quem{" "}
            <span className="text-rose italic">emocionou</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md border border-rose-light/20 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-text leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* ════════════════════════════════════════
                      📸 FOTO: Avatar do cliente (40x40px)
                      Substitua por <Image> com foto real
                      ════════════════════════════════════════ */}
                  <div className="w-10 h-10 rounded-full bg-rose-light/50 flex items-center justify-center text-rose font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">{t.name}</p>
                    <p className="text-xs text-text-light">
                      Categoria: {t.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
