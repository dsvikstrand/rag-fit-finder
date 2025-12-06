import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "sv" : "en")}
      className="text-sm font-medium px-3 h-9 transition-all duration-200 hover:bg-muted"
    >
      <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>
        EN
      </span>
      <span className="text-muted-foreground/50 mx-1">/</span>
      <span className={language === "sv" ? "text-foreground" : "text-muted-foreground"}>
        SV
      </span>
    </Button>
  );
}
