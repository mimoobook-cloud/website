import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Substitua SEUNUMERO pelo seu numero do WhatsApp
          Formato: 55 + DDD + numero (sem espacos)
          Exemplo: 5511999999999
          ═══════════════════════════════════════════════════════ */}
      <a
        href="https://wa.me/5521982077479?text=Oi!%20Quero%20saber%20mais%20sobre%20o%20Mimoobook!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>
    </>
  );
}
