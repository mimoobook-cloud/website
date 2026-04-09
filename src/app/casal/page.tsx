import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Check, Star, ArrowRight } from "lucide-react";

/**
 * ESTRATEGIA: Gary Halbert (The Boron Letters) + AIDA
 * "Find a starving crowd" — casais apaixonados sao a starving crowd
 * perfeita pra presentes emocionais.
 *
 * MARKETING: Gary Vaynerchuk — Jab, Jab, Jab, Right Hook
 * Dar valor emocional antes de pedir a venda.
 */

export const metadata: Metadata = {
  title: "Mimoobook Casal | O presente que faz chorar de emocao",
  description:
    "Scrapbook artesanal para casais. Pedido de namoro, aniversario, Dia dos Namorados. Feito a mao com suas fotos.",
};

const useCases = [
  { title: "Pedido de namoro", desc: "Faca o momento inesquecivel." },
  { title: "Aniversario de namoro", desc: "Reviva cada momento juntos." },
  { title: "Dia dos Namorados", desc: "O presente que ela realmente quer." },
  { title: "So porque eu te amo", desc: "Sem data, so amor." },
];

const testimonials = [
  {
    name: "Carolina M.",
    text: "Meu namorado chorou quando abriu. CHOROU. Melhor presente que ja dei na vida.",
  },
  {
    name: "Rafael S.",
    text: "Pedi minha namorada em namoro com o Mimoobook. Ela disse sim antes de terminar de ver.",
  },
  {
    name: "Amanda L.",
    text: "Ja e o terceiro que eu peco. Viciante. A qualidade e absurda.",
  },
];

export default function CasalPage() {
  return (
    <main>
      {/* HERO — AIDA: Attention */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-gradient-to-b from-warm-white to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose/10 text-rose px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart size={16} fill="currentColor" />
                Mais vendido
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
                Ela vai abrir. Vai ler cada pagina.{" "}
                <span className="text-rose italic">E vai chorar.</span>
              </h1>

              <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                O presente mais emocionante que voce vai dar na vida. Feito a
                mao, pagina por pagina, so com momentos de voces dois.
              </p>

              <Link
                href="/pedido?categoria=casal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
              >
                Criar Nosso Mimoobook
                <ArrowRight size={20} />
              </Link>

              <p className="mt-4 text-sm text-text-light">
                A partir de R$ 149 · Envio em ate 7 dias uteis
              </p>
            </div>

            {/* ════════════════════════════════════════════════════════════
                📸 FOTO/VIDEO: Casal abrindo o scrapbook juntos
                - Tamanho: 600x750px
                - Conteudo: Momento emocional, reacao ao presente
                ════════════════════════════════════════════════════════════ */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-light to-nude-light shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl mb-4">💑</p>
                <p className="text-text-light text-sm">Foto: Casal com scrapbook</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY — AIDA: Interest + Desire */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
              Perfumes ela esquece. Flores murcham.{" "}
              <span className="text-rose italic">Memorias ficam.</span>
            </h2>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
              Voce sabe que ela merece mais que um presente comprado de ultima
              hora. Voce quer dar algo que faca ela sentir — de verdade — o
              quanto ela e especial pra voce. Algo que ela guarde pra sempre.
              Algo que ela mostre pras amigas chorando.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-cream/50 border border-rose-light/30"
              >
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-rose" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1">{uc.title}</h3>
                  <p className="text-sm text-text-light">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA — Prova visual */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center mb-12">
            Cada detalhe pensado em{" "}
            <span className="text-rose italic">voces</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* ═══ 📸 FOTOS: 6 imagens de scrapbooks de casal ═══ */}
            {[
              "Capa personalizada com nomes",
              "Paginas com fotos de voces",
              "Frases romanticas escritas a mao",
              "Adesivos e washi tape",
              "Detalhes em close",
              "Embalagem de presente",
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

      {/* DEPOIMENTOS — Social proof */}
      <section className="py-20 sm:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center mb-12">
            Quem ja deu,{" "}
            <span className="text-rose italic">sabe o efeito</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md border border-rose-light/20"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-amber-400"
                      fill="currentColor"
                    />
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

      {/* CTA FINAL — AIDA: Action */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-rose to-rose-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            O amor de voces merece mais que uma foto no celular.
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Crie agora o Mimoobook que vai fazer ela chorar de felicidade.
          </p>
          <Link
            href="/pedido?categoria=casal"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-rose rounded-full text-lg font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl"
          >
            Criar Nosso Mimoobook
            <ArrowRight size={20} />
          </Link>
          <p className="mt-4 text-white/60 text-sm">
            Producao limitada — garanta o seu
          </p>
        </div>
      </section>
    </main>
  );
}
