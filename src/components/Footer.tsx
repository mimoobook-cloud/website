import { Montserrat } from "next/font/google";
import { AtSign, MessageCircle } from "lucide-react";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className={`${montserrat.className} text-2xl text-white lowercase tracking-tight`}>
              mimoobook
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              Scrapbooks artesanais feitos a mao com amor. Transforme momentos
              em memorias eternas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Navegacao</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#categorias" className="hover:text-rose transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-rose transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-rose transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-rose transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                {/* ═══════════════════════════════════
                    Substitua SEUNUMERO
                    ═══════════════════════════════════ */}
                <a
                  href="https://wa.me/5521982077479"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                {/* ═══════════════════════════════════
                    Substitua pelo seu @instagram
                    ═══════════════════════════════════ */}
                <a
                  href="https://instagram.com/mimoobook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose transition-colors flex items-center gap-2"
                >
                  <AtSign size={14} />
                  @mimoobook
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-rose transition-colors">
                  Politica de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} Mimoobook. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
