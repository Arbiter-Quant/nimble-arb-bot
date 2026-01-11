import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

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

const triangleStrategies = [
  {
    name: "Classic Conversion",
    flow: "A/B → C/B → A/C",
    startAsset: "A",
    orders: ["SELL", "BUY", "BUY"],
    nodes: ["USDT", "BTC", "FDUSD"],
    labels: ["SELL A", "BUY C", "BUY A"],
    description: "Sell A on A/B to get B, use B to Buy C on C/B, use C to Buy A on A/C",
    colors: ["primary", "success", "warning"],
  },
  {
    name: "Direct Flow",
    flow: "A/B → B/C → A/C",
    startAsset: "A",
    orders: ["SELL", "SELL", "BUY"],
    nodes: ["FDUSD", "USDT", "BTC"],
    labels: ["SELL A", "SELL B", "BUY A"],
    description: "Sell A on A/B to get B, Sell B on B/C to get C, use C to Buy A on A/C",
    colors: ["primary", "warning", "success"],
  },
  {
    name: "Reverse Flow",
    flow: "A/B → C/A → C/B",
    startAsset: "B",
    orders: ["BUY", "BUY", "SELL"],
    nodes: ["USDT", "FDUSD", "BTC"],
    labels: ["BUY A", "BUY C", "SELL C"],
    description: "Use B to Buy A on A/B, use A to Buy C on C/A, Sell C on C/B to get B",
    colors: ["success", "primary", "warning"],
  },
  {
    name: "Split Path",
    flow: "A/B → A/C → C/B",
    startAsset: "B",
    orders: ["BUY", "SELL", "SELL"],
    nodes: ["USDT", "BTC", "FDUSD"],
    labels: ["BUY A", "SELL A", "SELL C"],
    description: "Use B to Buy A on A/B, Sell A on A/C to get C, Sell C on C/B to get B",
    colors: ["success", "warning", "primary"],
  },
  {
    name: "Loopback",
    flow: "A/B → C/B → C/A",
    startAsset: "A",
    orders: ["SELL", "BUY", "SELL"],
    nodes: ["USDT", "BTC", "FDUSD"],
    labels: ["SELL A", "BUY C", "SELL C"],
    description: "Sell A on A/B to get B, use B to Buy C on C/B, Sell C on C/A to get A",
    colors: ["primary", "success", "warning"],
  },
  {
    name: "Opposing Flow",
    flow: "A/B → A/C → B/C",
    startAsset: "B",
    orders: ["BUY", "SELL", "BUY"],
    nodes: ["FDUSD", "BTC", "USDT"],
    labels: ["BUY A", "SELL A", "BUY B"],
    description: "Use B to Buy A on A/B, Sell A on A/C to get C, use C to Buy B on B/C",
    colors: ["warning", "success", "primary"],
  },
];

export const HowItWorksSection = () => {
  const [currentStrategy, setCurrentStrategy] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStrategy((prev) => (prev + 1) % triangleStrategies.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const strategy = triangleStrategies[currentStrategy];

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
          {/* Strategy Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {triangleStrategies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStrategy(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStrategy 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Strategy Info */}
          <div className={`text-center mb-6 transition-all duration-300 ${isAnimating ? "opacity-0 transform -translate-y-2" : "opacity-100 transform translate-y-0"}`}>
            <span className="text-xs font-mono text-muted-foreground">STRATEGY {currentStrategy + 1}/6</span>
            <h3 className="text-xl font-bold text-foreground mt-1">{strategy.name}</h3>
            <p className="text-sm font-mono text-primary mt-1">{strategy.flow}</p>
            <div className="flex justify-center gap-2 mt-2">
              {strategy.orders.map((order, i) => (
                <span 
                  key={i} 
                  className={`text-xs px-2 py-0.5 rounded font-mono ${
                    order === "BUY" 
                      ? "bg-success/20 text-success" 
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {order}
                </span>
              ))}
            </div>
          </div>

          <div className={`relative aspect-square transition-all duration-300 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
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

              {/* Arrow indicators on edges */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--success))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
                </marker>
              </defs>

              {/* Animated arrows on each edge */}
              <g className="animate-pulse">
                {/* Top to Right */}
                <line x1="260" y1="140" x2="280" y2="175" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                {/* Right to Left */}
                <line x1="220" y1="320" x2="180" y2="320" stroke="hsl(var(--success))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                {/* Left to Top */}
                <line x1="100" y1="200" x2="120" y2="160" stroke="hsl(var(--warning))" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </g>

              {/* Nodes */}
              <circle cx="200" cy="30" r="28" fill="hsl(var(--card))" stroke={`hsl(var(--${strategy.colors[0]}))`} strokeWidth="3" />
              <circle cx="370" cy="320" r="28" fill="hsl(var(--card))" stroke={`hsl(var(--${strategy.colors[1]}))`} strokeWidth="3" />
              <circle cx="30" cy="320" r="28" fill="hsl(var(--card))" stroke={`hsl(var(--${strategy.colors[2]}))`} strokeWidth="3" />

              {/* Node Labels */}
              <text x="200" y="35" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.nodes[0]}</text>
              <text x="370" y="325" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.nodes[1]}</text>
              <text x="30" y="325" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="monospace" fontWeight="bold">{strategy.nodes[2]}</text>

              {/* Edge Labels with order type */}
              <g>
                <rect x="255" y="130" width="60" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="285" y="144" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">{strategy.labels[0]}</text>
              </g>
              <g>
                <rect x="170" y="335" width="60" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="200" y="349" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">{strategy.labels[1]}</text>
              </g>
              <g>
                <rect x="55" y="160" width="60" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="85" y="174" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">{strategy.labels[2]}</text>
              </g>

              {/* Start indicator */}
              <g className="animate-pulse">
                <circle cx="200" cy="30" r="36" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                <text x="200" y="-5" textAnchor="middle" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">START</text>
              </g>
            </svg>

            <style>{`
              @keyframes draw {
                0% { stroke-dashoffset: 900; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -900; }
              }
            `}</style>
          </div>

          {/* Strategy Description */}
          <p className={`text-center text-xs text-muted-foreground mt-4 font-mono transition-all duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            {strategy.description}
          </p>
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
