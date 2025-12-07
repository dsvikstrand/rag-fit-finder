import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/lib/i18n";
import { Loader2, Send } from "lucide-react";

const CONTACT_EMAIL = "david@vdsai.se";

interface ContactDrawerProps {
  triggerLabel: string;
  context?: string;
}

export function ContactDrawer({ triggerLabel, context }: ContactDrawerProps) {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: t.contactDrawer.missingFieldsTitle,
        description: t.contactDrawer.missingFieldsDesc,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    const payload = {
      name,
      email,
      company,
      context: context || "RAG Fit Check",
      language,
      source: "contact-drawer",
    };

    if (contactEndpoint) {
      try {
        const response = await fetch(contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to submit contact");

        toast({
          title: t.contactDrawer.successTitle,
          description: t.contactDrawer.successDesc,
        });
        setName("");
        setEmail("");
        setCompany("");
        setOpen(false);
      } catch (error) {
        toast({
          title: t.contactDrawer.errorTitle,
          description: t.contactDrawer.errorDesc,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Fallback to mailto if no endpoint configured
    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Context: ${context || "RAG Fit Check"}`,
      `Language: ${language.toUpperCase()}`,
    ].join("\n");
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("RAG Fit Check inquiry")}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailto;
    setIsSubmitting(false);
    setOpen(false);
    toast({
      title: t.contactDrawer.emailFallbackTitle,
      description: t.contactDrawer.emailFallbackDesc,
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="text-left">
            <DrawerTitle>{t.contactDrawer.title}</DrawerTitle>
            <DrawerDescription>{t.contactDrawer.subtitle}</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t.contactDrawer.nameLabel}</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contactDrawer.namePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">{t.contactDrawer.emailLabel}</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contactDrawer.emailPlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">{t.contactDrawer.companyLabel}</Label>
              <Input
                id="contact-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t.contactDrawer.companyPlaceholder}
              />
            </div>
            <DrawerFooter className="px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.contactDrawer.submitting}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t.contactDrawer.submit}
                  </>
                )}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">{t.contactDrawer.cancel}</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
