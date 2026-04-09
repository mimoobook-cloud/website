import { Play, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-warm-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy — HOOK (Russell Brunson) */}
          <div className="text-center lg:text-left">
            <p className="text-rose font-medium text-sm sm:text-base tracking-widest uppercase mb-4">
              Feito a mao com amor
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-tight mb-6">
              O presente que faz{" "}
              <span className="text-rose italic">chorar</span> de
              emocao
            </h1>

            <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Transforme suas fotos mais especiais em um scrapbook artesanal
              unico. Cada pagina conta a historia do seu amor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#planos"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose text-white rounded-full text-lg font-bold hover:bg-rose-dark transition-all hover:scale-105 shadow-lg shadow-rose/25"
              >
                Criar Meu Mimoobook
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-nude text-brown rounded-full text-lg font-medium hover:bg-nude-light transition-colors"
              >
                Como funciona?
              </a>
            </div>

            {/* Social proof rápido */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-rose-light border-2 border-white flex items-center justify-center text-xs text-rose-dark font-bold"
                  >
                    {/* ════════════════════════════════════════
                        📸 FOTO: Avatar de cliente (32x32px)
                        Substitua este div por <Image> com foto real
                       ════════════════════════════════════════ */}
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-light">
                <span className="font-bold text-dark">+500</span> presentes
                entregues com amor
              </p>
            </div>
          </div>

          {/* Media — Video + Foto do Produto */}
          <div className="relative">
            {/* ════════════════════════════════════════════════════════════
                🎬 VIDEO PRINCIPAL: Video mostrando o produto final
                - Resolucao recomendada: 720x900px (vertical) ou 1280x720px
                - Conteudo: Maos folheando o scrapbook, detalhes, embalagem
                - Formato: MP4 (max 15MB)
                - Substitua o div abaixo por:
                  <video autoPlay muted loop playsInline className="...">
                    <source src="/videos/hero-produto.mp4" type="video/mp4" />
                  </video>
                ════════════════════════════════════════════════════════════ */}
            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-light to-nude-light overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Play size={32} className="text-rose ml-1" fill="currentColor" />
                </div>
                <p className="text-dark/60 text-sm font-medium text-center">
                  Veja o Mimoobook de perto
                </p>
              </div>

              {/* Badge flutuante */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs text-text-light">A partir de</p>
                <p className="text-2xl font-bold text-dark">
                  R$ <span className="text-rose">149</span>
                </p>
              </div>
            </div>

            {/* Foto secundaria flutuante */}
            {/* ════════════════════════════════════════════════════════════
                📸 FOTO: Produto na embalagem ou detalhe close-up
                - Tamanho: 200x200px
                - Conteudo: Close do scrapbook ou embalagem de presente
                - Substitua o div abaixo por <Image>
                ════════════════════════════════════════════════════════════ */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-nude to-nude-light shadow-xl border-4 border-white rotate-6" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className="text-nude" />
        </div>
      </div>
    </section>
  );
}
