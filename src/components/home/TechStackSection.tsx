import { useLanguage } from "@/i18n/LanguageContext";

export const TechStackSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{t.techStack.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.techStack.title} <span className="gradient-text">{t.techStack.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.techStack.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {t.techStack.items.map((tech) => (
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
