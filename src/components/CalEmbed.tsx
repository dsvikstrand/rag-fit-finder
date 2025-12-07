import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

declare global {
  interface Window {
    Cal?: any;
  }
}

const SCRIPT_ID = "cal-embed-discovery";
const SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
const BRAND_COLOR = "#0A5A82";

export function CalEmbed() {
  const { language } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.Cal) {
      const cal = function () {
        // eslint-disable-next-line prefer-rest-params
        (cal.q = cal.q || []).push(arguments);
      };
      cal.q = cal.q || [];
      cal.ns = cal.ns || {};
      window.Cal = cal;
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else if (window.Cal) {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.Cal) return;

    window.Cal("init", { origin: "https://app.cal.com" });

    const buttonText = language === "sv" ? "Boka ett möte" : "Book a meeting";

    window.Cal("floatingButton", {
      calLink: "vdsai/discovery",
      config: { layout: "month_view" },
      buttonText,
      buttonColor: BRAND_COLOR,
    });

    window.Cal("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": BRAND_COLOR },
        dark: { "cal-brand": BRAND_COLOR },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [language, scriptLoaded]);

  return null;
}
