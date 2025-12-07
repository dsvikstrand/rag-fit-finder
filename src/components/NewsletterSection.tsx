import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import type { Bucket } from "@/lib/bucketLogic";

interface NewsletterSectionProps {
  bucket?: Bucket;
  initialEmail?: string;
  anchorId?: string;
}

export function NewsletterSection({ bucket = "simple", initialEmail = "", anchorId = "subscribe" }: NewsletterSectionProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const bucketToUse: Bucket = bucket || "simple";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t.newsletter.errorTitle,
        description: t.newsletter.errorDescription,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("subscribers").insert({
        email,
        bucket: bucketToUse,
        form_data: { subscribed_from: "results_page" },
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: t.newsletter.alreadySubscribed,
            description: t.newsletter.alreadySubscribedDesc,
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: t.newsletter.successTitle,
          description: t.newsletter.successDescription,
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: t.newsletter.errorTitle,
        description: t.newsletter.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="section-padding">
        <div className="max-w-xl mx-auto text-center">
          <div className="card-elevated p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-display font-semibold">{t.newsletter.successTitle}</h3>
            <p className="text-muted-foreground">
              {t.newsletter.successDescription}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" id={anchorId}>
      <div className="max-w-xl mx-auto">
        <div className="card-elevated p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold">{t.newsletter.title}</h3>
          </div>

          <p className="text-muted-foreground mb-6">
            {t.newsletter.description}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <Label htmlFor="newsletter-email" className="sr-only">Email</Label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.emailPlaceholder}
                className="w-full"
              />
            </div>

            <Button type="submit" disabled={isLoading || !email} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.newsletter.subscribingButton}
                </>
              ) : (
                t.newsletter.subscribeButton
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
