import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageLabels: Record<Language, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

const languageNames: Record<Language, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/demo", label: t.nav.demo },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-foreground">Arbi</span>
              <span className="text-primary">ter</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={location.pathname === link.href ? "secondary" : "ghost"}
                  size="sm"
                  className="font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* CTA + Language */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs">
                  <Globe className="w-4 h-4" />
                  {languageLabels[language]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={language === lang ? "bg-accent" : ""}
                  >
                    <span className="font-mono text-xs mr-2">{languageLabels[lang]}</span>
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
              <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
              <span className="text-xs font-mono text-success">{t.nav.live}</span>
            </div>
            <Link to="/demo">
              <Button variant="hero" size="sm">
                {t.nav.tryDemo}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={location.pathname === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              {/* Mobile Language Selector */}
              <div className="flex gap-1 px-2 py-2">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <Button
                    key={lang}
                    variant={language === lang ? "secondary" : "ghost"}
                    size="sm"
                    className="font-mono text-xs"
                    onClick={() => setLanguage(lang)}
                  >
                    {languageLabels[lang]}
                  </Button>
                ))}
              </div>
              <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero" className="w-full mt-2">
                  {t.nav.tryDemo}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
