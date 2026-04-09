import Link from "next/link";
import type { Metadata } from "next";
import { Compass, Check, Star, ArrowRight } from "lucide-react";

/**
 * ESTRATEGIA: Claude Hopkins (Scientific Advertising)
 * Copy especifico e concreto — nao "presente bonito", mas "30 fotos
 * da sua viagem montadas a mao com adesivos exclusivos".
 *
 * MARKETING: Seth Godin (Purple Cow)
 * Presentes comuns sao invisiveis. Um Mimoobook e notavel.
 */

export const metadata: Metadata = {
  title: "Mimoobook Momentos | Transforme viagens e memorias em arte",
  description:
    "Scrapbook artesanal para viagens, formaturas, amizades e momentos especiais. Feito a mao, unico como suas memorias.",
};

const moments = [
  { title: "Viagens inesqueciveis", desc: "De mochilao a lua de mel, eternize o roteiro." },
  { title: "Formatura", desc: "Anos de dedicacao em paginas de orgulho." },
  { title: "Amizade", desc: "Pra melhor amiga, melhor amigo. Anos de historia." },
  { title: "Conquistas", desc: "Primeiro emprego, primeiro ape, primeiro tudo." },
];

const testimonials = [
  {
    name: "Mariana C.",
    text: "Fiz um da nossa viagem pra Gramado. Agora ta na estante e todo mundo que visita quer ver.",
  },
  {
    name: "Thiago P.",
    text: "Presente de formatura pra minha irma. Ela passou 30 minutos olhando cada pagina.",
  },
  {
    name: "Isabela K.",
    text: "Fiz um de 10 anos de amizade com minha melhor amiga. As duas choramos.",
  },
];

export default function MomentosPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-gradient-to-b from-warm-white to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose/10 text-rose px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Compass size={16} />
                Para momentos especiais
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
                Aquela viagem mudou voce.{" "}
                <span className="text-rose italic">
                  Agora ela pode virar um livro.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Transforme qualquer momento extraordinario em um scrapbook
                artesanal que voce vai querer mostrar pra todo mundo. 30 fotos,
                frases personalizadas, adesivos exclusivos — tudo feito a mao.
              </p>

              <Link
                href="/pedido?categoria=momentos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
              >
                Eternizar Meus Momentos
                <ArrowRight size={20} />
              </Link>

              <p className="mt-4 text-sm text-text-light">
                A partir de R$ 149 · Envio em ate 7 dias uteis
              </p>
            </div>

            {/* ═══ 📸 FOTO: Scrapbook aberto com fotos de viagem ═══ */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-light to-nude-light shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl mb-4">✈️</p>
                <p className="text-text-light text-sm">
                  Foto: Scrapbook de viagem
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPLE COW — Seth Godin */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
              Presentes comuns sao{" "}
              <span className="line-through text-text-light">invisiveis</span>.{" "}
              <span className="text-rose italic">Este e notavel.</span>
            </h2>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
              Qualquer um compra um presente generico. Mas transformar 30 fotos
              de uma viagem em um livro artesanal feito a mao? Isso e o tipo de
              presente que a pessoa guarda pra vida. Que mostra pra todo mundo.
              Que fica na estante como uma obra de arte.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {moments.map((m) => (
              <div
                key={m.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-cream/50 border border-rose-light/30"
              >
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-rose" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1">{m.title}</h3>
                  <p className="text-sm text-text-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center mb-12">
            Cada momento merece{" "}
            <span className="text-rose italic">ser tocado</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Capa tematica personalizada",
              "Mapa da viagem ilustrado",
              "Fotos estilo diario de bordo",
              "Ingressos e lembrancinhas colados",
              "Frases marcantes da viagem",
              "Embalagem pra presente",
            ].map((label, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-gradient-to-br from-rose-light/40 to-nude-light shadow-md flex items-center justify-center p-4"
              >
                <p className="text-sm text-text-light text-center font-medium">
                  Foto: {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center mb-12">
            Momentos que viraram{" "}
            <span className="text-rose italic">paginas eternas</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md border border-rose-light/20"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-text leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-bold text-dark text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-rose to-rose-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Momentos passam. Mas nao precisam ser esquecidos.
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Transforme suas melhores memorias em um livro artesanal unico.
          </p>
          <Link
            href="/pedido?categoria=momentos"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-rose rounded-full text-lg font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl"
          >
            Eternizar Meus Momentos
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
