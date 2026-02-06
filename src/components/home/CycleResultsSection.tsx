import { AlertTriangle, TrendingDown, TrendingUp, Coins } from "lucide-react";

const resultTypes = [
  {
    title: "Revert",
    subtitle: "Cancelada rapidamente",
    icon: AlertTriangle,
    color: "warning",
    logs: [
      "S -> N USDC BUY    | out= 42.00000000 | in= 42.00000000 | ↑ delta=  0.00000000",
      "N -> S USDC SELL   | out= 41.97900000 | in= 41.97480000 | ↓ delta= -0.00420000"
    ],
    effect: "Perda mínima, preserva capital; evita executar pernas seguintes em desvantagem."
  },
  {
    title: "Miss",
    subtitle: "Execução ruim, útil para volume",
    icon: TrendingDown,
    color: "destructive",
    logs: [
      "S -> N USDC BUY    | out= 42.00000000 | in= 41.59480000 | ↑ delta=  0.40520000",
      "N -> T STO BUY     | out=210.50000000 | in=210.50000000 | ↑ delta=  0.00000000",
      "T -> S USDT SELL   | out= 41.57375000 | in= 41.97900000 | ↓ delta= -0.40525000"
    ],
    effect: "Perde centésimos por ciclo; aumenta volume para níveis VIP (taxas menores)."
  },
  {
    title: "Miss + Rest",
    subtitle: "Saldo residual positivo",
    icon: Coins,
    color: "primary",
    logs: [
      "S -> N USDC BUY    | out= 42.00000000 | in= 41.97555000 | ↑ delta=  0.02445000",
      "N -> T ETH BUY     | out=  0.00930000 | in=  0.00930000 | ↑ delta=  0.00000000",
      "T -> S USDT SELL   | out= 41.96820300 | in= 41.98320000 | ↓ delta= -0.01499700"
    ],
    effect: "Apesar do miss, sobra ~$0.009 de rest que soma ao longo do tempo."
  },
  {
    title: "Hit + Rest",
    subtitle: "Ganho + saldo residual",
    icon: TrendingUp,
    color: "success",
    logs: [
      "S -> N LTC BUY     | out=  0.35800000 | in=  0.35800000 | ↑ delta=  0.00000000",
      "N -> T BTC SELL    | out=  0.00034081 | in=  0.00034000 | ↑ delta=  0.00000081",
      "T -> S USDT SELL   | out= 41.96933140 | in= 41.92180000 | ↑ delta=  0.04753140"
    ],
    effect: "Lucro direto no ciclo e ainda rest (ex.: 0.00000081 BTC ≈ $0.10)."
  }
];

export const CycleResultsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tipos de <span className="gradient-text">Resultado</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada ciclo pode terminar de diferentes formas. O bot prioriza preservação de capital
            e acúmulo de volume para redução de taxas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resultTypes.map((result) => (
            <div key={result.title} className="glass-card rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border/50">
                <result.icon className={`w-5 h-5 text-${result.color}`} />
                <div>
                  <span className="font-semibold">{result.title}</span>
                  <span className="text-muted-foreground text-sm ml-2">— {result.subtitle}</span>
                </div>
              </div>
              
              {/* Log */}
              <div className="p-4 bg-background/50 font-mono text-xs space-y-1 overflow-x-auto">
                {result.logs.map((log, idx) => (
                  <p key={idx} className="text-muted-foreground whitespace-nowrap">
                    {log}
                  </p>
                ))}
              </div>

              {/* Effect */}
              <div className={`px-4 py-3 bg-${result.color}/5 border-t border-${result.color}/20`}>
                <p className="text-sm text-muted-foreground">
                  <span className={`text-${result.color} font-medium`}>Efeito:</span> {result.effect}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
