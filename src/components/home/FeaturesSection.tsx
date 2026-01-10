import { 
  Zap, 
  Shield, 
  Activity, 
  Clock, 
  GitBranch, 
  Lock 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Low Latency Execution",
    description: "WebSocket-based real-time data streaming with ~280ms RTT to Binance servers.",
    color: "primary"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Pre-order validation with PRICE_FILTER, LOT_SIZE, NOTIONAL and fast cancellation.",
    color: "success"
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live order book analysis with instant opportunity detection and execution.",
    color: "warning"
  },
  {
    icon: Clock,
    title: "Fast Revert",
    description: "Automatic order cancellation when price deviates, minimizing potential losses.",
    color: "primary"
  },
  {
    icon: GitBranch,
    title: "State Machine",
    description: "FSM architecture prevents race conditions and ensures atomic operations.",
    color: "success"
  },
  {
    icon: Lock,
    title: "SPOT Only",
    description: "Operates exclusively on spot markets. No futures, derivatives, or leverage.",
    color: "warning"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Speed & Safety</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every component is optimized for high-frequency trading while maintaining 
            strict risk controls and exchange compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 hover:bg-card/90 transition-all group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
