"use client";

import { useState } from "react";
import {
  DollarSign,
  Package,
  TrendingUp,
  Target,
  Calculator,
  Layers,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   PAGINA INTERNA — FINANCEIRO & ESTRATEGIA DE TRAFEGO
   Acesso: /interno/financeiro
   Meta: R$ 1.000/dia em vendas
   ══════════════════════════════════════════════════════════════ */

const sections = [
  { id: "custos", label: "Custo Producao", icon: Package },
  { id: "investimento", label: "Investimento", icon: Layers },
  { id: "precificacao", label: "Precificacao", icon: DollarSign },
  { id: "meta-1k", label: "Meta R$1k/dia", icon: Target },
  { id: "trafego", label: "Ads Detalhado", icon: TrendingUp },
  { id: "simulador", label: "Simulador", icon: Calculator },
];

export default function FinanceiroPage() {
  const [activeSection, setActiveSection] = useState("custos");

  return (
    <main className="min-h-screen pt-20 bg-neutral-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-20 left-0 bottom-0 w-56 bg-neutral-900 border-r border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-4 border-b border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-widest">Interno</p>
            <h2 className="text-lg font-bold text-white">Financeiro</h2>
            <p className="text-xs text-rose mt-1">Meta: R$ 1.000/dia</p>
          </div>
          <nav className="p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeSection === s.id ? "bg-rose/20 text-rose" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-neutral-900 border-b border-white/10 overflow-x-auto">
          <div className="flex gap-1 p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                  activeSection === s.id ? "bg-rose/20 text-rose" : "text-white/60"
                }`}
              >
                <s.icon size={12} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 lg:ml-56 pt-12 lg:pt-0">
          <div className="max-w-5xl mx-auto p-6 sm:p-8">

            {/* ═══════════════════════════════════════
                CUSTO DE PRODUCAO
                ═══════════════════════════════════════ */}
            {activeSection === "custos" && (
              <div className="space-y-10">
                <Header title="Custo de Producao por Plano" sub="Analise detalhada de materiais — frete pago pelo cliente a parte" />

                <Card title="Custos de Materiais — Base de Calculo">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Material</th>
                          <th className="text-left py-3">Compra</th>
                          <th className="text-left py-3">Rendimento</th>
                          <th className="text-right py-3">Custo/unid</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <Row cells={["Papel A3 foto (impressao Polaroid)", "~R$ 40,00 / 20 folhas", "16 fotos por A3", "R$ 0,16/foto"]} />
                        <Row cells={["Tinta Epson L1800 (6 cores)", "~R$ 200,00 / kit", "~900 folhas A3", "R$ 0,22/A3"]} />
                        <Row cells={["Papel Color Plus 180g A4 preto", "R$ 17,99 / 50 folhas", "1 folha = 1 pag A5", "R$ 0,36/pag"]} />
                        <Row cells={["Wire-O Espiral 5/16 preto", "R$ 1,15 / unid", "1 por scrapbook", "R$ 1,15/unid"]} />
                        <Row cells={["Embalagem Hot Stamping (Printi)", "R$ 2.570,76 / 100 unid", "1 por pedido", "R$ 25,71/unid"]} />
                        <Row cells={["Papelao A5 (capa dura)", "~R$ 15,00 / 10 folhas A4", "2 capas A5 por scrapbook", "R$ 1,50/unid"]} />
                        <Row cells={["Papel adesivo capa (vinil)", "~R$ 3,00 / folha A4", "1 folha cobre 2 capas", "R$ 1,50/unid"]} />
                        <Row cells={["Caneta branca (Posca/similar)", "~R$ 8,00 / unid", "1 por kit", "R$ 8,00/unid"]} />
                        <Row cells={["Cola bastao", "~R$ 4,00 / unid", "1 por kit", "R$ 4,00/unid"]} />
                        <Row cells={["Cartela adesivos (Cricut)", "~R$ 2,50 / folha sticker", "Corte + impressao", "R$ 2,50/cartela"]} />
                        <Row cells={["Caneta dourada (Premium)", "~R$ 12,00 / unid", "1 por kit Premium", "R$ 12,00/unid"]} last />
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* ═══ CENARIO 1: SOCIOS FAZEM TUDO ═══ */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-2">
                  <h3 className="text-green-400 font-bold text-lg">Cenario 1 — Os 2 socios fazem tudo (inicio)</h3>
                  <p className="text-white/50 text-sm">Sem custo de mao de obra. Lucro dos socios = lucro da operacao. Frete pago pelo cliente.</p>
                </div>

                <Card title="Essencial — 20 fotos, 10 paginas (R$ 149)">
                  <div className="space-y-2">
                    <CostLine item="Impressao 20 fotos Polaroid" detail="2 folhas A3 × (R$2,00 papel + R$0,22 tinta)" value={4.44} />
                    <CostLine item="10 paginas pretas A5" detail="10 folhas A4 × R$0,36" value={3.60} />
                    <CostLine item="Wire-O encadernacao" detail="1 unidade" value={1.15} />
                    <CostLine item="Capa dura (papelao + adesivo)" detail="2 capas A5" value={3.00} />
                    <CostLine item="Embalagem Hot Stamping" detail="1 caixa Printi" value={25.71} />
                    <CostLine item="Caneta branca" detail="1 unidade" value={8.00} />
                    <CostLine item="Cola bastao" detail="1 unidade" value={4.00} />
                    <CostLine item="1 cartela de adesivos" detail="Cricut" value={2.50} />
                    <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold">
                      <span className="text-white">CUSTO MATERIAL</span>
                      <span className="text-rose text-lg">R$ 52,40</span>
                    </div>
                    <div className="flex justify-between text-green-400 font-bold text-lg pt-2">
                      <span>LUCRO BRUTO</span>
                      <span>R$ 96,60 (65%)</span>
                    </div>
                  </div>
                </Card>

                <Card title="Especial — 40 fotos, 20 paginas (R$ 199)">
                  <div className="space-y-2">
                    <CostLine item="Impressao 40 fotos Polaroid" detail="3 folhas A3 × (R$2,00 + R$0,22)" value={6.66} />
                    <CostLine item="20 paginas pretas A5" detail="20 folhas A4 × R$0,36" value={7.20} />
                    <CostLine item="Wire-O encadernacao" detail="1 unidade" value={1.15} />
                    <CostLine item="Capa dura (papelao + adesivo)" detail="2 capas A5" value={3.00} />
                    <CostLine item="Embalagem Hot Stamping" detail="1 caixa Printi" value={25.71} />
                    <CostLine item="Caneta branca" detail="1 unidade" value={8.00} />
                    <CostLine item="Cola bastao" detail="1 unidade" value={4.00} />
                    <CostLine item="2 cartelas de adesivos" detail="Cricut" value={5.00} />
                    <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold">
                      <span className="text-white">CUSTO MATERIAL</span>
                      <span className="text-rose text-lg">R$ 60,72</span>
                    </div>
                    <div className="flex justify-between text-green-400 font-bold text-lg pt-2">
                      <span>LUCRO BRUTO</span>
                      <span>R$ 138,28 (69%)</span>
                    </div>
                  </div>
                </Card>

                <Card title="Premium — 60 fotos, 30 paginas (R$ 250)">
                  <div className="space-y-2">
                    <CostLine item="Impressao 60 fotos Polaroid" detail="4 folhas A3 × (R$2,00 + R$0,22)" value={8.88} />
                    <CostLine item="30 paginas pretas A5" detail="30 folhas A4 × R$0,36" value={10.80} />
                    <CostLine item="Wire-O encadernacao" detail="1 unidade (maior)" value={1.50} />
                    <CostLine item="Capa dura (papelao + adesivo)" detail="2 capas A5" value={3.00} />
                    <CostLine item="Embalagem Hot Stamping" detail="1 caixa Printi" value={25.71} />
                    <CostLine item="Caneta branca + dourada" detail="2 unidades" value={20.00} />
                    <CostLine item="Cola bastao" detail="1 unidade" value={4.00} />
                    <CostLine item="3 cartelas adesivos + recortes" detail="Cricut" value={10.00} />
                    <CostLine item="Cartinha escrita a mao" detail="Papel especial" value={2.00} />
                    <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold">
                      <span className="text-white">CUSTO MATERIAL</span>
                      <span className="text-rose text-lg">R$ 85,89</span>
                    </div>
                    <div className="flex justify-between text-green-400 font-bold text-lg pt-2">
                      <span>LUCRO BRUTO</span>
                      <span>R$ 164,11 (66%)</span>
                    </div>
                  </div>
                </Card>

                <Card title="Resumo — Cenario 1 (Socios fazem tudo)">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Plano</th>
                          <th className="text-right py-3">Preco</th>
                          <th className="text-right py-3">Custo mat.</th>
                          <th className="text-right py-3">Lucro</th>
                          <th className="text-right py-3">Margem</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80 font-medium">
                        <tr className="border-b border-white/5">
                          <td className="py-3">Essencial</td>
                          <td className="text-right">R$ 149</td>
                          <td className="text-right text-rose">R$ 52,40</td>
                          <td className="text-right text-green-400">R$ 96,60</td>
                          <td className="text-right">65%</td>
                        </tr>
                        <tr className="border-b border-white/5 bg-white/5">
                          <td className="py-3 font-bold">Especial ⭐</td>
                          <td className="text-right font-bold">R$ 199</td>
                          <td className="text-right text-rose">R$ 60,72</td>
                          <td className="text-right text-green-400 font-bold">R$ 138,28</td>
                          <td className="text-right font-bold">69%</td>
                        </tr>
                        <tr>
                          <td className="py-3">Premium</td>
                          <td className="text-right">R$ 250</td>
                          <td className="text-right text-rose">R$ 85,89</td>
                          <td className="text-right text-green-400">R$ 164,11</td>
                          <td className="text-right">66%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-green-400 text-xs mt-4 flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                    Lucro medio por venda (mix 20/60/20): <strong>R$ 132,17</strong>. Tudo que sobra e dos socios.
                  </p>
                </Card>

                {/* ═══ CENARIO 2: COM FUNCIONARIO ═══ */}
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 mb-2 mt-10">
                  <h3 className="text-amber-400 font-bold text-lg">Cenario 2 — Com funcionario (escala)</h3>
                  <p className="text-white/50 text-sm">Salario: ~R$ 2.000/mes (informal/MEI) = R$ 11,36/hora. Produz 6-8 scrapbooks/dia. Contratar a partir de 8+ pedidos/dia.</p>
                </div>

                <Card title="Resumo — Cenario 2 (Com funcionario R$ 2.000/mes)">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Plano</th>
                          <th className="text-right py-3">Custo mat.</th>
                          <th className="text-right py-3">MO (R$ 11,36/h)</th>
                          <th className="text-right py-3">Custo total</th>
                          <th className="text-right py-3">Lucro</th>
                          <th className="text-right py-3">Margem</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80 font-medium">
                        <tr className="border-b border-white/5">
                          <td className="py-3">Essencial (30 min)</td>
                          <td className="text-right">R$ 52,40</td>
                          <td className="text-right text-amber-400">R$ 5,68</td>
                          <td className="text-right text-rose">R$ 58,08</td>
                          <td className="text-right text-green-400">R$ 90,92</td>
                          <td className="text-right">61%</td>
                        </tr>
                        <tr className="border-b border-white/5 bg-white/5">
                          <td className="py-3 font-bold">Especial (45 min)</td>
                          <td className="text-right">R$ 60,72</td>
                          <td className="text-right text-amber-400">R$ 8,52</td>
                          <td className="text-right text-rose">R$ 69,24</td>
                          <td className="text-right text-green-400 font-bold">R$ 129,76</td>
                          <td className="text-right font-bold">65%</td>
                        </tr>
                        <tr>
                          <td className="py-3">Premium (60 min)</td>
                          <td className="text-right">R$ 85,89</td>
                          <td className="text-right text-amber-400">R$ 11,36</td>
                          <td className="text-right text-rose">R$ 97,25</td>
                          <td className="text-right text-green-400">R$ 152,75</td>
                          <td className="text-right">61%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-amber-400 text-xs mt-4 flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                    Mesmo com funcionario, a margem se mantem acima de 60%. O plano Especial continua sendo o mais lucrativo em %.
                  </p>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════
                INVESTIMENTO
                ═══════════════════════════════════════ */}
            {activeSection === "investimento" && (
              <div className="space-y-10">
                <Header title="Investimento Inicial e Recorrente" sub="Tudo que voce precisa para comecar e manter a operacao" />

                <Card title="Investimento Inicial (Unico)">
                  <div className="space-y-2">
                    <CostLine item="Impressora Epson L1800 (A3+)" detail="Impressao fotografica tank" value={4500} />
                    <CostLine item="Maquina de encadernacao Wire-O" detail="Encadernadora manual" value={1000} />
                    <CostLine item="Maquina de corte (Cricut/Silhouette)" detail="Para adesivos personalizados" value={2000} />
                    <CostLine item="Primeiro lote embalagens (100 unid)" detail="Printi Hot Stamping" value={2571} />
                    <CostLine item="Kit tintas Epson (6 cores)" detail="Primeiro carregamento" value={200} />
                    <CostLine item="Papel A3 foto (100 folhas)" detail="Estoque inicial" value={200} />
                    <CostLine item="Papel Color Plus preto (200 folhas)" detail="4 pacotes de 50" value={72} />
                    <CostLine item="Wire-O estoque (50 unidades)" detail="Espiral preto" value={58} />
                    <CostLine item="Canetas brancas (20 unid)" detail="Estoque inicial" value={160} />
                    <CostLine item="Cola bastao (20 unid)" detail="Estoque inicial" value={80} />
                    <CostLine item="Papelao, adesivo, materiais diversos" detail="Estoque inicial" value={150} />
                    <CostLine item="Papel sticker para Cricut (50 folhas)" detail="Para adesivos" value={75} />
                    <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold text-lg">
                      <span className="text-white">TOTAL INVESTIMENTO INICIAL</span>
                      <span className="text-rose">R$ 11.066,00</span>
                    </div>
                  </div>
                </Card>

                <Card title="Custo Recorrente Mensal — Materiais (150 pedidos/mes, sem frete)">
                  <div className="space-y-2">
                    <CostLine item="Embalagens (150 unid)" detail="1,5 lotes Printi" value={3857} />
                    <CostLine item="Papel A3 foto" detail="~30 folhas (16 fotos/folha)" value={60} />
                    <CostLine item="Tintas Epson" detail="~1 kit/mes em alta demanda" value={200} />
                    <CostLine item="Papel Color Plus preto" detail="~6 pacotes (300 folhas)" value={108} />
                    <CostLine item="Wire-O (150 unid)" detail="3 caixas" value={173} />
                    <CostLine item="Canetas brancas (150 unid)" detail="+ douradas Premium" value={1350} />
                    <CostLine item="Cola bastao (150 unid)" detail="" value={600} />
                    <CostLine item="Adesivos + sticker paper" detail="Cricut consumiveis" value={450} />
                    <CostLine item="Papelao + adesivo capa" detail="300 capas" value={450} />
                    <CostLine item="Trafego pago" detail="Verba de ads" value={7500} />
                    <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold text-lg">
                      <span className="text-white">TOTAL RECORRENTE/MES</span>
                      <span className="text-rose">~R$ 14.748,00</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mt-3">
                    * Baseado em 150 pedidos/mes (~5/dia). Frete pago pelo cliente a parte — nao entra no custo.
                    No Cenario 1 (socios), nao ha custo de MO. No Cenario 2, adicionar R$ 2.000/mes de funcionario.
                  </p>
                </Card>

                <Card title="Payback — Retorno do Investimento Inicial">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Metric label="Investimento inicial" value="R$ 11.066" color="text-rose" />
                    <Metric label="Lucro liquido/mes (Cenario 1)" value="R$ 12.402" color="text-green-400" />
                    <Metric label="Payback" value="~1 mes" color="text-amber-400" />
                  </div>
                  <p className="text-white/40 text-xs mt-4">
                    Cenario 1: Faturamento (R$ 29.850) - Materiais (~R$ 9.750) - Trafego (R$ 7.500) - Taxas (R$ 900) = ~R$ 11.700 liquido para os 2 socios.
                    Payback do investimento em equipamentos no primeiro mes.
                  </p>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════
                PRECIFICACAO
                ═══════════════════════════════════════ */}
            {activeSection === "precificacao" && (
              <div className="space-y-10">
                <Header title="Estrategia de Precificacao" sub="Psicologia de precos e posicionamento" />

                <Card title="Ancoragem de Precos (Decoy Effect)">
                  <p className="text-white/60 text-sm mb-6">
                    A estrutura de 3 planos usa o efeito &ldquo;decoy&rdquo; (isca) para direcionar a maioria das vendas para o plano Especial.
                    O Essencial parece &ldquo;pouco&rdquo; e o Premium parece &ldquo;caro demais&rdquo;, fazendo o Especial parecer a melhor escolha.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-white/40 text-sm mb-1">Essencial</p>
                      <p className="text-3xl font-bold text-white">R$ 149</p>
                      <p className="text-rose text-sm mt-1">20 fotos</p>
                      <p className="text-white/30 text-xs mt-2">R$ 7,45/foto</p>
                      <p className="text-amber-400 text-xs mt-1">Papel: ancora inferior</p>
                    </div>
                    <div className="bg-rose/10 border-2 border-rose rounded-xl p-4 text-center">
                      <p className="text-rose text-sm font-bold mb-1">Especial ⭐</p>
                      <p className="text-3xl font-bold text-white">R$ 199</p>
                      <p className="text-rose text-sm mt-1">40 fotos</p>
                      <p className="text-white/30 text-xs mt-2">R$ 4,98/foto</p>
                      <p className="text-green-400 text-xs mt-1 font-bold">ALVO: 60% das vendas</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-white/40 text-sm mb-1">Premium</p>
                      <p className="text-3xl font-bold text-white">R$ 250</p>
                      <p className="text-rose text-sm mt-1">60 fotos</p>
                      <p className="text-white/30 text-xs mt-2">R$ 4,17/foto</p>
                      <p className="text-amber-400 text-xs mt-1">Ancora superior: justifica o Especial</p>
                    </div>
                  </div>
                </Card>

                <Card title="Distribuicao Esperada de Vendas">
                  <div className="space-y-3">
                    <BarLine label="Essencial (R$149)" pct={20} color="bg-white/30" />
                    <BarLine label="Especial (R$199)" pct={60} color="bg-rose" />
                    <BarLine label="Premium (R$250)" pct={20} color="bg-amber-400" />
                  </div>
                  <div className="mt-6 bg-white/5 rounded-xl p-4">
                    <p className="text-white/60 text-sm">
                      <strong className="text-white">Ticket medio esperado:</strong> (0,20 × 149) + (0,60 × 199) + (0,20 × 250) = <strong className="text-green-400">R$ 199,20</strong>
                    </p>
                    <p className="text-white/60 text-sm mt-2">
                      <strong className="text-white">Lucro medio por venda (Cenario 1):</strong> (0,20 × 96,60) + (0,60 × 138,28) + (0,20 × 164,11) = <strong className="text-green-400">R$ 135,11</strong>
                    </p>
                  </div>
                </Card>

                <Card title="Comparativo com Concorrencia">
                  <p className="text-white/50 text-sm mb-4">Scrapbooks similares no mercado brasileiro:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-2">Concorrente</th>
                          <th className="text-right py-2">Preco medio</th>
                          <th className="text-right py-2">Fotos</th>
                          <th className="text-left py-2">Diferencial Mimoobook</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/70">
                        <tr className="border-b border-white/5">
                          <td className="py-2">Artesanais Etsy/Elo7</td>
                          <td className="text-right">R$ 150-300</td>
                          <td className="text-right">10-20</td>
                          <td>Mais fotos pelo preco, kit DIY incluso</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2">Albuns foto online</td>
                          <td className="text-right">R$ 80-200</td>
                          <td className="text-right">20-50</td>
                          <td>Artesanal vs industrial, experiencia de montar</td>
                        </tr>
                        <tr>
                          <td className="py-2">Scrapbooks prontos Instagram</td>
                          <td className="text-right">R$ 200-400</td>
                          <td className="text-right">15-30</td>
                          <td>Preco competitivo, embalagem premium, mais fotos</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════
                META R$ 1.000/DIA
                ═══════════════════════════════════════ */}
            {activeSection === "meta-1k" && (
              <div className="space-y-10">
                <Header title="Plano para R$ 1.000/dia" sub="Engenharia reversa: do faturamento ao investimento em ads" />

                <Card title="Engenharia Reversa">
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Metric label="Meta diaria" value="R$ 1.000" color="text-green-400" />
                      <Metric label="Meta mensal" value="R$ 30.000" color="text-green-400" />
                      <Metric label="Ticket medio" value="R$ 199" color="text-white" />
                      <Metric label="Pedidos/dia" value="~5" color="text-amber-400" />
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 space-y-3">
                      <Step n={1} text="R$ 1.000/dia ÷ R$ 199 ticket = 5 pedidos/dia" />
                      <Step n={2} text="Se taxa de conversao do site = 3%, preciso de 167 visitas/dia" />
                      <Step n={3} text="Se CTR dos anuncios = 2%, preciso de ~8.350 impressoes/dia" />
                      <Step n={4} text="Se CPC medio = R$ 1,50, orcamento = R$ 250/dia em ads" />
                      <Step n={5} text="ROAS necessario = R$ 1.000 / R$ 250 = 4x (viavel para e-commerce)" />
                    </div>
                  </div>
                </Card>

                <Card title="Orcamento de Trafego Diario — R$ 250/dia">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Canal</th>
                          <th className="text-right py-3">R$/dia</th>
                          <th className="text-right py-3">R$/mes</th>
                          <th className="text-right py-3">% Total</th>
                          <th className="text-left py-3">Objetivo</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/5">
                          <td className="py-3 font-bold">Meta Ads (IG+FB)</td>
                          <td className="text-right">R$ 150</td>
                          <td className="text-right">R$ 4.500</td>
                          <td className="text-right">60%</td>
                          <td>Video Views + Conversao</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 font-bold">Google Ads</td>
                          <td className="text-right">R$ 70</td>
                          <td className="text-right">R$ 2.100</td>
                          <td className="text-right">28%</td>
                          <td>Search (demanda ativa)</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold">TikTok Ads</td>
                          <td className="text-right">R$ 30</td>
                          <td className="text-right">R$ 900</td>
                          <td className="text-right">12%</td>
                          <td>Alcance + Conversao</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-white/20 font-bold">
                          <td className="py-3">TOTAL</td>
                          <td className="text-right text-rose">R$ 250</td>
                          <td className="text-right text-rose">R$ 7.500</td>
                          <td className="text-right">100%</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </Card>

                <Card title="P&L Mensal — Cenario 1 (Socios fazem tudo, frete por conta do cliente)">
                  <div className="space-y-2">
                    <PLLine label="Faturamento bruto (150 × R$ 199)" value="R$ 29.850" positive />
                    <PLLine label="(-) Custo materiais (150 × R$ 65 medio)" value="R$ 9.750" />
                    <PLLine label="(-) Trafego pago" value="R$ 7.500" />
                    <PLLine label="(-) Taxas cartao/Pix (~3%)" value="R$ 900" />
                    <PLLine label="(-) Imprevistos / reposicao" value="R$ 500" />
                    <div className="border-t-2 border-green-400/30 pt-3 mt-3">
                      <PLLine label="LUCRO PARA OS 2 SOCIOS" value="R$ 11.200" positive highlight />
                    </div>
                    <p className="text-white/40 text-xs mt-2">R$ 5.600 por socio/mes. Margem liquida ~37%. Sem custo de MO e sem frete.</p>
                  </div>
                </Card>

                <Card title="P&L Mensal — Cenario 2 (Com funcionario)">
                  <div className="space-y-2">
                    <PLLine label="Faturamento bruto (150 × R$ 199)" value="R$ 29.850" positive />
                    <PLLine label="(-) Custo materiais (150 × R$ 65 medio)" value="R$ 9.750" />
                    <PLLine label="(-) Trafego pago" value="R$ 7.500" />
                    <PLLine label="(-) Funcionario (salario)" value="R$ 2.000" />
                    <PLLine label="(-) Taxas cartao/Pix (~3%)" value="R$ 900" />
                    <PLLine label="(-) Imprevistos / reposicao" value="R$ 500" />
                    <div className="border-t-2 border-green-400/30 pt-3 mt-3">
                      <PLLine label="LUCRO PARA OS 2 SOCIOS" value="R$ 9.200" positive highlight />
                    </div>
                    <p className="text-white/40 text-xs mt-2">R$ 4.600 por socio/mes. Porem com mais tempo livre para focar em marketing e crescimento.</p>
                  </div>
                </Card>

                <Card title="Cronograma de Ramp-Up (0 a R$ 1k/dia)">
                  <div className="space-y-4">
                    <Phase
                      phase="Mes 1 — Validacao"
                      budget="R$ 50/dia ads"
                      target="R$ 200-300/dia (1-2 pedidos)"
                      actions={["Testar 3-5 criativos diferentes", "Validar publico (interesses, lookalike)", "Coletar dados de pixel/conversao", "Primeiros depoimentos de clientes"]}
                    />
                    <Phase
                      phase="Mes 2 — Escala Inicial"
                      budget="R$ 120/dia ads"
                      target="R$ 500-600/dia (3 pedidos)"
                      actions={["Escalar criativos vencedores", "Adicionar Google Search", "Comecar retargeting", "Pedir UGC (conteudo de clientes)"]}
                    />
                    <Phase
                      phase="Mes 3 — Escala Total"
                      budget="R$ 250/dia ads"
                      target="R$ 1.000/dia (5 pedidos)"
                      actions={["Full funnel rodando (TOFU/MOFU/BOFU)", "Lookalikes otimizados", "TikTok Ads ativado", "Influenciadores gerando conteudo"]}
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════
                ADS DETALHADO
                ═══════════════════════════════════════ */}
            {activeSection === "trafego" && (
              <div className="space-y-10">
                <Header title="Campanhas de Ads — Detalhamento" sub="Cada anuncio, cada detalhe, cada metrica alvo" />

                <Card title="META ADS — Campanha 1: Video Views (TOFU)">
                  <AdDetail
                    budget="R$ 40/dia"
                    objetivo="Alcance / Video Views"
                    publico="Mulheres 18-35 | Interesses: presentes criativos, artesanato, scrapbook, DIY, Dia dos Namorados, relacionamento | Brasil"
                    posicionamento="Reels, Stories, Feed (automatico)"
                    formato="Video 9:16, 15-30 segundos"
                    criativo="REEL de reacao: pessoa abrindo o Mimoobook e se emocionando. Filmado no celular, autenticidade. Sem logo nos primeiros 3s."
                    hook="(texto na tela) 'dei isso de presente e olha o que aconteceu'"
                    copy="O presente que faz chorar de emocao. Feito a mao, com suas fotos em Polaroid. Crie o seu — link na bio."
                    cta="Saiba Mais"
                    kpis="CPV < R$ 0,03 | Alcance > 40k/semana | ThruPlay > 10k/semana"
                  />
                </Card>

                <Card title="META ADS — Campanha 2: Trafego (MOFU)">
                  <AdDetail
                    budget="R$ 50/dia"
                    objetivo="Trafego para o site"
                    publico="Retargeting: assistiu 75%+ dos videos TOFU nos ultimos 14 dias | Lookalike 1-3% dos engajadores | Mulheres 18-40"
                    posicionamento="Feed, Stories, Reels"
                    formato="Carrossel 5 imagens"
                    criativo="Slide 1: Foto bonita do scrapbook aberto | Slide 2: Close nas fotos Polaroid | Slide 3: Kit completo (caneta, adesivos, cola) | Slide 4: Depoimento de cliente (print) | Slide 5: Preco + CTA"
                    hook="Slide 1: 'O presente que +500 pessoas ja deram'"
                    copy="Scrapbook artesanal com suas fotos impressas em Polaroid. Voce recebe tudo pra montar: fotos, caneta branca, cola e adesivos. A partir de R$ 149. Escolha entre 20, 40 ou 60 fotos."
                    cta="Comprar Agora"
                    kpis="CPC < R$ 1,50 | CTR > 2% | Sessoes no site > 80/dia"
                  />
                </Card>

                <Card title="META ADS — Campanha 3: Conversao (BOFU)">
                  <AdDetail
                    budget="R$ 60/dia"
                    objetivo="Conversao (Compra / Mensagem WhatsApp)"
                    publico="Retargeting: visitou site ultimos 7 dias | Iniciou pedido mas nao finalizou | Engajou no MOFU"
                    posicionamento="Feed, Stories"
                    formato="Imagem unica (alta qualidade) + Video curto alternado"
                    criativo="Foto do scrapbook com embalagem premium, flat lay clean. Texto overlay: 'Ultimas vagas da semana'. Badge: 'A partir de R$ 149'."
                    hook="'Ainda pensando? Olha o que os outros ja receberam'"
                    copy="Seu Mimoobook pronto em 7 dias. 20, 40 ou 60 fotos Polaroid + caneta branca + adesivos. Toque pra pedir o seu antes que as vagas acabem."
                    cta="Pedir Agora / Enviar Mensagem"
                    kpis="CPA < R$ 50 | ROAS > 4x | Compras > 3/dia"
                  />
                </Card>

                <Card title="GOOGLE ADS — Search: Demanda Ativa">
                  <AdDetail
                    budget="R$ 50/dia"
                    objetivo="Search — capturar quem ja esta procurando"
                    publico="Keywords: 'presente personalizado', 'scrapbook personalizado', 'presente criativo namorado', 'album de fotos polaroid', 'presente dia dos namorados'"
                    posicionamento="Google Search"
                    formato="RSA (Responsive Search Ad) com 15 titulos e 4 descricoes"
                    criativo="Titulos testados: 'Scrapbook Com Suas Fotos em Polaroid' | 'O Presente Que Faz Chorar' | 'Feito a Mao, Unico Como Voces' | 'A Partir de R$ 149 — Entrega em 7 Dias' | '20, 40 ou 60 Fotos Polaroid'"
                    hook="N/A (Search)"
                    copy="Desc 1: Scrapbook artesanal com suas fotos impressas em Polaroid. Kit completo com caneta branca e adesivos. Pronto em 7 dias. | Desc 2: Mais de 500 presentes entregues. Escolha seu plano e crie memorias eternas. Peca pelo site."
                    cta="Extensoes: Sitelink (Planos, Como Funciona, Depoimentos) | Callout (Feito a Mao, Frete para Todo Brasil, 3x Sem Juros)"
                    kpis="CPC < R$ 2,00 | CTR > 5% | Conv Rate > 4% | CPA < R$ 40"
                  />
                </Card>

                <Card title="GOOGLE ADS — Search: Branded">
                  <AdDetail
                    budget="R$ 10/dia"
                    objetivo="Proteger a marca"
                    publico="Keywords: 'mimoobook', 'mimoo book', 'mimoobook.com.br'"
                    posicionamento="Google Search"
                    formato="RSA"
                    criativo="Titulo: 'Mimoobook — Site Oficial | Scrapbook Artesanal'"
                    hook="N/A"
                    copy="O presente perfeito para quem voce ama. Fotos Polaroid, caneta branca e adesivos. A partir de R$ 149."
                    cta="Comprar Agora"
                    kpis="CPC < R$ 0,30 | CTR > 15%"
                  />
                </Card>

                <Card title="GOOGLE ADS — Search: Sazonal">
                  <AdDetail
                    budget="R$ 10/dia (ativar 3 semanas antes da data)"
                    objetivo="Capturar demanda sazonal"
                    publico="Keywords: 'presente dia dos namorados', 'presente dia das maes', 'presente natal criativo', 'presente aniversario namorado'"
                    posicionamento="Google Search"
                    formato="RSA com copy sazonal"
                    criativo="Adaptar titulos por data. Ex Dia dos Namorados: 'Presente de Dia dos Namorados Inesquecivel | Scrapbook Com Fotos de Voces | Entrega Garantida Ate 12/06'"
                    hook="N/A"
                    copy="Nao de mais um presente generico. Crie um Mimoobook com suas fotos — feito a mao, com amor. Ultimos dias para pedir."
                    cta="Pedir Agora"
                    kpis="CPC < R$ 2,50 | Conv Rate > 3% | Aumentar budget para R$ 30-50/dia em Dia dos Namorados e Natal"
                  />
                </Card>

                <Card title="TIKTOK ADS — Conversao">
                  <AdDetail
                    budget="R$ 30/dia"
                    objetivo="Conversao"
                    publico="Mulheres 18-30 | Interesses: presentes, artesanato, DIY, casais, TikTok Shop | Brasil"
                    posicionamento="For You Feed"
                    formato="Video nativo 9:16, 15-30 segundos"
                    criativo="Estilo UGC: parece conteudo organico, nao anuncio. Pessoa real falando pra camera: 'gente, achei o presente mais lindo que existe' e mostrando o scrapbook. Ou: Dueto/Stitch com cliente real."
                    hook="(texto na tela + fala) 'se voce precisa de ideia de presente, para TUDO'"
                    copy="Caption: O presente que ninguem esquece. Link na bio pra pedir o seu 🫶"
                    cta="Saiba Mais / Comprar Agora"
                    kpis="CPC < R$ 1,00 | CTR > 1,5% | CPA < R$ 40 | Priorizar criativo que pareca organico"
                  />
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════
                SIMULADOR
                ═══════════════════════════════════════ */}
            {activeSection === "simulador" && (
              <div className="space-y-10">
                <Header title="Simulador de Cenarios" sub="Projecoes para diferentes niveis de investimento" />

                <Card title="Cenarios — Socios fazem tudo, frete pago pelo cliente">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Cenario</th>
                          <th className="text-right py-3">Ads/dia</th>
                          <th className="text-right py-3">Ads/mes</th>
                          <th className="text-right py-3">Pedidos/dia</th>
                          <th className="text-right py-3">Faturamento/mes</th>
                          <th className="text-right py-3">Mat. + Ads</th>
                          <th className="text-right py-3">Lucro socios</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/5">
                          <td className="py-3">Conservador</td>
                          <td className="text-right">R$ 50</td>
                          <td className="text-right">R$ 1.500</td>
                          <td className="text-right">1-2</td>
                          <td className="text-right">R$ 9.000</td>
                          <td className="text-right text-rose">R$ 4.425</td>
                          <td className="text-right text-green-400">R$ 4.575</td>
                        </tr>
                        <tr className="border-b border-white/5 bg-white/5">
                          <td className="py-3 font-bold">Meta ⭐</td>
                          <td className="text-right font-bold">R$ 250</td>
                          <td className="text-right">R$ 7.500</td>
                          <td className="text-right font-bold">5</td>
                          <td className="text-right font-bold text-green-400">R$ 30.000</td>
                          <td className="text-right text-rose">R$ 17.250</td>
                          <td className="text-right text-green-400 font-bold">R$ 11.200</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Agressivo</td>
                          <td className="text-right">R$ 500</td>
                          <td className="text-right">R$ 15.000</td>
                          <td className="text-right">8-10</td>
                          <td className="text-right text-green-400">R$ 54.000</td>
                          <td className="text-right text-rose">R$ 32.550</td>
                          <td className="text-right text-green-400">R$ 19.450</td>
                        </tr>
                        <tr>
                          <td className="py-3">Escala (c/ func.)</td>
                          <td className="text-right">R$ 1.000</td>
                          <td className="text-right">R$ 30.000</td>
                          <td className="text-right">15-20</td>
                          <td className="text-right text-green-400">R$ 100.000+</td>
                          <td className="text-right text-rose">R$ 72.000</td>
                          <td className="text-right text-green-400">R$ 24.000+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-white/40 text-xs mt-4">
                    Sem frete (pago pelo cliente) e sem MO nos 3 primeiros cenarios (socios fazem). Cenario Escala inclui 2 funcionarios (R$ 4.000).
                  </p>
                </Card>

                <Card title="Break-Even Point (Ponto de Equilibrio)">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-white/40 text-sm mb-2">Para cobrir APENAS o ads</p>
                      <p className="text-3xl font-bold text-white">1,3 pedidos/dia</p>
                      <p className="text-white/40 text-xs mt-2">R$ 250 ads ÷ R$ 199 ticket = 1,3</p>
                      <p className="text-green-400 text-xs mt-1">Qualquer venda acima disso = lucro</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-white/40 text-sm mb-2">Para cobrir ads + materiais</p>
                      <p className="text-3xl font-bold text-white">1,9 pedidos/dia</p>
                      <p className="text-white/40 text-xs mt-2">(R$ 250 ads ÷ dia) ÷ (R$ 199 - R$ 65 custo) = 1,9</p>
                      <p className="text-green-400 text-xs mt-1">A partir do 2o pedido/dia = lucro real</p>
                    </div>
                  </div>
                </Card>

                <Card title="Resumo — Investimento Total para Meta R$ 1k/dia">
                  <div className="space-y-4">
                    <div className="bg-rose/10 border border-rose/30 rounded-xl p-5">
                      <h4 className="font-bold text-rose mb-3">Investimento Unico (para comecar)</h4>
                      <p className="text-3xl font-bold text-white">R$ 11.066</p>
                      <p className="text-white/50 text-sm mt-1">Epson L1800 + encadernadora + Cricut + materiais + primeiro lote embalagens</p>
                    </div>
                    <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5">
                      <h4 className="font-bold text-amber-400 mb-3">Investimento Mensal (materiais + ads)</h4>
                      <p className="text-3xl font-bold text-white">~R$ 17.250</p>
                      <p className="text-white/50 text-sm mt-1">R$ 7.500 trafego + R$ 9.750 materiais. Sem frete (cliente paga). Sem MO (socios fazem).</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                      <h4 className="font-bold text-green-400 mb-3">Retorno Mensal (Cenario 1 — Socios)</h4>
                      <p className="text-3xl font-bold text-white">R$ 30.000 faturamento</p>
                      <p className="text-3xl font-bold text-green-400">R$ 11.200 lucro para os socios</p>
                      <p className="text-white/50 text-sm mt-1">R$ 5.600 por socio/mes | Margem ~37% | Payback equipamentos: 1 mes</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBCOMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/50">{sub}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ cells, last }: { cells: string[]; last?: boolean }) {
  return (
    <tr className={last ? "" : "border-b border-white/5"}>
      {cells.map((c, i) => (
        <td key={i} className={`py-2.5 ${i === cells.length - 1 ? "text-right font-medium text-rose" : ""}`}>
          {c}
        </td>
      ))}
    </tr>
  );
}

function CostLine({ item, detail, value }: { item: string; detail: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm">{item}</p>
        {detail && <p className="text-white/30 text-xs">{detail}</p>}
      </div>
      <span className="text-white font-medium text-sm whitespace-nowrap">
        R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 text-center">
      <p className="text-white/40 text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function PLLine({ label, value, positive, highlight }: { label: string; value: string; positive?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? "text-lg" : ""}`}>
      <span className={`${highlight ? "font-bold text-white" : "text-white/70"} text-sm`}>{label}</span>
      <span className={`font-bold text-sm ${positive ? "text-green-400" : "text-rose"} ${highlight ? "text-xl" : ""}`}>
        {positive ? "" : "- "}{value}
      </span>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="bg-rose text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
      <span className="text-white/70 text-sm">{text}</span>
    </div>
  );
}

