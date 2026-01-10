import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto gradient-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">Test the Bot?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Try the demo in testnet mode. No real funds required. 
            See how triangular arbitrage works in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group">
                Launch Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact via DM
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6 font-mono">
            ⚠️ Not financial advice. SPOT only. Use at your own risk.
          </p>
        </div>
      </div>
    </section>
  );
};
