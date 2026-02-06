import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 terminal-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 mb-8 slide-up">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            <span className="text-sm font-mono text-muted-foreground">
              Production Ready • Binance SPOT
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-up" style={{ animationDelay: '0.1s' }}>
            High-Frequency
            <br />
            <span className="gradient-text">Triangular Arbitrage</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
            Bot de arbitragem triangular para Binance com execução de baixa latência, 
            validação de regras e cancelamento ultrarrápido para minimizar perdas.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-mono text-foreground">~0.3ms exec</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-success" />
              <span className="font-mono text-foreground">Risk Managed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-warning" />
              <span className="font-mono text-foreground">Real-time</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group">
                Try Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              View Documentation
            </Button>
          </div>

          {/* Terminal Preview */}
          <div className="mt-16 slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card rounded-xl overflow-hidden max-w-3xl mx-auto gradient-border">
              <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">arbiter-bot ~ execution.log</span>
              </div>
              <div className="p-4 font-mono text-xs md:text-sm text-left space-y-0.5 bg-background/50 h-[200px] overflow-y-auto">
                {/* Leg 1 */}
                <p className="text-muted-foreground">[<span className="text-warning">0.02ms</span>] place check</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.07ms</span>] place order</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.26ms</span>] send request</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.34ms</span>] sended request</p>
                <p className="text-success">place 1 ✓</p>
                {/* Leg 2 */}
                <p className="text-muted-foreground">[<span className="text-warning">0.04ms</span>] place check</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.25ms</span>] place order</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.46ms</span>] send request</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.55ms</span>] sended request</p>
                <p className="text-success">place 2 ✓</p>
                {/* Leg 3 */}
                <p className="text-muted-foreground">[<span className="text-warning">0.05ms</span>] place check</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.13ms</span>] place order</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.26ms</span>] send request</p>
                <p className="text-muted-foreground">[<span className="text-warning">0.32ms</span>] sended request</p>
                <p className="text-success">place 3 ✓</p>
                <p className="text-success mt-2">→ Cycle complete: <span className="text-primary">+0.047%</span> profit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-mono">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};
