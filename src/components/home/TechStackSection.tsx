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

      </div>
    </section>
  );
};
