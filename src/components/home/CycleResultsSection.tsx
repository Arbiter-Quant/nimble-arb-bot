import { Zap, TrendingUp, Coins, Target } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Zap, TrendingUp, Coins, Target];
const colors = ["warning", "destructive", "primary", "success"];
const tags = ["Revert", "Miss", "Miss + Rest", "Hit + Rest"];

export const CycleResultsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.cycleResults.title} <span className="gradient-text">{t.cycleResults.titleHighlight}</span> {t.cycleResults.titleEnd}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
            {t.cycleResults.subtitle}{" "}
            <span className="text-primary font-medium">{t.cycleResults.capitalPreservation}</span> {t.cycleResults.and}{" "}
            <span className="text-primary font-medium">{t.cycleResults.volumeAccumulation}</span> {t.cycleResults.toReduceFees}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {t.cycleResults.items.map((result, index) => {
            const Icon = icons[index];
            const color = colors[index];
            const tag = tags[index];
            return (
              <div key={result.title} className="glass-card rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${color}/10`}>
                      <Icon className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div>
                      <span className="font-semibold">{result.title}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-${color}/20 text-${color}`}>
                        {tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 border-b border-border/30">
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                  <p className="text-sm mt-1">
                    <span className="text-muted-foreground">{t.cycleResults.resultLabel}</span>{" "}
                    <span className="text-foreground">{result.result}</span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-muted-foreground">{t.cycleResults.advantageLabel}</span>{" "}
                    <span className={`text-${color}`}>{result.advantage}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">{t.cycleResults.benefitsTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.cycleResults.benefits.map((benefit) => (
              <div key={benefit.text} className="glass-card rounded-lg p-4 text-center">
                <p className="text-primary font-medium text-sm mb-1">{benefit.text}</p>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            {t.cycleResults.conclusion}{" "}
            <span className="text-primary font-medium">{t.cycleResults.conclusionHighlight}</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
