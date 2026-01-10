import { ArrowRight, Circle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Monitor Order Books",
    description: "Real-time WebSocket streams continuously monitor price movements across multiple trading pairs.",
  },
  {
    number: "02",
    title: "Detect Opportunity",
    description: "Algorithm identifies triangular cycles where price discrepancies create potential profit.",
  },
  {
    number: "03",
    title: "Validate & Execute",
    description: "Pre-flight checks validate exchange rules, then sequential atomic execution of all three legs.",
  },
  {
    number: "04",
    title: "Monitor & Revert",
    description: "Continuous price monitoring during execution with fast cancellation if conditions change.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Arbitrage</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Triangular arbitrage exploits price inefficiencies between three currency pairs
            to generate profit with minimal market exposure.
          </p>
        </div>

        {/* Triangle Visualization */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="relative aspect-square">
            {/* Triangle SVG */}
            <svg viewBox="0 0 400 346" className="w-full h-full">
              {/* Triangle Path */}
              <path
                d="M200 30 L370 320 L30 320 Z"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              
              {/* Animated Path */}
              <path
                d="M200 30 L370 320 L30 320 Z"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="900"
                strokeDashoffset="900"
                className="animate-[draw_3s_ease-in-out_infinite]"
              />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--success))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>

              {/* Nodes */}
              <circle cx="200" cy="30" r="24" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="370" cy="320" r="24" fill="hsl(var(--card))" stroke="hsl(var(--success))" strokeWidth="2" />
              <circle cx="30" cy="320" r="24" fill="hsl(var(--card))" stroke="hsl(var(--warning))" strokeWidth="2" />

              {/* Labels */}
              <text x="200" y="35" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">USDT</text>
              <text x="370" y="325" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">ETH</text>
              <text x="30" y="325" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">BTC</text>

              {/* Arrow Labels */}
              <text x="290" y="150" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">BUY ETH</text>
              <text x="200" y="350" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">SELL ETH/BTC</text>
              <text x="90" y="150" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">SELL BTC</text>
            </svg>

            <style>{`
              @keyframes draw {
                0% { stroke-dashoffset: 900; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -900; }
              }
            `}</style>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="glass-card rounded-xl p-6 h-full">
                <span className="text-4xl font-bold text-primary/20 font-mono">{step.number}</span>
                <h3 className="font-semibold text-lg mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
