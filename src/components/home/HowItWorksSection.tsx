import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const triangleStrategies = [
  {
    name: "Classic Conversion",
    flow: "A/B → C/B → A/C",
    orders: ["SELL", "BUY", "BUY"] as const,
    tokens: ["BTC", "USDT", "FDUSD"],
    description: "Sell A for B, Buy C with B, Buy A with C",
  },
  {
    name: "Direct Flow",
    flow: "A/B → B/C → A/C",
    orders: ["SELL", "SELL", "BUY"] as const,
    tokens: ["BTC", "FDUSD", "USDT"],
    description: "Sell A for B, Sell B for C, Buy A with C",
  },
  {
    name: "Reverse Flow",
    flow: "A/B → C/A → C/B",
    orders: ["BUY", "BUY", "SELL"] as const,
    tokens: ["FDUSD", "USDT", "BTC"],
    description: "Buy A with B, Buy C with A, Sell C for B",
  },
  {
    name: "Split Path",
    flow: "A/B → A/C → C/B",
    orders: ["BUY", "SELL", "SELL"] as const,
    tokens: ["BTC", "USDT", "FDUSD"],
    description: "Buy A with B, Sell A for C, Sell C for B",
  },
  {
    name: "Loopback",
    flow: "A/B → C/B → C/A",
    orders: ["SELL", "BUY", "SELL"] as const,
    tokens: ["FDUSD", "USDT", "BTC"],
    description: "Sell A for B, Buy C with B, Sell C for A",
  },
  {
    name: "Opposing Flow",
    flow: "A/B → A/C → B/C",
    orders: ["BUY", "SELL", "BUY"] as const,
    tokens: ["BTC", "FDUSD", "USDT"],
    description: "Buy A with B, Sell A for C, Buy B with C",
  },
];

const getOrderColor = (order: string) => {
  return order === "BUY" ? "hsl(var(--success))" : "hsl(var(--destructive))";
};

export const HowItWorksSection = () => {
  const [currentStrategy, setCurrentStrategy] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStrategy((prev) => (prev + 1) % triangleStrategies.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const strategy = triangleStrategies[currentStrategy];

  return (
    <section className="py-24 relative bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{t.howItWorks.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.howItWorks.title} <span className="gradient-text">{t.howItWorks.titleHighlight}</span> {t.howItWorks.titleEnd}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Triangle Visualization */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className={`text-center mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 mb-3">
              <span className="text-xs font-mono text-muted-foreground">Strategy {currentStrategy + 1}/6</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{strategy.name}</h3>
            <p className="text-sm font-mono text-primary mb-2">{strategy.flow}</p>
            <p className="text-xs text-muted-foreground">{strategy.description}</p>
          </div>

          <div className={`relative aspect-square max-w-md mx-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <svg viewBox="0 0 400 380" className="w-full h-full">
              <defs>
                <marker id="arrowBuy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="hsl(var(--success))" />
                </marker>
                <marker id="arrowSell" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="hsl(var(--destructive))" />
                </marker>
                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--success))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>

              <path d="M200 50 L350 300 L50 300 Z" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />

              <line x1="220" y1="65" x2="335" y2="280" stroke={getOrderColor(strategy.orders[0])} strokeWidth="2" markerEnd={strategy.orders[0] === "BUY" ? "url(#arrowBuy)" : "url(#arrowSell)"} />
              <line x1="330" y1="310" x2="70" y2="310" stroke={getOrderColor(strategy.orders[1])} strokeWidth="2" markerEnd={strategy.orders[1] === "BUY" ? "url(#arrowBuy)" : "url(#arrowSell)"} />
              <line x1="65" y1="280" x2="180" y2="65" stroke={getOrderColor(strategy.orders[2])} strokeWidth="2" markerEnd={strategy.orders[2] === "BUY" ? "url(#arrowBuy)" : "url(#arrowSell)"} />

              <g>
                <circle cx="200" cy="50" r="28" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
                <text x="200" y="54" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.tokens[0]}</text>
              </g>
              <g>
                <circle cx="350" cy="300" r="28" fill="hsl(var(--card))" stroke="hsl(var(--success))" strokeWidth="2" />
                <text x="350" y="304" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.tokens[1]}</text>
              </g>
              <g>
                <circle cx="50" cy="300" r="28" fill="hsl(var(--card))" stroke="hsl(var(--warning))" strokeWidth="2" />
                <text x="50" y="304" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.tokens[2]}</text>
              </g>

              <g>
                <rect x="275" y="145" width="45" height="20" rx="4" fill={getOrderColor(strategy.orders[0])} opacity="0.15" />
                <text x="298" y="159" textAnchor="middle" fill={getOrderColor(strategy.orders[0])} fontSize="10" fontFamily="monospace" fontWeight="bold">{strategy.orders[0]}</text>
                <text x="298" y="175" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">Leg 1</text>
              </g>
              <g>
                <rect x="177" y="325" width="45" height="20" rx="4" fill={getOrderColor(strategy.orders[1])} opacity="0.15" />
                <text x="200" y="339" textAnchor="middle" fill={getOrderColor(strategy.orders[1])} fontSize="10" fontFamily="monospace" fontWeight="bold">{strategy.orders[1]}</text>
                <text x="200" y="355" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">Leg 2</text>
              </g>
              <g>
                <rect x="82" y="145" width="45" height="20" rx="4" fill={getOrderColor(strategy.orders[2])} opacity="0.15" />
                <text x="105" y="159" textAnchor="middle" fill={getOrderColor(strategy.orders[2])} fontSize="10" fontFamily="monospace" fontWeight="bold">{strategy.orders[2]}</text>
                <text x="105" y="175" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">Leg 3</text>
              </g>
            </svg>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {triangleStrategies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentStrategy(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStrategy
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs font-mono text-muted-foreground">BUY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-xs font-mono text-muted-foreground">SELL</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass-card rounded-xl p-6 h-full">
                <span className="text-4xl font-bold text-primary/20 font-mono">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-semibold text-lg mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < 3 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
