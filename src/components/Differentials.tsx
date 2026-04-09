import { HandHeart, Fingerprint, Gift, Timer } from "lucide-react";

const diffs = [
  {
    icon: HandHeart,
    title: "Feito a mao",
    description:
      "Cada scrapbook e montado artesanalmente. Nada e industrializado.",
  },
  {
    icon: Fingerprint,
    title: "100% personalizado",
    description:
      "Suas fotos, suas frases, sua historia. Unico como o seu amor.",
  },
  {
    icon: Gift,
    title: "Presente perfeito",
    description:
      "Chega embalado e pronto pra entregar. So dar e emocionar.",
  },
  {
    icon: Timer,
    title: "Producao limitada",
    description:
      "Aceitamos poucas encomendas por semana pra garantir a qualidade.",
  },
];

export default function Differentials() {
  return (
    <section className="py-20 sm:py-28 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-rose-light font-medium text-sm tracking-widest uppercase mb-4">
              Por que Mimoobook?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Voce nao esta comprando um{" "}
              <span className="line-through text-white/40">scrapbook</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-rose-light mb-8">
              Voce esta dando um pedaco do seu coracao.
            </h3>

            <div className="space-y-6">
              {diffs.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <d.icon size={24} className="text-rose-light" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{d.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem/Video do processo */}
          {/* ════════════════════════════════════════════════════════════════
              🎬 VIDEO OU 📸 FOTO: Processo de criacao / bastidores
              - Tamanho: 600x800px (vertical)
              - Opcao A (Video): Time-lapse da montagem do scrapbook
              - Opcao B (Foto): Maos colando fotos, cortando adesivos
              - Estilo: Iluminacao quente, mesa de trabalho com materiais
              - Se video: <video autoPlay muted loop playsInline>
              ════════════════════════════════════════════════════════════════ */}
          <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
              <p className="text-6xl">🎨</p>
              <p className="text-white/40 text-sm font-medium text-center">
                Video ou foto: Bastidores da criacao
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
