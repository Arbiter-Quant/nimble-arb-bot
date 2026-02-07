import { Zap, TrendingUp, Coins, Target } from "lucide-react";

const resultTypes = [
  {
    title: "Cancelamento Rápido",
    tag: "Revert",
    icon: Zap,
    color: "warning",
    description: "A operação é cancelada após a primeira perna",
    result: "Perda mínima controlada (apenas taxas)",
    advantage: "Preserva capital e evita completar o ciclo em desvantagem",
    example: [
      { leg: "1ª perna", action: "Compra USDC com USDT", detail: "Entra $42.000, Sai $42.000" },
      { leg: "Cancelamento", action: "Venda USDC por USDT", detail: "Entra $41.974, Sai $41.979" },
    ],
    balance: "-$0.0042 (apenas taxas)"
  },
  {
    title: "Ciclo Completo com Volume",
    tag: "Miss",
    icon: TrendingUp,
    color: "destructive",
    description: "Três pernas executadas com pequena perda",
    result: "Perde centavos por ciclo completo",
    advantage: "Gera volume de trading para atingir níveis VIP (taxas menores)",
    example: [
      { leg: "S→N", action: "Compra USDC com USDT", detail: "Entra 41.594 USDT, Sai 42.000 USDC" },
      { leg: "N→T", action: "Compra STO com USDC", detail: "Entra 210.500 USDC, Sai 210.500 STO" },
      { leg: "T→S", action: "Venda STO por USDT", detail: "Entra 41.979 USDT, Sai 41.573 STO" },
    ],
    balance: "-$0.405 (custo pelo volume gerado)"
  },
  {
    title: "Saldo Residual Positivo",
    tag: "Miss + Rest",
    icon: Coins,
    color: "primary",
    description: "Ciclo com pequena perda em USDT, mas deixa saldo em cripto",
    result: "Prejuízo operacional compensado por ativos residuais",
    advantage: "Acumula pequenas sobras de criptomoedas que se valorizam ao longo do tempo",
    example: [
      { leg: "S→N", action: "Compra USDC com USDT", detail: "Entra 41.975 USDT, Sai 42.000 USDC" },
      { leg: "N→T", action: "Compra ETH com USDC", detail: "Entra 0.0093 USDC, Sai 0.0093 ETH" },
      { leg: "T→S", action: "Venda ETH por USDT", detail: "Entra 41.983 USDT, Sai 41.968 ETH" },
    ],
    balance: "-$0.014 USDT + 0.009 ETH residual",
    highlight: "0.009 ETH residual"
  },
  {
    title: "Lucro + Saldo Residual",
    tag: "Hit + Rest",
    icon: Target,
    color: "success",
    description: "Ciclo com lucro em USDT E acúmulo de criptomoeda",
    result: "Ganho imediato em dólar + acréscimo de ativos digitais",
    advantage: "Retorno duplo por operação",
    example: [
      { leg: "S→N", action: "Compra LTC com USDT", detail: "Sai 0.35800000 LTC" },
      { leg: "N→T", action: "Venda LTC por BTC", detail: "Entra 0.00034000 BTC (+0.00000081 BTC rest)" },
      { leg: "T→S", action: "Venda BTC por USDT", detail: "Lucro: +$0.0475 USDT" },
    ],
    balance: "+$0.0475 USDT + 0.00000081 BTC (≈ $0.10)",
    highlight: "+$0.0475 USDT + BTC residual"
  }
];

const benefits = [
  { text: "Proteção de Capital", desc: "Cancelamento rápido quando necessário" },
  { text: "Redução de Taxas", desc: "Volume para níveis VIP" },
  { text: "Acúmulo Passivo", desc: "Saldos residuais se convertem em patrimônio" },
  { text: "Lucro Composto", desc: "Ganhos em dólar + apreciação de cripto" },
];

export const CycleResultsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tipos de <span className="gradient-text">Resultado</span> por Ciclo
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
            Cada operação executa um ciclo triangular entre três pares, priorizando sempre a{" "}
            <span className="text-primary font-medium">preservação do capital</span> e o{" "}
            <span className="text-primary font-medium">acúmulo de volume</span> para reduzir taxas.
          </p>
        </div>

        {/* Notation Legend */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-card rounded-lg p-4 text-sm">
            <p className="text-muted-foreground mb-2 font-medium">Notação:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div><code className="text-primary">X → Y</code> indica transação entre pares</div>
              <div><code className="text-success">BUY</code> Compra de Y usando X</div>
              <div><code className="text-destructive">SELL</code> Venda de Y por X</div>
              <div>Ex: <code className="text-primary">S→N LTC BUY</code> = compra LTC com USDT</div>
            </div>
          </div>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {resultTypes.map((result) => (
            <div key={result.title} className="glass-card rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${result.color}/10`}>
                    <result.icon className={`w-5 h-5 text-${result.color}`} />
                  </div>
                  <div>
                    <span className="font-semibold">{result.title}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-${result.color}/20 text-${result.color}`}>
                      {result.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 py-3 border-b border-border/30">
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <p className="text-sm mt-1">
                  <span className="text-muted-foreground">Resultado:</span>{" "}
                  <span className="text-foreground">{result.result}</span>
                </p>
                <p className="text-sm mt-1">
                  <span className="text-muted-foreground">Vantagem:</span>{" "}
                  <span className={`text-${result.color}`}>{result.advantage}</span>
                </p>
              </div>

              {/* Example Steps */}
              <div className="px-4 py-3 bg-background/50 space-y-2">
                <p className="text-xs text-muted-foreground font-medium mb-2">Exemplo:</p>
                {result.example.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="text-primary font-mono min-w-[70px]">{step.leg}</span>
                    <span className="text-muted-foreground">{step.action}</span>
                    <span className="text-foreground ml-auto text-right">{step.detail}</span>
                  </div>
                ))}
              </div>

              {/* Balance */}
              <div className={`px-4 py-3 bg-${result.color}/5 border-t border-${result.color}/20`}>
                <p className="text-sm">
                  <span className="text-muted-foreground">Saldo:</span>{" "}
                  <span className={`font-mono font-medium ${result.highlight ? `text-${result.color}` : "text-foreground"}`}>
                    {result.balance}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">Benefícios da Estratégia</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="glass-card rounded-lg p-4 text-center">
                <p className="text-primary font-medium text-sm mb-1">{benefit.text}</p>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Sistema automático que transforma arbitragem triangular em{" "}
            <span className="text-primary font-medium">crescimento sustentável de capital</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
