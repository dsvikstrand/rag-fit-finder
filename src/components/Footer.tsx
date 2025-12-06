import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="section-padding bg-muted/50 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* About */}
        <div className="mb-12">
          <h3 className="text-xl font-display font-semibold mb-4">{t.footer.aboutTitle}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t.footer.aboutDescription}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.footer.aboutNote}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-t border-border">
          <div>
            <h4 className="font-semibold mb-1">{t.footer.contactTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {t.footer.contactDescription}
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="mailto:hello@example.com">
              <Mail className="mr-2 h-4 w-4" />
              {t.footer.contactButton}
            </a>
          </Button>
        </div>

        {/* Privacy */}
        <div className="pt-8 border-t border-border">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">{t.footer.privacyTitle}</strong> {t.footer.privacyText}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