function Phase({ phase, budget, target, actions }: { phase: string; budget: string; target: string; actions: string[] }) {
  return (
    <div className="bg-white/5 rounded-xl p-5 border-l-2 border-rose">
      <h4 className="font-bold text-white mb-1">{phase}</h4>
      <div className="flex gap-4 mb-3 text-xs">
        <span className="text-rose">{budget}</span>
        <span className="text-green-400">{target}</span>
      </div>
      <ul className="space-y-1">
        {actions.map((a, i) => (
          <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
            <ChevronRight size={12} className="mt-1 text-rose flex-shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarLine({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/70">{label}</span>
        <span className="text-white font-bold">{pct}%</span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AdDetail({ budget, objetivo, publico, posicionamento, formato, criativo, hook, copy, cta, kpis }: {
  budget: string; objetivo: string; publico: string; posicionamento: string; formato: string; criativo: string; hook: string; copy: string; cta: string; kpis: string;
}) {
  return (
    <div className="space-y-3 text-sm">
      <div className="grid sm:grid-cols-2 gap-3">
        <p><span className="text-rose font-medium">Orcamento:</span> <span className="text-white/70">{budget}</span></p>
        <p><span className="text-rose font-medium">Objetivo:</span> <span className="text-white/70">{objetivo}</span></p>
      </div>
      <p><span className="text-rose font-medium">Publico:</span> <span className="text-white/60">{publico}</span></p>
      <div className="grid sm:grid-cols-2 gap-3">
        <p><span className="text-rose font-medium">Posicionamento:</span> <span className="text-white/70">{posicionamento}</span></p>
        <p><span className="text-rose font-medium">Formato:</span> <span className="text-white/70">{formato}</span></p>
      </div>
      <div className="bg-white/5 rounded-lg p-3 space-y-2">
        <p><span className="text-amber-400 font-medium">Criativo:</span> <span className="text-white/60">{criativo}</span></p>
        <p><span className="text-purple-400 font-medium">Hook:</span> <span className="text-white/60 italic">{hook}</span></p>
        <p><span className="text-blue-400 font-medium">Copy:</span> <span className="text-white/60 italic">{copy}</span></p>
        <p><span className="text-green-400 font-medium">CTA:</span> <span className="text-white/60">{cta}</span></p>
      </div>
      <p className="bg-green-500/10 rounded-lg px-3 py-2"><span className="text-green-400 font-medium">KPIs alvo:</span> <span className="text-white/70">{kpis}</span></p>
    </div>
  );
}
