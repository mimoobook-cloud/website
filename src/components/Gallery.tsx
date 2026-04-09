export default function Gallery() {
  return (
    <section className="py-20 sm:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            De perto e pessoal
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Veja cada <span className="text-rose italic">detalhe</span>
          </h2>
          <p className="text-lg text-text-light">
            Cada pagina e feita a mao, com adesivos, frases e muito carinho.
          </p>
        </div>

        {/* Grid de fotos estilo Pinterest/Masonry */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 1: Mao folheando o scrapbook
              - Tamanho: 600x800px (vertical)
              - Conteudo: Close de maos virando paginas do scrapbook
              - Estilo: Luz natural, mesa clean
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-rose-light/50 to-nude-light shadow-md col-span-1 row-span-2 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">🤲</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Mao folheando
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 2: Fotos coladas estilo Polaroid
              - Tamanho: 600x600px (quadrada)
              - Conteudo: Pagina do scrapbook com fotos estilo Polaroid
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-nude-light to-rose-light/30 shadow-md flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">📸</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Estilo Polaroid
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 3: Close nos adesivos e detalhes
              - Tamanho: 600x600px (quadrada)
              - Conteudo: Detalhes de adesivos, washi tape, recortes
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-light/40 to-cream shadow-md flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">✨</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Close detalhes
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              🎬 VIDEO 2: Video curto do produto (Reels/TikTok style)
              - Tamanho: 600x800px (vertical, 9:16)
              - Duracao: 15-30 segundos
              - Conteudo: Unboxing ou folheando o scrapbook
              - Formato: MP4
              - Substitua por <video> com autoplay muted loop
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-nude/30 to-rose-light/50 shadow-md row-span-2 flex items-center justify-center relative">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">🎬</p>
              <p className="text-sm text-text-light font-medium">
                Video: Unboxing
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-rose">
              VIDEO
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 4: Mesa clean estilo Pinterest (flat lay)
              - Tamanho: 600x400px (paisagem)
              - Conteudo: Scrapbook aberto numa mesa com flores, cafe
              - Estilo: Flat lay aesthetic
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-[3/2] rounded-2xl bg-gradient-to-br from-cream to-nude-light/60 shadow-md col-span-2 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">🌸</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Mesa clean / Flat lay
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 5: Scrapbook na embalagem de presente
              - Tamanho: 600x600px (quadrada)
              - Conteudo: Produto embalado com laco, papel de seda
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-light/30 to-nude-light shadow-md flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">🎁</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Embalagem presente
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              📸 FOTO 6: Pessoa recebendo / reagindo ao presente
              - Tamanho: 600x600px (quadrada)
              - Conteudo: Reacao emocional ao abrir o scrapbook
              ════════════════════════════════════════════════════════════ */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-nude-light to-rose-light/40 shadow-md flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-4xl mb-2">😍</p>
              <p className="text-sm text-text-light font-medium">
                Foto: Reacao ao presente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
