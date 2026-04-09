export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-rose to-rose-dark text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
          Momentos passam.{" "}
          <span className="italic">Memorias ficam pra sempre.</span>
        </h2>
        <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nao espere uma data especial. O melhor momento pra eternizar o que
          voce sente e <strong className="text-white">agora</strong>.
        </p>

        {/* ════════════════════════════════════════════════════
            Link do WhatsApp: Substitua SEUNUMERO pelo seu
            Formato: 55 + DDD + numero (sem espacos)
            ════════════════════════════════════════════════════ */}
        <a
          href="https://wa.me/5521982077479?text=Oi!%20Quero%20criar%20meu%20Mimoobook!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-10 py-5 bg-white text-rose rounded-full text-lg font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl"
        >
          Criar Meu Mimoobook Agora
        </a>

        <p className="mt-6 text-white/60 text-sm">
          Producao limitada — garanta o seu antes que as vagas acabem
        </p>
      </div>
    </section>
  );
}
