import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="section-padding bg-muted/50 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* About */}
        <div className="mb-12">
          <h3 className="text-xl font-display font-semibold mb-4">About this tool</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Built by an independent deep learning engineer specializing in RAG systems, 
            custom models, and GPU-accelerated training. This page is meant as a quick, 
            honest starting point for conversations about AI in your business.
          </p>
          <p className="text-sm text-muted-foreground">
            This tool gives you a general direction based on typical patterns I've seen. 
            Real performance depends on your actual data, implementation quality, and 
            specific requirements. It's not a rigid quote—just a starting point.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-t border-border">
          <div>
            <h4 className="font-semibold mb-1">Want to talk?</h4>
            <p className="text-sm text-muted-foreground">
              I'm happy to discuss your specific situation.
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="mailto:hello@example.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact me
            </a>
          </Button>
        </div>

        {/* Privacy */}
        <div className="pt-8 border-t border-border">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">Privacy:</strong> We do not upload or store your documents. 
              We only store your email if you choose to subscribe. Your form answers are processed 
              client-side and never sent to any AI service.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RAG Fit Check. Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
