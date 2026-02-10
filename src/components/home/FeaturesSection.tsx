import { 
  Zap, 
  Shield, 
  Activity, 
  Clock, 
  GitBranch, 
  Lock 
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Zap, Shield, Activity, Clock, GitBranch, Lock];
const colors = ["primary", "success", "warning", "primary", "success", "warning"];

export const FeaturesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{t.features.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <div
                key={feature.title}
                className="glass-card rounded-xl p-6 hover:bg-card/90 transition-all group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 text-${color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
