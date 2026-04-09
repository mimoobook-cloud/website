import Link from "next/link";
import type { Metadata } from "next";
import { Users, Check, Star, ArrowRight } from "lucide-react";

/**
 * ESTRATEGIA: David Ogilvy (Confessions of an Advertising Man)
 * "The consumer isn't a moron. She is your wife."
 * Copy respeitoso, elegante, focado em beneficios reais.
 *
 * MARKETING: Robert Cialdini (Influence) — Reciprocidade + Prova Social
 * "Devolva em carinho tudo que sua familia te deu."
 */

export const metadata: Metadata = {
  title: "Mimoobook Familia | O presente que une todas as geracoes",
  description:
    "Scrapbook artesanal para familias. Reunioes, viagens, momentos que passam rapido demais. Eternize em paginas feitas a mao.",
};

const occasions = [
  { title: "Dia das Maes / Pais", desc: "O presente que faz chorar de emocao." },
  { title: "Aniversario de casamento", desc: "Reviva a jornada de voces juntos." },
  { title: "Reuniao de familia", desc: "Todos juntos, em um so lugar." },
  { title: "Presente para avos", desc: "Netos, bisnetos — todas as geracoes." },
];

const testimonials = [
  {
    name: "Juliana R.",
    text: "Dei de presente de aniversario de casamento dos meus pais. A emocao foi indescritivel.",
  },
  {
    name: "Patricia M.",
    text: "Fiz um com fotos de toda a familia pro Natal. Minha avo nao largou o scrapbook a noite inteira.",
  },
  {
    name: "Marcos V.",
    text: "Presente de Dia das Maes. Minha mae disse que foi o melhor presente que ja recebeu na vida.",
  },
];

export default function FamiliaPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-gradient-to-b from-warm-white to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose/10 text-rose px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users size={16} />
                Para familias
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
                Sua mae vai chorar. Seu pai vai fingir que nao.{" "}
                <span className="text-rose italic">
                  E voce vai saber que acertou.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                O presente que reune todas as geracoes em um so lugar. Cada
                pagina feita a mao, com as fotos que contam a historia da sua
                familia.
              </p>

              <Link
                href="/pedido?categoria=familia"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
              >
                Criar Nosso Mimoobook de Familia
                <ArrowRight size={20} />
              </Link>

              <p className="mt-4 text-sm text-text-light">
                A partir de R$ 149 · Envio em ate 7 dias uteis
              </p>
            </div>

            {/* ═══ 📸 FOTO: Familia reunida olhando o scrapbook ═══ */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-light to-nude-light shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl mb-4">👨‍👩‍👧‍👦</p>
                <p className="text-text-light text-sm">
                  Foto: Familia com scrapbook
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECIPROCIDADE — Cialdini */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
              Eles deram tudo por voce.{" "}
              <span className="text-rose italic">
                Devolva em paginas de amor.
              </span>
            </h2>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
              Reunioes passam. Ferias acabam. Filhos crescem rapido demais. Mas
              um Mimoobook congela esses momentos pra sempre — em paginas que
              voce pode tocar, folhear e reviver quantas vezes quiser.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {occasions.map((o) => (
              <div
                key={o.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-cream/50 border border-rose-light/30"
              >
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-rose" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1">{o.title}</h3>
                  <p className="text-sm text-text-light">{o.desc}</p>
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
            Geracoes reunidas em{" "}
            <span className="text-rose italic">cada pagina</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Capa com sobrenome da familia",
              "Arvore genealogica ilustrada",
              "Fotos de reunioes e ferias",
              "Pagina de cada membro",
              "Frases e dedicatorias",
              "Embalagem premium",
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
            Familias que ja{" "}
            <span className="text-rose italic">eternizaram momentos</span>
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
            Sua familia e unica. O presente tambem deve ser.
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Crie um Mimoobook com as fotos que contam a historia de voces.
          </p>
          <Link
            href="/pedido?categoria=familia"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-rose rounded-full text-lg font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl"
          >
            Criar Nosso Mimoobook de Familia
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
