"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Menu, X } from "lucide-react";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { href: "/#categorias", label: "Categorias" },
  { href: "/#como-funciona", label: "Como Funciona" },
  { href: "/#planos", label: "Planos" },
  { href: "/#depoimentos", label: "Depoimentos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-rose-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span
              className={`${montserrat.className} text-2xl sm:text-3xl text-dark lowercase tracking-tight`}
            >
              mimoobook
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text hover:text-rose transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="/pedido"
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-rose text-white rounded-full text-sm font-bold hover:bg-rose-dark transition-colors"
            >
              Quero o Meu
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-dark"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-rose-light/30 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-text hover:text-rose transition-colors text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/pedido"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-rose text-white rounded-full text-sm font-bold hover:bg-rose-dark transition-colors"
              >
                Quero o Meu
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
