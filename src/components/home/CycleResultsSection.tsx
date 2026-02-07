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
  },
  {
    title: "Ciclo Completo com Volume",
    tag: "Miss",
    icon: TrendingUp,
    color: "destructive",
    description: "Três pernas executadas com pequena perda",
    result: "Perde centavos por ciclo completo",
    advantage: "Gera volume de trading para atingir níveis VIP (taxas menores)",
  },
  {
    title: "Saldo Residual Positivo",
    tag: "Miss + Rest",
    icon: Coins,
    color: "primary",
    description: "Ciclo com pequena perda em USDT, mas deixa saldo em cripto",
    result: "Prejuízo operacional compensado por ativos residuais",
    advantage: "Acumula pequenas sobras de criptomoedas que se valorizam ao longo do tempo",
  },
  {
    title: "Lucro + Saldo Residual",
    tag: "Hit + Rest",
    icon: Target,
    color: "success",
    description: "Ciclo com lucro em USDT E acúmulo de criptomoeda",
    result: "Ganho imediato em dólar + acréscimo de ativos digitais",
    advantage: "Retorno duplo por operação",
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
