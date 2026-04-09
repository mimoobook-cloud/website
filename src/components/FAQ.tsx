"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Quanto tempo demora pra ficar pronto?",
    a: "Apos o envio das fotos, preparamos e enviamos seu Mimoobook em ate 7 dias uteis. A entrega pelos Correios leva de 15 a 30 dias dependendo da sua regiao.",
  },
  {
    q: "Como envio as fotos?",
    a: "Pelo WhatsApp! Depois que voce escolher o plano, a gente te orienta sobre as melhores fotos e formatos.",
  },
  {
    q: "Posso escolher as frases de cada pagina?",
    a: "Sim! Nos planos Especial e Premium, voce escolhe as frases de cada pagina. Se preferir, a gente sugere frases lindas pra voce.",
  },
  {
    q: "Entregam pra todo o Brasil?",
    a: "Sim! Enviamos pra todo o Brasil via Correios ou transportadora. O frete e calculado no momento do pedido.",
  },
  {
    q: "E se eu quiser mais de 30 fotos?",
    a: "Podemos fazer um orcamento personalizado! Fale com a gente pelo WhatsApp.",
  },
  {
    q: "Qual o tamanho do scrapbook?",
    a: "O scrapbook tem tamanho A5 (21x15cm), perfeito pra guardar e exibir.",
  },
  {
    q: "Posso parcelar?",
    a: "Sim! Aceitamos Pix, cartao de credito (ate 3x sem juros) e transferencia bancaria.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-rose font-medium text-sm tracking-widest uppercase mb-4">
            Duvidas?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Perguntas <span className="text-rose italic">frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-rose-light/20 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-dark pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-rose flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-text-light leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
