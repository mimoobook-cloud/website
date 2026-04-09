import Link from "next/link";
import type { Metadata } from "next";
import { PawPrint, Check, Star, ArrowRight } from "lucide-react";

/**
 * ESTRATEGIA: Eugene Schwartz (Breakthrough Advertising)
 * Nivel de consciencia: "Most Aware" — donos de pet ja amam seus bichos,
 * so precisam saber que o produto existe.
 *
 * MARKETING: Simon Sinek — "Start With Why"
 * Por que? Porque ele e familia. Porque ele merece.
 */

export const metadata: Metadata = {
  title: "Mimoobook Pet | Um album so pro seu melhor amigo",
  description:
    "Scrapbook artesanal para pets. Eternize os momentos mais fofos do seu cachorro, gato ou qualquer bichinho.",
};

const reasons = [
  { title: "Ele e familia", desc: "E familia merece um album de fotos." },
  {
    title: "Fotos no celular somem",
    desc: "Mas um scrapbook fica na estante pra sempre.",
  },
  {
    title: "Presente perfeito",
    desc: "Pra voce ou pra quem ama um bichinho.",
  },
  {
    title: "Cada fase registrada",
    desc: "De filhote a adulto, cada momento conta.",
  },
];

const testimonials = [
  {
    name: "Beatriz S.",
    text: "Fiz um do meu cachorro pra dar pra minha mae. Ela amou tanto que quer um de cada neto agora.",
  },
  {
    name: "Lucas M.",
    text: "Minha gata faleceu ano passado. Ter o Mimoobook dela e como ter ela perto ainda.",
  },
  {
    name: "Camila R.",
    text: "Fiz um pro aniversario de 1 ano do Thor. As fotos de filhote ficaram lindas.",
  },
];

export default function PetPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-gradient-to-b from-warm-white to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose/10 text-rose px-4 py-2 rounded-full text-sm font-medium mb-6">
                <PawPrint size={16} />
                Para pet lovers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
                Ele nao sabe ler. Mas cada pagina{" "}
                <span className="text-rose italic">e sobre ele.</span>
              </h1>

              <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Um scrapbook artesanal do seu melhor amigo. Porque ele merece
                mais que uma pasta de fotos no celular.
              </p>

              <Link
                href="/pedido?categoria=pet"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
              >
                Criar o Mimoobook do Meu Pet
                <ArrowRight size={20} />
              </Link>

              <p className="mt-4 text-sm text-text-light">
                A partir de R$ 149 · Envio em ate 7 dias uteis
              </p>
            </div>

            {/* ═══ 📸 FOTO: Pet fofo com scrapbook ═══ */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-light to-nude-light shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl mb-4">🐶</p>
                <p className="text-text-light text-sm">Foto: Pet com scrapbook</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE — Start With Why (Simon Sinek) */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
              Porque ele nao e{" "}
              <span className="line-through text-text-light">so um pet</span>.{" "}
              <span className="text-rose italic">Ele e familia.</span>
            </h2>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
              Voce tem centenas de fotos dele no celular. Mas quando foi a
              ultima vez que voce parou pra olhar? Um Mimoobook coloca os
              melhores momentos na sua estante — pra ver, tocar e sorrir todo
              dia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-cream/50 border border-rose-light/30"
              >
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-rose" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1">{r.title}</h3>
                  <p className="text-sm text-text-light">{r.desc}</p>
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
            Patinhas, focinhos e{" "}
            <span className="text-rose italic">muito amor</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Capa com nome e foto do pet",
              "Fotos estilo Polaroid",
              "Adesivos de patinhas",
              "Linha do tempo (filhote → adulto)",
              "Pagina de curiosidades do pet",
              "Embalagem especial",
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
            Donos apaixonados{" "}
            <span className="text-rose italic">ja aprovaram</span>
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
            Ele te da amor incondicional todo dia. Retribua com um Mimoobook.
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Eternize as patinhas, os focinhos e os momentos mais fofos.
          </p>
          <Link
            href="/pedido?categoria=pet"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-rose rounded-full text-lg font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl"
          >
            Criar o Mimoobook do Meu Pet
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
