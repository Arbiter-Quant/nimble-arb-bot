const technologies = [
  {
    name: "Node.js",
    description: "Runtime for high-performance async operations",
    category: "Runtime"
  },
  {
    name: "TypeScript",
    description: "Type-safe code for financial reliability",
    category: "Language"
  },
  {
    name: "WebSocket",
    description: "Real-time bidirectional communication",
    category: "Protocol"
  },
  {
    name: "Binance API",
    description: "Direct exchange integration",
    category: "Integration"
  },
  {
    name: "State Machine",
    description: "Atomic operation management",
    category: "Architecture"
  },
  {
    name: "PM2",
    description: "Production process management",
    category: "DevOps"
  },
];

export const TechStackSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">TECHNOLOGY</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built with <span className="gradient-text">Modern Tech</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Carefully selected stack optimized for low-latency financial operations
            with strong typing and maintainability.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="glass-card rounded-xl p-5 text-center hover:bg-card/90 transition-all group"
            >
              <span className="text-xs text-primary font-mono mb-2 block">{tech.category}</span>
              <h3 className="font-semibold mb-1">{tech.name}</h3>
              <p className="text-xs text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* Code Snippet */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="glass-card rounded-xl overflow-hidden gradient-border">
            <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">src/types/cycle.ts</span>
            </div>
            <pre className="p-4 font-mono text-xs md:text-sm overflow-x-auto bg-background/50">
              <code className="text-muted-foreground">
{`interface `}<span className="text-primary">TriangularCycle</span>{` {
  legs: [`}<span className="text-success">TradeLeg</span>{`, `}<span className="text-success">TradeLeg</span>{`, `}<span className="text-success">TradeLeg</span>{`];
  expectedProfit: `}<span className="text-warning">number</span>{`;
  executionTime: `}<span className="text-warning">number</span>{`;
  status: `}<span className="text-primary">'pending'</span>{` | `}<span className="text-primary">'executing'</span>{` | `}<span className="text-success">'complete'</span>{` | `}<span className="text-destructive">'reverted'</span>{`;
}

const `}<span className="text-primary">legFactor</span>{` = (side: OrderSides, price: number) =>
  side === OrderSide.BUY ? `}<span className="text-warning">1</span>{` / price : price;`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
