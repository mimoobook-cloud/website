"use client";

import { useState } from "react";
import {
  Camera,
  Globe,
  CirclePlay,
  Music2,
  Search,
  MessageCircle,
  Calendar,
  Copy,
  Target,
  Megaphone,
  ChevronRight,
  Heart,
  Dog,
  Users,
  Plane,
  CheckCircle2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   PAGINA INTERNA — MARKETING MIMOOBOOK
   Acesso: /interno/marketing
   Publico: Time de marketing apenas
   ══════════════════════════════════════════════════════════════ */

const sections = [
  { id: "instagram", label: "Instagram", icon: Camera },
  { id: "facebook", label: "Facebook", icon: Globe },
  { id: "tiktok", label: "TikTok", icon: Music2 },
  { id: "youtube", label: "YouTube", icon: CirclePlay },
  { id: "google-ads", label: "Google Ads", icon: Search },
  { id: "trafego", label: "Trafego Pago", icon: Target },
  { id: "copy-bank", label: "Banco de Copy", icon: Copy },
  { id: "calendario", label: "Calendario", icon: Calendar },
  { id: "whatsapp", label: "WhatsApp + IA", icon: MessageCircle },
  { id: "funil", label: "Funil de Vendas", icon: Megaphone },
];

export default function MarketingPage() {
  const [activeSection, setActiveSection] = useState("instagram");

  return (
    <main className="min-h-screen pt-20 bg-neutral-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-20 left-0 bottom-0 w-56 bg-neutral-900 border-r border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-4 border-b border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-widest">
              Interno
            </p>
            <h2 className="text-lg font-bold text-white">
              Marketing Hub
            </h2>
          </div>
          <nav className="p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeSection === s.id
                    ? "bg-rose/20 text-rose"
                    : "text-white/60 hover:text-white hover:bg-white/5"
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  activeSection === s.id
                    ? "bg-rose/20 text-rose"
                    : "text-white/60"
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
            {/* ═══════════════════════════════════════════════════
                INSTAGRAM
                ═══════════════════════════════════════════════════ */}
            {activeSection === "instagram" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Estrategia Instagram"
                  subtitle="Pilares de conteudo, Reels, Stories e crescimento organico"
                />

                <Card title="Pilares de Conteudo (80/20)">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Pillar
                      pct="40%"
                      name="Emocao"
                      examples={[
                        "Reacao de quem recebe o presente",
                        "Antes/depois do scrapbook pronto",
                        "Depoimentos em video de clientes",
                      ]}
                    />
                    <Pillar
                      pct="25%"
                      name="Produto"
                      examples={[
                        "Close nos detalhes (adesivos, fotos Polaroid)",
                        "Processo de montagem (ASMR)",
                        "Unboxing do kit completo",
                      ]}
                    />
                    <Pillar
                      pct="20%"
                      name="Educativo"
                      examples={[
                        "Ideias de presente criativo",
                        "Como montar seu scrapbook",
                        "Dicas de fotos para imprimir",
                      ]}
                    />
                    <Pillar
                      pct="15%"
                      name="Venda direta"
                      examples={[
                        "Lancamento de novos temas",
                        "Promocoes relampago",
                        "Ultimas unidades / urgencia",
                      ]}
                    />
                  </div>
                </Card>

                <Card title="Roteiros de Reels (Top 10)">
                  <div className="space-y-4">
                    <Script
                      n={1}
                      title="A Reacao"
                      hook="POV: voce deu um scrapbook pro seu namorado e ele..."
                      body="Filmar a pessoa abrindo o presente. Usar musica emocional. Corte rapido pro rosto emocionado. Texto na tela: 'ele chorou'"
                      cta="Link na bio — crie o seu"
                      audio="musica trending emocional"
                    />
                    <Script
                      n={2}
                      title="ASMR Montagem"
                      hook="Sons satisfatorios de montar um scrapbook"
                      body="Close nas maos colando fotos, colocando adesivos, escrevendo com caneta branca. Sem fala, so sons. 15-30s."
                      cta="Kit completo no link da bio"
                      audio="som original / ASMR trending"
                    />
                    <Script
                      n={3}
                      title="Antes vs Depois"
                      hook="De fotos no celular para isso aqui..."
                      body="Tela do celular com galeria de fotos → transicao → scrapbook aberto lindo com as mesmas fotos em Polaroid. Wow effect."
                      cta="Transforme suas fotos — link na bio"
                      audio="trending transition audio"
                    />
                    <Script
                      n={4}
                      title="3 Presentes Que Fazem Chorar"
                      hook="3 presentes que vao fazer seu namorado(a) chorar"
                      body="1. Carta escrita a mao 2. Video surpresa 3. Mimoobook (mostrar o mais bonito por ultimo). 'Qual voce escolheria? Comenta'"
                      cta="Faca o pedido no link"
                      audio="musica fofa trending"
                    />
                    <Script
                      n={5}
                      title="Eu vs Elas"
                      hook="As amigas dando perfume... eu dando um Mimoobook"
                      body="Comparacao divertida mostrando presentes genericos vs o scrapbook personalizado. Tom humorado."
                      cta="Seja diferente — link na bio"
                      audio="trending comparison audio"
                    />
                    <Script
                      n={6}
                      title="Tutorial Express"
                      hook="Como montar seu Mimoobook em 3 minutos"
                      body="Timelapse montando: 1) Escolher fotos 2) Colar no scrapbook 3) Decorar com adesivos 4) Escrever com caneta branca. Resultado final."
                      cta="Peca o seu — link na bio"
                      audio="musica animada"
                    />
                    <Script
                      n={7}
                      title="Pet Edition"
                      hook="Fiz um album inteiro pro meu cachorro"
                      body="Mostrar o scrapbook de pet sendo montado. Fotos fofas do pet. Adesivos de patinha. Close na reacao do dono feliz."
                      cta="Seu pet merece — link na bio"
                      audio="musica fofa de pet"
                    />
                    <Script
                      n={8}
                      title="Expectativa vs Realidade"
                      hook="Quando eu pedi vs quando chegou"
                      body="Expectativa: fotos no celular. Realidade: scrapbook LINDO com tudo personalizado. Reacao genuina de surpresa positiva."
                      cta="Surpreenda-se tambem"
                      audio="trending reveal audio"
                    />
                    <Script
                      n={9}
                      title="O Kit Completo"
                      hook="Tudo que vem no kit Mimoobook"
                      body="Unboxing detalhado: scrapbook folhas pretas, fotos Polaroid, caneta branca, cola bastao, cartela de adesivos. Close em cada item."
                      cta="Peca o seu agora"
                      audio="unboxing trending audio"
                    />
                    <Script
                      n={10}
                      title="Datas Especiais"
                      hook="Ainda sem ideia pro Dia dos Namorados? Olha isso"
                      body="Adaptar para cada data comemorativa. Mostrar scrapbook tematico. Urgencia: 'ultimos dias para pedir'."
                      cta="Garanta o seu — vagas limitadas"
                      audio="musica romantica trending"
                    />
                  </div>
                </Card>

                <Card title="Estrategia de Stories">
                  <div className="space-y-3">
                    <StorySlot time="08h" content="Bom dia + bastidor (foto da mesa de trabalho)" />
                    <StorySlot time="10h" content="Enquete: 'Qual tema voce prefere? Casal / Pet / Familia'" />
                    <StorySlot time="12h" content="Repost de cliente / depoimento" />
                    <StorySlot time="15h" content="Mostrando processo de montagem (video curto)" />
                    <StorySlot time="18h" content="Caixinha de perguntas: 'Tire suas duvidas sobre o Mimoobook'" />
                    <StorySlot time="20h" content="CTA direto: 'Peca o seu — link aqui' com contagem regressiva" />
                  </div>
                </Card>

                <Card title="Hashtags por Categoria">
                  <div className="space-y-3">
                    <HashtagGroup
                      cat="Geral"
                      tags="#mimoobook #scrapbook #presentepersonalizado #presentecriativo #feitoamao #polaroid #scrapbooking #albumdefotos #presenteperfeito"
                    />
                    <HashtagGroup
                      cat="Casal"
                      tags="#presentenamorado #presentenamorada #diadosnamorados #aniversarionamoro #pedidodenamoro #casal #amor #namorados"
                    />
                    <HashtagGroup
                      cat="Pet"
                      tags="#petlovers #cachorrofofo #gatofofo #meupet #diadopet #albumdopet #petdoinstagram"
                    />
                    <HashtagGroup
                      cat="Familia"
                      tags="#presentedemae #diadasmaes #diadospais #familia #presentedefamilia #avos"
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                FACEBOOK
                ═══════════════════════════════════════════════════ */}
            {activeSection === "facebook" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Estrategia Facebook"
                  subtitle="Grupos, Marketplace, Ads e comunidade"
                />

                <Card title="Estrategia de Grupos">
                  <div className="space-y-3">
                    <Item text="Entrar em grupos de presentes criativos, DIY, casais, maes e pet lovers" />
                    <Item text="Postar 3x por semana com fotos reais do produto (nao parecer anuncio)" />
                    <Item text="Responder perguntas tipo 'ideia de presente' com sugestao natural do Mimoobook" />
                    <Item text="Criar grupo proprio: 'Mimoobook — Ideias de Presentes Criativos' para fidelizar" />
                  </div>
                </Card>

                <Card title="Tipos de Post Organico">
                  <div className="space-y-4">
                    <PostType
                      type="Carrossel"
                      desc="5 slides: 'Os 5 melhores presentes pra Dia dos Namorados' — ultimo slide e o Mimoobook com CTA"
                    />
                    <PostType
                      type="Video curto"
                      desc="Reaproveitar Reels do Instagram. Videos de reacao e unboxing performam melhor no Facebook para mulheres 25-45"
                    />
                    <PostType
                      type="Depoimento"
                      desc="Print de conversa de WhatsApp (com autorizacao) de cliente elogiando. Texto: 'Mais um cliente feliz'"
                    />
                    <PostType
                      type="Bastidor"
                      desc="Foto da mesa de trabalho com materiais. Texto humanizado: 'Preparando mais um Mimoobook com muito carinho'"
                    />
                  </div>
                </Card>

                <Card title="Facebook Ads — Campanhas">
                  <div className="space-y-4">
                    <Campaign
                      name="TOFU — Descoberta"
                      objective="Alcance / Video Views"
                      audience="Mulheres 18-45, interesse em presentes, scrapbook, DIY, artesanato, dia dos namorados"
                      budget="R$ 20-30/dia"
                      creative="Video de reacao (Reel reaproveitado). Hook nos 3 primeiros segundos."
                      copy="Ja pensou em dar um presente que faz CHORAR de emocao? Conheca o Mimoobook — feito a mao, so com fotos de voces."
                    />
                    <Campaign
                      name="MOFU — Consideracao"
                      objective="Trafego / Engajamento"
                      audience="Retargeting: quem assistiu 50%+ do video TOFU"
                      budget="R$ 15-25/dia"
                      creative="Carrossel com detalhes do produto + depoimentos"
                      copy="Mais de 500 presentes entregues com amor. Escolha seu plano a partir de R$ 149. Fotos Polaroid, caneta branca e adesivos inclusos."
                    />
                    <Campaign
                      name="BOFU — Conversao"
                      objective="Conversoes / Mensagens WhatsApp"
                      audience="Retargeting: visitou site, adicionou ao carrinho, engajou no MOFU"
                      budget="R$ 25-40/dia"
                      creative="Imagem unica com oferta clara + urgencia"
                      copy="Ultimas vagas da semana! Seu Mimoobook enviado em ate 7 dias uteis. Escolha entre 20, 40 ou 60 fotos Polaroid. Toque pra pedir o seu."
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                TIKTOK
                ═══════════════════════════════════════════════════ */}
            {activeSection === "tiktok" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Estrategia TikTok"
                  subtitle="Viralizar com emocao, trends e autenticidade"
                />

                <Card title="Regras de Ouro TikTok">
                  <div className="space-y-3">
                    <Item text="Hook nos primeiros 1-2 segundos (texto na tela + fala direta)" />
                    <Item text="Videos de 15-30s performam melhor para engajamento" />
                    <Item text="Autenticidade > producao. Celular na mao, luz natural" />
                    <Item text="Usar trending sounds SEMPRE. Checar daily trends" />
                    <Item text="Postar 1-2x por dia nos horarios: 11h, 17h, 20h" />
                    <Item text="Responder TODOS os comentarios com video (gera mais views)" />
                  </div>
                </Card>

                <Card title="Roteiros TikTok (Top 8)">
                  <div className="space-y-4">
                    <Script
                      n={1}
                      title="O Choro Garantido"
                      hook="(texto na tela) 'dei isso pro meu namorado e olha a reacao dele'"
                      body="Filmar de lado a pessoa abrindo. Foco no rosto. Momento do choro/emocao. Sem edicao pesada — autenticidade pura."
                      cta="Quer fazer alguem chorar de felicidade? Link na bio"
                      audio="som emocional trending"
                    />
                    <Script
                      n={2}
                      title="Respondendo Haters"
                      hook="'Pra que um scrapbook se tem celular?' — olha isso"
                      body="Mostrar a diferenca: rolando feed infinito no celular vs folheando um scrapbook fisico com fotos Polaroid, adesivos. 'Tecnologia nao substitui toque.'"
                      cta="Sente a diferenca — link na bio"
                      audio="trending debate audio"
                    />
                    <Script
                      n={3}
                      title="Get Ready With Me"
                      hook="GRWM mas e pra montar um presente"
                      body="Timelapse montando o scrapbook: escolhendo fotos, colando, decorando, embalando. Background chill."
                      cta="Monte o seu — link na bio"
                      audio="GRWM trending audio"
                    />
                    <Script
                      n={4}
                      title="Storytime"
                      hook="Storytime: como eu comecei a fazer scrapbooks"
                      body="Contar a historia da marca de forma pessoal. Humanizar. Mostrar o processo e a paixao."
                      cta="Faca parte dessa historia"
                      audio="storytime audio trending"
                    />
                    <Script
                      n={5}
                      title="Trend Jacking"
                      hook="(adaptar qualquer trend viral)"
                      body="Pegar o formato da trend do momento e adaptar pro contexto scrapbook. Ex: 'Tell me you love your partner without telling me' → mostrar o scrapbook"
                      cta="Adaptar CTA ao contexto"
                      audio="o audio da trend"
                    />
                    <Script
                      n={6}
                      title="Dueto com Cliente"
                      hook="Dueto com video de cliente mostrando o scrapbook que recebeu"
                      body="Reagir ao video do cliente com surpresa/felicidade. Humaniza a marca. Gera prova social."
                      cta="Quer o seu? Link na bio"
                      audio="som original"
                    />
                    <Script
                      n={7}
                      title="POV Serie"
                      hook="POV: voce encontrou o presente perfeito"
                      body="Camera em primeira pessoa: abrindo o pacote, vendo cada detalhe do scrapbook, fotos Polaroid, adesivos. Close cinematico."
                      cta="O presente perfeito existe"
                      audio="musica cinematica trending"
                    />
                    <Script
                      n={8}
                      title="Comparacao de Precos"
                      hook="R$ 200 em perfume vs R$ 200 em Mimoobook"
                      body="Lado a lado: perfume que acaba em 3 meses vs scrapbook que dura pra sempre. Provocar reflexao."
                      cta="Invista em memorias"
                      audio="trending comparison audio"
                    />
                  </div>
                </Card>

                <Card title="Estrategia de Crescimento">
                  <div className="space-y-3">
                    <Item text="Collab com micro influenciadores (5-50k seguidores) — enviar kit em troca de conteudo" />
                    <Item text="Criar desafio #MimooBookChallenge — 'mostre o presente mais criativo que voce ja deu'" />
                    <Item text="Series semanais: 'Scrapbook da Semana' mostrando um pedido real" />
                    <Item text="Responder comentarios populares com video — hack de alcance" />
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                YOUTUBE
                ═══════════════════════════════════════════════════ */}
            {activeSection === "youtube" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Estrategia YouTube"
                  subtitle="Shorts para alcance, long-form para autoridade"
                />

                <Card title="YouTube Shorts (Reaproveitamento)">
                  <div className="space-y-3">
                    <Item text="Repostar TODOS os Reels/TikToks como Shorts (mesmo conteudo)" />
                    <Item text="Adicionar legenda embutida (muitos assistem sem som)" />
                    <Item text="Thumbnail com texto grande e emocional" />
                    <Item text="Frequencia: 3-5 Shorts por semana (reaproveitados)" />
                  </div>
                </Card>

                <Card title="Videos Long-Form (1-2x por mes)">
                  <div className="space-y-4">
                    <VideoIdea
                      title="Como Montar Seu Mimoobook — Tutorial Completo"
                      duration="8-12 min"
                      desc="Passo a passo detalhado: escolher fotos, organizar, colar, decorar com adesivos, escrever com caneta branca. SEO: 'como fazer scrapbook'"
                    />
                    <VideoIdea
                      title="10 Ideias de Presente Personalizado"
                      duration="6-10 min"
                      desc="Lista de presentes criativos. Mimoobook como #1 ou #10 (melhor pro ultimo). SEO: 'presente criativo namorado'"
                    />
                    <VideoIdea
                      title="Unboxing + Review Completo de Cada Plano"
                      duration="5-8 min"
                      desc="Mostrar detalhadamente o que vem em cada plano (Essencial, Especial, Premium). Comparar lado a lado."
                    />
                    <VideoIdea
                      title="Reagindo a Reacoes de Clientes"
                      duration="10-15 min"
                      desc="Compilado de videos de clientes abrindo/reagindo. Comentar cada um. Muito emocional."
                    />
                  </div>
                </Card>

                <Card title="SEO — Palavras-chave Alvo">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "presente criativo namorado",
                      "presente personalizado",
                      "como fazer scrapbook",
                      "ideia presente dia dos namorados",
                      "scrapbook artesanal",
                      "presente mae",
                      "album de fotos polaroid",
                      "presente que faz chorar",
                      "scrapbook casal",
                      "presente pet",
                    ].map((kw) => (
                      <span
                        key={kw}
                        className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                GOOGLE ADS
                ═══════════════════════════════════════════════════ */}
            {activeSection === "google-ads" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Google Ads"
                  subtitle="Search, Display e Shopping para capturar demanda"
                />

                <Card title="Campanhas Search">
                  <div className="space-y-4">
                    <Campaign
                      name="Branded — Mimoobook"
                      objective="Search"
                      audience="Quem busca 'mimoobook', 'mimoo book', 'mimoobook.com.br'"
                      budget="R$ 5-10/dia"
                      creative="Extensoes de sitelink, callout, preco"
                      copy="Mimoobook — Scrapbook Artesanal Personalizado | A partir de R$ 149 | Fotos Polaroid + Adesivos | Envio em 7 dias uteis | Peca o Seu"
                    />
                    <Campaign
                      name="Generica — Presente Criativo"
                      objective="Search"
                      audience="Palavras-chave: 'presente personalizado', 'presente criativo namorado', 'scrapbook personalizado', 'presente dia dos namorados'"
                      budget="R$ 30-50/dia"
                      creative="RSA com 15 titulos e 4 descricoes testando angulos diferentes"
                      copy="Titulo 1: O Presente Que Faz Chorar de Emocao | Titulo 2: Scrapbook Com Suas Fotos em Polaroid | Titulo 3: Feito a Mao, Unico Como Voces | Desc: 20, 40 ou 60 fotos Polaroid impressas. Kit completo com caneta e adesivos. Envio em ate 7 dias uteis. Entrega em 15 a 30 dias."
                    />
                    <Campaign
                      name="Datas — Sazonais"
                      objective="Search"
                      audience="Palavras-chave sazonais: 'presente dia das maes', 'presente dia dos namorados', 'presente natal personalizado'"
                      budget="R$ 50-80/dia (ativar 2 semanas antes da data)"
                      creative="Anuncios especificos por data com urgencia"
                      copy="Dia dos Namorados — Presente Inesquecivel | Scrapbook Artesanal Com Suas Fotos | Ultimos Dias Para Pedir | Entrega Garantida"
                    />
                  </div>
                </Card>

                <Card title="Palavras-Chave Negativas">
                  <p className="text-white/50 text-sm mb-3">
                    Adicionar para evitar desperdicio:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "gratis",
                      "como fazer",
                      "tutorial",
                      "molde",
                      "template",
                      "download",
                      "pdf",
                      "app",
                      "digital",
                      "online gratis",
                    ].map((kw) => (
                      <span
                        key={kw}
                        className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full"
                      >
                        -{kw}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                TRAFEGO PAGO — VISAO GERAL
                ═══════════════════════════════════════════════════ */}
            {activeSection === "trafego" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Campanhas de Trafego"
                  subtitle="Orcamento, segmentacao e estrategia por canal"
                />

                <Card title="Distribuicao de Orcamento Mensal">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Canal</th>
                          <th className="text-left py-3">% Orcamento</th>
                          <th className="text-left py-3">Se R$ 2.000/mes</th>
                          <th className="text-left py-3">Objetivo</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/5">
                          <td className="py-3">Meta (IG + FB)</td>
                          <td>45%</td>
                          <td>R$ 900</td>
                          <td>Conversao + Video Views</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Google Ads</td>
                          <td>30%</td>
                          <td>R$ 600</td>
                          <td>Search (demanda ativa)</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">TikTok Ads</td>
                          <td>20%</td>
                          <td>R$ 400</td>
                          <td>Alcance + Conversao</td>
                        </tr>
                        <tr>
                          <td className="py-3">Influenciadores</td>
                          <td>5%</td>
                          <td>R$ 100 (+ permuta)</td>
                          <td>Prova social</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="Segmentacao Padrao — Todas as Plataformas">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-rose mb-2">Principal</h4>
                      <p className="text-sm text-white/60">Mulheres 18-35, interesse em presentes, artesanato, scrapbook, DIY, casais, romanticos</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-rose mb-2">Secundario</h4>
                      <p className="text-sm text-white/60">Mulheres 25-45, maes, interesse em familia, pet lovers, viagens</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-rose mb-2">Lookalike</h4>
                      <p className="text-sm text-white/60">1-3% de compradores, visitantes do site, engajadores IG/FB</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-rose mb-2">Retargeting</h4>
                      <p className="text-sm text-white/60">Visitou site ultimos 30 dias, assistiu 50%+ video, engajou post</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                BANCO DE COPY
                ═══════════════════════════════════════════════════ */}
            {activeSection === "copy-bank" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Banco de Copy"
                  subtitle="Headlines, legendas e CTAs prontos para usar"
                />

                <Card title="Headlines (Titulo principal)">
                  <div className="space-y-2">
                    {[
                      "O presente que faz chorar de emocao",
                      "Suas fotos merecem mais que uma tela de celular",
                      "Feito a mao. Feito com amor. Feito pra voces.",
                      "O presente que ninguem esquece",
                      "Transforme fotos em memorias que voce pode tocar",
                      "Ele nao sabe ler. Mas cada pagina e sobre ele. (pet)",
                      "Sua mae vai chorar. Seu pai vai fingir que nao.",
                      "Aquela viagem mudou voce. Agora ela pode virar um livro.",
                      "Perfumes acabam. Flores murcham. Memorias ficam.",
                      "R$ 149 por um presente que dura pra sempre",
                    ].map((h, i) => (
                      <CopyLine key={i} text={h} />
                    ))}
                  </div>
                </Card>

                <Card title="Legendas Instagram (Prontas)">
                  <div className="space-y-4">
                    <CopyBlock
                      title="Legenda padrao de venda"
                      text={`Imagina dar um presente que faz a pessoa SENTIR o quanto ela e especial pra voce?\n\nO Mimoobook e um scrapbook artesanal com suas fotos impressas em Polaroid. Voce recebe tudo pra montar: fotos, caneta branca, cola e adesivos.\n\nEscolha entre 20, 40 ou 60 fotos.\nA partir de R$ 149.\n\nToque no link da bio pra criar o seu.`}
                    />
                    <CopyBlock
                      title="Legenda emocional"
                      text={`Ela abriu. Leu cada pagina. E chorou.\n\nIsso e o que acontece quando voce transforma fotos em algo que se pode tocar, folhear e guardar pra sempre.\n\nMimoobook — feito a mao, so com momentos de voces.\n\nLink na bio.`}
                    />
                    <CopyBlock
                      title="Legenda urgencia"
                      text={`ULTIMAS VAGAS DA SEMANA.\n\nComo cada Mimoobook e feito a mao, aceitamos poucas encomendas por semana.\n\nEnviamos em ate 7 dias uteis. Peca agora pelo link na bio.\n\n20, 40 ou 60 fotos Polaroid. Caneta branca + adesivos inclusos.`}
                    />
                  </div>
                </Card>

                <Card title="CTAs (Call to Action)">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Criar Meu Mimoobook",
                      "Quero o Meu",
                      "Pedir Agora",
                      "Garanta o Seu",
                      "Eternizar Nossos Momentos",
                      "Link na bio — peca o seu",
                      "Toque para comecar",
                      "Chama no WhatsApp",
                      "Vagas limitadas — peca agora",
                      "Presente perfeito a partir de R$ 149",
                    ].map((cta, i) => (
                      <CopyLine key={i} text={cta} />
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                CALENDARIO COMEMORATIVO
                ═══════════════════════════════════════════════════ */}
            {activeSection === "calendario" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Calendario Comemorativo 2026"
                  subtitle="Planejamento anual por data e categoria"
                />

                <Card title="Legenda de Categorias">
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1 text-sm"><Heart size={14} className="text-rose" /> Casal</span>
                    <span className="flex items-center gap-1 text-sm"><Dog size={14} className="text-amber-400" /> Pet</span>
                    <span className="flex items-center gap-1 text-sm"><Users size={14} className="text-blue-400" /> Familia</span>
                    <span className="flex items-center gap-1 text-sm"><Plane size={14} className="text-green-400" /> Momentos</span>
                    <span className="flex items-center gap-1 text-sm"><Target size={14} className="text-purple-400" /> Comercial</span>
                  </div>
                </Card>

                {[
                  {
                    month: "Janeiro",
                    dates: [
                      { day: "01", name: "Ano Novo", cat: "momentos", action: "Post: 'Novo ano, novas memorias pra criar'. Promo lancamento." },
                      { day: "25", name: "Aniversario de SP (regional)", cat: "momentos", action: "Se publico em SP, post tematico." },
                    ],
                  },
                  {
                    month: "Fevereiro",
                    dates: [
                      { day: "14", name: "Valentine's Day (Internacional)", cat: "casal", action: "Campanha para publico internacional / casais que comemoram esta data. Reels: '2 datas pra presentear, porque nao?'" },
                      { day: "20-25", name: "Carnaval", cat: "momentos", action: "Post: 'Registre os melhores momentos do Carnaval num Mimoobook'. Fotos de viagem/amigos." },
                    ],
                  },
                  {
                    month: "Marco",
                    dates: [
                      { day: "08", name: "Dia da Mulher", cat: "familia", action: "Campanha: presente pra mae, irma, amiga. Copy: 'Pra mulher que merece mais que flores'." },
                      { day: "15", name: "Dia do Consumidor", cat: "comercial", action: "PROMO: 10% OFF em todos os planos por 48h. Trafego pago com urgencia." },
                    ],
                  },
                  {
                    month: "Abril",
                    dates: [
                      { day: "15", name: "Pascoa (aprox)", cat: "familia", action: "Combo: Mimoobook + chocolate. 'Presente de Pascoa diferente'." },
                    ],
                  },
                  {
                    month: "Maio",
                    dates: [
                      { day: "11", name: "Dia das Maes", cat: "familia", action: "CAMPANHA FORTE (2a maior data). Comecar ads 3 semanas antes. Copy: 'O presente que sua mae vai guardar pra sempre'. Roteiro especial de Reels: mae abrindo o scrapbook." },
                    ],
                  },
                  {
                    month: "Junho",
                    dates: [
                      { day: "12", name: "Dia dos Namorados", cat: "casal", action: "CAMPANHA PRINCIPAL DO ANO. Comecar ads 4 semanas antes. Orcamento 3x normal. Copy: 'O presente que faz chorar de emocao'. Todos os canais. Influenciadores. Contagem regressiva stories." },
                      { day: "24", name: "Festa Junina", cat: "momentos", action: "Post tematico leve. 'Festas juninas em familia merecem um album'." },
                    ],
                  },
                  {
                    month: "Julho",
                    dates: [
                      { day: "01-31", name: "Ferias escolares", cat: "momentos", action: "Campanha: 'Registre as ferias num Mimoobook'. Foco em viagens e familia." },
                      { day: "20", name: "Dia do Amigo", cat: "momentos", action: "Campanha: scrapbook de amizade. '10 anos de amizade merecem um livro'. Reels: melhores amigas reagindo." },
                      { day: "26", name: "Dia dos Avos", cat: "familia", action: "Campanha emocional: netos fazendo scrapbook pros avos. Copy: 'Eles merecem mais que uma ligacao'." },
                    ],
                  },
                  {
                    month: "Agosto",
                    dates: [
                      { day: "10", name: "Dia dos Pais", cat: "familia", action: "CAMPANHA FORTE. Copy: 'Seu pai vai fingir que nao, mas vai chorar'. Reels: pai abrindo scrapbook com fotos dos filhos." },
                    ],
                  },
                  {
                    month: "Setembro",
                    dates: [
                      { day: "01-30", name: "Mes dos Namorados (BR informal)", cat: "casal", action: "Campanha secundaria para casais. 'Nao precisa de data pra demonstrar amor'." },
                      { day: "21", name: "Dia da Arvore / Primavera", cat: "momentos", action: "Post leve: 'Novo ciclo, novas memorias'." },
                    ],
                  },
                  {
                    month: "Outubro",
                    dates: [
                      { day: "04", name: "Dia dos Animais / Pet", cat: "pet", action: "CAMPANHA PET. Reels: pets fofos + scrapbook. Copy: 'Ele nao sabe ler, mas cada pagina e sobre ele'. Influenciadores pet." },
                      { day: "12", name: "Dia das Criancas", cat: "familia", action: "Campanha: album da familia. 'Registre a infancia antes que passe voando'." },
                      { day: "15", name: "Dia do Professor", cat: "momentos", action: "Post: scrapbook de turma para professor. Nicho escolar." },
                    ],
                  },
                  {
                    month: "Novembro",
                    dates: [
                      { day: "25", name: "Black Friday", cat: "comercial", action: "PROMO MAIOR DO ANO. 20-30% OFF ou frete gratis. Comecar teasers 1 semana antes. Orcamento ads 4x normal. Todos os canais. Contagem regressiva." },
                      { day: "28", name: "Cyber Monday", cat: "comercial", action: "Estender promo por mais 48h. 'Ultima chance do ano'." },
                    ],
                  },
                  {
                    month: "Dezembro",
                    dates: [
                      { day: "01-20", name: "Campanha de Natal", cat: "familia", action: "CAMPANHA FORTE. Comecar cedo (1/12). Copy: 'O presente de Natal que ninguem vai esquecer'. Foco em familia. Kit natalino especial. Urgencia: 'ultimos dias para entrega antes do Natal'." },
                      { day: "25", name: "Natal", cat: "familia", action: "Post de agradecimento. Repost de clientes abrindo presentes de Natal." },
                      { day: "31", name: "Reveillon", cat: "momentos", action: "Post: 'Retrospectiva do ano em paginas'. Promo de ano novo." },
                    ],
                  },
                ].map((m) => (
                  <Card key={m.month} title={m.month}>
                    <div className="space-y-3">
                      {m.dates.map((d, i) => (
                        <CalendarDate
                          key={i}
                          day={d.day}
                          name={d.name}
                          cat={d.cat}
                          action={d.action}
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                WHATSAPP + IA
                ═══════════════════════════════════════════════════ */}
            {activeSection === "whatsapp" && (
              <div className="space-y-10">
                <SectionHeader
                  title="WhatsApp + IA"
                  subtitle="Fluxo de venda, pos-venda e automacao com IA"
                />

                <Card title="Fluxo de Venda (Atendimento)">
                  <div className="space-y-4">
                    <FlowStep
                      n={1}
                      title="Saudacao automatica (IA)"
                      msg="Oi! Bem-vindo(a) ao Mimoobook! Aqui a gente transforma suas fotos em memorias eternas. Como posso te ajudar?\n\n1. Quero fazer um pedido\n2. Quero saber mais sobre os planos\n3. Ja fiz um pedido e quero acompanhar\n4. Falar com atendente"
                    />
                    <FlowStep
                      n={2}
                      title="Apresentacao dos planos (IA)"
                      msg="Temos 3 planos lindos:\n\nEssencial (R$ 149) — 20 fotos Polaroid\nEspecial (R$ 199) — 40 fotos Polaroid ⭐\nPremium (R$ 250) — 60 fotos Polaroid\n\nTodos vem com: scrapbook A5 folhas pretas, caneta branca, cola bastao e cartela de adesivos.\n\nQual te interessa?"
                    />
                    <FlowStep
                      n={3}
                      title="Coleta de informacoes (IA)"
                      msg="Perfeito! Pra montar seu Mimoobook preciso de:\n\n1. Seu nome completo\n2. Categoria (Casal, Pet, Familia ou Momentos)\n3. Alguma frase especial que quer na dedicatoria?\n\nPode mandar!"
                    />
                    <FlowStep
                      n={4}
                      title="Solicitacao de fotos (IA)"
                      msg="Agora e a melhor parte! Envia aqui as [20/40/60] fotos que voce quer no scrapbook.\n\nDica: fotos com boa iluminacao ficam ainda mais lindas na Polaroid!\n\nPode mandar todas de uma vez."
                    />
                    <FlowStep
                      n={5}
                      title="Confirmacao + pagamento (Humano)"
                      msg="Recebi tudo! Aqui o resumo do seu pedido:\n\n[resumo]\n\nTotal: R$ [valor]\n\nFormas de pagamento:\nPix (5% desconto)\nCartao (ate 3x sem juros)\n\nQual prefere?"
                    />
                  </div>
                </Card>

                <Card title="Fluxo Pos-Venda (IA)">
                  <div className="space-y-4">
                    <FlowStep
                      n={1}
                      title="Confirmacao de pagamento"
                      msg="Pagamento confirmado! Seu Mimoobook #[numero] esta sendo preparado com muito carinho.\n\nPrazo de envio: ate 7 dias uteis. Entrega pelos Correios: 15 a 30 dias.\nVou te atualizar por aqui quando enviar!"
                    />
                    <FlowStep
                      n={2}
                      title="Update de producao (dia 3-4)"
                      msg="Oi! Seu Mimoobook #[numero] ja esta sendo montado! Logo logo ele sai daqui direto pra voce.\n\nQuer ver um spoiler? [foto do processo]"
                    />
                    <FlowStep
                      n={3}
                      title="Envio"
                      msg="Seu Mimoobook #[numero] acabou de ser enviado!\n\nCodigo de rastreio: [codigo]\nRastrear: [link]\n\nQualquer duvida, estou aqui!"
                    />
                    <FlowStep
                      n={4}
                      title="Pos-entrega (dia seguinte)"
                      msg="Oi! Seu Mimoobook ja chegou? Quero muito saber o que achou!\n\nSe puder gravar a reacao de quem recebeu, a gente ama ver (e pode repostar com credito!).\n\nAvalie de 1 a 5 estrelas pra gente melhorar sempre."
                    />
                    <FlowStep
                      n={5}
                      title="Recompra (30 dias depois)"
                      msg="Oi! Faz 1 mes que voce pediu seu Mimoobook. Espero que esteja amando!\n\nSabia que muitos clientes fazem um segundo? Pet, familia, viagem...\n\nSe quiser fazer outro, tenho 10% OFF especial pra voce. Valido por 48h!"
                    />
                  </div>
                </Card>

                <Card title="Config IA — Prompt do Chatbot">
                  <div className="bg-white/5 rounded-xl p-4 text-sm text-white/70 font-mono whitespace-pre-wrap">
{`Voce e a assistente virtual do Mimoobook, uma marca de scrapbooks artesanais personalizados.

PERSONALIDADE: Acolhedora, animada, usa emojis com moderacao.

PRODUTOS:
- Essencial (R$ 149): 20 fotos Polaroid, scrapbook A5 folhas pretas, caneta branca, cola bastao, 1 cartela adesivos
- Especial (R$ 199): 40 fotos, tudo do Essencial + 2 cartelas adesivos premium
- Premium (R$ 250): 60 fotos, tudo do Especial + caneta dourada, recortes decorativos, cartinha escrita a mao, embalagem premium

CATEGORIAS: Casal, Pet, Familia, Momentos

REGRAS:
- Sempre responda em portugues brasileiro
- Se a pessoa perguntar algo que voce nao sabe, diga que vai encaminhar pra um atendente
- Nunca invente informacoes sobre prazos ou precos
- Prazo de envio: ate 7 dias uteis para todos os planos. Entrega pelos Correios: 15 a 30 dias
- Pagamento: Pix (5% desconto) ou cartao (ate 3x sem juros)
- Frete: calculado na finalizacao
- Se pedirem desconto, ofereca 5% no Pix (ja incluso)
- Encaminhe para humano: reclamacoes, trocas, problemas de pagamento`}
                  </div>
                </Card>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════
                FUNIL DE VENDAS
                ═══════════════════════════════════════════════════ */}
            {activeSection === "funil" && (
              <div className="space-y-10">
                <SectionHeader
                  title="Funil de Vendas Completo"
                  subtitle="Da descoberta a recompra — cada etapa mapeada"
                />

                <Card title="Visao Geral do Funil">
                  <div className="space-y-6">
                    <FunnelStage
                      stage="TOPO (Descoberta)"
                      color="text-blue-400"
                      channels="Reels, TikTok, YouTube Shorts, Google Search"
                      goal="Gerar curiosidade e emocao. Fazer a pessoa pensar 'eu quero dar isso de presente'"
                      kpi="Alcance, views, seguidores novos"
                      content="Videos de reacao, ASMR, antes/depois, trends"
                    />
                    <FunnelStage
                      stage="MEIO (Consideracao)"
                      color="text-amber-400"
                      channels="Feed IG/FB, Stories, Retargeting ads, YouTube"
                      goal="Educar sobre o produto, mostrar prova social, tirar duvidas"
                      kpi="Engajamento, cliques no site, salvamentos"
                      content="Depoimentos, detalhes do produto, FAQ, comparacoes"
                    />
                    <FunnelStage
                      stage="FUNDO (Conversao)"
                      color="text-green-400"
                      channels="Site, WhatsApp, Retargeting ads, Email"
                      goal="Converter em pedido. Facilitar ao maximo o processo"
                      kpi="Pedidos, taxa de conversao, ticket medio"
                      content="Oferta clara, urgencia, CTA direto, atendimento WhatsApp"
                    />
                    <FunnelStage
                      stage="POS-VENDA (Fidelizacao)"
                      color="text-purple-400"
                      channels="WhatsApp, Email, Instagram"
                      goal="Encantar, gerar recompra e indicacoes"
                      kpi="NPS, recompra, UGC (conteudo do cliente)"
                      content="Update de status, pedido de avaliacao, cupom de recompra, repost"
                    />
                  </div>
                </Card>

                <Card title="Metricas e KPIs Mensais">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50">
                          <th className="text-left py-3">Metrica</th>
                          <th className="text-left py-3">Meta Mes 1</th>
                          <th className="text-left py-3">Meta Mes 3</th>
                          <th className="text-left py-3">Meta Mes 6</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/5">
                          <td className="py-3">Seguidores IG</td>
                          <td>500</td>
                          <td>2.000</td>
                          <td>5.000</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Visitas site/mes</td>
                          <td>300</td>
                          <td>1.500</td>
                          <td>5.000</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Pedidos/mes</td>
                          <td>10</td>
                          <td>30</td>
                          <td>80</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Ticket medio</td>
                          <td>R$ 180</td>
                          <td>R$ 199</td>
                          <td>R$ 210</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">CAC (Custo aquisicao)</td>
                          <td>R$ 60</td>
                          <td>R$ 40</td>
                          <td>R$ 30</td>
                        </tr>
                        <tr>
                          <td className="py-3">Taxa recompra</td>
                          <td>5%</td>
                          <td>10%</td>
                          <td>20%</td>
                        </tr>
                      </tbody>
                    </table>
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

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/50">{subtitle}</p>
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

function Pillar({ pct, name, examples }: { pct: string; name: string; examples: string[] }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-rose font-bold text-sm">{pct}</span>
        <span className="font-bold text-white">{name}</span>
      </div>
      <ul className="space-y-1">
        {examples.map((e, i) => (
          <li key={i} className="text-white/50 text-sm flex items-start gap-2">
            <ChevronRight size={12} className="mt-1 flex-shrink-0 text-rose" />
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Script({ n, title, hook, body, cta, audio }: { n: number; title: string; hook: string; body: string; cta: string; audio: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border-l-2 border-rose">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-rose text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{n}</span>
        <h4 className="font-bold text-white">{title}</h4>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-rose font-medium">Hook:</span> <span className="text-white/70">{hook}</span></p>
        <p><span className="text-amber-400 font-medium">Roteiro:</span> <span className="text-white/70">{body}</span></p>
        <p><span className="text-green-400 font-medium">CTA:</span> <span className="text-white/70">{cta}</span></p>
        <p><span className="text-purple-400 font-medium">Audio:</span> <span className="text-white/70">{audio}</span></p>
      </div>
    </div>
  );
}

function StorySlot({ time, content }: { time: string; content: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="bg-rose/20 text-rose text-xs font-bold px-2 py-1 rounded w-12 text-center flex-shrink-0">{time}</span>
      <span className="text-white/70 text-sm">{content}</span>
    </div>
  );
}

function HashtagGroup({ cat, tags }: { cat: string; tags: string }) {
  return (
    <div>
      <span className="text-rose font-medium text-sm">{cat}:</span>
      <p className="text-white/50 text-sm mt-1">{tags}</p>
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 size={16} className="mt-0.5 text-rose flex-shrink-0" />
      <span className="text-white/70 text-sm">{text}</span>
    </div>
  );
}

function PostType({ type, desc }: { type: string; desc: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <h4 className="font-bold text-white mb-1">{type}</h4>
      <p className="text-white/50 text-sm">{desc}</p>
    </div>
  );
}

function Campaign({ name, objective, audience, budget, creative, copy }: { name: string; objective: string; audience: string; budget: string; creative: string; copy: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border-l-2 border-rose">
      <h4 className="font-bold text-white mb-3">{name}</h4>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <p><span className="text-rose">Objetivo:</span> <span className="text-white/60">{objective}</span></p>
        <p><span className="text-rose">Orcamento:</span> <span className="text-white/60">{budget}</span></p>
        <p className="sm:col-span-2"><span className="text-rose">Publico:</span> <span className="text-white/60">{audience}</span></p>
        <p className="sm:col-span-2"><span className="text-rose">Criativo:</span> <span className="text-white/60">{creative}</span></p>
        <p className="sm:col-span-2"><span className="text-rose">Copy:</span> <span className="text-white/60 italic">{copy}</span></p>
      </div>
    </div>
  );
}

function VideoIdea({ title, duration, desc }: { title: string; duration: string; desc: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-bold text-white">{title}</h4>
        <span className="bg-rose/20 text-rose text-xs px-2 py-0.5 rounded">{duration}</span>
      </div>
      <p className="text-white/50 text-sm">{desc}</p>
    </div>
  );
}

function CopyLine({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white/5 rounded-lg px-4 py-2.5 group">
      <span className="text-white/80 text-sm">{text}</span>
      <button
        onClick={() => navigator.clipboard?.writeText(text)}
        className="text-white/20 hover:text-rose transition-colors flex-shrink-0"
        title="Copiar"
      >
        <Copy size={14} />
      </button>
    </div>
  );
}

function CopyBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <button
          onClick={() => navigator.clipboard?.writeText(text)}
          className="text-white/30 hover:text-rose transition-colors"
          title="Copiar"
        >
          <Copy size={14} />
        </button>
      </div>
      <p className="text-white/60 text-sm whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function CalendarDate({ day, name, cat, action }: { day: string; name: string; cat: string; action: string }) {
  const catColors: Record<string, string> = {
    casal: "text-rose",
    pet: "text-amber-400",
    familia: "text-blue-400",
    momentos: "text-green-400",
    comercial: "text-purple-400",
  };
  return (
    <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
      <span className="bg-white/10 text-white/80 text-xs font-bold px-2 py-1 rounded w-14 text-center flex-shrink-0">
        {day}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">{name}</span>
          <span className={`text-xs font-medium uppercase ${catColors[cat] || "text-white/40"}`}>{cat}</span>
        </div>
        <p className="text-white/50 text-sm mt-1">{action}</p>
      </div>
    </div>
  );
}

function FlowStep({ n, title, msg }: { n: number; title: string; msg: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{n}</span>
        <h4 className="font-bold text-white text-sm">{title}</h4>
      </div>
      <div className="bg-neutral-800 rounded-lg p-3 text-sm text-white/70 whitespace-pre-wrap border-l-2 border-green-500/50">
        {msg}
      </div>
    </div>
  );
}

function FunnelStage({ stage, color, channels, goal, kpi, content }: { stage: string; color: string; channels: string; goal: string; kpi: string; content: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-5 border-l-2 border-rose">
      <h4 className={`font-bold text-lg mb-3 ${color}`}>{stage}</h4>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <p><span className="text-white/40">Canais:</span> <span className="text-white/70">{channels}</span></p>
        <p><span className="text-white/40">KPIs:</span> <span className="text-white/70">{kpi}</span></p>
        <p className="sm:col-span-2"><span className="text-white/40">Objetivo:</span> <span className="text-white/70">{goal}</span></p>
        <p className="sm:col-span-2"><span className="text-white/40">Conteudo:</span> <span className="text-white/70">{content}</span></p>
      </div>
    </div>
  );
}
